import {
  type ChatInputCommandInteraction,
  channelMention,
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js'
import { getGuildIdFromCommand, sendGenericErrorReply } from '@/lib/command-helpers'
import { prisma } from '@/lib/db'
import { logger } from '@/lib/logger'
import type { Command } from '@/models/command'

export const ConfigCommand = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Configure how the bot behaves in your server')
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommandGroup((group) =>
      group
        .setName('birthdays')
        .setDescription('Configuration for the birthdays feature')
        .addSubcommand((subcommand) =>
          subcommand
            .setName('channel')
            .setDescription('Set which channel birthday messages are posted to')
            .addChannelOption((option) =>
              option
                .setName('channel')
                .setDescription('the channel to post messages in')
                .setRequired(true),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand.setName('toggle').setDescription('Toggles birthday messages on/off'),
        ),
    )
    .toJSON(),

  execute: async (interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand(false)
    switch (subcommand) {
      case 'channel':
        await channel(interaction)
        return
      case 'toggle':
        await toggle(interaction)
        return
      default:
        await sendGenericErrorReply(interaction)
        throw new Error('Unknown birthday command attempted')
    }
  },
} satisfies Command

async function channel(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply()

  const guildId = await getGuildIdFromCommand(interaction)
  const channelId = interaction.options.getChannel('channel', true).id

  if (guildId == null) {
    return
  }

  const channel = await interaction.client.channels.fetch(channelId)
  if (channel == null || !channel.isSendable()) {
    await interaction.editReply({
      content: 'Invalid channel provided. Please try again.',
    })
    return
  }

  try {
    await prisma.guildConfig.upsert({
      where: { id: guildId },
      update: { birthdaysChannel: channel.id },
      create: { id: guildId, birthdaysChannel: channel.id },
    })

    await interaction.editReply({
      content: `Birthday messages will now be sent in ${channelMention(channel.id)}`,
    })
  } catch (error) {
    logger.error('Failed to set birthdays channel')
    logger.error(error)
    await sendGenericErrorReply(interaction)
  }
}

async function toggle(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply()

  const guildId = await getGuildIdFromCommand(interaction)
  if (guildId == null) {
    return
  }

  const guildConfig = await prisma.guildConfig.upsert({
    where: { id: guildId },
    create: { id: guildId },
    update: {}, // Empty update object makes this behave like a findOrCreate
  })

  const birthdaysEnabled = !guildConfig.birthdaysEnabled
  if (birthdaysEnabled && guildConfig.birthdaysChannel == null) {
    await interaction.editReply({
      content:
        'Please set a channel for birthday messages to be sent to before enabling this feature.',
    })
    return
  }

  try {
    await prisma.guildConfig.update({
      where: { id: guildId },
      data: { birthdaysEnabled },
    })

    await interaction.editReply({
      content: `Birthday messages are now turned ${birthdaysEnabled ? 'on' : 'off'}`,
    })
  } catch (error) {
    logger.error('Failed to toggle birthday messages')
    logger.error(error)
    await sendGenericErrorReply(interaction)
  }
}

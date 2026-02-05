import {
  type ChatInputCommandInteraction,
  channelMention,
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js'
import { z } from 'zod'
import { sendGenericErrorReply } from '@/lib/commandHelpers'
import type { Command } from '@/models/command'
import { getGuildBirthdaysConfig, updateGuildConfig } from '../db/guildConfig'

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

  const channel = interaction.options.getChannel('channel', true)

  const schema = z.object({
    guildId: z.string().min(16).max(20),
    channelId: z.string().min(16).max(20),
  })

  const { success: parseSuccess, data } = schema.safeParse({
    guildId: interaction.guildId,
    channelId: channel.id,
  })

  if (!parseSuccess) {
    await sendGenericErrorReply(interaction)
    return
  }

  const { success } = await updateGuildConfig(data.guildId, {
    birthdaysChannel: data.channelId,
  })

  if (!success) {
    await sendGenericErrorReply(interaction)
    return
  }

  interaction.editReply({
    content: `Birthday messages will now be sent in ${channelMention(data.channelId)}`,
  })
}

async function toggle(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply()

  const schema = z.object({ guildId: z.string().min(16).max(20) })
  const { success: parseSuccess, data } = schema.safeParse({
    guildId: interaction.guildId,
  })

  if (!parseSuccess) {
    await sendGenericErrorReply(interaction)
    return
  }

  const guildConfig = await getGuildBirthdaysConfig(data.guildId)
  if (guildConfig == null) {
    await sendGenericErrorReply(interaction)
    return
  }

  const birthdaysEnabled = !guildConfig.birthdaysEnabled
  const { success } = await updateGuildConfig(data.guildId, {
    birthdaysEnabled: birthdaysEnabled,
  })

  if (!success) {
    await sendGenericErrorReply(interaction)
    return
  }

  const replyMessage = `Birthday messages are now turned ${birthdaysEnabled ? 'on' : 'off'}`
  await interaction.editReply({ content: replyMessage })
}

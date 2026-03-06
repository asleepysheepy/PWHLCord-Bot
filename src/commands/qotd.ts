import {
  type ChatInputCommandInteraction,
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
  roleMention,
  SlashCommandBuilder,
} from 'discord.js'
import type { Command } from '@/models/command'

export const QotdCommand = {
  data: new SlashCommandBuilder()
    .setName('qotd')
    .setDescription('Ask the question of the day')
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.MentionEveryone)
    .addStringOption((option) =>
      option.setName('question').setDescription('The question of the day to ask').setRequired(true),
    )
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription('An optional role to ping with the question')
        .setRequired(false),
    )
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const channel = interaction.channel

    if (!channel?.isSendable()) {
      await interaction.reply({
        content: "Whoops, I'm unable to send a message in this channel",
        flags: MessageFlags.Ephemeral,
      })
      return
    }

    await interaction.reply({
      content: 'Asking your question...',
      flags: MessageFlags.Ephemeral,
    })

    let response = `## It's time for a Question Of The Day!!\n\n**Today's question is:**\n${interaction.options.getString('question', true)}`

    const role = interaction.options.getRole('role', false)
    if (role != null) {
      response = response.concat('\n\n', roleMention(role.id))
    }

    await channel.send({ content: response })
  },
} satisfies Command

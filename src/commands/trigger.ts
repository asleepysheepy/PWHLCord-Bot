import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import { SendBirthdayMessagesJob } from '@/jobs/send-birthday-messages'
import { sendGenericErrorReply } from '@/lib/command-helpers'
import { logger } from '@/lib/logger'
import type { Command } from '@/models/command'

export const TriggerCommand = {
  data: new SlashCommandBuilder()
    .setName('trigger')
    .setDescription('Triggers a scheduled job to test functionality')
    .addSubcommand((subcommand) =>
      subcommand.setName('birthdays').setDescription('Run the birthdays job'),
    )
    .toJSON(),
  devOnly: true,
  execute: async (interaction) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral })

    try {
      switch (interaction.options.getSubcommand(true)) {
        case 'birthdays':
          await SendBirthdayMessagesJob.execute()
          break
        default:
          await sendGenericErrorReply(interaction)
          throw new Error('Unknown birthday command attempted')
      }
      await interaction.editReply('Job successfully ran.')
    } catch (error) {
      logger.error('Something went wrong')
      logger.error(error)
      await sendGenericErrorReply(interaction)
    }
  },
} satisfies Command

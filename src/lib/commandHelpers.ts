import { type ChatInputCommandInteraction, MessageFlags } from 'discord.js'

export async function sendGenericErrorReply(
  interaction: ChatInputCommandInteraction,
  message?: string,
) {
  if (interaction.isRepliable()) {
    const messageContent = message ?? 'Something went wrong. Please try again in a few minutes.'

    interaction.deferred
      ? interaction.editReply(messageContent)
      : interaction.reply({
          content: messageContent,
          flags: MessageFlags.Ephemeral,
        })
  }
}

import { type ChatInputCommandInteraction, MessageFlags } from 'discord.js'

export async function sendGenericErrorReply(
  interaction: ChatInputCommandInteraction,
  message?: string,
) {
  const messageContent = message ?? 'Something went wrong. Please try again in a few minutes.'

  return editOrReply(interaction, messageContent)
}

export async function getGuildIdFromCommand(interaction: ChatInputCommandInteraction) {
  const guildId = interaction.guildId

  if (guildId == null) {
    const message = 'Sorry, this command can only be used from servers.'
    await editOrReply(interaction, message)
    return
  }

  return guildId
}

export async function editOrReply(
  interaction: ChatInputCommandInteraction,
  message: string,
  ephemeral = true,
) {
  return interaction.deferred
    ? interaction.editReply({ content: message })
    : interaction.reply({
        content: message,
        flags: ephemeral ? MessageFlags.Ephemeral : undefined,
      })
}

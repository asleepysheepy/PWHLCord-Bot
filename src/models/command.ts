import type {
  ChatInputCommandInteraction,
  RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js'

/**
 * Represents a Discord slash command handler
 */
export interface Command {
  /**
   * The command data such as name, description, and arguments.
   *
   * For more info, see:
   * https://discord.js.org/docs/packages/discord.js/14.24.2/SlashCommandBuilder:Class
   */
  data: RESTPostAPIApplicationCommandsJSONBody

  /**
   * The function to run when the command is executed
   */
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void
}

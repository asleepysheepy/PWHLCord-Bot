import { Events } from 'discord.js'
import { commands } from '@/commands'
import { logger } from '@/lib/logger'
import type { Event } from '@/models/event'

export const InteractionCreate: Event = {
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return
    }

    const command = commands.get(interaction.commandName)
    if (command != null) {
      try {
        await command.execute(interaction)
      } catch (error) {
        logger.error(`An error occured while trying to execute the command: ${command.data.name}`)
        logger.error(error)
      }
    }
  },
} satisfies Event<Events.InteractionCreate>

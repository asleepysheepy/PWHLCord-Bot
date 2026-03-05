import { Events } from 'discord.js'
import { commands } from '@/commands'
import type { Event } from '@/models/event'

export const InteractionCreate: Event = {
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return
    }

    const command = commands.get(interaction.commandName)
    if (command != null) {
      command.execute(interaction)
    }
  },
} satisfies Event<Events.InteractionCreate>

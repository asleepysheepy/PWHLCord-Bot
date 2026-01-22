import { Events } from 'discord.js'
import { commands as birthdayCommands } from '@/features/birthday'
import type { Event } from '@/models/event'

const commands = new Map([...birthdayCommands].map((command) => [command.data.name, command]))

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

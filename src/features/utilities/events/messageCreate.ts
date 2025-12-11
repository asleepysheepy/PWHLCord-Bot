import { Events } from 'discord.js'
import { getGuildPrefix } from '@/features/guildConfig'
import type { Event } from '@/models/event'

export const MessageCreateEvent: Event = {
  name: Events.MessageCreate,
  execute: async (message) => {
    // Ignore DMs and messages from bots
    if (message.guildId == null || message.author.bot) return

    const commandPrefix = await getGuildPrefix(message.guildId)

    // If no command prefix was found or the message does not start with the prefix, return
    if (commandPrefix == null || !message.content.startsWith(commandPrefix)) return

    const command = message.content.slice(commandPrefix.length)
    switch (command) {
      case 'ping':
        message.channel.send('Pong!')
        break
      default:
        message.channel.send('Unknown command')
        break
    }
  },
} satisfies Event<Events.MessageCreate>

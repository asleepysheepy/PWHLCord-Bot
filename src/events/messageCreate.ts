import { Events } from 'discord.js'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { GuildConfigTable } from '@/db/schema'
import type { Event } from '@/models/event'

export const MessageCreateEvent: Event = {
  name: Events.MessageCreate,
  execute: async (message) => {
    // Ignore DMs
    if (message.guildId == null) return

    const commandPrefix = (
      await db
        .select({ prefix: GuildConfigTable.prefix })
        .from(GuildConfigTable)
        .where(eq(GuildConfigTable.id, message.guildId))
    )[0]?.prefix

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

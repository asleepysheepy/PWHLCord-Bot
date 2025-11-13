import { ActivityType, Events } from 'discord.js'
import type { Event } from '@/models/event'

/**
 * Handles the ready event, fired when the bot first connects to discord.
 *
 * Used for:
 *  - setting the bot's status
 */
export const ReadyEvent: Event = {
  name: Events.ClientReady,
  once: true,
  execute: (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`)

    client.user.setActivity({ name: 'hockey', type: ActivityType.Watching })
  },
} satisfies Event<Events.ClientReady>

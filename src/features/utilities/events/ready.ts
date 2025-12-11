import { ActivityType, Events } from 'discord.js'
import { logger } from '@/core/logger'
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
    logger.info(`Ready! Logged in as ${client.user.tag}`)

    client.user.setActivity({ name: 'hockey', type: ActivityType.Watching })
  },
} satisfies Event<Events.ClientReady>

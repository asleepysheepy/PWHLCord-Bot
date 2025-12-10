import { Events } from 'discord.js'
import { logger } from '@/core/logger'
import { db } from '@/db'
import { GuildConfigTable } from '@/db/schema'
import type { Event } from '@/models/event'

export const GuildCreateEvent: Event = {
  name: Events.GuildCreate,
  execute: async (guild) => {
    try {
      await db.insert(GuildConfigTable).values({ id: guild.id })

      logger.info(`Created new guild config for ${guild.name} with id ${guild.id}`)
    } catch (error) {
      logger.error(`Error creating new guild config for ${guild.id}`)
      logger.error(error)
    }
  },
} satisfies Event<Events.GuildCreate>

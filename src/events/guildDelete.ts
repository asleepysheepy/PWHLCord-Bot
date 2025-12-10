import { Events } from 'discord.js'
import { eq } from 'drizzle-orm'
import { logger } from '@/core/logger'
import { db } from '@/db'
import { GuildConfigTable } from '@/db/schema'
import type { Event } from '@/models/event'

export const GuildDeleteEvent: Event = {
  name: Events.GuildDelete,
  execute: async (guild) => {
    try {
      await db.delete(GuildConfigTable).where(eq(GuildConfigTable.id, guild.id))

      logger.info(`Deleted guild config for ${guild.id}`)
    } catch (error) {
      logger.error(`Error deleting guild config: ${guild.id}`)
      logger.error(error)
    }
  },
} satisfies Event<Events.GuildDelete>

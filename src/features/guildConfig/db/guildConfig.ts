import type { Snowflake } from 'discord.js'
import { eq } from 'drizzle-orm'
import { db } from '@/core/db'
import { logger } from '@/core/logger'
import { GuildConfig } from '@/models/schema'

export async function createGuildConfig(guildId: Snowflake) {
  try {
    await db.insert(GuildConfig).values({ id: guildId })

    logger.info(`Created new guild config for guild with id ${guildId}`)
  } catch (error) {
    logger.error(`Error creating new guild config for ${guildId}`)
    logger.error(error)
  }
}

export async function deleteGuildConfig(guildId: Snowflake) {
  try {
    await db.delete(GuildConfig).where(eq(GuildConfig.id, guildId))
    logger.info(`Deleted guild config for ${guildId}`)
  } catch (error) {
    logger.error(`Error deleting guild config: ${guildId}`)
    logger.error(error)
  }
}

export async function getGuildPrefix(guildId: Snowflake): Promise<string | null> {
  const guildConfig = await db
    .select({ prefix: GuildConfig.prefix })
    .from(GuildConfig)
    .where(eq(GuildConfig.id, guildId))

  return guildConfig?.[0]?.prefix
}

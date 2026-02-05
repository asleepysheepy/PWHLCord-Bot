import type { Snowflake } from 'discord.js'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { logger } from '@/lib/logger'
import { GuildConfigTable } from '@/models/schema'

export async function createGuildConfig(guildId: Snowflake) {
  try {
    await db.insert(GuildConfigTable).values({ id: guildId })
    logger.info(`Created new guild config for guild with id ${guildId}`)

    return { success: true }
  } catch (error) {
    logger.error(`Error creating new guild config for ${guildId}`)
    logger.error(error)

    return { success: false }
  }
}

export async function updateGuildConfig(
  guildId: Snowflake,
  data: Partial<Omit<typeof GuildConfigTable.$inferInsert, 'id'>>,
) {
  try {
    await db.update(GuildConfigTable).set(data).where(eq(GuildConfigTable.id, guildId))

    return { success: true }
  } catch (error) {
    logger.error(`Error updating guild config for ${guildId}`)
    logger.error(error)

    return { success: false }
  }
}

export async function deleteGuildConfig(guildId: Snowflake) {
  try {
    await db.delete(GuildConfigTable).where(eq(GuildConfigTable.id, guildId))
    logger.info(`Deleted guild config for ${guildId}`)

    return { success: true }
  } catch (error) {
    logger.error(`Error deleting guild config: ${guildId}`)
    logger.error(error)

    return { success: false }
  }
}

export async function getGuildPrefix(guildId: Snowflake): Promise<string | null> {
  const guildConfig = await db
    .select({ prefix: GuildConfigTable.prefix })
    .from(GuildConfigTable)
    .where(eq(GuildConfigTable.id, guildId))

  return guildConfig?.[0]?.prefix
}

export async function getGuildBirthdaysConfig(guildId: Snowflake): Promise<{
  guildId: Snowflake
  birthdaysEnabled: boolean
  birthdaysChannel: Snowflake | null
} | null> {
  const guildConfig = await db
    .select({
      guildId: GuildConfigTable.id,
      birthdaysEnabled: GuildConfigTable.birthdaysEnabled,
      birthdaysChannel: GuildConfigTable.birthdaysChannel,
    })
    .from(GuildConfigTable)
    .where(eq(GuildConfigTable.id, guildId))

  return guildConfig?.[0]
}

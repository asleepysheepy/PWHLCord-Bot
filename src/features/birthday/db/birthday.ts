import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { logger } from '@/lib/logger'
import { BirthdayTable } from '@/models/schema'

export async function createBirthday(data: typeof BirthdayTable.$inferInsert) {
  try {
    const birthday = await db.insert(BirthdayTable).values(data).returning()

    logger.info(`Added a birthday for user ${data.userId} in guild ${data.guildId}`)

    return { success: true, birthday }
  } catch (error) {
    logger.error(`Error adding birthday with data ${JSON.stringify(data)}`)
    logger.error(error)

    return { success: false, error }
  }
}

export async function deleteBirthday({ guildId, userId }: { guildId: string; userId: string }) {
  try {
    await db
      .delete(BirthdayTable)
      .where(and(eq(BirthdayTable.guildId, guildId), eq(BirthdayTable.userId, userId)))

    return { success: true }
  } catch (error) {
    logger.error(`Error deleting birthday with guildId ${guildId} and userId ${userId}`)
    logger.error(error)

    return { success: false }
  }
}

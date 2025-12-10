import type { Snowflake } from 'discord.js'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { createdAt, snowflake, updatedAt } from '@/db/schemaHelpers'

export const GuildConfigTable = pgTable('guild', {
  id: snowflake.primaryKey().$type<Snowflake>(),
  createdAt,
  updatedAt,

  prefix: text().notNull().default(';'),
})

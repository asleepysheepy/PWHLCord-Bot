import type { Snowflake } from 'discord.js'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { createdAt, snowflake, updatedAt } from '@/models/schema/schemaHelpers'

export const GuildConfig = pgTable('guild', {
  id: snowflake.primaryKey().$type<Snowflake>(),
  createdAt,
  updatedAt,

  prefix: text().notNull().default(';'),
})

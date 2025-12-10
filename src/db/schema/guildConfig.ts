import { pgTable, text } from 'drizzle-orm/pg-core'
import { createdAt, snowflake, updatedAt } from '@/db/schemaHelpers'

export const GuildConfigTable = pgTable('guild', {
  id: snowflake.primaryKey(),
  createdAt,
  updatedAt,

  prefix: text().notNull().default(';'),
})

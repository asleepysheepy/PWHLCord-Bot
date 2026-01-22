import type { Snowflake } from 'discord.js'
import { boolean, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, updatedAt } from '@/models/schema/schemaHelpers'

export const GuildConfigTable = pgTable('guild', {
  id: varchar({ length: 30 }).primaryKey().$type<Snowflake>(),
  createdAt,
  updatedAt,

  prefix: text().notNull().default(';'),

  birthdaysEnabled: boolean().notNull().default(false),
  birthdaysChannel: varchar({ length: 30 }).$type<Snowflake>(),
  birthdaysTime: text(),
})

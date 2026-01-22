import { integer, pgTable, primaryKey, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, updatedAt } from '@/models/schema/schemaHelpers'

export const BirthdayTable = pgTable(
  'birthday',
  {
    createdAt,
    updatedAt,

    guildId: varchar({ length: 30 }),
    userId: varchar({ length: 30 }),

    birthMonth: text(),
    birthDay: integer(),
  },
  (table) => [primaryKey({ columns: [table.guildId, table.userId] })],
)

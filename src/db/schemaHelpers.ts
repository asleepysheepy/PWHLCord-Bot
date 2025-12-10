import { timestamp, varchar } from 'drizzle-orm/pg-core'

export const snowflake = varchar({ length: 30 })

export const createdAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
export const updatedAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())

import { getGuildPrefix } from '@/features/guildConfig/db/guildConfig'
import { GuildCreateEvent } from '@/features/guildConfig/events/guildCreate'
import { GuildDeleteEvent } from '@/features/guildConfig/events/guildDelete'
import type { Event } from '@/models/event'

export const events: Event[] = [GuildCreateEvent, GuildDeleteEvent]

export { getGuildPrefix }

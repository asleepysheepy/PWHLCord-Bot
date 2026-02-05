import { ConfigCommand } from '@/features/guildConfig/commands/config'
import { getGuildPrefix } from '@/features/guildConfig/db/guildConfig'
import { GuildCreateEvent } from '@/features/guildConfig/events/guildCreate'
import { GuildDeleteEvent } from '@/features/guildConfig/events/guildDelete'
import type { Command } from '@/models/command'
import type { Event } from '@/models/event'

export const events: Event[] = [GuildCreateEvent, GuildDeleteEvent]
export const commands: Command[] = [ConfigCommand]

export { getGuildPrefix }

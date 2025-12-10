import { GuildCreateEvent } from '@/events/guildCreate'
import { GuildDeleteEvent } from '@/events/guildDelete'
import { MessageUpdateEvent } from '@/events/messageUpdate'
import { ReadyEvent } from '@/events/ready'

export const events = [GuildCreateEvent, GuildDeleteEvent, MessageUpdateEvent, ReadyEvent]

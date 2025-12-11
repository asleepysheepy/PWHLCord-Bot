import { MessageCreateEvent } from '@/features/utilities/events/messageCreate'
import { ReadyEvent } from '@/features/utilities/events/ready'
import type { Event } from '@/models/event'

export const events: Event[] = [MessageCreateEvent, ReadyEvent]

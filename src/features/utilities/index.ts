import { MessageCreateEvent } from '@/features/utilities/events/messageCreate'
import type { Event } from '@/models/event'

export const events: Event[] = [MessageCreateEvent]

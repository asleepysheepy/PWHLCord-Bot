import { InteractionCreate } from '@/features/utilities/events/interactionCreate'
import { MessageCreateEvent } from '@/features/utilities/events/messageCreate'
import type { Event } from '@/models/event'

export const events: Event[] = [InteractionCreate, MessageCreateEvent]

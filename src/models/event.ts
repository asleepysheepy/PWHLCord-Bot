import type { ClientEvents } from 'discord.js'

/**
 * Represents an event handler.
 */
export interface Event<EventName extends keyof ClientEvents = keyof ClientEvents> {
  /**
   * The function to execute when the event is emitted.
   *
   * @param parameters - The parameters of the event
   */
  execute(...parameters: ClientEvents[EventName]): Promise<void> | void

  /**
   * The name of the event to listen to
   */
  name: EventName

  /**
   * Whether the event should only be listened to once
   *
   * @defaultValue `false`
   */
  once?: boolean
}

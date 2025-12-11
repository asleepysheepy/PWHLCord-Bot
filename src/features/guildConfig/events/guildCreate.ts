import { Events } from 'discord.js'
import { createGuildConfig } from '@/features/guildConfig/db/guildConfig'
import type { Event } from '@/models/event'

export const GuildCreateEvent: Event = {
  name: Events.GuildCreate,
  execute: async (guild) => {
    await createGuildConfig(guild.id)
  },
} satisfies Event<Events.GuildCreate>

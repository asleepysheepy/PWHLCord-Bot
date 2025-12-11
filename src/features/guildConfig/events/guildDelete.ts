import { Events } from 'discord.js'
import { deleteGuildConfig } from '@/features/guildConfig/db/guildConfig'
import type { Event } from '@/models/event'

export const GuildDeleteEvent: Event = {
  name: Events.GuildDelete,
  execute: async (guild) => {
    await deleteGuildConfig(guild.id)
  },
} satisfies Event<Events.GuildDelete>

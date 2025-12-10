import { EmbedBuilder, Events } from 'discord.js'
import type { Event } from '@/models/event'

const loggingChannelId = '1446301072175005798'

export const MessageUpdateEvent: Event = {
  name: Events.MessageUpdate,
  execute: async (oldMessage, newMessage) => {
    const guild = newMessage?.guild ?? oldMessage?.guild
    if (guild == null) {
      return
    }

    const logChannel = await guild.channels.fetch(loggingChannelId)
    if (logChannel?.isSendable()) {
      const body = `**Before:** ${oldMessage.content}\n---\n**After:** ${newMessage.content}`
      const channel = newMessage.channel

      const message = new EmbedBuilder()
        .setAuthor({
          name: newMessage.author?.globalName ?? '',
          iconURL: newMessage.author?.avatarURL() ?? '',
        })
        .setFooter({ text: `ID: ${newMessage.id}` })
        .setTimestamp()
        .setDescription(body)
        .setColor(0x255b4e)

      if (!channel.isDMBased()) {
        message
          .setTitle(`Message edited in #${channel.name}`)
          .setURL(newMessage.url)
      }

      logChannel.send({ embeds: [message] })
    }
  },
} satisfies Event<Events.MessageUpdate>

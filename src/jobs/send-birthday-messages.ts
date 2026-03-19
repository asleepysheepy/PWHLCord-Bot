import { REST, Routes, userMention } from 'discord.js'
import { prisma } from '@/lib/db'
import { env } from '@/lib/env'
import type { Job } from '@/models/job'

export const SendBirthdayMessagesJob: Job = {
  name: 'sendBirthdayMessages',
  schedule: '0 8 * * * ', // Every day at 0800
  execute: async () => {
    const currentDay = new Date().getDate()
    const currentMonth = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(new Date())

    const restClient = new REST().setToken(env.BOT_TOKEN)

    const guilds = await prisma.guildConfig.findMany({
      where: { birthdaysEnabled: true },
    })

    for (const guild of guilds) {
      if (guild.birthdaysChannel == null) {
        continue
      }

      const birthdays = await prisma.birthday.findMany({
        where: {
          guildId: guild.id,
          birthDay: currentDay,
          birthMonth: currentMonth,
        },
      })

      if (birthdays.length === 0) {
        continue
      }

      const birthdayStrings = birthdays.map((birthday) => `* ${userMention(birthday.userId)}`)
      const message = [
        '# Happy Birthday!!!',
        '🎂 🎉 🎂 💝 🎂 🎉 🎂',
        '\n',
        `**Birthdays for ${currentMonth} ${currentDay}**`,
        birthdayStrings.join('\n'),
        '\n',
        '-# Want your birthday listed too? Use `/birthday add` to add your birthday!',
      ].join('\n')

      restClient.post(Routes.channelMessages(guild.birthdaysChannel), {
        body: { content: message },
      })
    }
  },
}

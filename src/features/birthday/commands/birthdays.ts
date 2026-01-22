import { type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { z } from 'zod'
import { createBirthday, deleteBirthday } from '@/features/birthday/db/birthday'
import { sendGenericErrorReply } from '@/lib/commandHelpers'
import { logger } from '@/lib/logger'
import type { Command } from '@/models/command'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export const BirthdaysCommand = {
  data: new SlashCommandBuilder()
    .setName('birthdays')
    .setDescription('Birthday messages for the whole gang')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('add')
        .setDescription('Add or update your birthday')
        .addStringOption((option) =>
          option
            .setName('month')
            .setDescription('The month of your birthday')
            .setRequired(true)
            .addChoices(months.map((month) => ({ name: month, value: month }))),
        )
        .addIntegerOption((option) =>
          option
            .setName('day')
            .setDescription('The day of the month of your birthday')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('remove').setDescription('Delete your birthday from this server'),
    )
    .toJSON(),

  execute: async (interaction) => {
    const subcommand = interaction.options.getSubcommand(false)
    switch (subcommand) {
      case 'add':
        await add(interaction)
        return
      case 'remove':
        await remove(interaction)
        return
      default:
        await sendGenericErrorReply(interaction)
        throw new Error('Unknown birthday command attempted')
    }
  },
} satisfies Command

async function add(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply()

  const birthdaySchema = z.object({
    guildId: z.string().min(16).max(20),
    userId: z.string().min(16).max(20),
    birthMonth: z.enum(months),
    birthDay: z.int().min(1).max(31),
  })
  const {
    success: parseSuccess,
    data,
    error,
  } = birthdaySchema.safeParse({
    guildId: interaction.guildId,
    userId: interaction.member?.user.id,
    birthMonth: interaction.options.getString('month', true),
    birthDay: interaction.options.getInteger('day', true),
  })

  if (!parseSuccess) {
    logger.info('parse failure')
    logger.info(error)
    await sendGenericErrorReply(interaction)
    return
  }

  const { success } = await createBirthday(data)
  if (!success) {
    await sendGenericErrorReply(interaction)
    return
  }

  await interaction.editReply({
    content: `Set your birthday to ${data.birthMonth} ${data.birthDay}`,
  })
}

async function remove(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply()

  const birthdaySchema = z.object({
    guildId: z.string().min(16).max(20),
    userId: z.string().min(16).max(20),
  })
  const { success: parseSuccess, data } = birthdaySchema.safeParse({
    guildId: interaction.guildId,
    userId: interaction.member?.user.id,
  })

  if (!parseSuccess) {
    await sendGenericErrorReply(interaction)
    return
  }

  const { success } = await deleteBirthday(data)
  if (!success) {
    await sendGenericErrorReply(interaction)
    return
  }

  await interaction.editReply({
    content: 'Your birthday was removed from this server',
  })
}

import {
  type ChatInputCommandInteraction,
  InteractionContextType,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js'
import { sendGenericErrorReply } from '@/lib/command-helpers'
import { prisma } from '@/lib/db'
import { logger } from '@/lib/logger'
import type { Command } from '@/models/command'

const monthLengths = {
  January: 31,
  February: 29,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
} as const

type months = keyof typeof monthLengths

export const BirthdayCommand = {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription('Birthday messages for the whole gang')
    .setContexts(InteractionContextType.Guild)
    .addSubcommand((subcommand) =>
      subcommand
        .setName('add')
        .setDescription('Add or update your birthday')
        .addStringOption((option) =>
          option
            .setName('month')
            .setDescription('The month of your birthday')
            .setRequired(true)
            .addChoices(
              Object.keys(monthLengths).map((month) => ({
                name: month,
                value: month,
              })),
            ),
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
  await interaction.deferReply({ flags: MessageFlags.Ephemeral })

  const guildId = interaction.guildId
  const userId = interaction.user.id
  const birthMonth = interaction.options.getString('month', true) as months
  const birthDay = interaction.options.getInteger('day', true)

  if (guildId == null) {
    await interaction.editReply({
      content: 'This command is only available from servers.',
    })

    return
  }

  if (birthDay > monthLengths[birthMonth]) {
    await interaction.editReply({
      content: 'That appears to be an invalid date. Please verify the date and try again.',
    })

    return
  }

  try {
    const birthday = await prisma.birthday.create({
      data: { guildId, userId, birthMonth, birthDay },
    })

    await interaction.editReply({
      content: `Set your birthday to ${birthday.birthMonth} ${birthday.birthDay}`,
    })
  } catch (error) {
    logger.error('Failed to add a birthday')
    logger.error(error)
    await sendGenericErrorReply(interaction)
  }
}

async function remove(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral })

  const guildId = interaction.guildId
  const userId = interaction.user.id

  if (guildId == null) {
    await interaction.editReply({
      content: 'This command is only available from servers.',
    })

    return
  }

  try {
    await prisma.birthday.delete({
      where: { birthdayId: { guildId, userId } },
    })

    await interaction.editReply({
      content: 'Your birthday was removed from this server',
    })
  } catch (error) {
    logger.error('Failed to add a birthday')
    logger.error(error)
    await sendGenericErrorReply(interaction)
  }
}

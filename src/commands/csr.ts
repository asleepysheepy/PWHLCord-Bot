import { type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import type { Command } from '@/models/command'

const allowedResponses = [
  'After video review, it was determined the puck completely crossed the goal line. We have a good goal.',
  'Upon further review, it was determined that was rad as hell. We have a goal.',
  'After review, it was decided we have a good goal because the crowd said so.',
  "Oh uhhhhhhh. Sure. Let's call it a goal.",
  'My mom said we can call it a goal if your mom agrees.',
]

const disallowedResponses = [
  'After video review, it was determined the puck never crossed the goal line, no goal.',
  'Upon further review, it was determined that was mean to the goalie, no goal',
  'After review, it was decided we have no goal because the crowd said so.',
  'I asked my mom if it was a goal, and she said no.',
  'Upon further review, it has been determined that the goalie has never done anything wrong in their entire life. We have no goal',
]

export const CsrCommand = {
  data: new SlashCommandBuilder()
    .setName('csr')
    .setDescription('Consult the central situation room')
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const responses = Math.random() > 0.5 ? allowedResponses : disallowedResponses
    const response = responses[Math.floor(Math.random() * responses.length)]

    if (interaction.isRepliable()) {
      interaction.reply({ content: response })
    }
  },
} satisfies Command

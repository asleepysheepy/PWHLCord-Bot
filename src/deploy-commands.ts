import { REST, Routes } from 'discord.js'
import { commands } from '@/commands'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'

const commandData = [...commands.values()].map((command) => command.data)

const restClient = new REST().setToken(env.BOT_TOKEN)
let route = Routes.applicationCommands(env.APPLICATION_ID)

if (process.argv.includes('--dev') && env.GUILD_ID != null) {
  route = Routes.applicationGuildCommands(env.APPLICATION_ID, env.GUILD_ID)
}

async function deploy() {
  logger.info('Attempting to deploy commands.')

  try {
    await restClient.put(route, { body: commandData })

    logger.info('Successfully deployed commands.')
  } catch (error) {
    logger.error('Unable to deploy commands.')
    logger.error(error)
  }
}

deploy()

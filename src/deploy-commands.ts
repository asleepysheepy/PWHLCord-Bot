import { REST, Routes } from 'discord.js'
import { commands } from '@/commands'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'

const isDev = process.argv.includes('--dev')
if (isDev && env.GUILD_ID == null) {
  logger.error('Unable to deploy commands to dev server, please provide a GUILD_ID envvar.')
  process.exit()
}

const commandData = [...commands.values()]
  .filter((command) => isDev || !command.devOnly)
  .map((command) => command.data)

const restClient = new REST().setToken(env.BOT_TOKEN)
const route =
  isDev && env.GUILD_ID != null
    ? Routes.applicationGuildCommands(env.APPLICATION_ID, env.GUILD_ID)
    : Routes.applicationCommands(env.APPLICATION_ID)

try {
  logger.info('Attempting to deploy commands.')

  await restClient.put(route, { body: commandData })

  logger.info('Successfully deployed commands.')
} catch (error) {
  logger.error('Unable to deploy commands.')
  logger.error(error)
}

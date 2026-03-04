import { type ClientOptions, Client as DiscordJsClient, GatewayIntentBits } from 'discord.js'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'

const clientOptions: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}

async function startBot() {
  logger.info('Welcome to PWHLCord Bot!')
  logger.info('Starting PWHLCord Bot')

  const client = new DiscordJsClient(clientOptions)

  // Attempt to log in
  try {
    await client.login(env.BOT_TOKEN)
    logger.info('Successfully logged in to Discord.')
  } catch (e) {
    logger.error('Unable to log in to discord.')
    logger.error(e)
    process.exit()
  }
}

try {
  await startBot()
} catch (error) {
  logger.error(error)
}

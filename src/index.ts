import { type ClientOptions, Client as DiscordJsClient, GatewayIntentBits } from 'discord.js'
import { env } from '@/core/env'
import { logger } from '@/core/logger'
import { events as GuildConfigEvents } from '@/features/guildConfig'
import { events as UtilitiesEvents } from '@/features/utilities'

const clientOptions: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}

const events = {
  guildConfig: GuildConfigEvents,
  utilities: UtilitiesEvents,
}

async function startBot() {
  logger.info('Welcome to PWHLCord Bot!')
  logger.info('Starting PWHLCord Bot')

  const client = new DiscordJsClient(clientOptions)

  // Register Events
  Object.entries(events).forEach(([feature, events]) => {
    logger.info(`Registering event handlers for: ${feature}`)

    events.forEach((event) => {
      logger.info(`\t${event.name}`)
      client[event.once ? 'once' : 'on'](event.name, event.execute)
    })
  })

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

startBot().catch((e) => logger.error(e))

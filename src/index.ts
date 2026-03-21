import { Cron } from 'croner'
import { type ClientOptions, Client as DiscordJsClient, GatewayIntentBits } from 'discord.js'
import { events } from '@/events'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'
import { jobs } from './jobs'

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

  // Register Events
  logger.info('Registering Events:')
  events.forEach((event) => {
    logger.info(`\t${event.name}`)
    client[event.once ? 'once' : 'on'](event.name, event.execute)
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

function registerJobs() {
  logger.info('Registering jobs:')

  jobs.forEach((job) => {
    logger.info(`\t${job.name}`)
    new Cron(job.schedule, { name: job.name, timezone: 'America/New_York' }, job.execute)
  })
}

try {
  await startBot()
  registerJobs()
} catch (error) {
  logger.error(error)
}

import {
  type ClientOptions,
  Client as DiscordJsClient,
  GatewayIntentBits,
} from 'discord.js'
import { logger } from '@/core/logger'
import { env } from '@/env'
import { events } from '@/events'

class BotClass {
  static clientOptions: ClientOptions = {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  }

  /**
   * The DiscordJS client instance
   */
  client: DiscordJsClient

  /**
   * Creates a new instance of the Bot.
   */
  constructor() {
    this.client = new DiscordJsClient(BotClass.clientOptions)
  }

  /**
   * The main function that starts the bot.
   */
  async start(): Promise<void> {
    logger.info('Welcome to PWHLCord Bot!')
    logger.info('Starting PWHLCord Bot')

    this.registerEvents()

    try {
      await this.login()
      logger.info('Successfully logged in to Discord.')
    } catch (e) {
      logger.error('Unable to log in to discord.')
      logger.error(e)
      process.exit()
    }
  }

  /**
   * Attempts to log in to Discord using a token provided through the
   * BOT_TOKEN environment variable.
   */
  async login(): Promise<void> {
    await this.client.login(env.BOT_TOKEN)
  }

  /**
   * Checks if the bot client is currently logged into discord
   * and able to make requests against Discord's API.
   *
   * @returns true if the bot is logged in to Discord
   */
  isLoggedIn(): boolean {
    return this.client.isReady()
  }

  /**
   * Registers a list of event handlers with the bot
   */
  registerEvents() {
    events.forEach((event) => {
      logger.info(`registering event handler for: ${event.name}`)
      this.client[event.once ? 'once' : 'on'](event.name, event.execute)
    })
  }
}

export const Bot = new BotClass()

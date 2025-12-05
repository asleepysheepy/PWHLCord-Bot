import { Bot } from '@/core/bot'
import { logger } from '@/core/logger'

Bot.start().catch((e) => logger.error(e))

import { join } from 'node:path'
import pino from 'pino'

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: { colorize: true },
    },
    {
      level: 'info',
      target: 'pino-roll',
      options: {
        file: join('logs', 'log'),
        mkdir: true,
        frequency: 'daily',
        size: '10M',
      },
    },
  ],
})

export const logger = pino(transport)

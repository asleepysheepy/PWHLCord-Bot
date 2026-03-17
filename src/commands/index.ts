import type { Command } from '@/models/command'
import { BirthdayCommand } from './birthday'
import { ConfigCommand } from './config'
import { CsrCommand } from './csr'
import { QotdCommand } from './qotd'
import { TriggerCommand } from './trigger'

export const commands = new Map<string, Command>([
  [BirthdayCommand.data.name, BirthdayCommand],
  [ConfigCommand.data.name, ConfigCommand],
  [CsrCommand.data.name, CsrCommand],
  [QotdCommand.data.name, QotdCommand],
  [TriggerCommand.data.name, TriggerCommand],
])

import { BirthdayCommand } from './birthday'
import { ConfigCommand } from './config'
import { CsrCommand } from './csr'
import { QotdCommand } from './qotd'

export const commands = new Map([
  [BirthdayCommand.data.name, BirthdayCommand],
  [ConfigCommand.data.name, ConfigCommand],
  [CsrCommand.data.name, CsrCommand],
  [QotdCommand.data.name, QotdCommand],
])

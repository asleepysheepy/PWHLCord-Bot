import { CsrCommand } from './csr'
import { QotdCommand } from './qotd'

export const commands = new Map([
  [CsrCommand.data.name, CsrCommand],
  [QotdCommand.data.name, QotdCommand],
])

interface EnvConfig {
  APPLICATION_ID: string
  BOT_TOKEN: string
  DATABASE_URL: string
  GUILD_ID?: string
}

function getEnvVar(key: string): string {
  const value = process.env[key]

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const env: EnvConfig = {
  APPLICATION_ID: getEnvVar('APPLICATION_ID'),
  BOT_TOKEN: getEnvVar('BOT_TOKEN'),
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  GUILD_ID: process.env.GUILD_ID,
}

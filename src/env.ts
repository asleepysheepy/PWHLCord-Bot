interface EnvConfig {
  BOT_TOKEN: string
  DATABASE_URL: string
}

function getEnvVar(key: string): string {
  const value = process.env[key]

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const env: EnvConfig = {
  BOT_TOKEN: getEnvVar('BOT_TOKEN'),
  DATABASE_URL: getEnvVar('DATABASE_URL'),
}

import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/models/schema',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: Ignore in config file
    url: process.env.DATABASE_URL!,
  },
})

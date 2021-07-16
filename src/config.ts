import dotenv from 'dotenv'

// Start dotenv configuration
dotenv.config()

type AppConfig = {
  port: number
  mongo_url: string
  is_ci: boolean
}

const config: AppConfig = {
  port: Number(process.env.PORT ?? 3000),
  mongo_url: process.env.MONGO_URL ?? '',
  is_ci: !!process.env.CI,
}

export default config

import { config as conf } from 'dotenv'

conf()

const config = {
  ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/',
  MONGO_DB: process.env.MONGO_DB || 'db',
  JWT_SECRET: process.env.JWT_SECRET || 'mysecret',
  JWT_RECOVERY_SECRET: process.env.JWT_RECOVERY_SECRET || 'myrecoverysecret',
  EMAIL_SERVER: process.env.EMAIL_SERVER,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_SECURE: process.env.EMAIL_SECURE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS
}

export { config }
import mongoose from 'mongoose'
import { config } from '../config/config.js'

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, {
      dbName: config.MONGO_DB
    })
    console.info('Conexión a la base de datos establecida')
  } catch (e) {
    console.error(e)
  }
}

const closeDB = async () => {
  try {
    await mongoose.disconnect()
    console.info('Conexión a la base de datos cerrada')
  } catch (e) {
    console.error('Error al cerrar la conexión a la base de datos:', e)
  }
}

export { connectDB, closeDB }
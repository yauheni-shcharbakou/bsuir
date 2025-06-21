import { config } from 'dotenv'
import mongoose from 'mongoose'
import { LOCAL_MONGODB_URI, MONGO_SUCCESS } from './constants.js'

config()

export function connect(callback) {
  mongoose.connect(process.env.MONGODB_URI || LOCAL_MONGODB_URI, (err) => {
    if (err) return console.error(`Ошибка монго: ${err.message}`)
    console.log(MONGO_SUCCESS)
    callback()
  })
}

import mongoose from 'mongoose'

const connectMongo = async () => {
  try {
    mongoose.set('strictQuery', true)
    // eslint-disable-next-line no-undef
    const { connection } = await mongoose.connect(process.env.MONGO_URI)
    if (connection.readyState == 1) {
      console.log('Mongo Database connected!')
      return Promise.resolve(true)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export default connectMongo

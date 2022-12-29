import connectMongo from '../../../database/connect'

export default async function handler(req, res) {
  connectMongo().catch((error) => console.log(error))
  if (req.method === 'GET') {
    res.status(200).json({ name: 'andré' })
  }
}

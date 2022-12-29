import connectMongo from '../../../../database/connect'
import { putUsers, deleteUsers, getUser } from '../../../../database/controller'

export default async function handler(req, res) {
  connectMongo().catch((error) => {
    res.status(405).json({
      error: `error connection: ${error}`
    })
  })
  //type Request
  const { method } = req

  switch (method) {
    case 'GET':
      getUser(req, res)
      break
    case 'PUT':
      putUsers(req, res)
      break
    case 'DELETE':
      deleteUsers(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}

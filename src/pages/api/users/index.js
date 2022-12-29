import connectMongo from '../../../../database/connect'
import {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers
} from '../../../../database/controller'

export default async function handler(req, res) {
  connectMongo().catch((error) => {
    res.status(405).json({
      error: `error connection: ${error}`
    })
  })

  const { method } = req
  switch (method) {
    case 'GET':
      getUsers(req, res)
      // res.status(200).json({ method, name: 'GET Request' })
      break
    case 'POST':
      postUsers(req, res)
      // res.status(200).json({ method, name: 'POST Request' })
      break
    case 'PUT':
      putUsers(req, res)
      // res.status(200).json({ method, name: 'PUT Request' })
      break
    case 'DELETE':
      deleteUsers(req, res)
      // res.status(200).json({ method, name: 'DELETE Request' })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}

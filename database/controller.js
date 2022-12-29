import Users from '../models/user'

//GET Controller : http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({})
    if (!users) {
      return res.status(404).json({ error: 'Data not Found' })
    }
    res.status(200).json({ user: users })
  } catch (error) {
    return res
      .status(404)
      .json({ error: `Error while Fetching Data: ${error}` })
  }
}

//GET User
export async function getUser(req, res) {
  try {
    const { userId } = req.query
    if (userId) {
      const user = await Users.findById(userId)
      return res.status(200).json({ user })
    }
    return res.status(404).json({ error: 'User Not selected..!' })
  } catch (error) {
    return res.status(404).json({ error: 'Cannot get the User...!' })
  }
}

//POST Controller : http://localhost:3000/api/users
export async function postUsers(req, res) {
  try {
    const formData = req.body
    if (!formData) {
      return res.status(404).json({ error: 'Form Data not Provided!' })
    }

    Users.create(formData, (error, data) => {
      return res.status(200).json({ data })
    })
  } catch (error) {
    return res
      .status(404)
      .json({ error: `Error while Fetching Data: ${error}` })
  }
}

//PUT Controller : http://localhost:3000/api/users
export async function putUsers(req, res) {
  try {
    const { userId } = req.query
    const formData = req.body
    if (userId && formData) {
      await Users.findByIdAndUpdate(userId, formData)
      return res.status(200).json(formData)
    }
    return res.status(404).json({ error: 'User not Selected..!' })
  } catch (error) {
    return res
      .status(404)
      .json({ error: `Error while updating Data: ${error}` })
  }
}

//DELETE Controller : http://localhost:3000/api/users
export async function deleteUsers(req, res) {
  try {
    const { userId } = req.query
    if (userId) {
      const user = await Users.findByIdAndDelete(userId)
      return res.status(200).json({ deleted: user })
    }
    return res.status(404).json({ error: 'User not selected..!' })
  } catch (error) {
    return res
      .status(404)
      .json({ error: `Error while Deleting User: ${error}` })
  }
}

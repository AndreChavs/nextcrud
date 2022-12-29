const url = 'http://localhost:3000'
//all users
export const getUsers = async () => {
  const response = await fetch(`${url}/api/users`)
  const json = await response.json()
  return json
}

//Single User
export const getUser = async (userId) => {
  const response = await fetch(`${url}/api/users/${userId}`)
  const json = await response.json()
  if (json) return json
  return {}
}

//posting a new user
export async function addUser(formData) {
  try {
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
    const response = await fetch(`${url}/api/users`, Options)
    const json = await response.json()
    return json
  } catch (error) {
    return error
  }
}

//updating a user
export async function updateUser(userId, formData) {
  const Options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }
  const response = await fetch(`${url}/api/users/${userId}`, Options)
  const json = await response.json()
  return json
}

//Delete a user
export async function deleteUser(userId) {
  const Options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(`${url}/api/users/${userId}`, Options)
  const json = await response.json()
  return json
}

import { useReducer } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { addUser, getUsers } from '../../lib/helper'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
}
const Form = () => {
  const [formData, setFormData] = useReducer(formReducer, {})
  const queryClient = useQueryClient()
  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery('users', getUsers)
      console.log('Data Inserted')
    }
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    if (Object.keys(formData).length === 0) {
      return alert("Don't have form data")
    }
    let { firstname, lastname, email, salary, date, status } = formData
    const model = {
      name: `${firstname} ${lastname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 10
      )}.jpg`,
      email,
      salary,
      date,
      status: status ?? 'Active'
    }

    addMutation.mutate(model)
  }

  if (addMutation.isLoading) return <div>Loading...!</div>
  if (addMutation.isError) return <div>Error!{addMutation.error.message}</div>
  if (addMutation.isSuccess) return <div>Sucesso!</div>

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="First Name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Last Name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          name="salary"
          id="salary"
          placeholder="Salário"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          name="data"
          id="data"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>

      <div>
        <div className="form-check">
          <input
            type="radio"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            value="active"
            id="radioDefault1"
            onChange={setFormData}
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            value="active"
            id="radioDefault2"
            onChange={setFormData}
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>

      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border roudend-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add
      </button>
    </form>
  )
}

export default Form

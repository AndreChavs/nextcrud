import { BiEdit, BiTrashAlt } from 'react-icons/bi'
import { getUsers } from '../../lib/helper'
import { useQuery } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, deleteAction } from '../../redux/reducer'

const Table = () => {
  const { isLoading, isError, data, error } = useQuery('users', getUsers)
  const { user } = { ...data }

  if (isLoading) return <div>Employee is Loading</div>
  if (isError) return <div>Got Error {error}</div>

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data &&
          user.map((dado, index) => {
            return <TR {...dado} key={index} />
          })}
      </tbody>
    </table>
  )
}

function TR({ _id, name, avatar, email, salary, date, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm)
  const dispatch = useDispatch()
  function onUpdate() {
    dispatch(toggleChangeAction())
    console.log(visible)
  }

  function onDelete() {
    if (visible) {
      dispatch(deleteAction(_id))
    }
  }

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          src={avatar || '#'}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-center ml-2 font-semibold">
          {name || 'Unknown'}
        </span>
      </td>
      <td className="px-16 py-2">
        <span className="text-center ml-2 font-semibold">
          {email || 'Unknown'}
        </span>
      </td>
      <td className="px-16 py-2">
        <span className="text-center ml-2 font-semibold">
          {salary || 'Unknown'}
        </span>
      </td>
      <td className="px-16 py-2">
        <span className="text-center ml-2 font-semibold">
          {date || 'Unknown'}
        </span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor">
          <span className="bg-green-500 text-white px-5 py-1 rounded-xl">
            {status || 'Unknown'}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={'rgb(34,197,94)'} />
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={25} color={'rgb(244,63,94)'} />
        </button>
      </td>
    </tr>
  )
}
export default Table

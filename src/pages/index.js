import React from 'react'
import { BiUserPlus } from 'react-icons/bi'
import Table from '../components/Table'
import Form from '../components/Form'
import { deleteUser, getUsers } from '../../lib/helper'
import { useSelector, useDispatch } from 'react-redux'
import { useQueryClient } from 'react-query'
import { deleteAction } from '../../redux/reducer'

export default function Home() {
  const [visible, setVisible] = React.useState(false)
  const deleteId = useSelector((state) => state.app.client.deleteId)
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  function handleClick() {
    setVisible(!visible)
  }
  async function deletehandler() {
    if (deleteId) {
      await deleteUser()
      await queryClient.prefetchQuery('users', getUsers)
      await dispatch(deleteAction(null))
    }
  }
  async function cancelhandler() {
    console.log('Cancel')
    await dispatch(deleteAction(null))
  }
  return (
    <>
      <section>
        <main className="py-5">
          <h1 className="text-xl md:text-5xl text-center font-bold py-10">
            Employee Management
          </h1>
          <div className="container mx-auto flex justify-between py-5 border-b">
            <div className="left flex gap-3">
              <button
                className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-500"
                onClick={handleClick}
              >
                Add Employee
                <span className="px-1">
                  <BiUserPlus size={15} />
                </span>
              </button>
            </div>
            {deleteId ? DeleteComponent(deletehandler, cancelhandler) : <></>}
          </div>
          {/* collapsable form */}
          <div className="container mx-auto">{visible ? <Form /> : null}</div>
          {/* table */}
          <div className="container mx-auto">
            <Table></Table>
          </div>
        </main>
      </section>
    </>
  )
}

function DeleteComponent({ deleteHandler, cancelHandler }) {
  return (
    <div className="flex gap-5">
      <p>Are you sure?</p>
      <button
        onClick={deleteHandler}
        className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes
      </button>
      <button
        onClick={cancelHandler}
        className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-green-400 hover:text-gray-50"
      >
        No
      </button>
    </div>
  )
}

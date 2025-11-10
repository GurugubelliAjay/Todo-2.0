import React, { useEffect } from 'react'
import useAuth from '../stores/authStore'
import useTodos from '../stores/todoStore'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'
import { useNavigate } from 'react-router-dom'

export default function Todos() {
  const { user } = useAuth();
  const { todos, loadTodos, loading } = useTodos();
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return navigate('/login');
    loadTodos();
  }, [user])

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
      <TodoForm />
      {loading ? <p>Loading...</p> : (
        <ul className="mt-4 space-y-2">
          {todos.length === 0 ? <p className="text-sm text-gray-500">No todos yet</p> :
            todos.map(t => <TodoItem key={t._id} todo={t} />)
          }
        </ul>
      )}
    </div>
  )
}

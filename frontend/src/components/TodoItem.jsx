import React from 'react'
import useTodos from '../stores/todoStore'

export default function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo } = useTodos()

  return (
    <li className="flex items-center justify-between p-3 border rounded">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo._id, e.target.checked)} />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.text}</span>
      </div>
      <button onClick={() => deleteTodo(todo._id)} className="text-sm text-red-600">Delete</button>
    </li>
  )
}

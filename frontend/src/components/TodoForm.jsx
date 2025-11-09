import React, { useState } from 'react'
import useTodos from '../stores/todoStore'

export default function TodoForm() {
  const [text, setText] = useState('')
  const { addTodo } = useTodos()

  const submit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await addTodo(text.trim())
    setText('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add todo..." className="flex-1 p-2 border rounded" />
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
    </form>
  )
}

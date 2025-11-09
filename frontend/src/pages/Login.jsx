import React, { useState } from 'react'
import useAuth from '../stores/authStore'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const res = await login(email, password)
    if (res.ok) navigate('/todos')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">{loading ? 'Loading...' : 'Login'}</button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  )
}

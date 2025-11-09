import Todos from './pages/Todos'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import useAuth from './stores/authStore'

export default function App() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-lg">TodoApp</Link>
          <nav className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login" className="text-sm text-blue-600">Login</Link>
                <Link to="/register" className="text-sm text-blue-600">Register</Link>
              </>
            ) : (
              <>
                <span className="text-sm">Hi, {user.name}</span>
                <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Logout</button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={user ? <Todos /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={user ? <Todos /> : <Login />} />
        </Routes>
      </main>
    </div>
  )
}

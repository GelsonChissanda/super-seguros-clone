import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Shield } from 'lucide-react'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const { error } = await signIn(form.email, form.password)
    if (error) {
      setErro('Email ou password incorrectos.')
    } else {
      navigate('/admin/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Shield size={40} className="text-blue-700 mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">Área Admin</h1>
          <p className="text-gray-500 text-sm">Super Seguros</p>
        </div>

        {erro && (
          <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 mb-4 text-sm">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white py-3 rounded-full font-bold hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? 'A entrar...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
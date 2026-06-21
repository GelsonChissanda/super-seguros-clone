import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Shield, FileText, Users, MessageSquare, LogOut, LayoutDashboard } from 'lucide-react'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ seguros: 0, noticias: 0, parceiros: 0, cotacoes: 0 })

  useEffect(() => {
    if (!user) { navigate('/admin/login'); return }
    async function fetchStats() {
      const [s, n, p, c] = await Promise.all([
        supabase.from('seguros').select('id', { count: 'exact', head: true }),
        supabase.from('noticias').select('id', { count: 'exact', head: true }),
        supabase.from('parceiros').select('id', { count: 'exact', head: true }),
        supabase.from('cotacoes').select('id', { count: 'exact', head: true }),
      ])
      setStats({ seguros: s.count || 0, noticias: n.count || 0, parceiros: p.count || 0, cotacoes: c.count || 0 })
    }
    fetchStats()
  }, [user])

  async function handleLogout() {
    await signOut()
    navigate('/admin/login')
  }

  const cards = [
    { label: 'Seguros', value: stats.seguros, icon: <Shield size={24} />, path: '/admin/seguros' },
    { label: 'Notícias', value: stats.noticias, icon: <FileText size={24} />, path: '/admin/noticias' },
    { label: 'Parceiros', value: stats.parceiros, icon: <Users size={24} />, path: '/admin/parceiros' },
    { label: 'Cotações', value: stats.cotacoes, icon: <MessageSquare size={24} />, path: '/admin/cotacoes' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6 flex items-center gap-2 font-bold text-xl border-b border-blue-600">
          <Shield size={24} /> Super Seguros
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/seguros" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium">
            <Shield size={18} /> Seguros
          </Link>
          <Link to="/admin/noticias" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium">
            <FileText size={18} /> Notícias
          </Link>
          <Link to="/admin/parceiros" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium">
            <Users size={18} /> Parceiros
          </Link>
          <Link to="/admin/cotacoes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium">
            <MessageSquare size={18} /> Cotações
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-8 py-4 hover:bg-blue-600 transition text-sm border-t border-blue-600"
        >
          <LogOut size={18} /> Sair
        </button>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-10">Bem-vindo, {user?.email}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <Link key={i} to={c.path} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="text-blue-700 mb-4">{c.icon}</div>
              <p className="text-3xl font-bold text-gray-800">{c.value}</p>
              <p className="text-gray-500 mt-1">{c.label}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
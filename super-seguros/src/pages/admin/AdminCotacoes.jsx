import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Shield, FileText, Users, MessageSquare, LayoutDashboard, LogOut, Trash2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function Sidebar() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  async function handleLogout() { await signOut(); navigate('/admin/login') }
  return (
    <aside className="w-64 bg-blue-700 text-white flex flex-col">
      <div className="p-6 flex items-center gap-2 font-bold text-xl border-b border-blue-600">
        <Shield size={24} /> Super Seguros
      </div>
      <nav className="flex flex-col gap-1 p-4 flex-1">
        <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><LayoutDashboard size={18} /> Dashboard</Link>
        <Link to="/admin/seguros" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><Shield size={18} /> Seguros</Link>
        <Link to="/admin/noticias" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><FileText size={18} /> Notícias</Link>
        <Link to="/admin/parceiros" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><Users size={18} /> Parceiros</Link>
        <Link to="/admin/cotacoes" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 font-medium"><MessageSquare size={18} /> Cotações</Link>
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-8 py-4 hover:bg-blue-600 transition text-sm border-t border-blue-600">
        <LogOut size={18} /> Sair
      </button>
    </aside>
  )
}

export default function AdminCotacoes() {
  const [cotacoes, setCotacoes] = useState([])

  async function fetchCotacoes() {
    const { data } = await supabase
      .from('cotacoes')
      .select('*, seguros(nome)')
      .order('created_at', { ascending: false })
    setCotacoes(data || [])
  }

  useEffect(() => { fetchCotacoes() }, [])

  async function handleDelete(id) {
    if (!confirm('Tens a certeza?')) return
    await supabase.from('cotacoes').delete().eq('id', id)
    await fetchCotacoes()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Cotações recebidas</h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Telefone</th>
                <th className="px-6 py-4 text-left">Seguro</th>
                <th className="px-6 py-4 text-left">Data</th>
                <th className="px-6 py-4 text-left">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cotacoes.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{c.nome}</td>
                  <td className="px-6 py-4 text-gray-500">{c.email}</td>
                  <td className="px-6 py-4 text-gray-500">{c.telefone || '—'}</td>
                  <td className="px-6 py-4 text-gray-500">{c.seguros?.nome || '—'}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(c.created_at).toLocaleDateString('pt-PT')}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:underline flex items-center gap-1"><Trash2 size={15} /> Apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
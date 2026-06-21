import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Shield, FileText, Users, MessageSquare, LayoutDashboard, LogOut, Pencil, Trash2, Plus, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import ImageUpload from '../../components/ui/ImageUpload'

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
        <Link to="/admin/parceiros" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 font-medium"><Users size={18} /> Parceiros</Link>
        <Link to="/admin/cotacoes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><MessageSquare size={18} /> Cotações</Link>
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-8 py-4 hover:bg-blue-600 transition text-sm border-t border-blue-600">
        <LogOut size={18} /> Sair
      </button>
    </aside>
  )
}

const formVazio = { nome: '', logo_url: '', website: '' }

export default function AdminParceiros() {
  const [parceiros, setParceiros] = useState([])
  const [form, setForm] = useState(formVazio)
  const [editId, setEditId] = useState(null)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)

  async function fetchParceiros() {
    const { data } = await supabase.from('parceiros').select('*').order('created_at')
    setParceiros(data || [])
  }

  useEffect(() => { fetchParceiros() }, [])

  function abrirModal(parceiro = null) {
    if (parceiro) { setForm(parceiro); setEditId(parceiro.id) }
    else { setForm(formVazio); setEditId(null) }
    setModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if (editId) {
      await supabase.from('parceiros').update(form).eq('id', editId)
    } else {
      await supabase.from('parceiros').insert(form)
    }
    await fetchParceiros()
    setModal(false)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Tens a certeza?')) return
    await supabase.from('parceiros').delete().eq('id', id)
    await fetchParceiros()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Parceiros</h1>
          <button onClick={() => abrirModal()} className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-800 transition">
            <Plus size={18} /> Novo Parceiro
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">Website</th>
                <th className="px-6 py-4 text-left">Logo</th>
                <th className="px-6 py-4 text-left">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parceiros.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{p.nome}</td>
                  <td className="px-6 py-4 text-gray-500">{p.website || '—'}</td>
                  <td className="px-6 py-4">
                    {p.logo_url ? <img src={p.logo_url} alt={p.nome} className="h-8 object-contain" /> : '—'}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => abrirModal(p)} className="text-blue-700 hover:underline flex items-center gap-1"><Pencil size={15} /> Editar</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline flex items-center gap-1"><Trash2 size={15} /> Apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">{editId ? 'Editar Parceiro' : 'Novo Parceiro'}</h2>
              <button onClick={() => setModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Nome" required value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700" />
<ImageUpload value={form.logo_url || ''} onChange={url => setForm({ ...form, logo_url: url })} />              <input type="text" placeholder="Website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700" />
              <button type="submit" disabled={loading} className="bg-blue-700 text-white py-3 rounded-full font-bold hover:bg-blue-800 transition disabled:opacity-50">
                {loading ? 'A guardar...' : 'Guardar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
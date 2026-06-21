import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Shield, FileText, Users, MessageSquare, LayoutDashboard, LogOut, Pencil, Trash2, Plus, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../../components/ui/ImageUpload'

const icones = ['car', 'heart', 'home', 'plane', 'shield']

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
        <Link to="/admin/seguros" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 font-medium"><Shield size={18} /> Seguros</Link>
        <Link to="/admin/noticias" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><FileText size={18} /> Notícias</Link>
        <Link to="/admin/parceiros" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><Users size={18} /> Parceiros</Link>
        <Link to="/admin/cotacoes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><MessageSquare size={18} /> Cotações</Link>
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-8 py-4 hover:bg-blue-600 transition text-sm border-t border-blue-600">
        <LogOut size={18} /> Sair
      </button>
    </aside>
  )
}

const formVazio = { nome: '', descricao: '', icone: 'car', preco_base: '', destaque: false }

export default function AdminSeguros() {
  const [seguros, setSeguros] = useState([])
  const [form, setForm] = useState(formVazio)
  const [editId, setEditId] = useState(null)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)

  async function fetchSeguros() {
    const { data } = await supabase.from('seguros').select('*').order('created_at')
    setSeguros(data || [])
  }

  useEffect(() => { fetchSeguros() }, [])

  function abrirModal(seguro = null) {
    if (seguro) { setForm(seguro); setEditId(seguro.id) }
    else { setForm(formVazio); setEditId(null) }
    setModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, preco_base: Number(form.preco_base) }
    if (editId) {
      await supabase.from('seguros').update(payload).eq('id', editId)
    } else {
      await supabase.from('seguros').insert(payload)
    }
    await fetchSeguros()
    setModal(false)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Tens a certeza?')) return
    await supabase.from('seguros').delete().eq('id', id)
    await fetchSeguros()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Seguros</h1>
          <button onClick={() => abrirModal()} className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-800 transition">
            <Plus size={18} /> Novo Seguro
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">Ícone</th>
                <th className="px-6 py-4 text-left">Preço Base</th>
                <th className="px-6 py-4 text-left">Destaque</th>
                <th className="px-6 py-4 text-left">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {seguros.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{s.nome}</td>
                  <td className="px-6 py-4 text-gray-500">{s.icone}</td>
                  <td className="px-6 py-4 text-gray-500">{s.preco_base?.toLocaleString()} Kz</td>
                  <td className="px-6 py-4">{s.destaque ? '✅' : '—'}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => abrirModal(s)} className="text-blue-700 hover:underline flex items-center gap-1"><Pencil size={15} /> Editar</button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:underline flex items-center gap-1"><Trash2 size={15} /> Apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">{editId ? 'Editar Seguro' : 'Novo Seguro'}</h2>
              <button onClick={() => setModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Nome" required value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700" />
              <textarea placeholder="Descrição" rows={3} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700 resize-none" />
              <select value={form.icone} onChange={e => setForm({ ...form, icone: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700">
                {icones.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <ImageUpload value={form.imagem_url || ''} onChange={url => setForm({ ...form, imagem_url: url })} />
              <input type="number" placeholder="Preço base (Kz)" value={form.preco_base} onChange={e => setForm({ ...form, preco_base: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700" />
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.destaque} onChange={e => setForm({ ...form, destaque: e.target.checked })} />
                Em destaque
              </label>
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
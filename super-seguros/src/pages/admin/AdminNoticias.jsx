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
        <Link to="/admin/noticias" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 font-medium"><FileText size={18} /> Notícias</Link>
        <Link to="/admin/parceiros" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><Users size={18} /> Parceiros</Link>
        <Link to="/admin/cotacoes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"><MessageSquare size={18} /> Cotações</Link>
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-8 py-4 hover:bg-blue-600 transition text-sm border-t border-blue-600">
        <LogOut size={18} /> Sair
      </button>
    </aside>
  )
}

const formVazio = { titulo: '', conteudo: '', imagem_url: '', publicado: true }

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState([])
  const [form, setForm] = useState(formVazio)
  const [editId, setEditId] = useState(null)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)

  async function fetchNoticias() {
    const { data } = await supabase.from('noticias').select('*').order('created_at', { ascending: false })
    setNoticias(data || [])
  }

  useEffect(() => { fetchNoticias() }, [])

  function abrirModal(noticia = null) {
    if (noticia) { setForm(noticia); setEditId(noticia.id) }
    else { setForm(formVazio); setEditId(null) }
    setModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if (editId) {
      await supabase.from('noticias').update(form).eq('id', editId)
    } else {
      await supabase.from('noticias').insert(form)
    }
    await fetchNoticias()
    setModal(false)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Tens a certeza?')) return
    await supabase.from('noticias').delete().eq('id', id)
    await fetchNoticias()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Notícias</h1>
          <button onClick={() => abrirModal()} className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-800 transition">
            <Plus size={18} /> Nova Notícia
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Título</th>
                <th className="px-6 py-4 text-left">Publicado</th>
                <th className="px-6 py-4 text-left">Data</th>
                <th className="px-6 py-4 text-left">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {noticias.map(n => (
                <tr key={n.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{n.titulo}</td>
                  <td className="px-6 py-4">{n.publicado ? '✅' : '—'}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(n.created_at).toLocaleDateString('pt-PT')}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => abrirModal(n)} className="text-blue-700 hover:underline flex items-center gap-1"><Pencil size={15} /> Editar</button>
                    <button onClick={() => handleDelete(n.id)} className="text-red-500 hover:underline flex items-center gap-1"><Trash2 size={15} /> Apagar</button>
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
              <h2 className="text-xl font-bold text-gray-800">{editId ? 'Editar Notícia' : 'Nova Notícia'}</h2>
              <button onClick={() => setModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Título" required value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700" />
              <textarea placeholder="Conteúdo" rows={4} value={form.conteudo} onChange={e => setForm({ ...form, conteudo: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700 resize-none" />
<ImageUpload value={form.imagem_url || ''} onChange={url => setForm({ ...form, imagem_url: url })} />              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.publicado} onChange={e => setForm({ ...form, publicado: e.target.checked })} />
                Publicado
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
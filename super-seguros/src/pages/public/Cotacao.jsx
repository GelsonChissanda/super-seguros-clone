import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Cotacao() {
  const [searchParams] = useSearchParams()
  const [seguros, setSeguros] = useState([])
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    seguro_id: searchParams.get('seguro') || '',
    mensagem: '',
  })
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    supabase.from('seguros').select('id, nome').then(({ data }) => setSeguros(data || []))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('cotacoes').insert(form)
    if (!error) setSucesso(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Pedir Cotação</h1>
        <p className="text-center text-gray-500 mb-10">Preencha o formulário e entraremos em contacto em breve.</p>

        {sucesso ? (
          <div className="bg-green-50 text-green-700 rounded-2xl p-10 text-center font-semibold text-lg">
            Pedido enviado com sucesso! A nossa equipa entrará em contacto em breve.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome completo"
              required
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700"
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={form.telefone}
              onChange={e => setForm({ ...form, telefone: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700"
            />
            <select
              value={form.seguro_id}
              onChange={e => setForm({ ...form, seguro_id: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700 text-gray-600"
            >
              <option value="">Seleccionar seguro</option>
              {seguros.map(s => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </select>
            <textarea
              placeholder="Mensagem (opcional)"
              rows={4}
              value={form.mensagem}
              onChange={e => setForm({ ...form, mensagem: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700 resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 text-white py-3 rounded-full font-bold hover:bg-blue-800 transition disabled:opacity-50"
            >
              {loading ? 'A enviar...' : 'Enviar pedido'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
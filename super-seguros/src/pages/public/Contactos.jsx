import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Contactos() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('contactos').insert(form)
    if (!error) setSucesso(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      <section className="bg-blue-700 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactos</h1>
        <p className="text-blue-100 text-xl">Estamos aqui para ajudar.</p>
      </section>

      <section className="py-20 px-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Fale connosco</h2>
          <ul className="flex flex-col gap-4 text-gray-600">
            <li className="flex items-center gap-3"><Phone size={20} className="text-blue-700" /> +244 900 000 000</li>
            <li className="flex items-center gap-3"><Mail size={20} className="text-blue-700" /> geral@superseguros.ao</li>
            <li className="flex items-center gap-3"><MapPin size={20} className="text-blue-700" /> Luanda, Angola</li>
          </ul>
        </div>

        {/* Formulário */}
        <div>
          {sucesso ? (
            <div className="bg-green-50 text-green-700 rounded-2xl p-8 text-center font-semibold">
              Mensagem enviada com sucesso! Entraremos em contacto em breve.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome"
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
              <textarea
                placeholder="Mensagem"
                required
                rows={5}
                value={form.mensagem}
                onChange={e => setForm({ ...form, mensagem: e.target.value })}
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-700 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-700 text-white py-3 rounded-full font-bold hover:bg-blue-800 transition disabled:opacity-50"
              >
                {loading ? 'A enviar...' : 'Enviar mensagem'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
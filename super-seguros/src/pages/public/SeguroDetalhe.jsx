import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Car, Heart, Home as HomeIcon, Plane, Shield, ArrowLeft } from 'lucide-react'

const icones = {
  car: <Car size={48} />,
  heart: <Heart size={48} />,
  home: <HomeIcon size={48} />,
  plane: <Plane size={48} />,
}

export default function SeguroDetalhe() {
  const { id } = useParams()
  const [seguro, setSeguro] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('seguros').select('*').eq('id', id).single()
      setSeguro(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  if (loading) return <p className="text-center mt-20 text-gray-400">A carregar...</p>
  if (!seguro) return <p className="text-center mt-20 text-gray-400">Seguro não encontrado.</p>

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/seguros" className="inline-flex items-center gap-2 text-blue-700 font-semibold mb-8 hover:underline">
          <ArrowLeft size={18} /> Voltar aos seguros
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-10">
          <div className="text-blue-700 mb-6">
            {icones[seguro.icone] || <Shield size={48} />}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{seguro.nome}</h1>
          <p className="text-gray-500 text-lg mb-6">{seguro.descricao}</p>

          {seguro.preco_base && (
            <div className="bg-blue-50 rounded-xl p-4 mb-8 inline-block">
              <p className="text-blue-700 font-bold text-xl">
                A partir de {seguro.preco_base.toLocaleString()} Kz/mês
              </p>
            </div>
          )}

          <Link
            to={`/cotacao?seguro=${seguro.id}`}
            className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition inline-block"
          >
            Pedir Cotação
          </Link>
        </div>
      </div>
    </div>
  )
}
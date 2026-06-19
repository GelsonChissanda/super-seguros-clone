import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Car, Heart, Home as HomeIcon, Plane, Shield, ArrowRight } from 'lucide-react'

const icones = {
  car: <Car size={32} />,
  heart: <Heart size={32} />,
  home: <HomeIcon size={32} />,
  plane: <Plane size={32} />,
}

export default function Seguros() {
  const [seguros, setSeguros] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('seguros').select('*').order('created_at')
      setSeguros(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <div className="py-20 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Os nossos Seguros</h1>
        <p className="text-center text-gray-500 mb-12">Escolha o seguro ideal para si</p>

        {loading ? (
          <p className="text-center text-gray-400">A carregar...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seguros.map(s => (
              <div key={s.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
                <div className="text-blue-700 mb-4">
                  {icones[s.icone] || <Shield size={32} />}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{s.nome}</h3>
                <p className="text-gray-500 text-sm flex-1">{s.descricao}</p>
                {s.preco_base && (
                  <p className="text-blue-700 font-semibold mt-4">
                    A partir de {s.preco_base.toLocaleString()} Kz/mês
                  </p>
                )}
                <Link
                  to={`/seguros/${s.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline"
                >
                  Ver detalhes <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
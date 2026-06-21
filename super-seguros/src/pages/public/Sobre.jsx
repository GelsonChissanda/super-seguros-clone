import { Shield, Target, Eye, Users } from 'lucide-react'

const valores = [
  { icon: <Shield size={28} />, titulo: 'Confiança', desc: 'Construímos relações duradouras com os nossos clientes.' },
  { icon: <Target size={28} />, titulo: 'Compromisso', desc: 'Cumprimos sempre o que prometemos.' },
  { icon: <Eye size={28} />, titulo: 'Transparência', desc: 'Sem letras pequenas. Sem surpresas.' },
  { icon: <Users size={28} />, titulo: 'Proximidade', desc: 'Estamos sempre disponíveis para si.' },
]

export default function Sobre() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-blue-700 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nós</h1>
        <p className="text-blue-100 text-xl max-w-2xl mx-auto">
          Somos uma seguradora angolana com missão de proteger pessoas e empresas.
        </p>
      </section>

      {/* Missão */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">A nossa missão</h2>
            <p className="text-gray-500 leading-relaxed">
              Oferecer soluções de seguros acessíveis e de qualidade a todos os angolanos,
              garantindo paz de espírito e segurança financeira em momentos difíceis.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">A nossa visão</h2>
            <p className="text-gray-500 leading-relaxed">
              Ser a seguradora de referência em Angola, reconhecida pela excelência no serviço
              e pela proximidade com os nossos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Os nossos valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-blue-700 flex justify-center mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{v.titulo}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
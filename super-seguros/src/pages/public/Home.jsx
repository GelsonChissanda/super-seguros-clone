import { Link } from 'react-router-dom'
import { Shield, Car, Heart, Home as HomeIcon, Plane, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'


import img1 from '../../assets/slide/00.png'
import img2 from '../../assets/slide/111.png'
import img3 from '../../assets/slide/333.png'
import img4 from '../../assets/slide/444.png'
import img5 from '../../assets/slide/555.png'
import img6 from '../../assets/slide/666.png'
import img7 from '../../assets/slide/7.png'

const imagens = [img1, img2, img3, img4, img5, img6, img7];




const seguros = [
  { icon: <Car size={32} />, nome: 'Seguro Automóvel', desc: 'Proteja o seu veículo contra acidentes e roubos.' },
  { icon: <Heart size={32} />, nome: 'Seguro de Saúde', desc: 'Cuidados médicos para si e a sua família.' },
  { icon: <HomeIcon size={32} />, nome: 'Seguro Habitação', desc: 'Proteja a sua casa e os seus bens.' },
  { icon: <Plane size={32} />, nome: 'Seguro de Viagem', desc: 'Viaje com tranquilidade para qualquer destino.' },
]

export default function Home() {

  const [atual, setAtual] = useState(0);

   useEffect(() => {
  const timer = setInterval(() => {
    setAtual((prev) => (prev + 1) % imagens.length);
  }, 3000);
  return () => clearInterval(timer);
}, []);  


  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundImage: `url(${imagens[atual]})` }}
        className="bg-cover bg-center relative text-white py-24 px-4 h-130 ">
        <div className="max-w-4xl mx-auto text-center absolute bottom-15 left-0 right-0 ">
          
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cotacao"
              className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition"
            >
              Pedir Cotação
            </Link>
            <Link
              to="/seguros"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition"
            >
              Ver Seguros
            </Link>
          </div>
        </div>
      </section>

      {/* Seguros em destaque */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Os nossos seguros</h2>
          <p className="text-center text-gray-500 mb-12">Soluções para cada momento da sua vida</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seguros.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center">
                <div className="text-blue-700 flex justify-center mb-4">{s.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{s.nome}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/seguros" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline">
              Ver todos os seguros <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para se proteger?</h2>
        <p className="text-blue-100 mb-8 text-lg">Peça uma cotação gratuita hoje mesmo.</p>
        <Link
          to="/cotacao"
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition"
        >
          Pedir Cotação Grátis
        </Link>
      </section>
    </div>
  )
}
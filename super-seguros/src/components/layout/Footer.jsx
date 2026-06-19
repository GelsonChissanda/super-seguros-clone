import { Link } from 'react-router-dom'
import { Shield, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Coluna 1 — Logo */}
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
            <Shield size={24} />
            Super Seguros
          </div>
          <p className="text-sm leading-relaxed">
            A sua segurança é a nossa prioridade. Oferecemos as melhores soluções de seguros em Angola.
          </p>
        </div>

        {/* Coluna 2 — Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Links Úteis</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Início</Link></li>
            <li><Link to="/seguros" className="hover:text-white transition">Seguros</Link></li>
            <li><Link to="/sobre" className="hover:text-white transition">Sobre Nós</Link></li>
            <li><Link to="/contactos" className="hover:text-white transition">Contactos</Link></li>
            <li><Link to="/cotacao" className="hover:text-white transition">Pedir Cotação</Link></li>
          </ul>
        </div>

        {/* Coluna 3 — Contactos */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contactos</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} />
              +244 900 000 000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              geral@superseguros.ao
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              Luanda, Angola
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-gray-700 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Super Seguros. Todos os direitos reservados.
      </div>
    </footer>
  )
}
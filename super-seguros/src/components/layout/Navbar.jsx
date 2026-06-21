import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/logo.png'

const links = [
  { label: 'Início', path: '/' },
  { label: 'Seguros', path: '/seguros' },
  { label: 'Sobre Nós', path: '/sobre' },
  { label: 'Contactos', path: '/contactos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav className="bg-white shadow-md sticky h-32.75 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl ">
          <img src={logo} alt="Logo" className="w-43.75 h-[91.52px]" />
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`font-medium transition hover:text-blue-700 ${
                  pathname === link.path ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/cotacao"
              className="bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-800 transition"
            >
              Pedir Cotação
            </Link>
          </li>
        </ul>

        {/* Botão mobile */}
        <button className="md:hidden text-gray-700" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <ul className="flex flex-col gap-4 mt-4">
            {links.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block font-medium ${
                    pathname === link.path ? 'text-blue-700' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/cotacao"
                onClick={() => setOpen(false)}
                className="block bg-blue-700 text-white px-5 py-2 rounded-full font-semibold text-center"
              >
                Pedir Cotação
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
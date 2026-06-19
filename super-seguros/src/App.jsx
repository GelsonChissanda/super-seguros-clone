import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'

// Páginas públicas (vamos criar a seguir)
import Home from './pages/public/Home'
import Seguros from './pages/public/Seguros'
import SeguroDetalhe from './pages/public/SeguroDetalhe'
import Sobre from './pages/public/Sobre'
import Contactos from './pages/public/Contactos'
import Cotacao from './pages/public/Cotacao'

// Admin
import Login from './pages/admin/Login'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/seguros" element={<Seguros />} />
          <Route path="/seguros/:id" element={<SeguroDetalhe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/cotacao" element={<Cotacao />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
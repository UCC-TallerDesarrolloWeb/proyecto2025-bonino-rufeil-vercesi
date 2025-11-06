import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './components/styles2.css'
import Navbar from './components/navbar.jsx'
import Servicios from './components/servicios.jsx'
import PrincipalesHamburguesas from './components/principales_hamburguesas.jsx'
//pages:
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Sucursales from "./pages/Sucursales.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/sucursales" element={<Sucursales />} />
      </Routes>
    </>
  )
}

export default App

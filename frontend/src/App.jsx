import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './components/styles2.css'
import Navbar from './components/navbar.jsx'
import TermsAndConditons from './components/TermsAndConditions.jsx';

//pages:
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Sucursales from "./pages/Sucursales.jsx";
import Carrito from "./pages/Carrito.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/sucursales" element={<Sucursales />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      <TermsAndConditons />
    </>
  )
}

export default App

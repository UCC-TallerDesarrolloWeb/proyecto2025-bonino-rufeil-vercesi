import { Routes, Route } from "react-router-dom";
import RootLayout from "@components/RootLayout.jsx";

// pages
import Home from "@pages/Home.jsx";
import Menu from "@pages/Menu.jsx";
import Sucursales from "@pages/Sucursales.jsx";
import Carrito from "@pages/Carrito.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="sucursales" element={<Sucursales />} />
        <Route path="carrito" element={<Carrito />} />
        
        {/* opcional 404:
        <Route path="*" element={<Home />} />
        */}
      </Route>
    </Routes>
  );
}

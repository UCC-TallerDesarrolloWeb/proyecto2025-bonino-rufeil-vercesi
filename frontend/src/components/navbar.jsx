// Navbar.jsx
import "./styles2.css";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems } from "../javascript/cartService";
import { useEffect, useState } from "react";

import { getRouteFromSearch } from "../javascript/searchService";

import hamburguer from "../assets/hamburguer.png";
import menu from "../assets/menu.png";  
import auriculares from "../assets/auriculares-con-microfono.png";
import shoppingCart from "../assets/shopping-cart.png";
import user from "../assets/user.png";
import lupa from "../assets/lupa.png";

export default function Navbar() {

  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");        
  const navigate = useNavigate();

    useEffect(() => {
      // valor inicial
      setCartCount(getCartItems());

      function handleCartChange(e) {
        // e.detail.count viene del dispatch
        setCartCount(e.detail.count);
      }

      window.addEventListener("cart:changed", handleCartChange);

      return () => {
        window.removeEventListener("cart:changed", handleCartChange);
      };
    }, []);

    // <--- función para buscar
  function handleSearch() {
    const route = getRouteFromSearch(search);
    navigate(route);
  }

  return (
    <header>
      <div className="container-hero">
        <div className="container hero">
          {/* soporte al cliente */}
          <div className="customer-support">
            <img
              className="icon-headset"
              src={auriculares}
              alt="Soporte al cliente"
            />
            <div className="content-customer-support">
              <span className="text">Soporte al cliente</span>
              <span className="number">+351-567-0876</span>
            </div>
          </div>

          {/* logo */}
          <div className="container-logo">
            <img src={hamburguer} alt="Logo empresa" />
            <h1 className="logo">
              <Link to="/menu">La mistica</Link>
            </h1>
          </div>

          {/* usuario y carrito */}
          <div className="container-user">
            <img src={user} alt="Usuario" />

            <Link to="/carrito" className="content-shopping-cart comprar">
              <img src={shoppingCart} alt="Carrito de compras" />
              <span className="text">Carrito</span>
              <span className="number-products" aria-live="polite">
                {cartCount}
              </span>
            </Link>
        </div>
        </div>
      </div>

      <nav className="container-navbar">
        <div className="navbar container">
          <img
            src={menu}
            alt="Abrir menú"
            id="btn-menu"
            style={{ display: "none" }}
          />
          <ul className="menu">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/menu">Hamburguesas</Link>
            </li>
            <li>
              <Link to="/sucursales">Dónde encontrarnos</Link>
            </li>
          </ul>
          <form 
          className="search-form"
          onSubmit={(e)=> {
            e.preventDefault();
            handleSearch();
          }}
          >
            <input 
            type="search" 
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            />
            <button className="btn-search" type="submit">
              <img src={lupa} alt="Buscar" />
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}

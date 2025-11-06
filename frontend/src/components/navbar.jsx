// Navbar.jsx
import "./styles2.css";
import { Link } from "react-router-dom";
import hamburguer from "../assets/hamburguer.png";
import menu from "../assets/menu.png";  
import auriculares from "../assets/auriculares-con-microfono.png";
import shoppingCart from "../assets/shopping-cart.png";
import user from "../assets/user.png";
import lupa from "../assets/lupa.png";

export default function Navbar() {
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
            <div
              className="content-shopping-cart comprar"
              onClick={() => (window.location.href = "carrito1.html")}
              role="link"
              tabIndex={0}
            >
              <img src={shoppingCart} alt="Carrito de compras" />
              <span className="text">Carrito</span>
              <span className="number-products" aria-live="polite">
                0
              </span>
            </div>
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
              <a href="index1.html">Inicio</a>
            </li>
            <li>
              <a href="menu1.html">Hamburguesas</a>
            </li>
            <li>
              <a href="sucursales1.html">Dónde encontrarnos</a>
            </li>
          </ul>
          <form className="search-form">
            <input type="search" placeholder="Buscar..." />
            <button className="btn-search" type="button">
              <img src={lupa} alt="Buscar" />
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}

import "./navbar.css";
import hamburguer from "../assets/hamburguer.png";
import menu from "../assets/menu.png";  
import auriculares from "../assets/auriculares-con-microfono.png";
import shoppingCart from "../assets/shopping-cart.png";
import user from "../assets/user.png";
import lupa from "../assets/lupa.png";

export default function Navbar() {
  return (
    <header className="lm-header">
      {/* barra superior (soporte, logo, usuario) */}
      <div className="container-hero">
        
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

          <div className="container-logo">
            <img src={hamburguer} alt="Logo empresa" />
            <div className="logo">
                <h1>
                    <a href="/">La Mistica</a>
                </h1>
            </div>
            
          </div>

          <div className="container-user">
            <img src={user} alt="Usuario" />
            <button className="content-shopping-cart" type="button">
              <img src={shoppingCart} alt="Carrito de compras" />
              <span className="text">Carrito</span>
              <span className="number-products" aria-live="polite">
                0
              </span>
            </button>
          </div>
        
      </div>

      {/* navbar principal */}
      <nav className="container-navbar">
        <div className="navbar container">
          <button className="btn-menu" type="button" aria-label="Abrir menú">
            <img src={menu} alt="Abrir menú" />
          </button>

          <ul className="menu">
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/menu">Hamburguesas</a>
            </li>
            <li>
              <a href="/sucursales">Dónde encontrarnos</a>
            </li>
          </ul>

          <form className="search-form">
            <input type="search" placeholder="Buscar..." />
            <button className="btn-search" type="submit">
              <img src={lupa} alt="Buscar" />
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}

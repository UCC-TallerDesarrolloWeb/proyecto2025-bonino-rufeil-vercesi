import "./styles2.css";

import plane from "../assets/plane.png";
import hamburguer from "../assets/hamburguer.png";
import user from "../assets/user.png";
import shoppingCart from "../assets/shopping-cart.png";

export default function Features() {
  return (
    <section className="container-features">
      {/* ENVIOS */}
      <div className="card-feature">
        <img src={plane} alt="Envíos rápidos" />
        <div className="feature-content">
          <span>Envíos a toda Córdoba</span>
          <p>Gratis en compras mayores a $40.000</p>
        </div>
      </div>

      {/* INGRED */}
      <div className="card-feature">
        <img src={hamburguer} alt="Calidad premium" />
        <div className="feature-content">
          <span>Ingredientes Premium</span>
          <p>Carne seleccionada, pan artesanal</p>
        </div>
      </div>

      {/* SOPORTE */}
      <div className="card-feature">
        <img src={user} alt="Atención al cliente" />
        <div className="feature-content">
          <span>Soporte 24/7</span>
          <p>Siempre disponibles para ayudarte</p>
        </div>
      </div>

      {/* COMPRA FACIL */}
      <div className="card-feature">
        <img src={shoppingCart} alt="Compras fáciles" />
        <div className="feature-content">
          <span>Compra Fácil</span>
          <p>Carrito simple y seguro</p>
        </div>
      </div>
    </section>
  );
}

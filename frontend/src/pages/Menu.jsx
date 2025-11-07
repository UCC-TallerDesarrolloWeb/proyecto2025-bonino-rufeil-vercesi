// ../pages/Menu.jsx

import hamburguesaSimple from "../assets/hamburguesaclasica.png";
import hamburguesaDoble from "../assets/hamburguesadoble.png";
import hamburguesaTriple from "../assets/hamburguesatriple.png";

import Hamburguesa from "../components/hamburguesa.jsx";

export default function Menu() {
  const simples = [
    {
      id: "simple",
      nombre: "Simple",
      precio: 13000,
      imagen: hamburguesaSimple,
      cardClass: "product-simple",
      modalImgStyle: { width: "260px", display: "block" },
    },
  ];

  const dobles = [
    {
      id: "mistica",
      nombre: "Mistica",
      precio: 14000,
      imagen: hamburguesaDoble,
      cardClass: "product-mistica",
    },
    {
      id: "barbecue",
      nombre: "Barbecue",
      precio: 14500,
      imagen: hamburguesaTriple,
      cardClass: "product-barbecue",
    },
    {
      id: "cheddar",
      nombre: "Cheddar",
      precio: 14500,
      imagen: hamburguesaTriple,
      cardClass: "product-cheddar",
    },
  ];

  const triples = [
    {
      id: "triple",
      nombre: "Triple",
      precio: 15000,
      imagen: hamburguesaTriple,
      cardClass: "product-barbecue",
    },
  ];

  return (
    <>

      <main id="main" className="main-content">
        <section className="container top-categories" aria-labelledby="titulo-menu">
          <h2 className="heading-1" id="titulo-menu">
            Simples
          </h2>
          <div className="container-categories">
            {simples.map((h) => (
              <Hamburguesa key={h.id} {...h} />
            ))}
          </div>

          <h2 className="heading-1">Dobles</h2>
          <div className="container-categories">
            {dobles.map((h) => (
              <Hamburguesa key={h.id} {...h} />
            ))}
          </div>

          <h2 className="heading-1">Triples</h2>
          <div className="container-categories">
            {triples.map((h) => (
              <Hamburguesa key={h.id} {...h} />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 La Mistica.</p>
      </footer>
    </>
  );
}

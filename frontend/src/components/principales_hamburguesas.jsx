// ../components/principales_hamburguesas.jsx
import Hamburguesa from "./Hamburguesa.jsx";

// si tenés las imágenes en assets, cambiá la ruta a ../assets/...
import hamburguesaSimple from "../assets/hamburguesaclasica.png";
import hamburguesaDoble from "../assets/hamburguesadoble.png";
import hamburguesaTriple from "../assets/hamburguesatriple.png";

export default function PrincipalesHamburguesas() {
  const categoriasPrincipales = [
    {
      id: "clasica",
      nombre: "Clásica",
      precio: 13000,
      imagen: hamburguesaSimple,
      cardClass: "category-clasica", // así podés seguir usando tu CSS de fondo si querés
    },
    {
      id: "doble",
      nombre: "Doble",
      precio: 14000,
      imagen: hamburguesaDoble,
      cardClass: "category-doble",
    },
    {
      id: "triple",
      nombre: "Triple",
      precio: 15000,
      imagen: hamburguesaTriple,
      cardClass: "category-triple",
    },
  ];

  const loMasPopular = [
    {
      id: "mistica-pop",
      nombre: "Mistica",
      precio: 14000,
      // si después tenés una imagen específica la ponés acá
      cardClass: "category-mistica",
    },
    {
      id: "barbacue-pop",
      nombre: "Barbacue",
      precio: 14500,
      cardClass: "category-barbacue",
    },
    {
      id: "cheddar-pop",
      nombre: "Cheddar",
      precio: 14500,
      cardClass: "category-cheddar",
    },
  ];

  return (
    <>
      {/* CATEGORIAS PRINCIPALES */}
      <section className="container top-categories">
        <h1 className="heading-1">Categorías principales</h1>
        <div className="container-categories">
          {categoriasPrincipales.map((item) => (
            <Hamburguesa key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* LO MAS POPULAR */}
      <section className="container top-categories">
        <h1 className="heading-1">Lo Más Popular</h1>
        <div className="container-categories">
          {loMasPopular.map((item) => (
            <Hamburguesa key={item.id} {...item} />
          ))}
        </div>
      </section>
    </>
  );
}

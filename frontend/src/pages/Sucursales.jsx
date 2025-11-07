// src/pages/Sucursales.jsx
import "../components/styles2.css"; // o la ruta que uses para ese css
import instagram from "../assets/instagram.png";

export default function Sucursales() {
  return (
    <>
      <main id="main" className="main-content">
        <section
          className="container ubicacion"
          aria-labelledby="titulo-ubicacion"
        >
          <div>
            <iframe
              src="https://www.google.com/maps?q=-31.4167,-64.1833&z=15&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa La Mística"
            ></iframe>

            <a
              href="https://instagram.com/demerufeil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="Instagram La Mistica" />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 La Mistica.</p>
      </footer>
    </>
  );
}

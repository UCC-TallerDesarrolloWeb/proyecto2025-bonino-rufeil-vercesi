export default function PrincipalesHamburguesas() {
  return (
    <>
      {/* CATEGORIAS PRINCIPALES */}
      <section className="container top-categories">
        <h1 className="heading-1">Categorías principales</h1>
        <div className="container-categories">
          {/* CLASICA */}
          <div className="card-category category-clasica">
            <p>Clasica</p>
            <span>
              <a href="menu1.html">Ver más</a>
            </span>
          </div>
          {/* DOBLE */}
          <div className="card-category category-doble">
            <p>Doble</p>
            <span>
              <a href="menu1.html">Ver más</a>
            </span>
          </div>
          {/* TRIPLE */}
          <div className="card-category category-triple">
            <p>Triple</p>
            <span>
              <a href="menu1.html">Ver más</a>
            </span>
          </div>
        </div>
      </section>

      {/* LO MAS POPULAR */}
      <section className="container top-categories">
        <h1 className="heading-1">Lo Mas Popular</h1>
        <div className="container-categories">
          {/* MISTICA */}
          <div className="card-category category-mistica">
            <p>Mistica</p>
            <span>
              <a href="menu1.html">Ver más</a>
            </span>
          </div>
          {/* BARBACUE */}
          <div className="card-category category-barbacue">
            <p>Barbacue</p>
            <span>
              <a href="menu1.html">Ver más</a>
            </span>
          </div>
          {/* CHEDDAR */}
          <div className="card-category category-cheddar">
            <p>Cheddar</p>
            <span>
              <a href="menu1.html">Ver más</a>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

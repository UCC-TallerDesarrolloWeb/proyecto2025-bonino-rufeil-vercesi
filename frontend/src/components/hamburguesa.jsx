// src/componentes/Hamburguesa.jsx
import { useState } from "react";
import { addToCart } from "../javascript/cartService.js";
import { validateCartQuantity } from "../javascript/cartValidation.js";
import ErrorMessage from "./ErrorMessage.jsx";

export default function Hamburguesa({
  id,
  nombre,
  precio,
  imagen,
  cardClass = "",
  modalImgStyle = {},
}) {
  const checkboxId = `modal-${id}`;
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState("");

  function handleCantidadChange(e) {
    const value = e.target.value;
    setCantidad(value);

    // validamos en vivo
    const result = validateCartQuantity(value);
    if (!result.ok) {
      setError(result.message);
    } else {
      setError("");
    }
  }

  function handleAddClick() {
    const result = validateCartQuantity(cantidad);

    if (!result.ok) {
      // avisar y blanquear al valor permitido
      setError(result.message);
      setCantidad(result.value); // lo dejo en 1 o 10 según el caso
      alert(result.message); // por si la profe quiere alert
      return;
    }

    // si es válido, agregamos
    addToCart({
      id,
      nombre,
      precio,
      cantidad: result.value,
    });

    // cerrar modal
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) checkbox.checked = false;
  }

  return (
    <>
      <input type="checkbox" id={checkboxId} className="modal-toggle" hidden />

      <label
        htmlFor={checkboxId}
        className={`products-category ${cardClass} comprar`}
      >
        <div className="card-product">
          <p>{nombre}</p>
          <span>${precio.toLocaleString("es-AR")}</span>
        </div>
      </label>

      <div className="modal-producto">
        <div className="modal-box">
          <label htmlFor={checkboxId} className="modal-close">
            ×
          </label>

          {imagen && (
            <img
              src={imagen}
              alt={`Hamburguesa ${nombre}`}
              style={{
                borderRadius: "1rem",
                marginBottom: "2rem",
                ...modalImgStyle,
              }}
            />
          )}

          <h3>{nombre}</h3>
          <p>Precio: ${precio.toLocaleString("es-AR")}</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor={`cantidad-${id}`}>Cantidad:</label>
            <input
              type="number"
              id={`cantidad-${id}`}
              name={`cantidad-${id}`}
              min="1"
              max="10"
              value={cantidad}
              onChange={handleCantidadChange}
              size={2}
            />

            <button type="button" onClick={handleAddClick} disabled={!!error}>
              Añadir al carrito
            </button>

            <ErrorMessage text={error} />
          </form>
        </div>
      </div>
    </>
  );
}

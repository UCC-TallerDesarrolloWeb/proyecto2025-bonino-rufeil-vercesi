// src/pages/Carrito.jsx
import { useEffect, useState } from "react";
import {
  getCart,
  getCartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../javascript/cartService.js";

export default function Carrito() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // cargar carrito al montar
  useEffect(() => {
    const c = getCart();
    setCart(c);
    // suma de $ (precio * cantidad), no cantidad de items
    const initialTotal = c.reduce(
      (acc, item) => acc + Number(item.precio) * Number(item.cantidad),
      0
    );
    setTotal(initialTotal);
  }, []);

  function handleQuantityChange(id, value) {
    const cantidad = parseInt(value, 10) || 0;
    const updated = updateQuantity(id, cantidad);
    setCart(updated);
    setTotal(
      updated.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    );
  }

  function handleRemove(id) {
    const updated = removeFromCart(id);
    setCart(updated);
    setTotal(
      updated.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    );
  }

  function handleClear() {
    const updated = clearCart();
    setCart(updated);
    setTotal(0);
  }

  const isEmpty = cart.length === 0;

  return (
    <main className="container carrito carrito-grid">
      <h2 className="carrito-title">Tu Orden</h2>

      <section id="cart-box" className="carrito-box carrito-grid-box">
        {!isEmpty && (
          <table id="cart-table" className="cart-table">
            <thead>
              <tr>
                <th className="l">Tipo</th>
                <th className="c">Cantidad</th>
                <th className="r">Precio</th>
                <th className="r">Acciones</th>
              </tr>
            </thead>
            <tbody id="cart-tbody">
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="l">{item.nombre}</td>
                  <td className="c">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={item.cantidad}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      style={{ width: "4rem" }}
                    />
                  </td>
                  <td className="r">
                    ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                  </td>
                  <td className="r">
                    <button type="button" onClick={() => handleRemove(item.id)}>
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="l cart-total-label">Total</td>
                <td></td>
                <td id="cart-total" className="r cart-total">
                  ${total.toLocaleString("es-AR")}
                </td>
                <td className="r">
                  <button type="button" onClick={handleClear}>
                    Vaciar
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        )}

        {isEmpty && (
          <p id="cart-empty" className="cart-empty">
            Tu carrito está vacío.
          </p>
        )}
      </section>
    </main>
  );
}

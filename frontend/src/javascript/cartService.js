// src/services/cartService.js

const CART_KEY = "cart-la-mistica";

/**
 * Dispara un evento global ("cart:changed") cada vez que el carrito cambia.
 * Lo usan componentes como el Navbar para actualizar el contador en vivo.
 * @param {Array<{id:string, nombre:string, precio:number, cantidad:number}>} cart Carrito actualizado
 */
function dispatchCartChange(cart) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cart:changed", {
        detail: {
          cart,
          // cantidad total de unidades en el carrito
          count: cart.reduce((acc, item) => acc + (item.cantidad || 0), 0),
        },
      })
    );
  }
}

/**
 * Lee el carrito desde localStorage.
 * Si no hay nada o el JSON está corrupto, devuelve [].
 * @returns {Array<{id:string, nombre:string, precio:number, cantidad:number}>}
 */
export function getCart() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Carrito corrupto, lo reinicio");
    return [];
  }
}

/**
 * Guarda el carrito en localStorage y notifica a la app que cambió.
 * @param {Array<{id:string, nombre:string, precio:number, cantidad:number}>} cart Carrito a guardar
 */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatchCartChange(cart); // acá avisamos que cambió
}

/**
 * Agrega un producto al carrito. Si ya existe el mismo id, suma la cantidad.
 * @param {{id:string, nombre:string, precio:number, cantidad?:number}} param0 Datos del producto
 * @returns {Array<{id:string, nombre:string, precio:number, cantidad:number}>} Carrito actualizado
 */
export function addToCart({ id, nombre, precio, cantidad = 1 }) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.cantidad += cantidad;
  } else {
    cart.push({ id, nombre, precio, cantidad });
  }
  saveCart(cart);
  return cart;
}

/**
 * Actualiza la cantidad de un producto del carrito.
 * Si la cantidad es 0 o menor, elimina el producto.
 * @param {string} id Id del producto
 * @param {number} nuevaCantidad Cantidad nueva a setear
 * @returns {Array<{id:string, nombre:string, precio:number, cantidad:number}>} Carrito actualizado
 */
export function updateQuantity(id, nuevaCantidad) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.cantidad = nuevaCantidad;
    if (item.cantidad <= 0) {
      const filtered = cart.filter((i) => i.id !== id);
      saveCart(filtered);
      return filtered;
    }
  }
  saveCart(cart);
  return cart;
}

/**
 * Elimina un producto del carrito por id.
 * @param {string} id Id del producto a eliminar
 * @returns {Array<{id:string, nombre:string, precio:number, cantidad:number}>} Carrito actualizado
 */
export function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

/**
 * Vacía por completo el carrito.
 * @returns {Array<never>} Carrito vacío
 */
export function clearCart() {
  saveCart([]);
  return [];
}

/**
 * Devuelve la cantidad total de unidades en el carrito
 * (no la cantidad de productos distintos).
 * @returns {number} Total de unidades
 */
export function getCartItems() {
  const cart = getCart() || [];
  return cart.reduce((total, item) => total + (item.cantidad || 0), 0);
}

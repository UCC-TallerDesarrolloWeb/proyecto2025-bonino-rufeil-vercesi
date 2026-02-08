

// SERVICIO DEL CARRITO:
const CART_KEY = "cart-la-mistica";

/**
 * Dispara un evento global ("cart:changed") cada vez que el carrito cambia.
 * Lo usan componentes como el Navbar para actualizar el contador en vivo.
 * @param {Array<{id:string, nombre:string, precio:number, cantidad:number}>} cart Carrito actualizado
 * @returns {void} No devuelve ningún valor; solo emite el evento "cart:changed" con el carrito y el total de unidades.
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
 * Devulve un array con los productos del carrito o vacio si no hay o es invalido.
 */
export function getCart() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Carrito fallado, ", e);
    return [];
  }
}

/**
 * Guarda el carrito en localStorage y notifica a la app que cambió.
 * @param {Array<{id:string, nombre:string, precio:number, cantidad:number}>} cart Carrito a guardar
 * @returns {void} No devuelve ningún valor; persiste el carrito y dispara el evento de cambio.
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



// VALIDACION DEL CARRITO:
// VALIDACION DEL CARRITO:
// VALIDACION DEL CARRITO:
// VALIDACION DEL CARRITO:
// VALIDACION DEL CARRITO:

// src/services/cartValidation.js

/**
 * Funciones de validación relacionadas al carrito.
 * Actualmente valida la cantidad ingresada por el usuario.
 */

/**
 * Valida una cantidad para el carrito.
 * - Debe ser número
 * - Debe ser >= 1
 * - Debe ser <= 10
 *
 * @param {number} cantidad Cantidad que ingresó el usuario.
 * @returns {{ok: boolean, message: string, value: number}} Resultado de la validación.
 * - ok: true si es válida.
 * - message: texto de error listo para mostrar.
 * - value: cantidad normalizada (por ejemplo, 1 si puso 0, o 10 si puso 999).
 */
export function validateCartQuantity(cantidad) {
  // normalizamos
  const value = Number(cantidad);

  if (Number.isNaN(value)) {
    return {
      ok: false,
      message: "La cantidad debe ser un número.",
      value: 1,
    };
  }

  if (value < 1) {
    return {
      ok: false,
      message: "La cantidad mínima es 1.",
      value: 1,
    };
  }

  if (value > 10) {
    return {
      ok: false,
      message: "La cantidad máxima es 10.",
      value: 10,
    };
  }

  return {
    ok: true,
    message: "",
    value,
  };
}


//SERVICIO DE BUSQUEDA:
//SERVICIO DE BUSQUEDA:
//SERVICIO DE BUSQUEDA:
//SERVICIO DE BUSQUEDA:
//SERVICIO DE BUSQUEDA:
//SERVICIO DE BUSQUEDA:

// src/javascript/searchService.js

/**
 * Devuelve la ruta a la que hay que ir según el texto buscado.
 * Acepta cosas como "inicio", "home", "menu", "hamburguesas", "sucursales".
 * Si no reconoce, manda al menú.
 *
 * @param {string} term Texto ingresado por el usuario.
 * @returns {string} Ruta de React (ej. "/menu").
 */
export function getRouteFromSearch(term) {
  const q = term.trim().toLowerCase();

  if (q === "" || q === "inicio" || q === "home") return "/";
  if (q.includes("hamb") || q === "menu") return "/menu";
  if (q.includes("suc") || q.includes("lugar") || q.includes("donde")) return "/sucursales";
  if (q.includes("carrito") || q.includes("compras") || q.includes("pedido")) return "/carrito";

  // por defecto
  return "/menu";
}

/**
 * Maneja la búsqueda del usuario en React, resolviendo la ruta
 * y navegando con la función de react-router.
 *
 * @param {string} search Texto ingresado por el usuario.
 * @param {(path:string) => void} navigate Función de navegación (useNavigate).
 */
export function handleSearch(search, navigate) {
  const route = getRouteFromSearch(search);
  navigate(route);
}

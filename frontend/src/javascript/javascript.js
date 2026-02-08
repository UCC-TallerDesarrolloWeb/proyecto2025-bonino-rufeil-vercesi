

// SERVICIO DEL CARRITO:
const CART_KEY = "cart-la-mistica";

/**
 * Dispara un evento global ("cart:changed") cada vez que el carrito cambia.
 * Es utilizado por componentes como el Navbar para actualizar el contador en tiempo real.
 * @param {Array<{id:string, nombre:string, precio:number, cantidad:number}>} cart Carrito actualizado.
 * @returns {void} No devuelve ningún valor; si el entorno es un navegador, emite el evento "cart:changed" con el carrito y la cantidad total de unidades. En entornos sin window, no realiza ninguna acción.
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
 * Lee el carrito almacenado en localStorage.
 * Si no existe información guardada, el JSON es inválido o el código se ejecuta fuera del navegador,
 * devuelve un arreglo vacío.
 * @returns {Array<{id:string, nombre:string, precio:number, cantidad:number}>}
 * Arreglo con los productos del carrito almacenado; devuelve un arreglo vacío si no hay datos, son inválidos o no existe el objeto window.
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
 * Guarda el carrito en localStorage y notifica a la aplicación que el carrito fue actualizado.
 * @param {Array<{id:string, nombre:string, precio:number, cantidad:number}>} cart Carrito a persistir.
 * @returns {void} No devuelve ningún valor; almacena el carrito en localStorage y emite el evento de cambio del carrito.
 */

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatchCartChange(cart); // acá avisamos que cambió
}

/**
 * Agrega un producto al carrito. Si el producto ya existe, incrementa su cantidad.
 * @param {{id:string, nombre:string, precio:number, cantidad?:number}} param0 Datos del producto a agregar.
 * @returns {Array<{id:string, nombre:string, precio:number, cantidad:number}>}
 * Arreglo que representa el carrito actualizado luego de agregar el producto o de aumentar su cantidad si ya existía.
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
 * Actualiza la cantidad de un producto dentro del carrito.
 * Si la nueva cantidad es menor o igual a 0, el producto se elimina del carrito.
 * @param {string} id Id del producto a modificar.
 * @param {number} nuevaCantidad Nueva cantidad a asignar al producto.
 * @returns {Array<{id:string, nombre:string, precio:number, cantidad:number}>}
 * Arreglo que representa el carrito actualizado; si la cantidad es menor o igual a 0, el producto es removido y el arreglo resultante no lo incluye.
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
 * Elimina un producto del carrito con su id
 * @param {string} id Id del producto a eliminar.
 * @returns {Array<{id:string, nombre:string, precio:number, cantidad:number}>}
 * Arreglo que representa el carrito actualizado luego de remover el producto con el id indicado.
 */

export function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

/**
 * Vacía completamente el carrito, eliminando todos los productos almacenados.
 * @returns {Array<never>} Arreglo vacío que representa un carrito sin productos luego de ser limpiado.
 */

export function clearCart() {
  saveCart([]);
  return [];
}

/**
 * Calcula la cantidad total de unidades presentes en el carrito.
 * No representa la cantidad de productos distintos, sino la suma de las cantidades de cada producto.
 * @returns {number} Número total de unidades en el carrito; devuelve 0 si el carrito está vacío.
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
 * Valida la cantidad ingresada por el usuario para el carrito.
 * La cantidad debe ser numérica y estar dentro del rango permitido.
 * @param {number} cantidad Cantidad ingresada por el usuario.
 * @returns {{ok: boolean, message: string, value: number}}
 * Objeto con el resultado de la validación: ok indica si la cantidad es válida,
 * message contiene un mensaje de error listo para mostrar cuando no es válida,
 * y value devuelve la cantidad normalizada dentro de los límites permitidos.
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
 * Determina la ruta de navegación según el texto ingresado por el usuario.
 * Reconoce términos comunes asociados a las distintas secciones de la aplicación.
 * @param {string} term Texto ingresado por el usuario en la búsqueda.
 * @returns {string} Ruta de React Router correspondiente al término buscado; si no se reconoce ninguna coincidencia, devuelve la ruta del menú por defecto.
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
 * Maneja la búsqueda del usuario resolviendo la ruta correspondiente
 * y realizando la navegación mediante React Router.
 * @param {string} search Texto ingresado por el usuario en la búsqueda.
 * @param {(path:string) => void} navigate Función de navegación provista por react-router.
 * @returns {void} No devuelve ningún valor; solo ejecuta la navegación hacia la ruta resuelta.
 */

export function handleSearch(search, navigate) {
  const route = getRouteFromSearch(search);
  navigate(route);
}

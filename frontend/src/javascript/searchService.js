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

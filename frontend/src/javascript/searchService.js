// src/javascript/searchService.js

/**
 * Devuelve la ruta a la que hay que ir según el texto buscado.
 * Acepta cosas como "inicio", "home", "menu", "hamburguesas", "sucursales".
 * Si no reconoce, manda al menú.
 * @param {string} term texto ingresado por el usuario
 * @returns {string} ruta de React (ej. "/menu")
 */
export function getRouteFromSearch(term) {
  const q = term.trim().toLowerCase();

  if (q === "" || q === "inicio" || q === "home") return "/";
  if (q.includes("hamb") || q === "menu") return "/menu";
  if (q.includes("suc") || q.includes("lugar") || q.includes("donde")) return "/sucursales";

  // por defecto
  return "/menu";
}

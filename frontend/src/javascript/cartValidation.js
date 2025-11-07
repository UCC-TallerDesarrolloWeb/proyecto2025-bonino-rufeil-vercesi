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

/**
 * Obtiene los Términos y Condiciones desde la API de ejemplo.
 * Usamos la API de "https://jsonplaceholder.typicode.com" para simular.
 * @returns {Promise<string>} El texto de los términos y condiciones.
 */
export async function fetchTermsAndConditions() {
  try {
    // Usamos una API de ejemplo para obtener los datos
    const response = await fetch("https://693e0d78f55f1be793043895.mockapi.io/termsandconditions");

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error al obtener los Términos y Condiciones");
    }

    const data = await response.json();
    const record = Array.isArray(data) ? data[0] : data;
    return record?.body ?? "No se encontraron términos.";
  } catch (error) {
    console.error("Error al obtener Términos y Condiciones:", error);
    return "No se pudieron cargar los términos y condiciones.";
  }
}

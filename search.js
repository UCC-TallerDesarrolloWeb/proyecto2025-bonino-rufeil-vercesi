/**
 * Instala el submit del buscador del navbar.
 * - Solo se instala una vez (usa form.dataset.init).
 * - Valida que haya texto.
 * - Redirige a las páginas HTML según el término buscado.
 * Páginas soportadas:
 *  - "inicio" -> index.html
 *  - "hamburguesas" -> menu1.html
 *  - "carrito", "carrito de compras" -> carrito1.html
 *  - "donde encontrarnos", "dónde encontrarnos" -> sucursales1.html
 */
export function initSearchNavigation() {
  const form = document.querySelector('.search-form');
  if (!form || form.dataset.init === '1') return;
  form.dataset.init = '1';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="search"]');
    const value = (input?.value || '').trim().toLowerCase();

    if (!value) {
      alert('Ingresá un término de búsqueda.');
      return; // muestra 1 sola alerta
    }

    if (value === 'inicio') {
      window.location.href = 'index.html';
    } else if (value === 'hamburguesas') {
      window.location.href = 'menu1.html';
    } else if (value === 'carrito' || value === 'carrito de compras') {
      window.location.href = 'carrito1.html';
    } else if (value === 'donde encontrarnos' || value === 'dónde encontrarnos') {
      window.location.href = 'sucursales1.html';
    } else {
      alert('No se encontró la página para: ' + value);
    }
  });
}

/**
 * Inicializa automáticamente la navegación por búsqueda
 * cuando el documento terminó de cargarse.
 * Se ejecuta una sola vez gracias al control interno de initSearchNavigation.
 */
document.addEventListener('DOMContentLoaded', initSearchNavigation);

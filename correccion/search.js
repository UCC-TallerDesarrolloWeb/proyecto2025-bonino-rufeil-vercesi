/**
 * Instala el submit del buscador.
 * Corrige: evita doble alerta cuando el valor está vacío e impide doble registro del listener.
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
      window.location.href = 'index1.html';
    } else if (value === 'hamburguesas') {
      window.location.href = 'menu1.html';
    } else if (value === 'carrito' || value === 'carrito de compras') {
      window.location.href = 'carrito1.html';
    }else if (value === 'donde encontrarnos' || value === 'dónde encontrarnos') {
      window.location.href = 'sucursales1.html';
    } else {
      alert('No se encontró la página para: ' + value);
    }
  });
}

/** Auto-inicializa al cargar (solo una vez). */
document.addEventListener('DOMContentLoaded', initSearchNavigation);

// 🔍 Busca coincidencias y redirige al usuario a la página correspondiente
export function handleSearchNavigation() {
  const searchForm = document.querySelector('.search-form');

  if (!searchForm) return;

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = searchForm.querySelector('input[type="search"]').value.trim().toLowerCase();

    if (value === 'inicio') {
      window.location.href = 'index.html';
    } else if (value === 'hamburguesas') {
      window.location.href = 'menu.html';
    } else if (value === 'donde encontrarnos' || value === 'dónde encontrarnos') {
      window.location.href = 'sucursales.html';
    } else {
      alert('No se encontró la página para: ' + value);
    }
  });
}

// ▶ Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', handleSearchNavigation);

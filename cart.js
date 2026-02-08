/**
 * Lee el carrito almacenado en localStorage.
 * @returns {Array<{name:string, price:number, qty:number}>}
 * Arreglo con los productos del carrito; devuelve un arreglo vacío si no existe información almacenada,
 * si el valor es nulo o si ocurre un error al parsear el contenido.
 */

export function getCart() {
  try {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Guarda el carrito en localStorage.
 * @param {Array<{name:string, price:number, qty:number}>} cart Arreglo de productos a persistir en el almacenamiento local.
 * @returns {void} No devuelve ningún valor; serializa el carrito y lo guarda en localStorage.
 */

export function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Actualiza la burbuja que muestra la cantidad total de productos en el header.
 * @returns {void} No devuelve ningún valor; calcula la cantidad total a partir del carrito y actualiza el contenido del elemento visual. Si ocurre un error o el elemento no existe, no realiza ninguna acción.
 */

export function updateCartBubble() {
  try {
    const cart = getCart();
    const totalQty = cart.reduce((acc, it) => acc + (parseInt(it.qty, 10) || 0), 0);
    const badge = document.querySelector('.number-products');
    if (badge) badge.textContent = String(totalQty);
  } catch {}
}

/**
 * Agrega un producto al carrito, persiste los cambios y actualiza la burbuja de cantidad.
 * Valida la cantidad y el precio, normaliza el nombre del producto y maneja errores para evitar fallos en la interfaz.
 * @param {string} productName Nombre del producto a agregar.
 * @param {number} productPrice Precio unitario del producto.
 * @param {string} qtyInputId Id del input desde donde se obtiene la cantidad.
 * @returns {boolean} Siempre devuelve false para prevenir el envío del formulario o la recarga de la página, incluso si ocurre un error.
 */

export function handleAddToCart(productName, productPrice, qtyInputId) {
  try {
    const qtyEl = document.getElementById(qtyInputId);
    let qty = parseInt(qtyEl && qtyEl.value ? qtyEl.value : '1', 10);
    if (Number.isNaN(qty) || qty < 1) qty = 1;

    const price = Number(productPrice);
    if (!Number.isFinite(price) || price < 0) {
      alert('Precio inválido.');
      return false;
    }

    // nombre normalizado (corrige posibles “barbacue”/“barbecue”)
    const name = String(productName || '').trim();
    if (!name) {
      alert('Producto inválido.');
      return false;
    }

    const cart = getCart();
    cart.push({ name, price, qty });
    setCart(cart);

    updateCartBubble();
    alert(`${name} x${qty} añadido al carrito`);
  } catch {
    alert('No se pudo añadir al carrito.');
  }
  return false;
}

/**
 * @typedef {Object} CartItem
 * @property {string} name
 * @property {number} price
 * @property {number} qty
 */

/**
 * Formatea un número y le pone puntos. ej. 3000 -> "3.000"
 * @param {number} n Número a formatear.
 * @returns {string|number} Devuelve un string con el número formateado según es-AR; si Intl.NumberFormat no está disponible o falla, devuelve el valor original sin formatear.
 */

export function formatNumberAR(n) {
  try {
    return new Intl.NumberFormat('es-AR').format(n);
  } catch {
    return n;
  }
}

/**
 * Agrupa los ítems del carrito por nombre, sumando las cantidades de productos repetidos.
 * Si existen varios ítems con el mismo nombre pero distinto precio, se conserva el último precio encontrado.
 * @param {CartItem[]} items Arreglo de ítems del carrito a compactar.
 * @returns {CartItem[]} Nuevo arreglo de ítems compactados; si la entrada está vacía o las cantidades resultan 0, devuelve un arreglo vacío.
 */

export function compactCart(items) {
  /** @type {Record<string, CartItem>} */
  const map = {};
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const key = String(it.name);
    if (!map[key]) {
      map[key] = {
        name: key,
        price: Number(it.price) || 0,
        qty: 0
      };
    }
    map[key].qty += Number(it.qty) || 0;
    // si viniera otro precio para el mismo producto, dejamos el último
    map[key].price = Number(it.price) || map[key].price;
  }
  return Object.values(map).filter((x) => x.qty > 0);
}

/**
 * Renderiza la tabla del carrito en carrito.html.
 * Utiliza los elementos:
 * - tbody con id="cart-tbody"
 * - celda total con id="cart-total"
 * - p con id="cart-empty"
 * y aplica las clases .cart-td-name, .cart-td-qty, .cart-td-price.
 * @returns {void} No devuelve ningún valor; actualiza el DOM con los ítems del carrito y el total. Si la página no contiene la tabla (faltan tbody o total), finaliza sin hacer nada. Si el carrito está vacío, muestra el mensaje correspondiente, actualiza la burbuja y no renderiza filas.
 */

export function renderCartTable() {
  const tbody = document.getElementById('cart-tbody');
  const totalEl = document.getElementById('cart-total');
  const emptyMsg = document.getElementById('cart-empty');

  if (!tbody || !totalEl) {
    // estamos en una página que no tiene tabla de carrito
    return;
  }

  tbody.innerHTML = '';
  totalEl.textContent = '0';

  // leemos carrito desde el helper ya modularizado
  const raw = getCart();
  const items = compactCart(raw);

  if (!items.length) {
    if (emptyMsg) emptyMsg.style.display = 'block';
    // también actualizamos la burbuja
    updateCartBubble();
    return;
  } else if (emptyMsg) {
    emptyMsg.style.display = 'none';
  }

  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.textContent = it.name;
    tdName.className = 'cart-td-name l';

    const tdQty = document.createElement('td');
    tdQty.textContent = String(it.qty);
    tdQty.className = 'cart-td-qty c';

    const tdPrice = document.createElement('td');
    tdPrice.textContent = formatNumberAR(it.price);
    tdPrice.className = 'cart-td-price r';

    tr.appendChild(tdName);
    tr.appendChild(tdQty);
    tr.appendChild(tdPrice);
    tbody.appendChild(tr);

    total += (Number(it.price) || 0) * (Number(it.qty) || 0);
  }

  totalEl.textContent = formatNumberAR(total);

  // repintar la burbuja usando lo que ya tenés
  updateCartBubble();
}

/**
 * Inicializa la burbuja del carrito una sola vez al cargar el documento.
 * Utiliza un flag en document.documentElement para evitar ejecuciones repetidas.
 * @returns {void} No devuelve ningún valor; si la inicialización ya se realizó, finaliza inmediatamente. En caso contrario, marca el flag y actualiza la burbuja del carrito.
 */

function initCartBubbleOnce() {
  if (document.documentElement.dataset.cartBubbleInit === '1') return;
  document.documentElement.dataset.cartBubbleInit = '1';
  updateCartBubble();
}

/**
 * Al cargar el DOM, inicializa la burbuja del carrito.
 * Esto permite que, aunque no se haya abierto el carrito,
 * el usuario vea cuántos ítems tiene.
 */
document.addEventListener('DOMContentLoaded', initCartBubbleOnce);



/**
 * SEARCH.JS:
 */

/**
 * Inicializa la navegación del buscador del navbar.
 * Instala el manejador del evento submit una sola vez utilizando un flag en el dataset del formulario.
 * Valida que el usuario haya ingresado un texto y redirige a las páginas HTML correspondientes
 * según el término buscado. Si el término no coincide con ninguna página soportada, muestra un mensaje de error.
 * @returns {void} No devuelve ningún valor; registra el listener del formulario y realiza redirecciones o alertas según el caso.
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

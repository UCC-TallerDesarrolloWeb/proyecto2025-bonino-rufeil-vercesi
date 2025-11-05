/**
 * Lee el carrito del localStorage.
 * @returns {Array<{name:string, price:number, qty:number}>}
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
 * @param {Array<{name:string, price:number, qty:number}>} cart
 */
export function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Actualiza la burbuja de cantidad en el header.
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
 * Agrega un producto al carrito y actualiza la burbuja.
 * Corrige: uso de let/const, validaciones y error al agregar “barbecue”.
 * @param {string} productName - Nombre del producto (ej. "Barbecue").
 * @param {number} productPrice - Precio unitario.
 * @param {string} qtyInputId - Id del input de cantidad.
 * @returns {boolean} Siempre false para evitar submit/recarga.
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
 * Formatea un número al estilo es-AR (ej. 13500 -> "13.500").
 * @param {number} n
 * @returns {string|number}
 */
export function formatNumberAR(n) {
  try {
    return new Intl.NumberFormat('es-AR').format(n);
  } catch {
    return n;
  }
}

/**
 * Agrupa ítems del carrito por nombre, sumando cantidades.
 * Si vienen precios distintos con el mismo nombre, conserva el último.
 * @param {CartItem[]} items
 * @returns {CartItem[]}
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
 * Usa:
 *  - tbody con id="cart-tbody"
 *  - celda total con id="cart-total"
 *  - p con id="cart-empty"
 * y usa las clases .cart-td-name, .cart-td-qty, .cart-td-price que ya definiste en CSS.
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



/** Inicializa la burbuja al cargar (solo una vez). */
function initCartBubbleOnce() {
  if (document.documentElement.dataset.cartBubbleInit === '1') return;
  document.documentElement.dataset.cartBubbleInit = '1';
  updateCartBubble();
}

document.addEventListener('DOMContentLoaded', initCartBubbleOnce);

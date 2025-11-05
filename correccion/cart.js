// 📦 Agrega un producto al carrito y actualiza el número en la burbuja
export function handleAddToCart(productName, productPrice, qtyInputId) {
  try {
    const qtyEl = document.getElementById(qtyInputId);
    let qty = parseInt(qtyEl?.value || '1', 10);

    if (isNaN(qty) || qty < 1) qty = 1;

    // Obtener carrito actual
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
      cart = [];
    }

    // Agregar producto
    cart.push({ name: productName, price: productPrice, qty });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar burbuja
    updateCartBubble();

    alert(`${productName} x${qty} añadido al carrito`);
  } catch (err) {
    alert('No se pudo añadir al carrito.');
  }

  return false; // Previene recarga de página
}

// 🔄 Actualiza la burbuja de cantidad en el header
export function updateCartBubble() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalQty = cart.reduce((acc, item) => acc + (parseInt(item.qty, 10) || 0), 0);

    const badge = document.querySelector('.number-products');
    if (badge) badge.textContent = totalQty;
  } catch (e) {
    console.error('Error al actualizar burbuja del carrito');
  }
}

// ▶ Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', updateCartBubble);
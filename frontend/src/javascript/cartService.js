// src/services/cartService.js

const CART_KEY = "cart-la-mistica";

function dispatchCartChange(cart) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cart:changed", {
        detail: {
          cart,
          count: cart.reduce((acc, item) => acc + (item.cantidad || 0), 0),
        },
      })
    );
  }
}

export function getCart() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Carrito corrupto, lo reinicio");
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatchCartChange(cart); // acá avisamos que cambió
}

export function addToCart({ id, nombre, precio, cantidad = 1 }) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.cantidad += cantidad;
  } else {
    cart.push({ id, nombre, precio, cantidad });
  }
  saveCart(cart);
  return cart;
}

export function updateQuantity(id, nuevaCantidad) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.cantidad = nuevaCantidad;
    if (item.cantidad <= 0) {
      const filtered = cart.filter((i) => i.id !== id);
      saveCart(filtered);
      return filtered;
    }
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
  return [];
}

export function getCartItems() {
  const cart = getCart() || [];
  return cart.reduce((total, item) => total + (item.cantidad || 0), 0);
}

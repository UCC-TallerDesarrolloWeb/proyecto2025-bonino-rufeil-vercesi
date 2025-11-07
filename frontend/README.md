# La Mística – versión React

Proyecto pasado de HTML “puro” a **React** con rutas, componentes reutilizables y servicios separados para carrito, validación y búsqueda.

---

## 1. Requisitos

- Node.js 18+ (o la versión que se use con Vite)
- npm

---

## 2. Cómo correr

```bash
npm install
npm run dev
````

Después de eso se abre la URL que muestra Vite (generalmente `http://localhost:5173`).

---

## 3. Estructura de carpetas

```text
src/
  assets/
  components/
  javascript/
  pages/
  App.jsx
  main.jsx
```

### 3.1 `src/assets/`

Carpeta con todas las imágenes (`hamburguer.png`, `menu.png`, `shopping-cart.png`, `instagram.png`, etc.) que en la versión HTML estaban en `img/`.

Se usan así dentro de los componentes:

```jsx
import hamburguer from "../assets/hamburguer.png";
```

---

### 3.2 `src/components/`

Acá van los componentes reutilizables.

**Navbar.jsx**

* muestra el header completo
* tiene el buscador
* muestra el contador del carrito
* usa `react-router-dom` (`Link`, `useNavigate`)
* escucha el evento global `cart:changed` (que lo emite el service) para actualizar el número del carrito

**hamburguesa.jsx**

* componente para mostrar una hamburguesa
* abre un “modal” con checkbox (igual que en el HTML original)
* recibe las props: `id`, `nombre`, `precio`, `imagen`, `cardClass`, etc.
* valida la cantidad usando el service `cartValidation.js`
* si la cantidad es válida llama a `addToCart(...)` del service
* después cierra el modal desmarcando el checkbox

**ErrorMessage.jsx**

* muestra un mensaje de error debajo del input cuando la validación falla

Otros componentes como `principales_hamburguesas.jsx` o `servicios.jsx` arman secciones de la home usando estos bloques.

---

### 3.3 `src/javascript/` (services)

Acá está la lógica de la app, separada del JSX.

**`cartService.js`**

* maneja el carrito en `localStorage` usando la clave `"cart-la-mistica"`
* funciones:

  * `getCart()` → lee el carrito
  * `addToCart({ id, nombre, precio, cantidad })` → agrega o suma si ya existía
  * `updateQuantity(id, nuevaCantidad)` → cambia la cantidad y si queda en 0 lo borra
  * `removeFromCart(id)` → elimina un producto
  * `clearCart()` → deja el carrito vacío
  * `getCartItems()` → devuelve la **suma de cantidades** (para el numerito del navbar)
* cada vez que el carrito cambia dispara:

  ```js
  window.dispatchEvent(new CustomEvent("cart:changed", { detail: { cart, count } }));
  ```

  y el Navbar escucha esto para actualizarse
* todo está comentado con **JSDoc**

**`cartValidation.js`**

* valida que la cantidad que escribe el usuario sea un número entre 1 y 10
* devuelve un objeto `{ ok, message, value }`
* el componente usa eso para mostrar el mensaje y no dejar agregar si el valor no sirve
* también normaliza el valor (si escriben 0 lo deja en 1, si escriben 50 lo deja en 10)

**`searchService.js`**

* convierte lo que se escribe en el buscador del navbar en una ruta de React
* ejemplos:

  * “inicio” → `/`
  * “menu”, “hamburguesas”, “hamb” → `/menu`
  * “sucursales”, “donde encontrarnos” → `/sucursales`
  * “carrito” → `/carrito`
* la función `handleSearch(search, navigate)` lo hace fácil para el Navbar porque recibe el `navigate` directo

---

### 3.4 `src/pages/`

Son las páginas que se muestran según la URL.

**Home.jsx**
Página de inicio, puede mostrar banner, categorías, servicios, etc.

**Menu.jsx**

* define arrays de hamburguesas (simples, dobles, triples)
* usa el componente `Hamburguesa` dentro de `.map(...)` para no repetir el mismo HTML muchas veces
* si después hay que agregar una nueva hamburguesa, se agrega un objeto más al array y listo

**Carrito.jsx**

* al montar: lee el carrito con `getCart()` y calcula el total con un `reduce(...)`
* muestra la tabla con: Tipo, Cantidad, Precio y Acciones
* cuando se cambia la cantidad se llama a `updateQuantity(...)` del service y se recalcula el total
* cuando se quita o se vacía el carrito se usan `removeFromCart` y `clearCart` del service
* si no hay productos, muestra el mensaje de “Tu carrito está vacío”

**Sucursales.jsx**

* muestra el iframe de Google Maps
* muestra el link a Instagram
* no repite el header porque el header ya está arriba en `App.jsx`

---

## 4. Rutas

En `App.jsx` se deja el navbar una sola vez y abajo se ponen las rutas:

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Carrito from "./pages/Carrito.jsx";
import Sucursales from "./pages/Sucursales.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/sucursales" element={<Sucursales />} />
      </Routes>
    </>
  );
}

export default App;
```

En `main.jsx` se envuelve todo con `<BrowserRouter>` para que funcionen los links.

---

## 5. Flujo del carrito

1. la persona abre una hamburguesa (componente `Hamburguesa`)
2. el componente valida la cantidad con `validateCartQuantity` (archivo `cartValidation.js`)
3. si la validación pasa:

   * llama a `addToCart({ id, nombre, precio, cantidad })`
   * el service guarda en `localStorage`
   * el service dispara el evento `"cart:changed"`
4. el Navbar está escuchando ese evento y actualiza el numerito del carrito
5. en la página `/carrito` se vuelve a leer el carrito y se muestra en la tabla

---

## 6. Búsqueda en el navbar

* el formulario del navbar no hace un submit normal
* usa el service `searchService.js` para interpretar lo que se escribió y navegar dentro de la app
* si en el futuro hay que agregar otra palabra clave (por ejemplo “contacto” → `/contacto`), se hace en `getRouteFromSearch(...)` sin tocar el componente del navbar

---

```
```

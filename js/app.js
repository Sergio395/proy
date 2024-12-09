// Definición de productos
const productos = [
    { id: 1, nombre: 'Elden Ring', precio: 27507.25 , imagen: '../assets/img/elden-ring.jpg'},
    { id: 2, nombre: 'Dragon Dogma II', precio: 47623.22 , imagen: '../assets/img/dragonsdogma2.webp'}
];
// Agregar eventos a los botones de agregar al carrito en la página principal
const botonesAgregar = document.querySelectorAll('.btn');

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (event) => {
        const productoId = parseInt(event.target.closest('.producto').getAttribute('data-id'));
        agregarAlCarrito(productoId);  // Agregar producto al carrito
        
        // Opcional: mostrar un mensaje de que el producto se ha agregado
        alert('Producto agregado al carrito!');
    });
});

// Función para agregar productos al carrito
function agregarAlCarrito(productoId) {
    let carrito = obtenerCarrito();
    const productoExistente = carrito.find(item => item.id === productoId);
    
    if (productoExistente) {
        productoExistente.cantidad += 1; // Si el producto ya está en el carrito, aumenta la cantidad
    } else {
        const producto = productos.find(p => p.id === productoId);
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    guardarCarrito(carrito);
}
// Función para obtener el carrito desde localStorage
function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}
// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para renderizar el carrito en carrito.html
function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = ''; // Limpiar el carrito
    
    let total = 0;
    
    // if (carrito.length === 0) {
    //     carritoContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    //     // Asegurarse de que el total se muestre como 0 cuando el carrito está vacío
    //     const totalElement = document.getElementById('total');
    //     totalElement.textContent = total;
    //     return;
    // }
    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p class="carritoVacio">Tu carrito está vacío. <i class="fa-regular fa-face-sad-tear"></i></p>';
        const totalElement = document.getElementById('total');
        totalElement.textContent = '0'; // Total a 0
    }
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        // Crear el HTML para cada producto en el carrito
        const productoHTML = document.createElement('div');
        productoHTML.classList.add('producto-carrito');
        
        // productoHTML.innerHTML = `
        //     <img class="carrito-producto-imagen" src="${item.imagen}"width="80px" alt="${item.nombre}">
        //     <h2>${item.nombre}</h2>
        //     <p>Precio: $${item.precio}</p>
        //     <p>Cantidad: <button class="restar" data-id="${item.id}">-</button> ${item.cantidad} <button class="sumar" data-id="${item.id}">+</button></p>
        //     <p>Subtotal: $${subtotal}</p>
        //     <button class="eliminar" data-id="${item.id}">Eliminar</button>
        // `;
        productoHTML.innerHTML = `
                    <div class="carrito-producto">
                    
                    <img class="carrito-producto-imagen" src="${item.imagen}"width="80px" alt="${item.nombre}">
                    <span class="producto-nombre">${item.nombre}</span>
                    <span class="producto-cantidad">${item.cantidad}</span>
                    <p>Cantidad: <button class="restar" data-id="${item.id}">-</button> ${item.cantidad} <button class="sumar" data-id="${item.id}">+</button></p>
                    <span class="producto-precio">$${item.precio}</span>
                    <span class="producto-subtotal">Subtotal: $${subtotal}</span>
                    <button class="eliminar" data-id="${item.id}">Eliminar</button>
                    
                  </div>
        `
        carritoContainer.appendChild(productoHTML);
    });

    // Actualizar el total
    const totalElement = document.getElementById('total');
    totalElement.textContent = total;
}

// Agregar eventos para modificar las cantidades del carrito en carrito.html
const carritoContainer = document.getElementById('carrito');

if (carritoContainer) {
    carritoContainer.addEventListener('click', (event) => {
        const productoId = parseInt(event.target.getAttribute('data-id'));
        
        if (event.target.classList.contains('sumar')) {
            let carrito = obtenerCarrito();
            const producto = carrito.find(item => item.id === productoId);
            producto.cantidad++;
            guardarCarrito(carrito);
            renderizarCarrito(); // Volver a renderizar el carrito
        }

        if (event.target.classList.contains('restar')) {
            let carrito = obtenerCarrito();
            const producto = carrito.find(item => item.id === productoId);
            if (producto.cantidad > 1) {
                producto.cantidad--;
                guardarCarrito(carrito);
                renderizarCarrito(); // Volver a renderizar el carrito
            }
        }

        if (event.target.classList.contains('eliminar')) {
            let carrito = obtenerCarrito();
            carrito = carrito.filter(item => item.id !== productoId); // Eliminar el producto del carrito
            guardarCarrito(carrito);
            renderizarCarrito(); // Volver a renderizar el carrito
            
            // Si el carrito está vacío, mostrar el mensaje y poner total en 0
            if (carrito.length === 0) {
                carritoContainer.innerHTML = '<p class="carritoVacio">Tu carrito está vacío. <i class="fa-regular fa-face-sad-tear"></i></p>';
                const totalElement = document.getElementById('total');
                totalElement.textContent = '0'; // Total a 0
            }
        }
    });
}

// Si estamos en la página del carrito, renderizamos los productos del carrito
if (carritoContainer) {
    renderizarCarrito();
}

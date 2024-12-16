// script.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Agregar producto al carrito
function addToCart(id, name, price, image) {
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    saveCart();
    alert('Producto agregado al carrito');
}


// Renderizar carrito en carrito.html
function renderCart() {
    const cartTable = document.querySelector('#cart-table tbody');
    cartTable.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        document.getElementById('cart-message').style.display = 'block';
    } else {
        document.getElementById('cart-message').style.display = 'none';
    }

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
{/* <td><img src="${item.image}" alt="${item.name}" width="50"></td> */}
        const row = `
            <tr>
                
                <td>${item.name}</td>
                <td >
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </td>
                <td>${item.price}</td>
                <td >$${subtotal.toFixed(2)}</td>
                <td >
                    <button class="btn" onclick="removeItem(${index})">Eliminar</button>
                </td>
            </tr>`;
        cartTable.innerHTML += row;
    });

    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}

// Cambiar cantidad de productos
function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
}

// Eliminar un producto del carrito
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Vaciar carrito
function clearCart() {
    if(confirm('Tu carrito de compras se borrará ahora')){
    cart = [];
    saveCart();
    renderCart();
    } else{
        alert('conservó su carrito de compra')
    }

    
}

// Proceder al pago
function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
    } else {
        alert('Ya pagó su compra con éxito');
        clearCart();
    }
}

// Guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Inicializar eventos y renderizar carrito
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    document.getElementById('checkout-btn').addEventListener('click', checkout);
    renderCart();
});

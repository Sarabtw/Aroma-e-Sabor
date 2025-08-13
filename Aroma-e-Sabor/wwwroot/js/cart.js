// Lógica básica para adicionar itens ao carrinho usando localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(i => i.name === item.name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    setCart(cart);
    updateCartCount();
    // Envia para o banco
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
        fetch('/api/carrinho/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: item.name,
                quantidade: 1,
                preco: item.price,
                usuarioId: parseInt(usuarioId)
            })
        });
    }
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const navbar = document.getElementById('cart-count-navbar');
    const footer = document.getElementById('cart-count');
    if (navbar) navbar.textContent = count;
    if (footer) footer.textContent = count;
}


document.addEventListener('DOMContentLoaded', function () {
    // Botões de adicionar ao carrinho
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Só redireciona para login se visitante
            if (localStorage.getItem('visitante') === 'true') {
                e.preventDefault();
                window.location.href = 'login.html';
                return;
            }
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            addToCart({ name, price });
        });
    });
    updateCartCount();
});

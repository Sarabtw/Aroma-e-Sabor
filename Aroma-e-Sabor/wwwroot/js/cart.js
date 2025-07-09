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
    // Se visitante, redireciona para login ao tentar qualquer ação
    if (localStorage.getItem('visitante') === 'true') {
        document.querySelectorAll('.add-cart-btn, .btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = 'login.html';
            });
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.title = 'Faça login para usar esta função';
            btn.style.cursor = 'pointer';
        });
    } else {
        // Botões de adicionar ao carrinho
        document.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const name = btn.getAttribute('data-name');
                const price = parseFloat(btn.getAttribute('data-price'));
                addToCart({ name, price });
            });
        });
    }
    updateCartCount();
});

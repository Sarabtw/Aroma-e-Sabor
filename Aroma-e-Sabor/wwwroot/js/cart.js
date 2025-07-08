// Carrinho simples em localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
    const cart = getCart();
    document.getElementById('cart-count').textContent = cart.length;
    // Atualiza contador na navbar se existir
    var el = document.getElementById('cart-count-navbar');
    if (el) el.textContent = cart.length;
    // Dispara evento para outros scripts
    document.dispatchEvent(new Event('cart-updated'));
}
function addToCart(name, price) {
    const cart = getCart();
    cart.push({ name, price });
    setCart(cart);
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            addToCart(this.dataset.name, this.dataset.price);
        });
    });
    const cartBtn = document.getElementById('cart-footer-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function () {
            const cart = getCart();
            let msg = cart.length ? cart.map(item => `- ${item.name} (R$ ${item.price})`).join('\n') : 'Seu carrinho está vazio.';
            alert('Carrinho:\n' + msg);
        });
    }
});

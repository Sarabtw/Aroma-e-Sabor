// Exibe os itens do carrinho na página carrinho.html
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function renderCart() {
    const cart = getCart();
    const container = document.querySelector('.cart-items');
    if (!container) return;
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#a8002c;">Seu carrinho está vazio.</p>';
        updateResumoPedido();
        return;
    }
    cart.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        // Imagem simples baseada no nome do produto
        let img = '';
        if (item.name.toLowerCase().includes('coxinha')) img = '<img src="img/coxinha.png" />';
        else if (item.name.toLowerCase().includes('enroladinho')) img = '<img src="img/salsicha.png" />';
        else if (item.name.toLowerCase().includes('coca')) img = '<img src="img/coca.png" />';
        const quantidade = item.quantity || 1;
        const precoTotal = quantidade * Number(item.price);
        div.innerHTML = `
            ${img}
            <div class="details">
                <h4>${item.name}</h4>
                <span>R$ ${precoTotal.toFixed(2).replace('.', ',')} <small style='color:#888;font-size:0.95em;'>( ${quantidade} x R$ ${Number(item.price).toFixed(2).replace('.', ',')} )</small></span>
                <div class="cart-qty-controls">
                    <button class="qty-btn" data-action="decrease" data-idx="${idx}">-</button>
                    <span class="cart-qty">${quantidade}</span>
                    <button class="qty-btn" data-action="increase" data-idx="${idx}">+</button>
                    <button class="remove-btn" data-idx="${idx}" title="Remover">🗑️</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
    addCartEventListeners();
    updateResumoPedido();
}

function addCartEventListeners() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-idx'));
            const action = this.getAttribute('data-action');
            let cart = getCart();
            if (action === 'increase') {
                cart[idx].quantity = (cart[idx].quantity || 1) + 1;
            } else if (action === 'decrease') {
                cart[idx].quantity = (cart[idx].quantity || 1) - 1;
                if (cart[idx].quantity < 1) cart[idx].quantity = 1;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            dispatchCartUpdated();
        });
    });
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-idx'));
            let cart = getCart();
            cart.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            dispatchCartUpdated();
        });
    });
}

function dispatchCartUpdated() {
    // Dispara evento para atualizar o resumo do pedido na página
    document.dispatchEvent(new Event('cart-updated'));
}

function updateResumoPedido() {
    // Atualiza o resumo do pedido (subtotal, total, etc.)
    const cart = getCart();
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += (item.price * (item.quantity || 1));
    });
    // Atualiza elementos do resumo (compatível com carrinho.html)
    const subtotalElem = document.getElementById('subtotal');
    const totalElem = document.getElementById('total');
    if (subtotalElem) subtotalElem.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (totalElem) totalElem.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    // Atualiza contador do carrinho na navbar, se existir
    const cartCount = document.querySelectorAll('.cart-count');
    cartCount.forEach(el => el.textContent = cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
}

document.addEventListener('DOMContentLoaded', renderCart);

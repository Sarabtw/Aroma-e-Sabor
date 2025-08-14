// Renderiza os itens do carrinho na página carrinho.html
// Garantir que não haja conflitos de nomes e tudo funcione no escopo global
window.renderResumo = function renderResumo() {
    var cart = JSON.parse(localStorage.getItem('cart') || '[]');
    var subtotal = 0;
    cart.forEach(function (item) {
        subtotal += (Number(item.price) * (item.qty || 1));
    });
    var subtotalEl = document.getElementById('subtotal');
    var totalEl = document.getElementById('total');
    var pickupTimeEl = document.getElementById('pickup-time');
    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (totalEl) totalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (pickupTimeEl) pickupTimeEl.textContent = localStorage.getItem('pickupTime') || '--:--';
}
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Mapeamento simples nome -> imagem
const itemImages = {
    // Lanches
    'Coxinha': 'img/coxinha.png',
    'Enroladinho': 'img/salsicha.png',
    'Empada': 'img/empada.jpg',
    'Pastel': 'img/pastel.jpg',
    'Hambúrguer': 'img/hamburguer assado.jpg',
    'Bolinha de Queijo': 'img/bolinha de queijo.jpg',
    'Kibe': 'img/kibe.jpg',
    'Esfiha': 'img/esfiha.jpg',
    // Bebidas
    'Guaraná': 'img/guarana.png',
    'Pepsi': 'img/pepsi.jpg',
    'Coca-Cola': 'img/coca.png',
    'Limonada': 'img/SodaLimonada.jpg',
    'Sukita': 'img/Sukita.jpg',
    'Suco D+ Uva': 'img/suco uva caixinha.jpg',
    'SucoCaju': 'img/caju.jpg',
    'Toddynho': 'img/toddynho.jpg',
};

// Estilo visual inspirado na imagem 7.png
function getCartItemHTML(item, idx) {
    const imgSrc = itemImages[item.name] || 'img/sacola.png';
    return `
    <div class="cart-item7">
        <div class="cart-item7-imgbox">
            <img src="${imgSrc}" alt="${item.name}" class="cart-item7-img">
        </div>
        <div class="cart-item7-info">
            <div class="cart-item7-title">${item.name}</div>
            <div class="cart-item7-price">R$ ${Number(item.price).toFixed(2).replace('.', ',')}</div>
        </div>
        <div class="cart-item7-qtybox">
            <button class="qty-btn7" data-idx="${idx}" data-action="dec">-</button>
            <span class="cart-item7-qty">${item.qty}</span>
            <button class="qty-btn7" data-idx="${idx}" data-action="inc">+</button>
        </div>
        <div class="cart-item7-total">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
        <button class="remove-btn7" data-idx="${idx}" title="Remover" style="margin-left:10px;background:#fff0f0;color:#a8002c;border:none;border-radius:50%;width:28px;height:28px;font-size:1.2rem;cursor:pointer;box-shadow:0 1px 4px #0001;">×</button>
    </div>
    `;
}

function renderCart() {
    var cart = getCart();
    var container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p style="margin:20px;">Seu carrinho está vazio.</p>';
        window.renderResumo();
        return;
    }
    cart.forEach(function (item, idx) {
        container.innerHTML += getCartItemHTML(item, idx);
    });
    // Adiciona eventos diretamente após renderizar os botões
    Array.prototype.forEach.call(container.querySelectorAll('.qty-btn7'), function (btn) {
        btn.onclick = function () {
            var idx = Number(btn.getAttribute('data-idx'));
            var action = btn.getAttribute('data-action');
            var cart = getCart();
            if (action === 'inc') {
                cart[idx].qty += 1;
            } else if (action === 'dec') {
                cart[idx].qty -= 1;
                if (cart[idx].qty < 1) cart[idx].qty = 1;
            }
            setCart(cart);
            renderCart();
            window.renderResumo();
        };
    });
    Array.prototype.forEach.call(container.querySelectorAll('.remove-btn7'), function (btn) {
        btn.onclick = function () {
            var idx = Number(btn.getAttribute('data-idx'));
            var cart = getCart();
            cart.splice(idx, 1);
            setCart(cart);
            renderCart();
            window.renderResumo();
        };
    });
    window.renderResumo();
}


document.addEventListener('DOMContentLoaded', function () {
    renderCart();
});

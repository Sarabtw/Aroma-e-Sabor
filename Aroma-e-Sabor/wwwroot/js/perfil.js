// Salva e recupera o nome do usuário logado ou visitante
function setUsuarioLogado(nome) {
    localStorage.setItem('usuarioLogado', nome);
    localStorage.removeItem('cart'); // Limpa carrinho ao trocar de perfil
}

function getUsuarioLogado() {
    return localStorage.getItem('usuarioLogado') || 'Visitante';
}

// Exibe o nome do usuário no topo da home

function mostrarUsuarioNoTopo() {
    var userInfo = document.querySelector('.user-info');
    if (userInfo) {
        var isVisitante = localStorage.getItem('visitante') === 'true';
        var nome = isVisitante ? 'Visitante' : getUsuarioLogado();
        var foto = isVisitante ? 'img/usuario.png' : (localStorage.getItem('fotoPerfil') || 'avatar.jpg');
        userInfo.innerHTML = `<span>Bem-vindo <strong>${nome}</strong></span>`;
        userInfo.innerHTML += `\n<img src="${foto}" alt="Usuário" class="avatar" />`;
        userInfo.innerHTML += `\n<a href="carrinho.html" id="cart-navbar-btn" style="margin-left:18px;font-size:1.5rem;text-decoration:none;position:relative;">🛒<span id="cart-count-navbar" style="position:absolute;top:-8px;right:-12px;background:#a8002c;color:#fff;font-size:0.85rem;padding:1px 6px;border-radius:10px;min-width:18px;text-align:center;">0</span></a>`;
        // Botão sair (não exibe para visitante)
        if (!isVisitante) {
            userInfo.innerHTML += `\n<button id="btn-logout" style="margin-left:18px;padding:6px 16px;background:#a8002c;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;">Sair</button>`;
        }
        // Bloqueia carrinho da navbar para visitante
        setTimeout(function () {
            var cartBtn = document.getElementById('cart-navbar-btn');
            if (cartBtn && isVisitante) {
                cartBtn.removeAttribute('href');
                cartBtn.style.opacity = '0.5';
                cartBtn.style.cursor = 'not-allowed';
                cartBtn.title = 'Faça login para acessar o carrinho';
                cartBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    window.location.href = 'login.html';
                });
            }
            // Lógica do botão sair
            var btnLogout = document.getElementById('btn-logout');
            if (btnLogout) {
                btnLogout.addEventListener('click', function () {
                    localStorage.clear();
                    localStorage.setItem('visitante', 'true');
                    window.location.href = 'login.html';
                });
            }
        }, 10);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    mostrarUsuarioNoTopo();
    if (typeof updateCartCount === 'function') updateCartCount();
});

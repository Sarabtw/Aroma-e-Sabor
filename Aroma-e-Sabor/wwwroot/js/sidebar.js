// Script para abrir e fechar o menu lateral
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar-menu');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', toggleSidebar);
    }
    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function (event) {
        const sidebar = document.getElementById('sidebar-menu');
        if (sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
});

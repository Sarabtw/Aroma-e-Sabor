// Integração para salvar pedido no backend ao finalizar
async function salvarPedidoNoBackend(metodo) {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.length) return;
    let total = 0;
    const itens = cart.map(item => {
        total += (Number(item.price) * (item.qty || 1));
        return {
            nome: item.name,
            quantidade: item.qty || 1,
            preco: Number(item.price)
        };
    });
    const pedido = {
        usuarioId: Number(usuarioId),
        total: total,
        metodoPagamento: metodo,
        itens: itens
    };
    try {
        await fetch('/api/pedido/criar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });
    } catch (e) {
        // Falha silenciosa, mas pode exibir erro se quiser
    }
}

// Hook para integração no fluxo de finalização
window.salvarPedidoNoBackend = salvarPedidoNoBackend;

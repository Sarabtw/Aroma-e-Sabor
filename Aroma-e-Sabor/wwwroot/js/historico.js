// Função para buscar e exibir o histórico de pedidos do usuário logado
async function carregarHistoricoPedidos() {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) return;
    const historicoDiv = document.getElementById('historico-pedidos');
    historicoDiv.innerHTML = '<div style="color:#a8002c;">Carregando histórico...</div>';
    try {
        const resp = await fetch(`/api/pedido/usuario/${usuarioId}`);
        if (!resp.ok) throw new Error('Erro ao buscar pedidos');
        const pedidos = await resp.json();
        if (!pedidos.length) {
            historicoDiv.innerHTML = '<div style="color:#a8002c;">Nenhum pedido encontrado.</div>';
            return;
        }
        historicoDiv.innerHTML = pedidos.map(p => `
            <div style="background:#fff;border-radius:10px;padding:12px 18px;margin-bottom:10px;">
                <div style="font-size:1.05rem;font-weight:bold;color:#a8002c;">Pedido #${p.id} - ${new Date(p.dataPedido).toLocaleString('pt-BR')}</div>
                <ul style="margin:6px 0 6px 0;padding-left:18px;">
                    ${p.itens.map(i => `<li>${i.quantidade}x ${i.nome} <span style='color:#888;'>(R$ ${(i.preco * i.quantidade).toFixed(2).replace('.', ',')})</span></li>`).join('')}
                </ul>
                <div><small>Método: <b>${p.metodoPagamento}</b></small> — <b style="color:#222;">Total: R$ ${p.total.toFixed(2).replace('.', ',')}</b></div>
                <div style="font-size:0.95rem;color:#555;">Status: ${p.status}</div>
            </div>
        `).join('');
    } catch (e) {
        historicoDiv.innerHTML = '<div style="color:#a8002c;">Erro ao carregar histórico.</div>';
    }
}

document.addEventListener('DOMContentLoaded', carregarHistoricoPedidos);

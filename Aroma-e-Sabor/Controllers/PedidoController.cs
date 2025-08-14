using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Aroma_e_Sabor.Data;
using Aroma_e_Sabor.Models;

namespace Aroma_e_Sabor.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PedidoController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/pedido/criar
        [HttpPost("criar")]
        public async Task<IActionResult> CriarPedido([FromBody] Pedido pedido)
        {
            if (pedido == null || pedido.Itens == null || pedido.Itens.Count == 0)
                return BadRequest("Pedido inválido");
            pedido.DataPedido = DateTime.Now;
            pedido.Status = "Pendente";
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();
            return Ok(pedido);
        }

        // GET: api/pedido/usuario/5
        [HttpGet("usuario/{usuarioId}")]
        public async Task<IActionResult> GetPedidosUsuario(int usuarioId)
        {
            var pedidos = await _context.Pedidos
                .Include(p => p.Itens)
                .Where(p => p.UsuarioId == usuarioId)
                .OrderByDescending(p => p.DataPedido)
                .ToListAsync();
            return Ok(pedidos);
        }
    }
}

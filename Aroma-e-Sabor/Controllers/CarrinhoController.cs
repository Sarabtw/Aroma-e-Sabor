using Microsoft.AspNetCore.Mvc;
using Aroma_e_Sabor.Data;
using Aroma_e_Sabor.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace Aroma_e_Sabor.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarrinhoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CarrinhoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/carrinho/{usuarioId}
        [HttpGet("{usuarioId}")]
        public async Task<IActionResult> GetCarrinho(int usuarioId)
        {
            var itens = await _context.ItensCarrinho.Where(i => i.UsuarioId == usuarioId).ToListAsync();
            return Ok(itens);
        }

        // POST: api/carrinho/adicionar
        [HttpPost("adicionar")]
        public async Task<IActionResult> Adicionar([FromBody] itensCarrinho item)
        {
            var existente = await _context.ItensCarrinho.FirstOrDefaultAsync(i => i.UsuarioId == item.UsuarioId && i.Nome == item.Nome);
            if (existente != null)
            {
                existente.Quantidade += item.Quantidade;
            }
            else
            {
                var novoItem = new itensCarrinho
                {
                    UsuarioId = item.UsuarioId,
                    Nome = item.Nome,
                    Quantidade = item.Quantidade,
                    // Adicione outros campos necessários aqui
                };
                _context.ItensCarrinho.Add(novoItem);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        // POST: api/carrinho/remover
        [HttpPost("remover")]
        public async Task<IActionResult> Remover([FromBody] itensCarrinho item)
        {
            var existente = await _context.ItensCarrinho.FirstOrDefaultAsync(i => i.UsuarioId == item.UsuarioId && i.Nome == item.Nome);
            if (existente != null)
            {
                _context.ItensCarrinho.Remove(existente);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        // POST: api/carrinho/limpar
        [HttpPost("limpar")]
        public async Task<IActionResult> Limpar([FromBody] int usuarioId)
        {
            var itens = _context.ItensCarrinho.Where(i => i.UsuarioId == usuarioId);
            _context.ItensCarrinho.RemoveRange(itens);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}

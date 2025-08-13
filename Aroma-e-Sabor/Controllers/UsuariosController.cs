using Microsoft.AspNetCore.Mvc;
using Aroma_e_Sabor.Data;
using Aroma_e_Sabor.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Aroma_e_Sabor.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("cadastro")]
        public async Task<IActionResult> Cadastrar([FromBody] Usuario usuario)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email))
                return BadRequest("Email já cadastrado.");
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return Ok(new { usuario.Id, usuario.Nome, usuario.Email });
        }

        public class LoginDto
        {
            public string? Email { get; set; }
            public string? Senha { get; set; }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            if (string.IsNullOrWhiteSpace(login.Email) || string.IsNullOrWhiteSpace(login.Senha))
                return BadRequest("Email e senha são obrigatórios.");
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == login.Email && u.Senha == login.Senha);
            if (usuario == null)
                return Unauthorized("Email ou senha inválidos.");
            return Ok(new { usuario.Id, usuario.Nome, usuario.Email, usuario.FotoPerfil });
        }
    }
}

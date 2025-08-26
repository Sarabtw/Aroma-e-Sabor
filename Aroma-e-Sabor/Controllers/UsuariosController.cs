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

        [HttpPost("esqueci-senha")]
        public async Task<IActionResult> EsqueciSenha([FromBody] string email)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
            if (usuario == null)
                return BadRequest("E-mail não encontrado.");

            // Gera token seguro
            var token = Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(32));
            usuario.TokenRedefinicao = token;
            usuario.TokenRedefinicaoValidade = DateTime.UtcNow.AddHours(1);
            await _context.SaveChangesAsync();

            // Envia e-mail (ajuste SMTP conforme seu provedor)
            var link = $"https://SEUSITE.com/redefinir-senha.html?token={token}";
            var mail = new System.Net.Mail.MailMessage("seu@email.com", email, "Redefinição de senha", $"Clique para redefinir: {link}");
            using (var smtp = new System.Net.Mail.SmtpClient("smtp.seuprovedor.com"))
            {
                smtp.Credentials = new System.Net.NetworkCredential("usuario", "senha");
                smtp.Send(mail);
            }

            return Ok("E-mail de redefinição enviado.");
        }

        public class RedefinirSenhaDto
        {
            public string? Token { get; set; }
            public string? NovaSenha { get; set; }
        }

        [HttpPost("redefinir-senha")]
        public async Task<IActionResult> RedefinirSenha([FromBody] RedefinirSenhaDto dto)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.TokenRedefinicao == dto.Token && u.TokenRedefinicaoValidade > DateTime.UtcNow);
            if (usuario == null)
                return BadRequest("Token inválido ou expirado.");

            usuario.Senha = dto.NovaSenha;
            usuario.TokenRedefinicao = null;
            usuario.TokenRedefinicaoValidade = null;
            await _context.SaveChangesAsync();

            return Ok("Senha redefinida com sucesso.");
        }
    }
}

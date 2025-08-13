using System.ComponentModel.DataAnnotations;

namespace Aroma_e_Sabor.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Nome { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Senha { get; set; }
        public string? FotoPerfil { get; set; }
    }
}

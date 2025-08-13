using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aroma_e_Sabor.Models
{
    [Table("itensCarrinho")]
    public class itensCarrinho
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UsuarioId { get; set; }
        [Required]
        public string Nome { get; set; } = string.Empty;
        [Required]
        public int Quantidade { get; set; }
        [Required]
        public decimal Preco { get; set; }
        public Usuario? Usuario { get; set; }
    }
}

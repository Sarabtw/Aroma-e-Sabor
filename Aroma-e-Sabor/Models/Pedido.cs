using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aroma_e_Sabor.Models
{
    [Table("Pedidos")]
    public class Pedido
    {
        [Key]
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public DateTime DataPedido { get; set; } = DateTime.Now;
        public decimal Total { get; set; }
        public string MetodoPagamento { get; set; } = string.Empty;
        public string? HorarioRetirada { get; set; }
        public string Status { get; set; } = "Recebido";
        public virtual List<PedidoItem> Itens { get; set; } = new();
        public virtual Usuario? Usuario { get; set; }
    }

    [Table("PedidoItens")]
    public class PedidoItem
    {
        [Key]
        public int Id { get; set; }
        public int PedidoId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Quantidade { get; set; }
        public decimal Preco { get; set; }
        [ForeignKey("PedidoId")]
        public virtual Pedido? Pedido { get; set; }
    }
}

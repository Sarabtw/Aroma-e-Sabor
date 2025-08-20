using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aroma_e_Sabor.Migrations
{
    /// <inheritdoc />
    public partial class AddHorarioRetiradaToPedido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HorarioRetirada",
                table: "Pedidos",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HorarioRetirada",
                table: "Pedidos");
        }
    }
}

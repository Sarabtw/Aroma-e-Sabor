using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aroma_e_Sabor.Migrations
{
    /// <inheritdoc />
    public partial class AddCamposRedefinicaoSenha : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TokenRedefinicao",
                table: "Usuarios",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "TokenRedefinicaoValidade",
                table: "Usuarios",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TokenRedefinicao",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "TokenRedefinicaoValidade",
                table: "Usuarios");
        }
    }
}

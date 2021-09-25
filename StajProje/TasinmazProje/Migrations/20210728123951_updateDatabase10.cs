using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace TasinmazProje.Migrations
{
    public partial class updateDatabase10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Loglar",
                table: "Loglar");

            migrationBuilder.DropColumn(
                name: "KullaniciId",
                table: "Loglar");

            migrationBuilder.AddColumn<int>(
                name: "LogId",
                table: "Loglar",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Loglar",
                table: "Loglar",
                column: "LogId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Loglar",
                table: "Loglar");

            migrationBuilder.DropColumn(
                name: "LogId",
                table: "Loglar");

            migrationBuilder.AddColumn<int>(
                name: "KullaniciId",
                table: "Loglar",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Loglar",
                table: "Loglar",
                column: "KullaniciId");
        }
    }
}

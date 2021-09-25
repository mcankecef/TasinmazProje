using Microsoft.EntityFrameworkCore.Migrations;

namespace TasinmazProje.Migrations
{
    public partial class updateDatabase5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Iller");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Ilceler");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Iller",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Ilceler",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}

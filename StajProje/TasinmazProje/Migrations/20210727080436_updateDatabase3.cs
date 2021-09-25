using Microsoft.EntityFrameworkCore.Migrations;

namespace TasinmazProje.Migrations
{
    public partial class updateDatabase3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Mahalleler");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Mahalleler",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}

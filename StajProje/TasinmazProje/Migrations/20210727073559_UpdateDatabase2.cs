using Microsoft.EntityFrameworkCore.Migrations;

namespace TasinmazProje.Migrations
{
    public partial class UpdateDatabase2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mahaleler_Ilceler_IlceId",
                table: "Mahaleler");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasinmazlar_Mahaleler_MahalleId",
                table: "Tasinmazlar");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mahaleler",
                table: "Mahaleler");

            migrationBuilder.RenameTable(
                name: "Mahaleler",
                newName: "Mahalleler");

            migrationBuilder.RenameIndex(
                name: "IX_Mahaleler_IlceId",
                table: "Mahalleler",
                newName: "IX_Mahalleler_IlceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mahalleler",
                table: "Mahalleler",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mahalleler_Ilceler_IlceId",
                table: "Mahalleler",
                column: "IlceId",
                principalTable: "Ilceler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasinmazlar_Mahalleler_MahalleId",
                table: "Tasinmazlar",
                column: "MahalleId",
                principalTable: "Mahalleler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mahalleler_Ilceler_IlceId",
                table: "Mahalleler");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasinmazlar_Mahalleler_MahalleId",
                table: "Tasinmazlar");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mahalleler",
                table: "Mahalleler");

            migrationBuilder.RenameTable(
                name: "Mahalleler",
                newName: "Mahaleler");

            migrationBuilder.RenameIndex(
                name: "IX_Mahalleler_IlceId",
                table: "Mahaleler",
                newName: "IX_Mahaleler_IlceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mahaleler",
                table: "Mahaleler",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mahaleler_Ilceler_IlceId",
                table: "Mahaleler",
                column: "IlceId",
                principalTable: "Ilceler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasinmazlar_Mahaleler_MahalleId",
                table: "Tasinmazlar",
                column: "MahalleId",
                principalTable: "Mahaleler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

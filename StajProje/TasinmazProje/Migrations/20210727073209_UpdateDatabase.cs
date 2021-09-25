using Microsoft.EntityFrameworkCore.Migrations;

namespace TasinmazProje.Migrations
{
    public partial class UpdateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mahaleler_Iller_IlId",
                table: "Mahaleler");

            migrationBuilder.DropIndex(
                name: "IX_Mahaleler_IlId",
                table: "Mahaleler");

            migrationBuilder.DropColumn(
                name: "IlId",
                table: "Mahaleler");

            migrationBuilder.DropColumn(
                name: "IlceId",
                table: "Ilceler");

            migrationBuilder.AddColumn<int>(
                name: "IlceId",
                table: "Mahaleler",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Mahaleler",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Iller",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "IlceAdi",
                table: "Ilceler",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Ilceler",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Mahaleler_IlceId",
                table: "Mahaleler",
                column: "IlceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Mahaleler_Ilceler_IlceId",
                table: "Mahaleler",
                column: "IlceId",
                principalTable: "Ilceler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mahaleler_Ilceler_IlceId",
                table: "Mahaleler");

            migrationBuilder.DropIndex(
                name: "IX_Mahaleler_IlceId",
                table: "Mahaleler");

            migrationBuilder.DropColumn(
                name: "IlceId",
                table: "Mahaleler");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Mahaleler");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Iller");

            migrationBuilder.DropColumn(
                name: "IlceAdi",
                table: "Ilceler");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Ilceler");

            migrationBuilder.AddColumn<int>(
                name: "IlId",
                table: "Mahaleler",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IlceId",
                table: "Ilceler",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Mahaleler_IlId",
                table: "Mahaleler",
                column: "IlId");

            migrationBuilder.AddForeignKey(
                name: "FK_Mahaleler_Iller_IlId",
                table: "Mahaleler",
                column: "IlId",
                principalTable: "Iller",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

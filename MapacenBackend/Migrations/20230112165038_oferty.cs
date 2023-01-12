using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MapacenBackend.Migrations
{
    public partial class oferty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Offers_OfferId",
                table: "Comments");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Offers_OfferId",
                table: "Comments",
                column: "OfferId",
                principalTable: "Offers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Offers_OfferId",
                table: "Comments");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Offers_OfferId",
                table: "Comments",
                column: "OfferId",
                principalTable: "Offers",
                principalColumn: "Id");
        }
    }
}

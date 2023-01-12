using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MapacenBackend.Migrations
{
    public partial class powiatyNaprawa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Counties_CountyId",
                table: "Addresses");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Counties_CountyId",
                table: "Addresses",
                column: "CountyId",
                principalTable: "Counties",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Counties_CountyId",
                table: "Addresses");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Counties_CountyId",
                table: "Addresses",
                column: "CountyId",
                principalTable: "Counties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

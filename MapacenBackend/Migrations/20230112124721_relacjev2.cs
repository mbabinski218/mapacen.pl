using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MapacenBackend.Migrations
{
    public partial class relacjev2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dislikers_Comments_CommentId",
                table: "Dislikers");

            migrationBuilder.DropForeignKey(
                name: "FK_Likers_Comments_CommentId",
                table: "Likers");

            migrationBuilder.AddForeignKey(
                name: "FK_Dislikers_Comments_CommentId",
                table: "Dislikers",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Likers_Comments_CommentId",
                table: "Likers",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dislikers_Comments_CommentId",
                table: "Dislikers");

            migrationBuilder.DropForeignKey(
                name: "FK_Likers_Comments_CommentId",
                table: "Likers");

            migrationBuilder.AddForeignKey(
                name: "FK_Dislikers_Comments_CommentId",
                table: "Dislikers",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Likers_Comments_CommentId",
                table: "Likers",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id");
        }
    }
}

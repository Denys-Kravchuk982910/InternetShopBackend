using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InternetShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class Modifystoryfields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StoryId",
                table: "tblStories");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "tblStories",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "tblStories");

            migrationBuilder.AddColumn<int>(
                name: "StoryId",
                table: "tblStories",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}

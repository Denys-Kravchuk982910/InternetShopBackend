using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InternetShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddCountField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "FilterProducts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "FilterProducts");
        }
    }
}

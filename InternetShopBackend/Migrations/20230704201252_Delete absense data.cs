using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InternetShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class Deleteabsensedata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblOrderProducts_FilterProducts_AppFilterProductProductId_A~",
                table: "tblOrderProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblOrderProducts_AppFilterProductProductId_AppFilterProduct~",
                table: "tblOrderProducts");

            migrationBuilder.DropColumn(
                name: "AppFilterProductFilterId",
                table: "tblOrderProducts");

            migrationBuilder.DropColumn(
                name: "AppFilterProductProductId",
                table: "tblOrderProducts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppFilterProductFilterId",
                table: "tblOrderProducts",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AppFilterProductProductId",
                table: "tblOrderProducts",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblOrderProducts_AppFilterProductProductId_AppFilterProduct~",
                table: "tblOrderProducts",
                columns: new[] { "AppFilterProductProductId", "AppFilterProductFilterId" });

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrderProducts_FilterProducts_AppFilterProductProductId_A~",
                table: "tblOrderProducts",
                columns: new[] { "AppFilterProductProductId", "AppFilterProductFilterId" },
                principalTable: "FilterProducts",
                principalColumns: new[] { "ProductId", "FilterId" });
        }
    }
}

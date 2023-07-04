using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InternetShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeFilter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblOrderProducts_FilterProducts_FilterProductProductId_Filt~",
                table: "tblOrderProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblOrderProducts_FilterProductProductId_FilterProductFilter~",
                table: "tblOrderProducts");

            migrationBuilder.DropColumn(
                name: "FilterProductFilterId",
                table: "tblOrderProducts");

            migrationBuilder.DropColumn(
                name: "FilterProductId",
                table: "tblOrderProducts");

            migrationBuilder.RenameColumn(
                name: "FilterProductProductId",
                table: "tblOrderProducts",
                newName: "FilterId");

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

            migrationBuilder.CreateIndex(
                name: "IX_tblOrderProducts_FilterId",
                table: "tblOrderProducts",
                column: "FilterId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrderProducts_FilterProducts_AppFilterProductProductId_A~",
                table: "tblOrderProducts",
                columns: new[] { "AppFilterProductProductId", "AppFilterProductFilterId" },
                principalTable: "FilterProducts",
                principalColumns: new[] { "ProductId", "FilterId" });

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrderProducts_tblFilters_FilterId",
                table: "tblOrderProducts",
                column: "FilterId",
                principalTable: "tblFilters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblOrderProducts_FilterProducts_AppFilterProductProductId_A~",
                table: "tblOrderProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOrderProducts_tblFilters_FilterId",
                table: "tblOrderProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblOrderProducts_AppFilterProductProductId_AppFilterProduct~",
                table: "tblOrderProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblOrderProducts_FilterId",
                table: "tblOrderProducts");

            migrationBuilder.DropColumn(
                name: "AppFilterProductFilterId",
                table: "tblOrderProducts");

            migrationBuilder.DropColumn(
                name: "AppFilterProductProductId",
                table: "tblOrderProducts");

            migrationBuilder.RenameColumn(
                name: "FilterId",
                table: "tblOrderProducts",
                newName: "FilterProductProductId");

            migrationBuilder.AddColumn<int>(
                name: "FilterProductFilterId",
                table: "tblOrderProducts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FilterProductId",
                table: "tblOrderProducts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_tblOrderProducts_FilterProductProductId_FilterProductFilter~",
                table: "tblOrderProducts",
                columns: new[] { "FilterProductProductId", "FilterProductFilterId" });

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrderProducts_FilterProducts_FilterProductProductId_Filt~",
                table: "tblOrderProducts",
                columns: new[] { "FilterProductProductId", "FilterProductFilterId" },
                principalTable: "FilterProducts",
                principalColumns: new[] { "ProductId", "FilterId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}

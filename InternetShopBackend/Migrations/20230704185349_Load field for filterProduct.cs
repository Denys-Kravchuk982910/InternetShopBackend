using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InternetShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class LoadfieldforfilterProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<int>(
                name: "FilterProductProductId",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "FilterProductProductId",
                table: "tblOrderProducts");
        }
    }
}

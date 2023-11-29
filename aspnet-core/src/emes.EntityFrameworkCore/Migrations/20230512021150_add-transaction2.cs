using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class addtransaction2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_materialTransactionsModels_MaterialTransactionsTypesModel_TransactionTypeId",
                table: "materialTransactionsModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MaterialTransactionsTypesModel",
                table: "MaterialTransactionsTypesModel");

            migrationBuilder.RenameTable(
                name: "MaterialTransactionsTypesModel",
                newName: "materialTransactionsTypesModels");

            migrationBuilder.AddPrimaryKey(
                name: "PK_materialTransactionsTypesModels",
                table: "materialTransactionsTypesModels",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_materialTransactionsModels_materialTransactionsTypesModels_TransactionTypeId",
                table: "materialTransactionsModels",
                column: "TransactionTypeId",
                principalTable: "materialTransactionsTypesModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_materialTransactionsModels_materialTransactionsTypesModels_TransactionTypeId",
                table: "materialTransactionsModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_materialTransactionsTypesModels",
                table: "materialTransactionsTypesModels");

            migrationBuilder.RenameTable(
                name: "materialTransactionsTypesModels",
                newName: "MaterialTransactionsTypesModel");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MaterialTransactionsTypesModel",
                table: "MaterialTransactionsTypesModel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_materialTransactionsModels_MaterialTransactionsTypesModel_TransactionTypeId",
                table: "materialTransactionsModels",
                column: "TransactionTypeId",
                principalTable: "MaterialTransactionsTypesModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

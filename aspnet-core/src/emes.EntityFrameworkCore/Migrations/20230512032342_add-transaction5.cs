using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class addtransaction5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_materialTransactionsModels_MaterialMasterData_MaterialNumberId",
                table: "materialTransactionsModels");

            migrationBuilder.DropForeignKey(
                name: "FK_materialTransactionsModels_materialTransactionsTypesModels_TransactionTypeId",
                table: "materialTransactionsModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_materialTransactionsTypesModels",
                table: "materialTransactionsTypesModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_materialTransactionsModels",
                table: "materialTransactionsModels");

            migrationBuilder.RenameTable(
                name: "materialTransactionsTypesModels",
                newName: "MaterialTransactionsTypes");

            migrationBuilder.RenameTable(
                name: "materialTransactionsModels",
                newName: "MaterialTransactions");

            migrationBuilder.RenameIndex(
                name: "IX_materialTransactionsModels_TransactionTypeId",
                table: "MaterialTransactions",
                newName: "IX_MaterialTransactions_TransactionTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_materialTransactionsModels_MaterialNumberId",
                table: "MaterialTransactions",
                newName: "IX_MaterialTransactions_MaterialNumberId");

            migrationBuilder.AlterColumn<string>(
                name: "TransactionNumber",
                table: "MaterialTransactions",
                type: "nvarchar(25)",
                maxLength: 25,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "MaterialNumberId",
                table: "MaterialTransactions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MaterialLot",
                table: "MaterialTransactions",
                type: "nvarchar(25)",
                maxLength: 25,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MaterialTransactionsTypes",
                table: "MaterialTransactionsTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MaterialTransactions",
                table: "MaterialTransactions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialTransactions_MaterialMasterData_MaterialNumberId",
                table: "MaterialTransactions",
                column: "MaterialNumberId",
                principalTable: "MaterialMasterData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialTransactions_MaterialTransactionsTypes_TransactionTypeId",
                table: "MaterialTransactions",
                column: "TransactionTypeId",
                principalTable: "MaterialTransactionsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaterialTransactions_MaterialMasterData_MaterialNumberId",
                table: "MaterialTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_MaterialTransactions_MaterialTransactionsTypes_TransactionTypeId",
                table: "MaterialTransactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MaterialTransactionsTypes",
                table: "MaterialTransactionsTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MaterialTransactions",
                table: "MaterialTransactions");

            migrationBuilder.RenameTable(
                name: "MaterialTransactionsTypes",
                newName: "materialTransactionsTypesModels");

            migrationBuilder.RenameTable(
                name: "MaterialTransactions",
                newName: "materialTransactionsModels");

            migrationBuilder.RenameIndex(
                name: "IX_MaterialTransactions_TransactionTypeId",
                table: "materialTransactionsModels",
                newName: "IX_materialTransactionsModels_TransactionTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_MaterialTransactions_MaterialNumberId",
                table: "materialTransactionsModels",
                newName: "IX_materialTransactionsModels_MaterialNumberId");

            migrationBuilder.AlterColumn<string>(
                name: "TransactionNumber",
                table: "materialTransactionsModels",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(25)",
                oldMaxLength: 25,
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "MaterialNumberId",
                table: "materialTransactionsModels",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "MaterialLot",
                table: "materialTransactionsModels",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(25)",
                oldMaxLength: 25,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_materialTransactionsTypesModels",
                table: "materialTransactionsTypesModels",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_materialTransactionsModels",
                table: "materialTransactionsModels",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_materialTransactionsModels_MaterialMasterData_MaterialNumberId",
                table: "materialTransactionsModels",
                column: "MaterialNumberId",
                principalTable: "MaterialMasterData",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_materialTransactionsModels_materialTransactionsTypesModels_TransactionTypeId",
                table: "materialTransactionsModels",
                column: "TransactionTypeId",
                principalTable: "materialTransactionsTypesModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

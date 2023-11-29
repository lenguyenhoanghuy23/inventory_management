using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class plant1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodIssues_MaterialTransactions_TransactionId",
                table: "GoodIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_GoodReceipts_MaterialTransactions_TransactionId",
                table: "GoodReceipts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GoodReceipts",
                table: "GoodReceipts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GoodIssues",
                table: "GoodIssues");

            migrationBuilder.RenameTable(
                name: "GoodReceipts",
                newName: "MaterialGoodReceipts");

            migrationBuilder.RenameTable(
                name: "GoodIssues",
                newName: "MaterialGoodIssues");

            migrationBuilder.RenameIndex(
                name: "IX_GoodReceipts_TransactionId",
                table: "MaterialGoodReceipts",
                newName: "IX_MaterialGoodReceipts_TransactionId");

            migrationBuilder.RenameIndex(
                name: "IX_GoodIssues_TransactionId",
                table: "MaterialGoodIssues",
                newName: "IX_MaterialGoodIssues_TransactionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MaterialGoodReceipts",
                table: "MaterialGoodReceipts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MaterialGoodIssues",
                table: "MaterialGoodIssues",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "MaterialPlant",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PlantCode = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    PlantName = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    description = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialPlant", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialGoodIssues_MaterialTransactions_TransactionId",
                table: "MaterialGoodIssues",
                column: "TransactionId",
                principalTable: "MaterialTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialGoodReceipts_MaterialTransactions_TransactionId",
                table: "MaterialGoodReceipts",
                column: "TransactionId",
                principalTable: "MaterialTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaterialGoodIssues_MaterialTransactions_TransactionId",
                table: "MaterialGoodIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_MaterialGoodReceipts_MaterialTransactions_TransactionId",
                table: "MaterialGoodReceipts");

            migrationBuilder.DropTable(
                name: "MaterialPlant");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MaterialGoodReceipts",
                table: "MaterialGoodReceipts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MaterialGoodIssues",
                table: "MaterialGoodIssues");

            migrationBuilder.RenameTable(
                name: "MaterialGoodReceipts",
                newName: "GoodReceipts");

            migrationBuilder.RenameTable(
                name: "MaterialGoodIssues",
                newName: "GoodIssues");

            migrationBuilder.RenameIndex(
                name: "IX_MaterialGoodReceipts_TransactionId",
                table: "GoodReceipts",
                newName: "IX_GoodReceipts_TransactionId");

            migrationBuilder.RenameIndex(
                name: "IX_MaterialGoodIssues_TransactionId",
                table: "GoodIssues",
                newName: "IX_GoodIssues_TransactionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GoodReceipts",
                table: "GoodReceipts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GoodIssues",
                table: "GoodIssues",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GoodIssues_MaterialTransactions_TransactionId",
                table: "GoodIssues",
                column: "TransactionId",
                principalTable: "MaterialTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GoodReceipts_MaterialTransactions_TransactionId",
                table: "GoodReceipts",
                column: "TransactionId",
                principalTable: "MaterialTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

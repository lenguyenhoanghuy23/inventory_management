using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class updateSU3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaterialTransactions_TransactionGroup_TransationGroupId",
                table: "MaterialTransactions");

            migrationBuilder.DropTable(
                name: "TransactionGroup");

            migrationBuilder.DropIndex(
                name: "IX_MaterialTransactions_TransationGroupId",
                table: "MaterialTransactions");

            migrationBuilder.DropColumn(
                name: "TransactionNumber",
                table: "MaterialTransactions");

            migrationBuilder.RenameColumn(
                name: "TransationGroupId",
                table: "MaterialTransactions",
                newName: "TransationGroup");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TransationGroup",
                table: "MaterialTransactions",
                newName: "TransationGroupId");

            migrationBuilder.AddColumn<string>(
                name: "TransactionNumber",
                table: "MaterialTransactions",
                type: "nvarchar(25)",
                maxLength: 25,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TransactionGroup",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    TransactionGroup = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionGroup", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaterialTransactions_TransationGroupId",
                table: "MaterialTransactions",
                column: "TransationGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialTransactions_TransactionGroup_TransationGroupId",
                table: "MaterialTransactions",
                column: "TransationGroupId",
                principalTable: "TransactionGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

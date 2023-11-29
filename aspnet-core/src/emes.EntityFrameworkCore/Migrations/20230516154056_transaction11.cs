using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class transaction11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaterialTransactions");

            migrationBuilder.DropTable(
                name: "MaterialTransactionsTypes");

            migrationBuilder.DropTable(
                name: "TransactionGroup");

            migrationBuilder.DropColumn(
                name: "MaterialGroup",
                table: "MaterialMasterData");

            migrationBuilder.AddColumn<Guid>(
                name: "MaterialGroupId",
                table: "MaterialMasterData",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "MaterialGroup",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    materialGroup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_MaterialGroup", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaterialMasterData_MaterialGroupId",
                table: "MaterialMasterData",
                column: "MaterialGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialMasterData_MaterialGroup_MaterialGroupId",
                table: "MaterialMasterData",
                column: "MaterialGroupId",
                principalTable: "MaterialGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaterialMasterData_MaterialGroup_MaterialGroupId",
                table: "MaterialMasterData");

            migrationBuilder.DropTable(
                name: "MaterialGroup");

            migrationBuilder.DropIndex(
                name: "IX_MaterialMasterData_MaterialGroupId",
                table: "MaterialMasterData");

            migrationBuilder.DropColumn(
                name: "MaterialGroupId",
                table: "MaterialMasterData");

            migrationBuilder.AddColumn<string>(
                name: "MaterialGroup",
                table: "MaterialMasterData",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MaterialTransactionsTypes",
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
                    TransactionType = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialTransactionsTypes", x => x.Id);
                });

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

            migrationBuilder.CreateTable(
                name: "MaterialTransactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaterialNumberId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransationGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DocmentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FromPlant = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FromSubLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    MaterialLot = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    TransactionNumber = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TransactionQuantiry = table.Column<decimal>(type: "decimal(18,4)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaterialTransactions_MaterialMasterData_MaterialNumberId",
                        column: x => x.MaterialNumberId,
                        principalTable: "MaterialMasterData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialTransactions_MaterialTransactionsTypes_TransactionTypeId",
                        column: x => x.TransactionTypeId,
                        principalTable: "MaterialTransactionsTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialTransactions_TransactionGroup_TransationGroupId",
                        column: x => x.TransationGroupId,
                        principalTable: "TransactionGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaterialTransactions_MaterialNumberId",
                table: "MaterialTransactions",
                column: "MaterialNumberId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialTransactions_TransactionTypeId",
                table: "MaterialTransactions",
                column: "TransactionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialTransactions_TransationGroupId",
                table: "MaterialTransactions",
                column: "TransationGroupId");
        }
    }
}

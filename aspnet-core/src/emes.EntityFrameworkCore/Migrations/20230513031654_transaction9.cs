using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class transaction9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MaterialTransactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionNumber = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TransactionTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransationGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionQuantiry = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    MaterialNumberId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromPlant = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FromSubLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DocmentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: false),
                    MaterialLot = table.Column<string>(type: "nvarchar(max)", nullable: true),
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaterialTransactions");
        }
    }
}

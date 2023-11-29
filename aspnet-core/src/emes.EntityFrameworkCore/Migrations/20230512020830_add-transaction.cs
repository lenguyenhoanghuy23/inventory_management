using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class addtransaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaterialAssignment_MaterialMasterData_MaterialMasterDataId",
                table: "MaterialAssignment");

            migrationBuilder.AlterColumn<Guid>(
                name: "MaterialMasterDataId",
                table: "MaterialAssignment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "MaterialAssignment",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "MaterialAssignment",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "MaterialAssignment",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "MaterialTransactionsTypesModel",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionType = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
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
                    table.PrimaryKey("PK_MaterialTransactionsTypesModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "materialTransactionsModels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TransactionTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransationGroup = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionQuantiry = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaterialLot = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaterialNumberId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FromPlant = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FromSubLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DocmentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_materialTransactionsModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_materialTransactionsModels_MaterialMasterData_MaterialNumberId",
                        column: x => x.MaterialNumberId,
                        principalTable: "MaterialMasterData",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_materialTransactionsModels_MaterialTransactionsTypesModel_TransactionTypeId",
                        column: x => x.TransactionTypeId,
                        principalTable: "MaterialTransactionsTypesModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_materialTransactionsModels_MaterialNumberId",
                table: "materialTransactionsModels",
                column: "MaterialNumberId");

            migrationBuilder.CreateIndex(
                name: "IX_materialTransactionsModels_TransactionTypeId",
                table: "materialTransactionsModels",
                column: "TransactionTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialAssignment_MaterialMasterData_MaterialMasterDataId",
                table: "MaterialAssignment",
                column: "MaterialMasterDataId",
                principalTable: "MaterialMasterData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaterialAssignment_MaterialMasterData_MaterialMasterDataId",
                table: "MaterialAssignment");

            migrationBuilder.DropTable(
                name: "materialTransactionsModels");

            migrationBuilder.DropTable(
                name: "MaterialTransactionsTypesModel");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "MaterialAssignment");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "MaterialAssignment");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "MaterialAssignment");

            migrationBuilder.AlterColumn<Guid>(
                name: "MaterialMasterDataId",
                table: "MaterialAssignment",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialAssignment_MaterialMasterData_MaterialMasterDataId",
                table: "MaterialAssignment",
                column: "MaterialMasterDataId",
                principalTable: "MaterialMasterData",
                principalColumn: "Id");
        }
    }
}

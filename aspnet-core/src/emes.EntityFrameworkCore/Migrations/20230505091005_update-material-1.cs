using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class updatematerial1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganizationUnitId",
                table: "MaterialMasterData");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "MaterialMasterData");

            migrationBuilder.AlterColumn<Guid>(
                name: "MaterialGroup",
                table: "MaterialMasterData",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "MaterialAssignment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaterialMasterDataId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialAssignment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaterialAssignment_MaterialMasterData_MaterialMasterDataId",
                        column: x => x.MaterialMasterDataId,
                        principalTable: "MaterialMasterData",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaterialAssignment_MaterialMasterDataId",
                table: "MaterialAssignment",
                column: "MaterialMasterDataId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaterialAssignment");

            migrationBuilder.AlterColumn<string>(
                name: "MaterialGroup",
                table: "MaterialMasterData",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<long>(
                name: "OrganizationUnitId",
                table: "MaterialMasterData",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "MaterialMasterData",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

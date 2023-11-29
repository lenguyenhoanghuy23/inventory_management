using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class inventory2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_materialInventoriesModels_MaterialMasterData_MaterialNumberId",
                table: "materialInventoriesModels");

            migrationBuilder.AlterColumn<Guid>(
                name: "MaterialNumberId",
                table: "materialInventoriesModels",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_materialInventoriesModels_MaterialMasterData_MaterialNumberId",
                table: "materialInventoriesModels",
                column: "MaterialNumberId",
                principalTable: "MaterialMasterData",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_materialInventoriesModels_MaterialMasterData_MaterialNumberId",
                table: "materialInventoriesModels");

            migrationBuilder.AlterColumn<Guid>(
                name: "MaterialNumberId",
                table: "materialInventoriesModels",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_materialInventoriesModels_MaterialMasterData_MaterialNumberId",
                table: "materialInventoriesModels",
                column: "MaterialNumberId",
                principalTable: "MaterialMasterData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class inventory3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_materialInventoriesModels_MaterialMasterData_MaterialNumberId",
                table: "materialInventoriesModels");

            migrationBuilder.DropIndex(
                name: "IX_materialInventoriesModels_MaterialNumberId",
                table: "materialInventoriesModels");

            migrationBuilder.DropColumn(
                name: "MaterialNumberId",
                table: "materialInventoriesModels");

            migrationBuilder.AddColumn<string>(
                name: "MaterialNumber",
                table: "materialInventoriesModels",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaterialNumber",
                table: "materialInventoriesModels");

            migrationBuilder.AddColumn<Guid>(
                name: "MaterialNumberId",
                table: "materialInventoriesModels",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_materialInventoriesModels_MaterialNumberId",
                table: "materialInventoriesModels",
                column: "MaterialNumberId");

            migrationBuilder.AddForeignKey(
                name: "FK_materialInventoriesModels_MaterialMasterData_MaterialNumberId",
                table: "materialInventoriesModels",
                column: "MaterialNumberId",
                principalTable: "MaterialMasterData",
                principalColumn: "Id");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class updatematerial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaterialMasterData_MaterialStatus_materialStatuId",
                table: "MaterialMasterData");

            migrationBuilder.RenameColumn(
                name: "materialStatuId",
                table: "MaterialMasterData",
                newName: "materialStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_MaterialMasterData_materialStatuId",
                table: "MaterialMasterData",
                newName: "IX_MaterialMasterData_materialStatusId");

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "MaterialMasterData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialMasterData_MaterialStatus_materialStatusId",
                table: "MaterialMasterData",
                column: "materialStatusId",
                principalTable: "MaterialStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaterialMasterData_MaterialStatus_materialStatusId",
                table: "MaterialMasterData");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "MaterialMasterData");

            migrationBuilder.RenameColumn(
                name: "materialStatusId",
                table: "MaterialMasterData",
                newName: "materialStatuId");

            migrationBuilder.RenameIndex(
                name: "IX_MaterialMasterData_materialStatusId",
                table: "MaterialMasterData",
                newName: "IX_MaterialMasterData_materialStatuId");

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialMasterData_MaterialStatus_materialStatuId",
                table: "MaterialMasterData",
                column: "materialStatuId",
                principalTable: "MaterialStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

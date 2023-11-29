using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace emes.Migrations
{
    /// <inheritdoc />
    public partial class Receipt5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOnhandsInventory",
                table: "MaterialGoodReceipts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOnhandsInventory",
                table: "MaterialGoodReceipts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

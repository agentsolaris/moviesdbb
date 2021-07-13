using Microsoft.EntityFrameworkCore.Migrations;

namespace dawproiect.Migrations
{
    public partial class _753 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "MoviesActors");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "MoviesActors",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

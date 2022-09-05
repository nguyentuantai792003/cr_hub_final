using Microsoft.EntityFrameworkCore.Migrations;

namespace tmss.Migrations
{
    public partial class update_post : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ParentId",
                table: "PostMenu",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Ordering",
                table: "PostMenu",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RootParrentId",
                table: "PostMenu",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ordering",
                table: "PostMenu");

            migrationBuilder.DropColumn(
                name: "RootParrentId",
                table: "PostMenu");

            migrationBuilder.AlterColumn<int>(
                name: "ParentId",
                table: "PostMenu",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}

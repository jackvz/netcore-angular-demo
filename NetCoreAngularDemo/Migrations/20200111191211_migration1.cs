using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreAngularDemo.Migrations
{
    public partial class migration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Incident",
                columns: table => new
                {
                    IncidentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Person = table.Column<string>(nullable: false),
                    Dt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incident", x => x.IncidentId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Incident");
        }
    }
}

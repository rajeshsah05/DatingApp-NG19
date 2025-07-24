using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
var app = builder.Build();
app.UseCors(x => x.WithOrigins("http://localhost:4200", "https://localhost:4200")
 .AllowAnyHeader()
 .AllowAnyMethod()
 );
app.MapControllers();

app.Run();

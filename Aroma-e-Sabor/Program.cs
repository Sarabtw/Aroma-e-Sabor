using Microsoft.EntityFrameworkCore;
using Aroma_e_Sabor.Data;

var builder = WebApplication.CreateBuilder(args);

// Configura o DbContext para usar MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<Aroma_e_Sabor.Data.AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Adiciona serviços ao contêiner (exemplo: CORS, controllers)
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers(); // Suporte a API Controllers

var app = builder.Build();

// Middleware de logging simples
app.UseDeveloperExceptionPage();

// Habilita CORS para desenvolvimento
app.UseCors("DevPolicy");

// Habilita o uso de arquivos estáticos da pasta wwwroot
app.UseDefaultFiles(); // Procura automaticamente por index.html
app.UseStaticFiles();

// Roteamento para APIs
app.MapControllers();

app.Run();

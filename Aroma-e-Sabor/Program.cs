using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Habilita o uso de arquivos estáticos da pasta wwwroot
app.UseDefaultFiles(); // Procura automaticamente por index.html
app.UseStaticFiles();

// Opcional: responde com home.html se acessar "/" e não houver index.html
app.MapGet("/", async context =>
{
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync("wwwroot/index.html");
});

app.Run();

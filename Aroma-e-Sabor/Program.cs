var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Habilita o uso de arquivos estáticos da pasta wwwroot
app.UseDefaultFiles(); // Procura automaticamente por index.html
app.UseStaticFiles();

app.Run();

var builder = WebApplication.CreateBuilder(args);

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

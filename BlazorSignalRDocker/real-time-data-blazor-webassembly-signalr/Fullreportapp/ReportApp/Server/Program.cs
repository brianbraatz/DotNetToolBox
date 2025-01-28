using ReportApp.Server.Hubs;
using ReportApp.Server.Services;
using ReportApp.Server.Workers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddScoped<IReportDataService, ReportDataService>();
builder.Services.AddSignalR();
builder.Services.AddHostedService<TimeWorker>();

var allowedOrigins = builder.Configuration.GetValue<string>("AllowedOrigins");
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", opt => opt
        .WithOrigins(allowedOrigins!)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseRouting();

app.MapControllers();

app.MapHub<ReportHub>("/reports");

app.Run();

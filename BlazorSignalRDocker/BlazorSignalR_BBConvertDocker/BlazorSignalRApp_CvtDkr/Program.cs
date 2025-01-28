using BlazorSignalRApp.Components;
using Microsoft.AspNetCore.ResponseCompression;
using BlazorSignalRApp.Hubs;
using Microsoft.AspNetCore.Mvc;
using BlazorSignalRApp;

string CorsPolicyName = "SignalRCorsPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
//builder.Services.ConfigureCors(CorsPolicyName);
CorsConfigurations.ConfigureCors(builder.Services, CorsPolicyName); 

builder.Services.AddResponseCompression(opts =>
{
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
          new[] { "application/octet-stream" });
});
builder.Services.AddCors()   ;
var app = builder.Build();

app.UseResponseCompression();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
app.UseCors();
app.MapHub<ChatHub>("/chathub");

app.Run();


 //public void ConfigureServices(IServiceCollection services)
 //       {
 //           services.Configure<CookiePolicyOptions>(options =>
 //           {
 //               options.CheckConsentNeeded = context => true;
 //               options.MinimumSameSitePolicy = SameSiteMode.None;
 //           });

 //           services.ConfigureCors(CorsPolicyName);
 //           services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
 //           services.AddSignalR();
 //       }

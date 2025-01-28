using BlazorServerAppExample.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;

namespace BlazorServerAppExample
{
	public class Program
	{
		public static void Main(string[] args)
		{
			//var builder = WebApplication.CreateBuilder(args);
			var builder = WebApplication.CreateBuilder(new WebApplicationOptions()
            {
     //           ContentRootPath = @"..\Sources\MyProject",
                ApplicationName = "BlazorServerAppExample"
            });

			// Add services to the container.
			builder.Services.AddRazorPages();
			builder.Services.AddServerSideBlazor();
			builder.Services.AddSingleton<WeatherForecastService>();

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (!app.Environment.IsDevelopment())
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();

			app.UseStaticFiles();

			app.UseRouting();

			app.MapBlazorHub();
			app.MapFallbackToPage("/_Host");

			app.Run();
		}
	}
}
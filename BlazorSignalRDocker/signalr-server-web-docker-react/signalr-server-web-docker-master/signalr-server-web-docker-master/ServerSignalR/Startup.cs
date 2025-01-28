using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ServerSignalR
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => 
            { 
                options.AddPolicy("CorsPolicy", builder => builder
                .WithOrigins("http://localhost:4000")
                .WithOrigins("https://localhost:4001")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()); 
            });

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");
            app.UseRouting();
            app.Use(async (context, next) =>
            {
                Endpoint endpoint = context.GetEndpoint();
 
                if (endpoint != null)
                {
                    await next();
                }
                else
                {
                    await context.Response.WriteAsync("404 not found");
                }
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chathub");
                endpoints.MapFallback("/", async context =>
                {
                    await context.Response.WriteAsync("Work!");
                });
            });
        }
    }
}

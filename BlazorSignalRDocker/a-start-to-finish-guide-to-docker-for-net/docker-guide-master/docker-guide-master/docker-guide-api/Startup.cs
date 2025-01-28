using System;
using System.Threading;
using docker_guide_api.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace docker_guide_api
{
    public class Startup
    {
        private const int DbConnectionCheckRetries = 20;
        private static readonly TimeSpan DbConnectionCheckDelay = TimeSpan.FromSeconds(5);
        public Startup(IConfiguration configuration) => Configuration = configuration;
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, TodoContext context, ILogger<Startup> logger)
        {
            WaitForDatabaseToBeAvailable(context.Database, logger);
            
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCors();
            app.UseMvc();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddDbContext<TodoContext>(
                    options => options.UseSqlServer(Environment.GetEnvironmentVariable("DB_CONNECTIONSTRING")))
                .AddCors(o => o.AddDefaultPolicy(new CorsPolicy { Origins = { "*" }, Methods = { "*" }, Headers = { "*" } }))
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        private static void WaitForDatabaseToBeAvailable(DatabaseFacade database, ILogger logger)
        {
            for (var i = 0; i < DbConnectionCheckRetries; ++i)
            {
                try
                {
                    database.EnsureCreated();
                    return;
                }
                catch
                {
                    logger.LogInformation("Waiting for database to became available.");
                    Thread.Sleep(DbConnectionCheckDelay);
                }
            }

            throw new InvalidOperationException("Database isn't available.");
        }
    }
}
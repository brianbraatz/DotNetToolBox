using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorWasmWithDocker;
//using Microsoft.AspNetCore.ResponseCompression;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

//builder.Services.AddSignalRCore(); //  AddSignalR();
//    builder.UseSignalR(routes =>
//            {
//                routes.MapHub<ChatHub>("/chatHub");
//            });
//builder.Services.AddSignalR();
//builder.Services.AddResponseCompression(opts =>
//{
//      opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
//         new[] { "application/octet-stream" });
//});


//builder.Services.AddResponseCompression(opts =>
//{
//   opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
//       ["application/octet-stream"]);
//});
//builder.
await builder.Build().RunAsync();

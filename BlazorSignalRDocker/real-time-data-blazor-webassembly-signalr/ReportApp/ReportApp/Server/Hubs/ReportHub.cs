using Microsoft.AspNetCore.SignalR;
using ReportApp.Server.Models;

namespace ReportApp.Server.Hubs
{
   public class ReportHub : Hub<List<Report>>  { }
}

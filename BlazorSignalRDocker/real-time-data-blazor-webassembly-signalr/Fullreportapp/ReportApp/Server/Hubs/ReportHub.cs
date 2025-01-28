using Microsoft.AspNetCore.SignalR;
using ReportApp.Shared.Models;

namespace ReportApp.Server.Hubs;

public class ReportHub : Hub<List<Report>>
{
}

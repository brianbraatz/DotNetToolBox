using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class TimeHub : Hub
    {
        public async Task PrintTime()
        {
            await Clients.All.SendAsync("DisplayTime", "ServerTime " + DateTime.UtcNow.ToString() + " UTC");
        }
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}

using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace signalr_scale_out.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}

using Microsoft.AspNetCore.SignalR;
  
  namespace BlazorWasmWithDocker.Hubs
{
 

//namespace BlazorSignalRApp.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
}

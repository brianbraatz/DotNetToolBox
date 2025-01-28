using Microsoft.AspNetCore.SignalR;

public class TapDeviceHub : Hub
{
    public const string HubUrl = "/scanning";

    public override Task OnConnectedAsync()
    {
        Console.WriteLine($"#########################{Context.ConnectionId}connected");
        return base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception e)
    {
        await base.OnDisconnectedAsync(e);
    }

    public async Task OnTap(string deviceName, string userID)
    {
        string connectionID = "sdfsaf"; //getconnectin ID
        await Clients.Client(connectionID).SendAsync("OnTap", deviceName, "userID");
    }
}
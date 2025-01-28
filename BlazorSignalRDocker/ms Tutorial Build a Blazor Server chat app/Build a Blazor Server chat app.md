

# Tutorial: Build a Blazor Server chat app

- Article
- 11/28/2022
- 13 contributors

Feedback

## In this article

1. [Prerequisites](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#prerequisites)
2. [Build a local chat room in Blazor Server app](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#build-a-local-chat-room-in-blazor-server-app)
3. [Publish to Azure](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#publish-to-azure)
4. [Enable Azure SignalR Service for local development](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#enable-azure-signalr-service-for-local-development)

Show 3 more

This tutorial shows you how to build and modify a Blazor Server app. You'll learn how to:

- Build a simple chat room with the Blazor Server app template.
- Work with Razor components.
- Use event handling and data binding in Razor components.
- Quick-deploy to Azure App Service in Visual Studio.
- Migrate from local SignalR to Azure SignalR Service.

Ready to start?

[Step by step build](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#prerequisites)

[Try Blazor demo now](https://asrs-blazorchat-live-demo.azurewebsites.net/chatroom)

[](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#prerequisites)

## Prerequisites

- Install [.NET Core 3.0 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.0) (Version >= 3.0.100)
- Install [Visual Studio 2019](https://visualstudio.microsoft.com/vs/) (Version >= 16.3)

[Having issues? Let us know.](https://aka.ms/asrs/qsblazor)

[](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#build-a-local-chat-room-in-blazor-server-app)

## Build a local chat room in Blazor Server app

Beginning in Visual Studio 2019 version 16.2.0, Azure SignalR Service is built into the web application publish process to make managing the dependencies between the web app and SignalR service much more convenient. You can work in a local SignalR instance in a local development environment and work in Azure SignalR Service for Azure App Service at the same time without any code changes.

1. Create a Blazor chat app:
    
    1. In Visual Studio, choose **Create a new project**.
        
    2. Select **Blazor App**.
        
    3. Name the application and choose a folder.
        
    4. Select the **Blazor Server App** template.
        
         Note
        
        Make sure that you've already installed .NET Core SDK 3.0+ to enable Visual Studio to correctly recognize the target framework.
        
        [![In Create a new project, select the Blazor app template.](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-create.png)](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-create.png#lightbox)
        
    5. You also can create a project by running the [`dotnet new`](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new) command in the .NET CLI:
        
        .NET CLICopy
        
        ```
        dotnet new blazorserver -o BlazorChat
        ```
        
2. Add a new C# file called `BlazorChatSampleHub.cs` and create a new class `BlazorChatSampleHub` deriving from the `Hub` class for the chat app. For more information on creating hubs, see [Create and Use Hubs](https://learn.microsoft.com/en-us/aspnet/core/signalr/hubs#create-and-use-hubs).
    
    csCopy
    
    ```
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;
    
    namespace BlazorChat
    {
        public class BlazorChatSampleHub : Hub
        {
            public const string HubUrl = "/chat";
    
            public async Task Broadcast(string username, string message)
            {
                await Clients.All.SendAsync("Broadcast", username, message);
            }
    
            public override Task OnConnectedAsync()
            {
                Console.WriteLine($"{Context.ConnectionId} connected");
                return base.OnConnectedAsync();
            }
    
            public override async Task OnDisconnectedAsync(Exception e)
            {
                Console.WriteLine($"Disconnected {e?.Message} {Context.ConnectionId}");
                await base.OnDisconnectedAsync(e);
            }
        }
    }
    ```
    
3. Add an endpoint for the hub in the `Startup.Configure()` method.
    
    csCopy
    
    ```
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapBlazorHub();
        endpoints.MapFallbackToPage("/_Host");
        endpoints.MapHub<BlazorChatSampleHub>(BlazorChatSampleHub.HubUrl);
    });
    ```
    
4. Install the `Microsoft.AspNetCore.SignalR.Client` package to use the SignalR client.
    
    .NET CLICopy
    
    ```
    dotnet add package Microsoft.AspNetCore.SignalR.Client --version 3.1.7
    ```
    
5. Create a new [Razor component](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/) called `ChatRoom.razor` under the `Pages` folder to implement the SignalR client. Follow the steps below or use the [ChatRoom.razor](https://github.com/aspnet/AzureSignalR-samples/tree/master/samples/BlazorChat/Pages/ChatRoom.razor) file.
    
    1. Add the [`@page`](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#page) directive and the using statements. Use the [`@inject`](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#inject) directive to inject the [`NavigationManager`](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/routing#uri-and-navigation-state-helpers) service.
        
        razorCopy
        
        ```
        @page "/chatroom"
        @inject NavigationManager navigationManager
        @using Microsoft.AspNetCore.SignalR.Client;
        ```
        
    2. In the `@code` section, add the following members to the new SignalR client to send and receive messages.
        
        razorCopy
        
        ```
        @code {
            // flag to indicate chat status
            private bool _isChatting = false;
        
            // name of the user who will be chatting
            private string _username;
        
            // on-screen message
            private string _message;
        
            // new message input
            private string _newMessage;
        
            // list of messages in chat
            private List<Message> _messages = new List<Message>();
        
            private string _hubUrl;
            private HubConnection _hubConnection;
        
            public async Task Chat()
            {
                // check username is valid
                if (string.IsNullOrWhiteSpace(_username))
                {
                    _message = "Please enter a name";
                    return;
                };
        
                try
                {
                    // Start chatting and force refresh UI.
                    _isChatting = true;
                    await Task.Delay(1);
        
                    // remove old messages if any
                    _messages.Clear();
        
                    // Create the chat client
                    string baseUrl = navigationManager.BaseUri;
        
                    _hubUrl = baseUrl.TrimEnd('/') + BlazorChatSampleHub.HubUrl;
        
                    _hubConnection = new HubConnectionBuilder()
                        .WithUrl(_hubUrl)
                        .Build();
        
                    _hubConnection.On<string, string>("Broadcast", BroadcastMessage);
        
                    await _hubConnection.StartAsync();
        
                    await SendAsync($"[Notice] {_username} joined chat room.");
                }
                catch (Exception e)
                {
                    _message = $"ERROR: Failed to start chat client: {e.Message}";
                    _isChatting = false;
                }
            }
        
            private void BroadcastMessage(string name, string message)
            {
                bool isMine = name.Equals(_username, StringComparison.OrdinalIgnoreCase);
        
                _messages.Add(new Message(name, message, isMine));
        
                // Inform blazor the UI needs updating
                InvokeAsync(StateHasChanged);
            }
        
            private async Task DisconnectAsync()
            {
                if (_isChatting)
                {
                    await SendAsync($"[Notice] {_username} left chat room.");
        
                    await _hubConnection.StopAsync();
                    await _hubConnection.DisposeAsync();
        
                    _hubConnection = null;
                    _isChatting = false;
                }
            }
        
            private async Task SendAsync(string message)
            {
                if (_isChatting && !string.IsNullOrWhiteSpace(message))
                {
                    await _hubConnection.SendAsync("Broadcast", _username, message);
        
                    _newMessage = string.Empty;
                }
            }
        
            private class Message
            {
                public Message(string username, string body, bool mine)
                {
                    Username = username;
                    Body = body;
                    Mine = mine;
                }
        
                public string Username { get; set; }
                public string Body { get; set; }
                public bool Mine { get; set; }
        
                public bool IsNotice => Body.StartsWith("[Notice]");
        
                public string CSS => Mine ? "sent" : "received";
            }
        }
        ```
        
    3. Add the UI markup before the `@code` section to interact with the SignalR client.
        
        razorCopy
        
        ```
        <h1>Blazor SignalR Chat Sample</h1>
        <hr />
        
        @if (!_isChatting)
        {
            <p>
                Enter your name to start chatting:
            </p>
        
            <input type="text" maxlength="32" @bind="@_username" />
            <button type="button" @onclick="@Chat"><span class="oi oi-chat" aria-hidden="true"></span> Chat!</button>
        
            // Error messages
            @if (_message != null)
            {
                <div class="invalid-feedback">@_message</div>
                <small id="emailHelp" class="form-text text-muted">@_message</small>
            }
        }
        else
        {
            // banner to show current user
            <div class="alert alert-secondary mt-4" role="alert">
                <span class="oi oi-person mr-2" aria-hidden="true"></span>
                <span>You are connected as <b>@_username</b></span>
                <button class="btn btn-sm btn-warning ml-md-auto" @onclick="@DisconnectAsync">Disconnect</button>
            </div>
            // display messages
            <div id="scrollbox">
                @foreach (var item in _messages)
                {
                    @if (item.IsNotice)
                    {
                        <div class="alert alert-info">@item.Body</div>
                    }
                    else
                    {
                        <div class="@item.CSS">
                            <div class="user">@item.Username</div>
                            <div class="msg">@item.Body</div>
                        </div>
                    }
                }
                <hr />
                <textarea class="input-lg" placeholder="enter your comment" @bind="@_newMessage"></textarea>
                <button class="btn btn-default" @onclick="@(() => SendAsync(_newMessage))">Send</button>
            </div>
        }
        ```
        
6. Update the `NavMenu.razor` component to insert a new `NavLink` component to link to the chat room under `NavMenuCssClass`.
    
    razorCopy
    
    ```
    <li class="nav-item px-3">
        <NavLink class="nav-link" href="chatroom">
            <span class="oi oi-chat" aria-hidden="true"></span> Chat room
        </NavLink>
    </li>
    ```
    
7. Add a few CSS classes to the `site.css` file to style the UI elements in the chat page.
    
    cssCopy
    
    ```
    /* improved for chat text box */
    textarea {
        border: 1px dashed #888;
        border-radius: 5px;
        width: 80%;
        overflow: auto;
        background: #f7f7f7
    }
    
    /* improved for speech bubbles */
    .received, .sent {
        position: relative;
        font-family: arial;
        font-size: 1.1em;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
    }
    
    .received:after, .sent:after {
        content: '';
        border: 20px solid transparent;
        position: absolute;
        margin-top: -30px;
    }
    
    .sent {
        background: #03a9f4;
        color: #fff;
        margin-left: 10%;
        top: 50%;
        text-align: right;
    }
    
    .received {
        background: #4CAF50;
        color: #fff;
        margin-left: 10px;
        margin-right: 10%;
    }
    
    .sent:after {
        border-left-color: #03a9f4;
        border-right: 0;
        right: -20px;
    }
    
    .received:after {
        border-right-color: #4CAF50;
        border-left: 0;
        left: -20px;
    }
    
    /* div within bubble for name */
    .user {
        font-size: 0.8em;
        font-weight: bold;
        color: #000;
    }
    
    .msg {
        /*display: inline;*/
    }
    ```
    
8. Press F5 to run the app. Now, you can initiate the chat:
    
    [![An animated chat between Bob and Alice is shown. Alice says Hello, Bob says Hi.](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat.gif)](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat.gif#lightbox)
    

[Having issues? Let us know.](https://aka.ms/asrs/qsblazor)

[](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#publish-to-azure)

## Publish to Azure

When you deploy the Blazor app to Azure App Service, we recommend that you use [Azure SignalR Service](https://learn.microsoft.com/en-us/aspnet/core/signalr/scale#azure-signalr-service). Azure SignalR Service allows for scaling up a Blazor Server app to a large number of concurrent SignalR connections. In addition, the SignalR service's global reach and high-performance datacenters significantly aid in reducing latency due to geography.

 Important

In a Blazor Server app, UI states are maintained on the server side, which means a sticky server session is required to preserve state. If there is a single app server, sticky sessions are ensured by design. However, if there are multiple app servers, there are chances that the client negotiation and connection may go to different servers which may lead to an inconsistent UI state management in a Blazor app. Hence, it is recommended to enable sticky server sessions as shown below in _appsettings.json_:

JSONCopy

```
"Azure:SignalR:ServerStickyMode": "Required"
```

1. Right-click the project and go to **Publish**. Use the following settings:
    
    - **Target**: Azure
    - **Specific target**: All types of **Azure App Service** are supported.
    - **App Service**: Create or select the App Service instance.
    
    [![The animation shows selection of Azure as target, and then Azure App Serice as specific target.](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-profile.gif)](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-profile.gif#lightbox)
    
2. Add the Azure SignalR Service dependency.
    
    After the creation of the publish profile, you can see a recommendation message to add Azure SignalR service under **Service Dependencies**. Select **Configure** to create a new or select an existing Azure SignalR Service in the pane.
    
    [![On Publish, the link to Configure is highlighted.](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-dependency.png)](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-dependency.png#lightbox)
    
    The service dependency will carry out the following activities to enable your app to automatically switch to Azure SignalR Service when on Azure:
    
    - Update [`HostingStartupAssembly`](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/host/platform-specific-configuration) to use Azure SignalR Service.
    - Add the Azure SignalR Service NuGet package reference.
    - Update the profile properties to save the dependency settings.
    - Configure the secrets store as per your choice.
    - Add the configuration in _appsettings.json_ to make your app target Azure SignalR Service.
    
    [![On Summary of changes, the checkboxes are used to select all dependencies.](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-dependency-summary.png)](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-dependency-summary.png#lightbox)
    
3. Publish the app.
    
    Now the app is ready to be published. Upon the completion of the publishing process, the app automatically launches in a browser.
    
     Note
    
    The app may require some time to start due to the Azure App Service deployment start latency. You can use the browser debugger tools (usually by pressing F12) to ensure that the traffic has been redirected to Azure SignalR Service.
    
    [![Blazor SignalR Chat Sample has a text box for your name, and a Chat! button to start a chat.](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-azure.png)](https://learn.microsoft.com/en-us/azure/azure-signalr/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-azure.png#lightbox)
    

[Having issues? Let us know.](https://aka.ms/asrs/qsblazor)

[](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#enable-azure-signalr-service-for-local-development)

## Enable Azure SignalR Service for local development

1. Add a reference to the Azure SignalR SDK using the following command.
    
    .NET CLICopy
    
    ```
    dotnet add package Microsoft.Azure.SignalR
    ```
    
2. Add a call to `AddAzureSignalR()` in `Startup.ConfigureServices()` as demonstrated below.
    
    csCopy
    
    ```
    public void ConfigureServices(IServiceCollection services)
    {
        ...
        services.AddSignalR().AddAzureSignalR();
        ...
    }
    ```
    
3. Configure the Azure SignalR Service connection string either in _appsettings.json_ or by using the [Secret Manager](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio#secret-manager) tool.
    

 Note

Step 2 can be replaced with configuring [Hosting Startup Assemblies](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/host/platform-specific-configuration) to use the SignalR SDK.

1. Add the configuration to turn on Azure SignalR Service in _appsettings.json_:
    
    JSONCopy
    
    ```
    "Azure": {
      "SignalR": {
        "Enabled": true,
        "ConnectionString": <your-connection-string>       
      }
    }
    
    ```
    
2. Configure the hosting startup assembly to use the Azure SignalR SDK. Edit _launchSettings.json_ and add a configuration like the following example inside `environmentVariables`:
    
    JSONCopy
    
    ```
    "environmentVariables": {
        ...,
       "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.Azure.SignalR"
     }
    
    ```
    

[Having issues? Let us know.](https://aka.ms/asrs/qsblazor)

[](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#clean-up-resources)

## Clean up resources

To clean up the resources created in this tutorial, delete the resource group using the Azure portal.

[](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#additional-resources)

## Additional resources

- [ASP.NET Core Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor)

[](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app#next-steps)

## Next steps

In this tutorial, you learned how to:

- Build a simple chat room with the Blazor Server app template.
- Work with Razor components.
- Use event handling and data binding in Razor components.
- Quick-deploy to Azure App Service in Visual Studio.
- Migrate from local SignalR to Azure SignalR Service.

Read more about high availability:

[Resiliency and disaster recovery](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-concept-disaster-recovery)
---
created: 2024-07-24T16:55:56 (UTC -05:00)
tags: []
source: chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html
author: vicancy
---

# 

source: chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html

> ## Excerpt
> In this tutorial, you learn how to build and modify a Blazor Server app with Azure SignalR Service.

---
## Tutorial: Build a Blazor Server chat app

-   Article
-   11/28/2022

## In this article

1.  [Prerequisites](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#prerequisites)
2.  [Build a local chat room in Blazor Server app](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#build-a-local-chat-room-in-blazor-server-app)
3.  [Publish to Azure](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#publish-to-azure)
4.  [Enable Azure SignalR Service for local development](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#enable-azure-signalr-service-for-local-development)

This tutorial shows you how to build and modify a Blazor Server app. You'll learn how to:

-   Build a simple chat room with the Blazor Server app template.
-   Work with Razor components.
-   Use event handling and data binding in Razor components.
-   Quick-deploy to Azure App Service in Visual Studio.
-   Migrate from local SignalR to Azure SignalR Service.

Ready to start?

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#prerequisites)

## Prerequisites

-   Install [.NET Core 3.0 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.0) (Version >= 3.0.100)
-   Install [Visual Studio 2019](https://visualstudio.microsoft.com/vs/) (Version >= 16.3)

[Having issues? Let us know.](https://aka.ms/asrs/qsblazor)

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#build-a-local-chat-room-in-blazor-server-app)

## Build a local chat room in Blazor Server app

Beginning in Visual Studio 2019 version 16.2.0, Azure SignalR Service is built into the web application publish process to make managing the dependencies between the web app and SignalR service much more convenient. You can work in a local SignalR instance in a local development environment and work in Azure SignalR Service for Azure App Service at the same time without any code changes.

1.  Create a Blazor chat app:
    
    1.  In Visual Studio, choose **Create a new project**.
        
    2.  Select **Blazor App**.
        
    3.  Name the application and choose a folder.
        
    4.  Select the **Blazor Server App** template.
        
        Note
        
        Make sure that you've already installed .NET Core SDK 3.0+ to enable Visual Studio to correctly recognize the target framework.
        
        [![In Create a new project, select the Blazor app template.](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-create.png)](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-create.png#lightbox)
        
    5.  You also can create a project by running the [`dotnet new`](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/core/tools/dotnet-new) command in the .NET CLI:
        
        ```
        <span><span>dotnet</span> <span>new</span> blazorserver<span> -o</span> BlazorChat
        </span>
        ```
        
2.  Add a new C# file called `BlazorChatSampleHub.cs` and create a new class `BlazorChatSampleHub` deriving from the `Hub` class for the chat app. For more information on creating hubs, see [Create and Use Hubs](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/signalr/hubs#create-and-use-hubs).
    
    ```
    <span><span>using</span> System;
    <span>using</span> System.Threading.Tasks;
    <span>using</span> Microsoft.AspNetCore.SignalR;
    
    <span>namespace</span> <span>BlazorChat</span>
    {
        <span>public</span> <span>class</span> <span>BlazorChatSampleHub</span> : <span>Hub</span>
        {
            <span>public</span> <span>const</span> <span>string</span> HubUrl = <span>"/chat"</span>;
    
            <span><span>public</span> <span>async</span> Task <span>Broadcast</span>(<span><span>string</span> username, <span>string</span> message</span>)</span>
            {
                <span>await</span> Clients.All.SendAsync(<span>"Broadcast"</span>, username, message);
            }
    
            <span><span>public</span> <span>override</span> Task <span>OnConnectedAsync</span>(<span></span>)</span>
            {
                Console.WriteLine(<span>$"<span>{Context.ConnectionId}</span> connected"</span>);
                <span>return</span> <span>base</span>.OnConnectedAsync();
            }
    
            <span><span>public</span> <span>override</span> <span>async</span> Task <span>OnDisconnectedAsync</span>(<span>Exception e</span>)</span>
            {
                Console.WriteLine(<span>$"Disconnected <span>{e?.Message}</span> <span>{Context.ConnectionId}</span>"</span>);
                <span>await</span> <span>base</span>.OnDisconnectedAsync(e);
            }
        }
    }
    </span>
    ```
    
3.  Add an endpoint for the hub in the `Startup.Configure()` method.
    
    ```
    <span>app.UseEndpoints(endpoints =&gt;
    {
        endpoints.MapBlazorHub();
        endpoints.MapFallbackToPage(<span>"/_Host"</span>);
        endpoints.MapHub&lt;BlazorChatSampleHub&gt;(BlazorChatSampleHub.HubUrl);
    });
    </span>
    ```
    
4.  Install the `Microsoft.AspNetCore.SignalR.Client` package to use the SignalR client.
    
    ```
    <span><span>dotnet</span> <span>add</span> package Microsoft.AspNetCore.SignalR.Client<span> --version</span> <span>3.1.7</span>
    </span>
    ```
    
5.  Create a new [Razor component](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/blazor/components/) called `ChatRoom.razor` under the `Pages` folder to implement the SignalR client. Follow the steps below or use the [ChatRoom.razor](https://github.com/aspnet/AzureSignalR-samples/tree/master/samples/BlazorChat/Pages/ChatRoom.razor) file.
    
    1.  Add the [`@page`](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/mvc/views/razor#page) directive and the using statements. Use the [`@inject`](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/mvc/views/razor#inject) directive to inject the [`NavigationManager`](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/blazor/fundamentals/routing#uri-and-navigation-state-helpers) service.
        
        ```
        <span><span></span><span><span>@page</span><span> "/chatroom"</span></span><span>
        </span><span><span>@inject</span><span> NavigationManager navigationManager</span></span><span>
        </span><span><span>@using</span><span> Microsoft.AspNetCore.SignalR.Client;</span></span><span>
        </span></span>
        ```
        
    2.  In the `@code` section, add the following members to the new SignalR client to send and receive messages.
        
        ```
        <span><span></span><span></span><span>@code {</span><span>
            <span>// flag to indicate chat status</span>
            <span>private</span> <span>bool</span> _isChatting = <span>false</span>;
        
            <span>// name of the user who will be chatting</span>
            <span>private</span> <span>string</span> _username;
        
            <span>// on-screen message</span>
            <span>private</span> <span>string</span> _message;
        
            <span>// new message input</span>
            <span>private</span> <span>string</span> _newMessage;
        
            <span>// list of messages in chat</span>
            <span>private</span> List&lt;Message&gt; _messages = <span>new</span> List&lt;Message&gt;();
        
            <span>private</span> <span>string</span> _hubUrl;
            <span>private</span> HubConnection _hubConnection;
        
            <span><span>public</span> <span>async</span> Task <span>Chat</span>(<span></span>)
            </span></span>{
                // check username is valid
                if (string.IsNullOrWhiteSpace(_username))
                {
                    _message = <span>"Please enter a name"</span>;
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
        
                    _hubConnection.On&lt;string, string&gt;(<span>"Broadcast"</span>, BroadcastMessage);
        
                    await _hubConnection.StartAsync();
        
                    await SendAsync($<span>"[Notice] {_username} joined chat room."</span>);
                }
                catch (Exception e)
                {
                    _message = $<span>"ERROR: Failed to start chat client: {e.Message}"</span>;
                    _isChatting = false;
                }
            }<span><span>
        
            <span>private</span> <span>void</span> <span>BroadcastMessage</span>(<span><span>string</span> name, <span>string</span> message</span>)
            </span></span>{
                bool isMine = name.Equals(_username, StringComparison.OrdinalIgnoreCase);
        
                _messages.Add(new Message(name, message, isMine));
        
                // Inform blazor the UI needs updating
                InvokeAsync(StateHasChanged);
            }<span><span>
        
            <span>private</span> <span>async</span> Task <span>DisconnectAsync</span>(<span></span>)
            </span></span>{
                if (_isChatting)
                {
                    await SendAsync($<span>"[Notice] {_username} left chat room."</span>);
        
                    await _hubConnection.StopAsync();
                    await _hubConnection.DisposeAsync();
        
                    _hubConnection = null;
                    _isChatting = false;
                }
            }<span><span>
        
            <span>private</span> <span>async</span> Task <span>SendAsync</span>(<span><span>string</span> message</span>)
            </span></span>{
                if (_isChatting &amp;&amp; !string.IsNullOrWhiteSpace(message))
                {
                    await _hubConnection.SendAsync(<span>"Broadcast"</span>, _username, message);
        
                    _newMessage = string.Empty;
                }
            }<span><span>
        
            <span>private</span> <span>class</span> Message
            </span></span>{
                public Message(string username, string body, bool mine)
                {
                    Username = username;
                    Body = body;
                    Mine = mine;
                }
        
                public string Username { get; set; }
                public string Body { get; set; }
                public bool Mine { get; set; }
        
                public bool IsNotice =&gt; Body.StartsWith(<span>"[Notice]"</span>);
        
                public string CSS =&gt; Mine ? <span>"sent"</span> : <span>"received"</span>;
            }<span><span>
        </span></span><span>}</span><span>
        </span></span>
        ```
        
    3.  Add the UI markup before the `@code` section to interact with the SignalR client.
        
        ```
        <span><span><span>&lt;<span>h1</span>&gt;</span>Blazor SignalR Chat Sample<span>&lt;/<span>h1</span>&gt;</span>
        <span>&lt;<span>hr</span> /&gt;</span>
        
        </span><span><span></span></span><span>@</span><span><span>if</span> (!_isChatting)
        </span><span>{</span><span><span>
            <span>&lt;<span>p</span>&gt;</span>
                Enter your name to start chatting:
            <span>&lt;/<span>p</span>&gt;</span>
        
            <span>&lt;<span>input</span> <span>type</span>=<span>"text"</span> <span>maxlength</span>=<span>"32"</span> </span></span><span><span></span></span><span>@bind</span><span><span>=</span></span><span><span>"@<span>_username</span>" /&gt;</span>
            <span>&lt;<span>button</span> <span>type</span>=<span>"button"</span> </span></span><span><span></span></span><span>@onclick</span><span><span>=</span></span><span><span>"</span></span><span></span><span>@</span><span>Chat<span>"&gt;&lt;span class="</span>oi oi-chat<span>" aria-hidden="</span><span>true</span><span>"&gt;</span></span><span><span>&lt;/<span>span</span>&gt;</span> Chat!<span>&lt;/<span>button</span>&gt;</span>
        
            // Error messages
            </span></span><span>@</span><span><span>if</span> (_message != <span>null</span>)
            </span><span>{</span><span><span>
                <span>&lt;<span>div</span> <span>class</span>=<span>"invalid-feedback"</span>&gt;</span>@_message<span>&lt;/<span>div</span>&gt;</span>
                <span>&lt;<span>small</span> <span>id</span>=<span>"emailHelp"</span> <span>class</span>=<span>"form-text text-muted"</span>&gt;</span>@_message<span>&lt;/<span>small</span>&gt;</span>
            </span></span><span>}</span><span>
        }
        else
        {
            // banner to show current user
            <span>&lt;<span>div</span> <span>class</span>=<span>"alert alert-secondary mt-4"</span> <span>role</span>=<span>"alert"</span>&gt;</span>
                <span>&lt;<span>span</span> <span>class</span>=<span>"oi oi-person mr-2"</span> <span>aria-hidden</span>=<span>"true"</span>&gt;</span><span>&lt;/<span>span</span>&gt;</span>
                <span>&lt;<span>span</span>&gt;</span>You are connected as <span>&lt;<span>b</span>&gt;</span>@_username<span>&lt;/<span>b</span>&gt;</span><span>&lt;/<span>span</span>&gt;</span>
                <span>&lt;<span>button</span> <span>class</span>=<span>"btn btn-sm btn-warning ml-md-auto"</span> </span></span><span><span></span></span><span>@onclick</span><span><span>=</span></span><span><span>"</span></span><span></span><span>@</span><span>DisconnectAsync</span>"<span><span>&gt;</span>Disconnect<span>&lt;/<span>button</span>&gt;</span>
            <span>&lt;/<span>div</span>&gt;</span>
            // display messages
            <span>&lt;<span>div</span> <span>id</span>=<span>"scrollbox"</span>&gt;</span>
                </span><span><span></span></span><span>@</span><span><span>foreach</span> (<span>var</span> item <span>in</span> _messages)
                </span><span>{</span><span><span>
                    </span></span><span>@</span><span><span>if</span> (item.IsNotice)
                    </span><span>{</span><span><span>
                        <span>&lt;<span>div</span> <span>class</span>=<span>"alert alert-info"</span>&gt;</span></span><span></span><span>@</span><span>item.Body</span><span><span>&lt;/<span>div</span>&gt;</span>
                    </span></span><span>}</span><span>
                    <span>else</span>
                    </span><span>{</span><span><span>
                        <span>&lt;<span>div</span> <span>class</span>=<span>"</span></span></span><span></span><span>@</span><span>item.CSS</span>"<span><span><span>&gt;
                            &lt;div class="</span><span>user</span>"&gt;</span></span><span></span><span>@</span><span>item.Username</span><span><span>&lt;/<span>div</span>&gt;</span>
                            <span>&lt;<span>div</span> <span>class</span>=<span>"msg"</span>&gt;</span></span><span></span><span>@</span><span>item.Body</span><span><span>&lt;/<span>div</span>&gt;</span>
                        <span>&lt;/<span>div</span>&gt;</span>
                    </span></span><span>}</span><span>
                }
                <span>&lt;<span>hr</span> /&gt;</span>
                <span>&lt;<span>textarea</span> <span>class</span>=<span>"input-lg"</span> <span>placeholder</span>=<span>"enter your comment"</span> </span></span><span><span></span></span><span>@bind</span><span><span>=</span></span><span><span>"@<span>_newMessage</span>"&gt;</span><span>&lt;/<span>textarea</span>&gt;</span>
                <span>&lt;<span>button</span> <span>class</span>=<span>"btn btn-default"</span> </span></span><span><span></span></span><span>@onclick</span><span><span>=</span></span><span><span>"</span></span><span></span><span>@(</span><span></span><span>()</span><span> =&gt; SendAsync</span><span>(_newMessage)</span><span></span><span>)</span><span><span>"&gt;</span>Send<span>&lt;/<span>button</span>&gt;</span>
            <span>&lt;/<span>div</span>&gt;</span>
        }
        </span></span>
        ```
        
6.  Update the `NavMenu.razor` component to insert a new `NavLink` component to link to the chat room under `NavMenuCssClass`.
    
    ```
    <span><span><span>&lt;<span>li</span> <span>class</span>=<span>"nav-item px-3"</span>&gt;</span>
        </span><span><span>&lt;<span>NavLink</span> <span>class</span>=<span>"nav-link"</span> <span>href</span>=<span>"chatroom"</span></span></span><span><span>&gt;</span>
            <span>&lt;<span>span</span> <span>class</span>=<span>"oi oi-chat"</span> <span>aria-hidden</span>=<span>"true"</span>&gt;</span><span>&lt;/<span>span</span>&gt;</span> Chat room
        <span>&lt;/<span>NavLink</span>&gt;</span>
    <span>&lt;/<span>li</span>&gt;</span>
    </span></span>
    ```
    
7.  Add a few CSS classes to the `site.css` file to style the UI elements in the chat page.
    
    ```
    <span><span>/* improved for chat text box */</span>
    <span>textarea</span> {
        <span>border</span>: <span>1px</span> dashed <span>#888</span>;
        <span>border-radius</span>: <span>5px</span>;
        <span>width</span>: <span>80%</span>;
        <span>overflow</span>: auto;
        <span>background</span>: <span>#f7f7f7</span>
    }
    
    <span>/* improved for speech bubbles */</span>
    <span>.received</span>, <span>.sent</span> {
        <span>position</span>: relative;
        <span>font-family</span>: arial;
        <span>font-size</span>: <span>1.1em</span>;
        <span>border-radius</span>: <span>10px</span>;
        <span>padding</span>: <span>20px</span>;
        <span>margin-bottom</span>: <span>20px</span>;
    }
    
    <span>.received</span><span>:after</span>, <span>.sent</span><span>:after</span> {
        <span>content</span>: <span>''</span>;
        <span>border</span>: <span>20px</span> solid transparent;
        <span>position</span>: absolute;
        <span>margin-top</span>: -<span>30px</span>;
    }
    
    <span>.sent</span> {
        <span>background</span>: <span>#03a9f4</span>;
        <span>color</span>: <span>#fff</span>;
        <span>margin-left</span>: <span>10%</span>;
        <span>top</span>: <span>50%</span>;
        <span>text-align</span>: right;
    }
    
    <span>.received</span> {
        <span>background</span>: <span>#4CAF50</span>;
        <span>color</span>: <span>#fff</span>;
        <span>margin-left</span>: <span>10px</span>;
        <span>margin-right</span>: <span>10%</span>;
    }
    
    <span>.sent</span><span>:after</span> {
        <span>border-left-color</span>: <span>#03a9f4</span>;
        <span>border-right</span>: <span>0</span>;
        <span>right</span>: -<span>20px</span>;
    }
    
    <span>.received</span><span>:after</span> {
        <span>border-right-color</span>: <span>#4CAF50</span>;
        <span>border-left</span>: <span>0</span>;
        <span>left</span>: -<span>20px</span>;
    }
    
    <span>/* div within bubble for name */</span>
    <span>.user</span> {
        <span>font-size</span>: <span>0.8em</span>;
        <span>font-weight</span>: bold;
        <span>color</span>: <span>#000</span>;
    }
    
    <span>.msg</span> {
        <span>/*display: inline;*/</span>
    }
    </span>
    ```
    
8.  Press F5 to run the app. Now, you can initiate the chat:
    
    [![An animated chat between Bob and Alice is shown. Alice says Hello, Bob says Hi.](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat.gif)](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat.gif#lightbox)
    

[Having issues? Let us know.](https://aka.ms/asrs/qsblazor)

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#publish-to-azure)

## Publish to Azure

When you deploy the Blazor app to Azure App Service, we recommend that you use [Azure SignalR Service](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/signalr/scale#azure-signalr-service). Azure SignalR Service allows for scaling up a Blazor Server app to a large number of concurrent SignalR connections. In addition, the SignalR service's global reach and high-performance datacenters significantly aid in reducing latency due to geography.

Important

In a Blazor Server app, UI states are maintained on the server side, which means a sticky server session is required to preserve state. If there is a single app server, sticky sessions are ensured by design. However, if there are multiple app servers, there are chances that the client negotiation and connection may go to different servers which may lead to an inconsistent UI state management in a Blazor app. Hence, it is recommended to enable sticky server sessions as shown below in _appsettings.json_:

```
<span><span>"Azure:SignalR:ServerStickyMode"</span>: <span>"Required"</span>
</span>
```

1.  Right-click the project and go to **Publish**. Use the following settings:
    
    -   **Target**: Azure
    -   **Specific target**: All types of **Azure App Service** are supported.
    -   **App Service**: Create or select the App Service instance.
    
    [![The animation shows selection of Azure as target, and then Azure App Serice as specific target.](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-profile.gif)](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-profile.gif#lightbox)
    
2.  Add the Azure SignalR Service dependency.
    
    After the creation of the publish profile, you can see a recommendation message to add Azure SignalR service under **Service Dependencies**. Select **Configure** to create a new or select an existing Azure SignalR Service in the pane.
    
    [![On Publish, the link to Configure is highlighted.](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-dependency.png)](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-dependency.png#lightbox)
    
    The service dependency will carry out the following activities to enable your app to automatically switch to Azure SignalR Service when on Azure:
    
    -   Update [`HostingStartupAssembly`](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/fundamentals/host/platform-specific-configuration) to use Azure SignalR Service.
    -   Add the Azure SignalR Service NuGet package reference.
    -   Update the profile properties to save the dependency settings.
    -   Configure the secrets store as per your choice.
    -   Add the configuration in _appsettings.json_ to make your app target Azure SignalR Service.
    
    [![On Summary of changes, the checkboxes are used to select all dependencies.](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-dependency-summary.png)](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-dependency-summary.png#lightbox)
    
3.  Publish the app.
    
    Now the app is ready to be published. Upon the completion of the publishing process, the app automatically launches in a browser.
    
    Note
    
    The app may require some time to start due to the Azure App Service deployment start latency. You can use the browser debugger tools (usually by pressing F12) to ensure that the traffic has been redirected to Azure SignalR Service.
    
    [![Blazor SignalR Chat Sample has a text box for your name, and a Chat! button to start a chat.](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-azure.png)](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/media/signalr-tutorial-build-blazor-server-chat-app/blazor-chat-azure.png#lightbox)
    

[Having issues? Let us know.](https://aka.ms/asrs/qsblazor)

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#enable-azure-signalr-service-for-local-development)

## Enable Azure SignalR Service for local development

1.  Add a reference to the Azure SignalR SDK using the following command.
    
    ```
    <span><span>dotnet</span> <span>add</span> package Microsoft.Azure.SignalR
    </span>
    ```
    
2.  Add a call to `AddAzureSignalR()` in `Startup.ConfigureServices()` as demonstrated below.
    
    ```
    <span><span><span>public</span> <span>void</span> <span>ConfigureServices</span>(<span>IServiceCollection services</span>)</span>
    {
        ...
        services.AddSignalR().AddAzureSignalR();
        ...
    }
    </span>
    ```
    
3.  Configure the Azure SignalR Service connection string either in _appsettings.json_ or by using the [Secret Manager](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/security/app-secrets?tabs=visual-studio#secret-manager) tool.
    

Note

Step 2 can be replaced with configuring [Hosting Startup Assemblies](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/fundamentals/host/platform-specific-configuration) to use the SignalR SDK.

1.  Add the configuration to turn on Azure SignalR Service in _appsettings.json_:
    
    ```
    <span><span>"Azure"</span>: {
      <span>"SignalR"</span>: {
        <span>"Enabled"</span>: <span>true</span>,
        <span>"ConnectionString"</span>: &lt;your-connection-string&gt;       
      }
    }
    
    </span>
    ```
    
2.  Configure the hosting startup assembly to use the Azure SignalR SDK. Edit _launchSettings.json_ and add a configuration like the following example inside `environmentVariables`:
    
    ```
    <span><span>"environmentVariables"</span>: {
        ...,
       <span>"ASPNETCORE_HOSTINGSTARTUPASSEMBLIES"</span>: <span>"Microsoft.Azure.SignalR"</span>
     }
    
    </span>
    ```
    

[Having issues? Let us know.](https://aka.ms/asrs/qsblazor)

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#clean-up-resources)

## Clean up resources

To clean up the resources created in this tutorial, delete the resource group using the Azure portal.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#additional-resources)

## Additional resources

-   [ASP.NET Core Blazor](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/blazor)

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#next-steps)

## Next steps

In this tutorial, you learned how to:

-   Build a simple chat room with the Blazor Server app template.
-   Work with Razor components.
-   Use event handling and data binding in Razor components.
-   Quick-deploy to Azure App Service in Visual Studio.
-   Migrate from local SignalR to Azure SignalR Service.

Read more about high availability:

___

## Feedback

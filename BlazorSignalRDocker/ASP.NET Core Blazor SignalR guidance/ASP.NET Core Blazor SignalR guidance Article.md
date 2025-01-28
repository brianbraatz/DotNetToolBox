---
created: 2024-07-24T16:44:51 (UTC -05:00)
tags: []
source: chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html
author: guardrex
---

# 

source: chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html

> ## Excerpt
> Learn how to configure and manage Blazor SignalR connections.

---
## ASP.NET Core Blazor SignalR guidance

-   Article
-   04/03/2024

## In this article

1.  [Azure SignalR Service with stateful reconnect](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#azure-signalr-service-with-stateful-reconnect)
2.  [Disable response compression for Hot Reload](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#disable-response-compression-for-hot-reload)
3.  [Client-side SignalR cross-origin negotiation for authentication](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#client-side-signalr-cross-origin-negotiation-for-authentication)
4.  [Client-side rendering](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#client-side-rendering)

This article explains how to configure and manage SignalR connections in Blazor apps.

For general guidance on ASP.NET Core SignalR configuration, see the topics in the [Overview of ASP.NET Core SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-8.0) area of the documentation, especially [ASP.NET Core SignalR configuration](https://learn.microsoft.com/en-us/aspnet/core/signalr/configuration?view=aspnetcore-8.0#configure-server-options).

Server-side apps use ASP.NET Core SignalR to communicate with the browser. [SignalR's hosting and scaling conditions](https://learn.microsoft.com/en-us/aspnet/core/signalr/publish-to-azure-web-app?view=aspnetcore-8.0) apply to server-side apps.

Blazor works best when using WebSockets as the SignalR transport due to lower latency, reliability, and [security](https://learn.microsoft.com/en-us/aspnet/core/signalr/security?view=aspnetcore-8.0). Long Polling is used by SignalR when WebSockets isn't available or when the app is explicitly configured to use Long Polling.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#disable-response-compression-for-hot-reload)

## Disable response compression for Hot Reload

When using [Hot Reload](https://learn.microsoft.com/en-us/aspnet/core/test/hot-reload?view=aspnetcore-8.0), disable Response Compression Middleware in the `Development` environment. Whether or not the default code from a project template is used, always call [UseResponseCompression](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.builder.responsecompressionbuilderextensions.useresponsecompression) first in the request processing pipeline.

In the `Program` file:

```
<span><span>if</span> (!app.Environment.IsDevelopment())
{
    app.UseResponseCompression();
}
</span>
```

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#client-side-signalr-cross-origin-negotiation-for-authentication)

## Client-side SignalR cross-origin negotiation for authentication

This section explains how to configure SignalR's underlying client to send credentials, such as cookies or HTTP authentication headers.

Use [SetBrowserRequestCredentials](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.webassembly.http.webassemblyhttprequestmessageextensions.setbrowserrequestcredentials) to set [Include](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.webassembly.http.browserrequestcredentials#microsoft-aspnetcore-components-webassembly-http-browserrequestcredentials-include) on cross-origin [`fetch`](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch) requests.

`IncludeRequestCredentialsMessageHandler.cs`:

```
<span><span>using</span> System.Net.Http;
<span>using</span> System.Threading;
<span>using</span> System.Threading.Tasks;
<span>using</span> Microsoft.AspNetCore.Components.WebAssembly.Http;

<span>public</span> <span>class</span> <span>IncludeRequestCredentialsMessageHandler</span> : <span>DelegatingHandler</span>
{
    <span><span>protected</span> <span>override</span> Task&lt;HttpResponseMessage&gt; <span>SendAsync</span>(<span>
        HttpRequestMessage request, CancellationToken cancellationToken</span>)</span>
    {
        request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);
        <span>return</span> <span>base</span>.SendAsync(request, cancellationToken);
    }
}
</span>
```

Where a hub connection is built, assign the [HttpMessageHandler](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/system.net.http.httpmessagehandler) to the [HttpMessageHandlerFactory](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.http.connections.client.httpconnectionoptions.httpmessagehandlerfactory#microsoft-aspnetcore-http-connections-client-httpconnectionoptions-httpmessagehandlerfactory) option:

```
<span><span>private</span> HubConnectionBuilder? hubConnection;

...

hubConnection = <span>new</span> HubConnectionBuilder()
    .WithUrl(<span>new</span> Uri(Navigation.ToAbsoluteUri(<span>"/chathub"</span>)), options =&gt;
    {
        options.HttpMessageHandlerFactory = innerHandler =&gt; 
            <span>new</span> IncludeRequestCredentialsMessageHandler { InnerHandler = innerHandler };
    }).Build();
</span>
```

The preceding example configures the hub connection URL to the absolute URI address at `/chathub`. The URI can also be set via a string, for example `https://signalr.example.com`, or via [configuration](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/configuration?view=aspnetcore-8.0). `Navigation` is an injected [NavigationManager](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.navigationmanager).

For more information, see [ASP.NET Core SignalR configuration](https://learn.microsoft.com/en-us/aspnet/core/signalr/configuration?view=aspnetcore-8.0#configure-additional-options).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#client-side-rendering)

## Client-side rendering

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#prerendered-state-size-and-signalr-message-size-limit)

## Prerendered state size and SignalR message size limit

A large prerendered state size may exceed the SignalR circuit message size limit, which results in the following:

-   The SignalR circuit fails to initialize with an error on the client: Circuit host not initialized.
-   The reconnection UI on the client appears when the circuit fails. Recovery isn't possible.

To resolve the problem, use _**either**_ of the following approaches:

-   Reduce the amount of data that you are putting into the prerendered state.
-   Increase the [SignalR message size limit](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/signalr?view=aspnetcore-8.0#server-side-circuit-handler-options). _**WARNING**_: Increasing the limit may increase the risk of Denial of Service (DoS) attacks.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#additional-client-side-resources)

## Additional client-side resources

-   [Secure a SignalR hub](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/webassembly/?view=aspnetcore-8.0#secure-a-signalr-hub)
-   [Overview of ASP.NET Core SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-8.0)
-   [ASP.NET Core SignalR configuration](https://learn.microsoft.com/en-us/aspnet/core/signalr/configuration?view=aspnetcore-8.0)
-   [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/?view=aspnetcore-8.0#sample-apps))

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#use-sticky-sessions-for-server-side-webfarm-hosting)

## Use sticky sessions for server-side webfarm hosting

A Blazor app prerenders in response to the first client request, which creates UI state on the server. When the client attempts to create a SignalR connection, **the client must reconnect to the same server**. When more than one backend server is in use, the app should implement _sticky sessions_ for SignalR connections.

Note

The following error is thrown by an app that hasn't enabled sticky sessions in a webfarm:

> blazor.server.js:1 Uncaught (in promise) Error: Invocation canceled due to the underlying connection being closed.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#server-side-azure-signalr-service)

## Server-side Azure SignalR Service

We recommend using the [Azure SignalR Service](https://learn.microsoft.com/en-us/aspnet/core/signalr/scale?view=aspnetcore-8.0#azure-signalr-service) for server-side development hosted in Microsoft Azure. The service works in conjunction with the app's Blazor Hub for scaling up a server-side app to a large number of concurrent SignalR connections. In addition, the SignalR Service's global reach and high-performance data centers significantly aid in reducing latency due to geography.

Sticky sessions are enabled for the Azure SignalR Service by setting the service's `ServerStickyMode` option or configuration value to `Required`. For more information, see [Host and deploy ASP.NET Core server-side Blazor apps](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/server?view=aspnetcore-8.0#azure-signalr-service).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#server-side-circuit-handler-options)

## Server-side circuit handler options

Configure the circuit with [CircuitOptions](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.server.circuitoptions). View default values in the [reference source](https://github.com/dotnet/aspnetcore/blob/main/src/Components/Server/src/CircuitOptions.cs).

Read or set the options in the `Program` file with an options delegate to [AddInteractiveServerComponents](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.extensions.dependencyinjection.serverrazorcomponentsbuilderextensions.addinteractiveservercomponents). The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

In the `Program` file:

```
<span>builder.Services.AddRazorComponents().AddInteractiveServerComponents(options =&gt;
{
    options.{OPTION} = {VALUE};
});
</span>
```

To configure the [HubConnectionContext](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.hubconnectioncontext), use [HubConnectionContextOptions](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.hubconnectioncontextoptions) with [AddHubOptions](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.extensions.dependencyinjection.serversideblazorbuilderextensions.addhuboptions). View the defaults for the hub connection context options in [reference source](https://github.com/dotnet/aspnetcore/blob/main/src/SignalR/server/Core/src/HubConnectionContextOptions.cs). For option descriptions in the SignalR documentation, see [ASP.NET Core SignalR configuration](https://learn.microsoft.com/en-us/aspnet/core/signalr/configuration?view=aspnetcore-8.0#configure-server-options). The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

In the `Program` file:

```
<span>builder.Services.AddRazorComponents().AddInteractiveServerComponents().AddHubOptions(options =&gt;
{
    options.{OPTION} = {VALUE};
});
</span>
```

For information on memory management, see [Host and deploy ASP.NET Core server-side Blazor apps](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/server?view=aspnetcore-8.0#memory-management).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#blazor-hub-options)

## Blazor hub options

Configure [MapBlazorHub](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.builder.componentendpointroutebuilderextensions.mapblazorhub) options to control [HttpConnectionDispatcherOptions](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.http.connections.httpconnectiondispatcheroptions) of the Blazor hub. View the defaults for the hub connection dispatcher options in [reference source](https://github.com/dotnet/aspnetcore/blob/main/src/SignalR/common/Http.Connections/src/HttpConnectionDispatcherOptions.cs). The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

Place the call to `app.MapBlazorHub` after the call to `app.MapRazorComponents` in the app's `Program` file:

```
<span>app.MapBlazorHub(options =&gt;
{
    options.{OPTION} = {VALUE};
});
</span>
```

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#maximum-receive-message-size)

## Maximum receive message size

_This section only applies to projects that implement SignalR._

The maximum incoming SignalR message size permitted for hub methods is limited by the [HubOptions.MaximumReceiveMessageSize](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.maximumreceivemessagesize#microsoft-aspnetcore-signalr-huboptions-maximumreceivemessagesize) (default: 32 KB). SignalR messages larger than [MaximumReceiveMessageSize](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.maximumreceivemessagesize#microsoft-aspnetcore-signalr-huboptions-maximumreceivemessagesize) throw an error. The framework doesn't impose a limit on the size of a SignalR message from the hub to a client.

When SignalR logging isn't set to [Debug](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.extensions.logging.loglevel) or [Trace](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.extensions.logging.loglevel), a message size error only appears in the browser's developer tools console:

> Error: Connection disconnected with error 'Error: Server returned an error on close: Connection closed with an error.'.

When [SignalR server-side logging](https://learn.microsoft.com/en-us/aspnet/core/signalr/diagnostics?view=aspnetcore-8.0#server-side-logging) is set to [Debug](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.extensions.logging.loglevel) or [Trace](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.extensions.logging.loglevel), server-side logging surfaces an [InvalidDataException](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/system.io.invaliddataexception) for a message size error.

`appsettings.Development.json`:

```
<span>{
  <span>"DetailedErrors"</span>: <span>true</span>,
  <span>"Logging"</span>: {
    <span>"LogLevel"</span>: {
      ...
      <span>"Microsoft.AspNetCore.SignalR"</span>: <span>"Debug"</span>
    }
  }
}
</span>
```

Error:

> System.IO.InvalidDataException: The maximum message size of 32768B was exceeded. The message size can be configured in AddHubOptions.

One approach involves increasing the limit by setting [MaximumReceiveMessageSize](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.maximumreceivemessagesize#microsoft-aspnetcore-signalr-huboptions-maximumreceivemessagesize) in the `Program` file. The following example sets the maximum receive message size to 64 KB:

```
<span>builder.Services.AddRazorComponents().AddInteractiveServerComponents()
    .AddHubOptions(options =&gt; options.MaximumReceiveMessageSize = <span>64</span> * <span>1024</span>);
</span>
```

Increasing the SignalR incoming message size limit comes at the cost of requiring more server resources, and it increases the risk of [Denial of Service (DoS) attacks](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/server/interactive-server-side-rendering?view=aspnetcore-8.0#denial-of-service-dos-attacks). Additionally, reading a large amount of content in to memory as strings or byte arrays can also result in allocations that work poorly with the garbage collector, resulting in additional performance penalties.

A better option for reading large payloads is to send the content in smaller chunks and process the payload as a [Stream](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/system.io.stream). This can be used when reading large JavaScript (JS) interop JSON payloads or if JS interop data is available as raw bytes. For an example that demonstrates sending large binary payloads in server-side apps that uses techniques similar to the [`InputFile` component](https://learn.microsoft.com/en-us/aspnet/core/blazor/file-uploads?view=aspnetcore-8.0), see the [Binary Submit sample app](https://github.com/aspnet/samples/tree/main/samples/aspnetcore/blazor/BinarySubmit) and the [Blazor `InputLargeTextArea` Component Sample](https://github.com/aspnet/samples/tree/main/samples/aspnetcore/blazor/InputLargeTextArea).

Forms that process large payloads over SignalR can also use streaming JS interop directly. For more information, see [Call .NET methods from JavaScript functions in ASP.NET Core Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript?view=aspnetcore-8.0#stream-from-javascript-to-net). For a forms example that streams `<textarea>` data to the server, see [Troubleshoot ASP.NET Core Blazor forms](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/troubleshoot?view=aspnetcore-8.0#large-form-payloads-and-the-signalr-message-size-limit).

Consider the following guidance when developing code that transfers a large amount of data:

-   Leverage the native streaming JS interop support to transfer data larger than the SignalR incoming message size limit:
    -   [Call JavaScript functions from .NET methods in ASP.NET Core Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#stream-from-net-to-javascript)
    -   [Call .NET methods from JavaScript functions in ASP.NET Core Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript?view=aspnetcore-8.0#stream-from-javascript-to-net)
    -   Form payload example: [Troubleshoot ASP.NET Core Blazor forms](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/troubleshoot?view=aspnetcore-8.0#large-form-payloads-and-the-signalr-message-size-limit)
-   General tips:
    -   Don't allocate large objects in JS and C# code.
    -   Free consumed memory when the process is completed or cancelled.
    -   Enforce the following additional requirements for security purposes:
        -   Declare the maximum file or data size that can be passed.
        -   Declare the minimum upload rate from the client to the server.
    -   After the data is received by the server, the data can be:
        -   Temporarily stored in a memory buffer until all of the segments are collected.
        -   Consumed immediately. For example, the data can be stored immediately in a database or written to disk as each segment is received.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#blazor-server-side-hub-endpoint-route-configuration)

## Blazor server-side Hub endpoint route configuration

In the `Program` file, call [MapBlazorHub](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.builder.componentendpointroutebuilderextensions.mapblazorhub) to map the Blazor [Hub](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.hub) to the app's default path. The Blazor script (`blazor.*.js`) automatically points to the endpoint created by [MapBlazorHub](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.builder.componentendpointroutebuilderextensions.mapblazorhub).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#reflect-the-server-side-connection-state-in-the-ui)

## Reflect the server-side connection state in the UI

When the client detects that the connection has been lost, a default UI is displayed to the user while the client attempts to reconnect. If reconnection fails, the user is provided the option to retry.

To customize the UI, define a single element with an `id` of `components-reconnect-modal`. The following example places the element in the `App` component.

`App.razor`:

```
<span><span><span>&lt;<span>div</span> <span>id</span>=<span>"components-reconnect-modal"</span>&gt;</span>
    There was a problem with the connection!
<span>&lt;/<span>div</span>&gt;</span>
</span></span>
```

Note

If more than one element with an `id` of `components-reconnect-modal` are rendered by the app, only the first rendered element receives CSS class changes to display or hide the element.

Add the following CSS styles to the site's stylesheet.

```
<span><span>#components-reconnect-modal</span> {
    <span>display</span>: none;
}

<span>#components-reconnect-modal</span><span>.components-reconnect-show</span>, 
<span>#components-reconnect-modal</span><span>.components-reconnect-failed</span>, 
<span>#components-reconnect-modal</span><span>.components-reconnect-rejected</span> {
    <span>display</span>: block;
}
</span>
```

The following table describes the CSS classes applied to the `components-reconnect-modal` element by the Blazor framework.

| CSS class | Indicates… |
| --- | --- |
| `components-reconnect-show` | A lost connection. The client is attempting to reconnect. Show the modal. |
| `components-reconnect-hide` | An active connection is re-established to the server. Hide the modal. |
| `components-reconnect-failed` | Reconnection failed, probably due to a network failure. To attempt reconnection, call `window.Blazor.reconnect()` in JavaScript. |
| `components-reconnect-rejected` | Reconnection rejected. The server was reached but refused the connection, and the user's state on the server is lost. To reload the app, call `location.reload()` in JavaScript. This connection state may result when:
-   A crash in the server-side circuit occurs.
-   The client is disconnected long enough for the server to drop the user's state. Instances of the user's components are disposed.
-   The server is restarted, or the app's worker process is recycled.

 |

Customize the delay before the reconnection UI appears by setting the `transition-delay` property in the site's CSS for the modal element. The following example sets the transition delay from 500 ms (default) to 1,000 ms (1 second).

```
<span><span>#components-reconnect-modal</span> {
    <span>transition</span>: visibility <span>0s</span> linear <span>1000ms</span>;
}
</span>
```

To display the current reconnect attempt, define an element with an `id` of `components-reconnect-current-attempt`. To display the maximum number of reconnect retries, define an element with an `id` of `components-reconnect-max-retries`. The following example places these elements inside a reconnect attempt modal element following the previous example.

```
<span><span><span>&lt;<span>div</span> <span>id</span>=<span>"components-reconnect-modal"</span>&gt;</span>
    There was a problem with the connection!
    (Current reconnect attempt: 
    <span>&lt;<span>span</span> <span>id</span>=<span>"components-reconnect-current-attempt"</span>&gt;</span><span>&lt;/<span>span</span>&gt;</span> /
    <span>&lt;<span>span</span> <span>id</span>=<span>"components-reconnect-max-retries"</span>&gt;</span><span>&lt;/<span>span</span>&gt;</span>)
<span>&lt;/<span>div</span>&gt;</span>
</span></span>
```

When the custom reconnect modal appears, it renders content similar to the following based on the preceding code:

```
<span>There was a problem with the connection! (Current reconnect attempt: 3 / 8)
</span>
```

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#server-side-rendering)

## Server-side rendering

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#monitor-server-side-circuit-activity)

## Monitor server-side circuit activity

Monitor inbound circuit activity using the [CreateInboundActivityHandler](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.server.circuits.circuithandler.createinboundactivityhandler) method on [CircuitHandler](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.server.circuits.circuithandler). Inbound circuit activity is any activity sent from the browser to the server, such as UI events or JavaScript-to-.NET interop calls.

For example, you can use a circuit activity handler to detect if the client is idle and log its circuit ID ([Circuit.Id](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.server.circuits.circuit.id#microsoft-aspnetcore-components-server-circuits-circuit-id)):

```
<span><span>using</span> Microsoft.AspNetCore.Components.Server.Circuits;
<span>using</span> Microsoft.Extensions.Options;
<span>using</span> Timer = System.Timers.Timer;

<span>public</span> <span>sealed</span> <span>class</span> <span>IdleCircuitHandler</span> : <span>CircuitHandler</span>, <span>IDisposable</span>
{
    <span>private</span> Circuit? currentCircuit;
    <span>private</span> <span>readonly</span> ILogger logger;
    <span>private</span> <span>readonly</span> Timer timer;

    <span><span>public</span> <span>IdleCircuitHandler</span>(<span>ILogger&lt;IdleCircuitHandler&gt; logger, 
        IOptions&lt;IdleCircuitOptions&gt; options</span>)</span>
    {
        timer = <span>new</span> Timer
        {
            Interval = options.Value.IdleTimeout.TotalMilliseconds,
            AutoReset = <span>false</span>
        };

        timer.Elapsed += CircuitIdle;
        <span>this</span>.logger = logger;
    }

    <span><span>private</span> <span>void</span> <span>CircuitIdle</span>(<span><span>object</span>? sender, System.Timers.ElapsedEventArgs e</span>)</span>
    {
        logger.LogInformation(<span>"{CircuitId} is idle"</span>, currentCircuit?.Id);
    }

    <span><span>public</span> <span>override</span> Task <span>OnCircuitOpenedAsync</span>(<span>Circuit circuit, 
        CancellationToken cancellationToken</span>)</span>
    {
        currentCircuit = circuit;

        <span>return</span> Task.CompletedTask;
    }

    <span><span>public</span> <span>override</span> Func&lt;CircuitInboundActivityContext, Task&gt; <span>CreateInboundActivityHandler</span>(<span>
        Func&lt;CircuitInboundActivityContext, Task&gt; next</span>)</span>
    {
        <span>return</span> context =&gt;
        {
            timer.Stop();
            timer.Start();

            <span>return</span> next(context);
        };
    }

    <span><span>public</span> <span>void</span> <span>Dispose</span>(<span></span>)</span> =&gt; timer.Dispose();
}

<span>public</span> <span>class</span> <span>IdleCircuitOptions</span>
{
    <span>public</span> TimeSpan IdleTimeout { <span>get</span>; <span>set</span>; } = TimeSpan.FromMinutes(<span>5</span>);
}

<span>public</span> <span>static</span> <span>class</span> <span>IdleCircuitHandlerServiceCollectionExtensions</span>
{
    <span><span>public</span> <span>static</span> IServiceCollection <span>AddIdleCircuitHandler</span>(<span>
        <span>this</span> IServiceCollection services, 
        Action&lt;IdleCircuitOptions&gt; configureOptions</span>)</span>
    {
        services.Configure(configureOptions);
        services.AddIdleCircuitHandler();

        <span>return</span> services;
    }

    <span><span>public</span> <span>static</span> IServiceCollection <span>AddIdleCircuitHandler</span>(<span>
        <span>this</span> IServiceCollection services</span>)</span>
    {
        services.AddScoped&lt;CircuitHandler, IdleCircuitHandler&gt;();

        <span>return</span> services;
    }
}
</span>
```

Register the service in the `Program` file. The following example configures the default idle timeout of five minutes to five seconds in order to test the preceding `IdleCircuitHandler` implementation:

```
<span>builder.Services.AddIdleCircuitHandler(options =&gt; 
    options.IdleTimeout = TimeSpan.FromSeconds(<span>5</span>));
</span>
```

Circuit activity handlers also provide an approach for accessing scoped Blazor services from other non-Blazor dependency injection (DI) scopes. For more information and examples, see:

-   [ASP.NET Core Blazor dependency injection](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/dependency-injection?view=aspnetcore-8.0#access-server-side-blazor-services-from-a-different-di-scope)
-   [Server-side ASP.NET Core Blazor additional security scenarios](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/server/additional-scenarios?view=aspnetcore-8.0#access-authenticationstateprovider-in-outgoing-request-middleware)

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#blazor-startup)

## Blazor startup

Configure the manual start of a Blazor app's SignalR circuit in the `App.razor` file of a Blazor Web App:

-   Add an `autostart="false"` attribute to the `<script>` tag for the `blazor.*.js` script.
-   Place a script that calls `Blazor.start()` after the Blazor script is loaded and inside the closing `</body>` tag.

When `autostart` is disabled, any aspect of the app that doesn't depend on the circuit works normally. For example, client-side routing is operational. However, any aspect that depends on the circuit isn't operational until `Blazor.start()` is called. App behavior is unpredictable without an established circuit. For example, component methods fail to execute while the circuit is disconnected.

For more information, including how to initialize Blazor when the document is ready and how to chain to a [JS `Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise), see [ASP.NET Core Blazor startup](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/startup?view=aspnetcore-8.0).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#configure-signalr-timeouts-and-keep-alive-on-the-client)

## Configure SignalR timeouts and Keep-Alive on the client

Configure the following values for the client:

-   `withServerTimeout`: Configures the server timeout in milliseconds. If this timeout elapses without receiving any messages from the server, the connection is terminated with an error. The default timeout value is 30 seconds. The server timeout should be at least double the value assigned to the Keep-Alive interval (`withKeepAliveInterval`).
-   `withKeepAliveInterval`: Configures the Keep-Alive interval in milliseconds (default interval at which to ping the server). This setting allows the server to detect hard disconnects, such as when a client unplugs their computer from the network. The ping occurs at most as often as the server pings. If the server pings every five seconds, assigning a value lower than `5000` (5 seconds) pings every five seconds. The default value is 15 seconds. The Keep-Alive interval should be less than or equal to half the value assigned to the server timeout (`withServerTimeout`).

The following example for the `App.razor` file (Blazor Web App) shows the assignment of default values.

Blazor Web App:

```
<span><span>&lt;<span>script</span> <span>src</span>=<span>"{BLAZOR SCRIPT}"</span> <span>autostart</span>=<span>"false"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;<span>script</span>&gt;</span><span>
  Blazor.start({
    circuit: {
      configureSignalR: <span>function</span> (builder) {
        builder.withServerTimeout(<span>30000</span>).withKeepAliveInterval(<span>15000</span>);
      }
    }
  });
</span><span>&lt;/<span>script</span>&gt;</span>
</span>
```

The following example for the `Pages/_Host.cshtml` file (Blazor Server, all versions except ASP.NET Core in .NET 6) or `Pages/_Layout.cshtml` file (Blazor Server, ASP.NET Core in .NET 6).

Blazor Server:

```
<span><span>&lt;<span>script</span> <span>src</span>=<span>"{BLAZOR SCRIPT}"</span> <span>autostart</span>=<span>"false"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;<span>script</span>&gt;</span><span>
  Blazor.start({
    configureSignalR: <span>function</span> (builder) {
      builder.withServerTimeout(<span>30000</span>).withKeepAliveInterval(<span>15000</span>);
    }
  });
</span><span>&lt;/<span>script</span>&gt;</span>
</span>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script and the path to use, see [ASP.NET Core Blazor project structure](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-8.0#location-of-the-blazor-script).

When creating a hub connection in a component, set the [ServerTimeout](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnection.servertimeout#microsoft-aspnetcore-signalr-client-hubconnection-servertimeout) (default: 30 seconds) and [KeepAliveInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnection.keepaliveinterval#microsoft-aspnetcore-signalr-client-hubconnection-keepaliveinterval) (default: 15 seconds) on the [HubConnectionBuilder](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnectionbuilder). Set the [HandshakeTimeout](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnection.handshaketimeout#microsoft-aspnetcore-signalr-client-hubconnection-handshaketimeout) (default: 15 seconds) on the built [HubConnection](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnection). The following example shows the assignment of default values:

```
<span><span><span>protected</span> <span>override</span> <span>async</span> Task <span>OnInitializedAsync</span>(<span></span>)</span>
{
    hubConnection = <span>new</span> HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri(<span>"/chathub"</span>))
        .WithServerTimeout(TimeSpan.FromSeconds(<span>30</span>))
        .WithKeepAliveInterval(TimeSpan.FromSeconds(<span>15</span>))
        .Build();

    hubConnection.HandshakeTimeout = TimeSpan.FromSeconds(<span>15</span>);

    hubConnection.On&lt;<span>string</span>, <span>string</span>&gt;(<span>"ReceiveMessage"</span>, (user, message) =&gt; ...

    <span>await</span> hubConnection.StartAsync();
}
</span>
```

When changing the values of the server timeout ([ServerTimeout](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnection.servertimeout#microsoft-aspnetcore-signalr-client-hubconnection-servertimeout)) or the Keep-Alive interval ([KeepAliveInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnection.keepaliveinterval#microsoft-aspnetcore-signalr-client-hubconnection-keepaliveinterval)):

-   The server timeout should be at least double the value assigned to the Keep-Alive interval.
-   The Keep-Alive interval should be less than or equal to half the value assigned to the server timeout.

For more information, see the _Global deployment and connection failures_ sections of the following articles:

-   [Host and deploy ASP.NET Core server-side Blazor apps](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/server?view=aspnetcore-8.0#global-deployment-and-connection-failures)
-   [Host and deploy ASP.NET Core Blazor WebAssembly](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-8.0#global-deployment-and-connection-failures)

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#modify-the-server-side-reconnection-handler)

## Modify the server-side reconnection handler

The reconnection handler's circuit connection events can be modified for custom behaviors, such as:

-   To notify the user if the connection is dropped.
-   To perform logging (from the client) when a circuit is connected.

To modify the connection events, register callbacks for the following connection changes:

-   Dropped connections use `onConnectionDown`.
-   Established/re-established connections use `onConnectionUp`.

**Both `onConnectionDown` and `onConnectionUp` must be specified.**

Blazor Web App:

```
<span><span>&lt;<span>script</span> <span>src</span>=<span>"{BLAZOR SCRIPT}"</span> <span>autostart</span>=<span>"false"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;<span>script</span>&gt;</span><span>
  Blazor.start({
    circuit: {
      reconnectionHandler: {
        onConnectionDown: (options, <span>error</span>) =&gt; console.<span>error</span>(<span>error</span>),
        onConnectionUp: () =&gt; console.<span>log</span>(<span>"Up, up, and away!"</span>)
      }
    }
  });
</span><span>&lt;/<span>script</span>&gt;</span>
</span>
```

Blazor Server:

```
<span><span>&lt;<span>script</span> <span>src</span>=<span>"{BLAZOR SCRIPT}"</span> <span>autostart</span>=<span>"false"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;<span>script</span>&gt;</span><span>
  Blazor.start({
    reconnectionHandler: {
      onConnectionDown: (options, <span>error</span>) =&gt; console.<span>error</span>(<span>error</span>),
      onConnectionUp: () =&gt; console.<span>log</span>(<span>"Up, up, and away!"</span>)
    }
  });
</span><span>&lt;/<span>script</span>&gt;</span>
</span>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script and the path to use, see [ASP.NET Core Blazor project structure](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-8.0#location-of-the-blazor-script).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#automatically-refresh-the-page-when-server-side-reconnection-fails)

### Automatically refresh the page when server-side reconnection fails

The default reconnection behavior requires the user to take manual action to refresh the page after reconnection fails. However, a custom reconnection handler can be used to automatically refresh the page:

```
<span><span>&lt;<span>div</span> <span>id</span>=<span>"reconnect-modal"</span> <span>style</span>=<span>"display: none;"</span>&gt;</span><span>&lt;/<span>div</span>&gt;</span>
<span>&lt;<span>script</span> <span>src</span>=<span>"{BLAZOR SCRIPT}"</span> <span>autostart</span>=<span>"false"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;<span>script</span> <span>src</span>=<span>"boot.js"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
</span>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script and the path to use, see [ASP.NET Core Blazor project structure](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-8.0#location-of-the-blazor-script).

Create the following `wwwroot/boot.js` file.

Blazor Web App:

```
<span>(<span><span>()</span> =&gt;</span> {
  <span>const</span> maximumRetryCount = <span>3</span>;
  <span>const</span> retryIntervalMilliseconds = <span>5000</span>;
  <span>const</span> reconnectModal = <span>document</span>.getElementById(<span>'reconnect-modal'</span>);

  <span>const</span> startReconnectionProcess = <span><span>()</span> =&gt;</span> {
    reconnectModal.style.display = <span>'block'</span>;

    <span>let</span> isCanceled = <span>false</span>;

    <span>(<span><span>async</span> (</span>) =&gt;</span> {
      <span>for</span> (<span>let</span> i = <span>0</span>; i &lt; maximumRetryCount; i++) {
        reconnectModal.innerText = <span>`Attempting to reconnect: <span>${i + <span>1</span>}</span> of <span>${maximumRetryCount}</span>`</span>;

        <span>await</span> <span>new</span> <span>Promise</span>(<span><span>resolve</span> =&gt;</span> setTimeout(resolve, retryIntervalMilliseconds));

        <span>if</span> (isCanceled) {
          <span>return</span>;
        }

        <span>try</span> {
          <span>const</span> result = <span>await</span> Blazor.reconnect();
          <span>if</span> (!result) {
            <span>// The server was reached, but the connection was rejected; reload the page.</span>
            location.reload();
            <span>return</span>;
          }

          <span>// Successfully reconnected to the server.</span>
          <span>return</span>;
        } <span>catch</span> {
          <span>// Didn't reach the server; try again.</span>
        }
      }

      <span>// Retried too many times; reload the page.</span>
      location.reload();
    })();

    <span>return</span> {
      <span>cancel</span>: <span><span>()</span> =&gt;</span> {
        isCanceled = <span>true</span>;
        reconnectModal.style.display = <span>'none'</span>;
      },
    };
  };

  <span>let</span> currentReconnectionProcess = <span>null</span>;

  Blazor.start({
    <span>circuit</span>: {
      <span>reconnectionHandler</span>: {
        <span>onConnectionDown</span>: <span><span>()</span> =&gt;</span> currentReconnectionProcess ??= startReconnectionProcess(),
        <span>onConnectionUp</span>: <span><span>()</span> =&gt;</span> {
          currentReconnectionProcess?.cancel();
          currentReconnectionProcess = <span>null</span>;
        }
      }
    }
  });
})();
</span>
```

Blazor Server:

```
<span>(<span><span>()</span> =&gt;</span> {
  <span>const</span> maximumRetryCount = <span>3</span>;
  <span>const</span> retryIntervalMilliseconds = <span>5000</span>;
  <span>const</span> reconnectModal = <span>document</span>.getElementById(<span>'reconnect-modal'</span>);

  <span>const</span> startReconnectionProcess = <span><span>()</span> =&gt;</span> {
    reconnectModal.style.display = <span>'block'</span>;

    <span>let</span> isCanceled = <span>false</span>;

    <span>(<span><span>async</span> (</span>) =&gt;</span> {
      <span>for</span> (<span>let</span> i = <span>0</span>; i &lt; maximumRetryCount; i++) {
        reconnectModal.innerText = <span>`Attempting to reconnect: <span>${i + <span>1</span>}</span> of <span>${maximumRetryCount}</span>`</span>;

        <span>await</span> <span>new</span> <span>Promise</span>(<span><span>resolve</span> =&gt;</span> setTimeout(resolve, retryIntervalMilliseconds));

        <span>if</span> (isCanceled) {
          <span>return</span>;
        }

        <span>try</span> {
          <span>const</span> result = <span>await</span> Blazor.reconnect();
          <span>if</span> (!result) {
            <span>// The server was reached, but the connection was rejected; reload the page.</span>
            location.reload();
            <span>return</span>;
          }

          <span>// Successfully reconnected to the server.</span>
          <span>return</span>;
        } <span>catch</span> {
          <span>// Didn't reach the server; try again.</span>
        }
      }

      <span>// Retried too many times; reload the page.</span>
      location.reload();
    })();

    <span>return</span> {
      <span>cancel</span>: <span><span>()</span> =&gt;</span> {
        isCanceled = <span>true</span>;
        reconnectModal.style.display = <span>'none'</span>;
      },
    };
  };

  <span>let</span> currentReconnectionProcess = <span>null</span>;

  Blazor.start({
    <span>reconnectionHandler</span>: {
      <span>onConnectionDown</span>: <span><span>()</span> =&gt;</span> currentReconnectionProcess ??= startReconnectionProcess(),
      <span>onConnectionUp</span>: <span><span>()</span> =&gt;</span> {
        currentReconnectionProcess?.cancel();
        currentReconnectionProcess = <span>null</span>;
      }
    }
  });
})();
</span>
```

For more information on Blazor startup, see [ASP.NET Core Blazor startup](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/startup?view=aspnetcore-8.0).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#adjust-the-server-side-reconnection-retry-count-and-interval)

## Adjust the server-side reconnection retry count and interval

To adjust the reconnection retry count and interval, set the number of retries (`maxRetries`) and period in milliseconds permitted for each retry attempt (`retryIntervalMilliseconds`).

Blazor Web App:

```
<span><span>&lt;<span>script</span> <span>src</span>=<span>"{BLAZOR SCRIPT}"</span> <span>autostart</span>=<span>"false"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;<span>script</span>&gt;</span>
  Blazor.start({
    circuit: {
      reconnectionOptions: {
        maxRetries: 3,
        retryIntervalMilliseconds: 2000
      }
    }
  });
<span>&lt;/<span>script</span>&gt;</span>
</span>
```

Blazor Server:

```
<span><span>&lt;<span>script</span> <span>src</span>=<span>"{BLAZOR SCRIPT}"</span> <span>autostart</span>=<span>"false"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;<span>script</span>&gt;</span>
  Blazor.start({
    reconnectionOptions: {
      maxRetries: 3,
      retryIntervalMilliseconds: 2000
    }
  });
<span>&lt;/<span>script</span>&gt;</span>
</span>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script and the path to use, see [ASP.NET Core Blazor project structure](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-8.0#location-of-the-blazor-script).

For more information on Blazor startup, see [ASP.NET Core Blazor startup](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/startup?view=aspnetcore-8.0).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#control-when-the-reconnection-ui-appears)

## Control when the reconnection UI appears

Controlling when the reconnection UI appears can be useful in the following situations:

-   A deployed app frequently displays the reconnection UI due to ping timeouts caused by internal network or Internet latency, and you would like to increase the delay.
-   An app should report to users that the connection has dropped sooner, and you would like to shorten the delay.

The timing of the appearance of the reconnection UI is influenced by adjusting the Keep-Alive interval and timeouts on the client. The reconnection UI appears when the server timeout is reached on the client (`withServerTimeout`, [Client configuration](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#client-configuration) section). However, changing the value of `withServerTimeout` requires changes to other Keep-Alive, timeout, and handshake settings described in the following guidance.

As general recommendations for the guidance that follows:

-   The Keep-Alive interval should match between client and server configurations.
-   Timeouts should be at least double the value assigned to the Keep-Alive interval.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#server-configuration)

### Server configuration

Set the following:

-   [ClientTimeoutInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.clienttimeoutinterval#microsoft-aspnetcore-signalr-huboptions-clienttimeoutinterval) (default: 30 seconds): The time window clients have to send a message before the server closes the connection.
-   [HandshakeTimeout](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.handshaketimeout#microsoft-aspnetcore-signalr-huboptions-handshaketimeout) (default: 15 seconds): The interval used by the server to timeout incoming handshake requests by clients.
-   [KeepAliveInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.keepaliveinterval#microsoft-aspnetcore-signalr-huboptions-keepaliveinterval) (default: 15 seconds): The interval used by the server to send keep alive pings to connected clients. Note that there is also a Keep-Alive interval setting on the client, which should match the server's value.

The [ClientTimeoutInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.clienttimeoutinterval#microsoft-aspnetcore-signalr-huboptions-clienttimeoutinterval) and [HandshakeTimeout](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.handshaketimeout#microsoft-aspnetcore-signalr-huboptions-handshaketimeout) can be increased, and the [KeepAliveInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.keepaliveinterval#microsoft-aspnetcore-signalr-huboptions-keepaliveinterval) can remain the same. The important consideration is that if you change the values, make sure that the timeouts are at least double the value of the Keep-Alive interval and that the Keep-Alive interval matches between server and client. For more information, see the [Configure SignalR timeouts and Keep-Alive on the client](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#configure-signalr-timeouts-and-keep-alive-on-the-client) section.

In the following example:

-   The [ClientTimeoutInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.clienttimeoutinterval#microsoft-aspnetcore-signalr-huboptions-clienttimeoutinterval) is increased to 60 seconds (default value: 30 seconds).
-   The [HandshakeTimeout](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.handshaketimeout#microsoft-aspnetcore-signalr-huboptions-handshaketimeout) is increased to 30 seconds (default value: 15 seconds).
-   The [KeepAliveInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.huboptions.keepaliveinterval#microsoft-aspnetcore-signalr-huboptions-keepaliveinterval) isn't set in developer code and uses its default value of 15 seconds. Decreasing the value of the Keep-Alive interval increases the frequency of communication pings, which increases the load on the app, server, and network. Care must be taken to avoid introducing poor performance when lowering the Keep-Alive interval.

**Blazor Web App** (.NET 8 or later) in the server project's `Program` file:

```
<span>builder.Services.AddRazorComponents().AddInteractiveServerComponents()
    .AddHubOptions(options =&gt;
{
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(<span>60</span>);
    options.HandshakeTimeout = TimeSpan.FromSeconds(<span>30</span>);
});
</span>
```

**Blazor Server** in the `Program` file:

```
<span>builder.Services.AddServerSideBlazor()
    .AddHubOptions(options =&gt;
    {
        options.ClientTimeoutInterval = TimeSpan.FromSeconds(<span>60</span>);
        options.HandshakeTimeout = TimeSpan.FromSeconds(<span>30</span>);
    });
</span>
```

For more information, see the [Server-side circuit handler options](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#server-side-circuit-handler-options) section.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#client-configuration)

### Client configuration

Set the following:

-   `withServerTimeout` (default: 30 seconds): Configures the server timeout, specified in milliseconds, for the circuit's hub connection.
-   `withKeepAliveInterval` (default: 15 seconds): The interval, specified in milliseconds, at which the connection sends Keep-Alive messages.

The server timeout can be increased, and the Keep-Alive interval can remain the same. The important consideration is that if you change the values, make sure that the server timeout is at least double the value of the Keep-Alive interval and that the Keep-Alive interval values match between server and client. For more information, see the [Configure SignalR timeouts and Keep-Alive on the client](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#configure-signalr-timeouts-and-keep-alive-on-the-client) section.

In the following [startup configuration](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/startup?view=aspnetcore-8.0) example ([location of the Blazor script](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-8.0#location-of-the-blazor-script)), a custom value of 60 seconds is used for the server timeout. The Keep-Alive interval (`withKeepAliveInterval`) isn't set and uses its default value of 15 seconds.

Blazor Web App:

```
<span><span>&lt;<span>script</span> <span>src</span>=<span>"{BLAZOR SCRIPT}"</span> <span>autostart</span>=<span>"false"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;<span>script</span>&gt;</span><span>
  Blazor.start({
    circuit: {
      configureSignalR: <span>function</span> (builder) {
        builder.withServerTimeout(<span>60000</span>);
      }
    }
  });
</span><span>&lt;/<span>script</span>&gt;</span>
</span>
```

Blazor Server:

```
<span><span>&lt;<span>script</span> <span>src</span>=<span>"{BLAZOR SCRIPT}"</span> <span>autostart</span>=<span>"false"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;<span>script</span>&gt;</span><span>
  Blazor.start({
    configureSignalR: <span>function</span> (builder) {
      builder.withServerTimeout(<span>60000</span>);
    }
  });
</span><span>&lt;/<span>script</span>&gt;</span>
</span>
```

When creating a hub connection in a component, set the server timeout ([WithServerTimeout](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnectionbuilderextensions.withservertimeout), default: 30 seconds) on the [HubConnectionBuilder](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnectionbuilder). Set the [HandshakeTimeout](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnection.handshaketimeout#microsoft-aspnetcore-signalr-client-hubconnection-handshaketimeout) (default: 15 seconds) on the built [HubConnection](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnection). Confirm that the timeouts are at least double the Keep-Alive interval ([WithKeepAliveInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnectionbuilderextensions.withkeepaliveinterval)/[KeepAliveInterval](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.signalr.client.hubconnection.keepaliveinterval#microsoft-aspnetcore-signalr-client-hubconnection-keepaliveinterval)) and that the Keep-Alive value matches between server and client.

The following example is based on the `Index` component in the [SignalR with Blazor tutorial](https://learn.microsoft.com/en-us/aspnet/core/blazor/tutorials/signalr-blazor?view=aspnetcore-8.0). The server timeout is increased to 60 seconds, and the handshake timeout is increased to 30 seconds. The Keep-Alive interval isn't set and uses its default value of 15 seconds.

```
<span><span><span>protected</span> <span>override</span> <span>async</span> Task <span>OnInitializedAsync</span>(<span></span>)</span>
{
    hubConnection = <span>new</span> HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri(<span>"/chathub"</span>))
        .WithServerTimeout(TimeSpan.FromSeconds(<span>60</span>))
        .Build();

    hubConnection.HandshakeTimeout = TimeSpan.FromSeconds(<span>30</span>);

    hubConnection.On&lt;<span>string</span>, <span>string</span>&gt;(<span>"ReceiveMessage"</span>, (user, message) =&gt; ...

    <span>await</span> hubConnection.StartAsync();
}
</span>
```

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#disconnect-the-blazor-circuit-from-the-client)

## Disconnect the Blazor circuit from the client

By default, a Blazor circuit is disconnected when the [`unload` page event](https://developer.mozilla.org/docs/Web/API/Window/unload_event) is triggered. To disconnect the circuit for other scenarios on the client, invoke `Blazor.disconnect` in the appropriate event handler. In the following example, the circuit is disconnected when the page is hidden ([`pagehide` event](https://developer.mozilla.org/docs/Web/API/Window/pagehide_event)):

```
<span><span>window</span>.addEventListener(<span>'pagehide'</span>, () =&gt; {
  Blazor.disconnect();
});
</span>
```

For more information on Blazor startup, see [ASP.NET Core Blazor startup](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/startup?view=aspnetcore-8.0).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#server-side-circuit-handler)

## Server-side circuit handler

You can define a _circuit handler_, which allows running code on changes to the state of a user's circuit. A circuit handler is implemented by deriving from [CircuitHandler](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.server.circuits.circuithandler) and registering the class in the app's service container. The following example of a circuit handler tracks open SignalR connections.

`TrackingCircuitHandler.cs`:

```
<span><span>using</span> Microsoft.AspNetCore.Components.Server.Circuits;

<span>public</span> <span>class</span> <span>TrackingCircuitHandler</span> : <span>CircuitHandler</span>
{
    <span>private</span> HashSet&lt;Circuit&gt; circuits = <span>new</span>();

    <span><span>public</span> <span>override</span> Task <span>OnConnectionUpAsync</span>(<span>Circuit circuit, 
        CancellationToken cancellationToken</span>)</span>
    {
        circuits.Add(circuit);

        <span>return</span> Task.CompletedTask;
    }

    <span><span>public</span> <span>override</span> Task <span>OnConnectionDownAsync</span>(<span>Circuit circuit, 
        CancellationToken cancellationToken</span>)</span>
    {
        circuits.Remove(circuit);

        <span>return</span> Task.CompletedTask;
    }

    <span>public</span> <span>int</span> ConnectedCircuits =&gt; circuits.Count;
}
</span>
```

Circuit handlers are registered using DI. Scoped instances are created per instance of a circuit. Using the `TrackingCircuitHandler` in the preceding example, a singleton service is created because the state of all circuits must be tracked.

In the `Program` file:

```
<span>builder.Services.AddSingleton&lt;CircuitHandler, TrackingCircuitHandler&gt;();
</span>
```

If a custom circuit handler's methods throw an unhandled exception, the exception is fatal to the circuit. To tolerate exceptions in a handler's code or called methods, wrap the code in one or more [`try-catch`](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/csharp/language-reference/keywords/try-catch) statements with error handling and logging.

When a circuit ends because a user has disconnected and the framework is cleaning up the circuit state, the framework disposes of the circuit's DI scope. Disposing the scope disposes any circuit-scoped DI services that implement [System.IDisposable](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/system.idisposable). If any DI service throws an unhandled exception during disposal, the framework logs the exception. For more information, see [ASP.NET Core Blazor dependency injection](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/dependency-injection?view=aspnetcore-8.0#service-lifetime).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#server-side-circuit-handler-to-capture-users-for-custom-services)

## Server-side circuit handler to capture users for custom services

Use a [CircuitHandler](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.server.circuits.circuithandler) to capture a user from the [AuthenticationStateProvider](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.authorization.authenticationstateprovider) and set that user in a service. For more information and example code, see [Server-side ASP.NET Core Blazor additional security scenarios](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/server/additional-scenarios?view=aspnetcore-8.0#circuit-handler-to-capture-users-for-custom-services).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#closure-of-circuits-when-there-are-no-remaining-interactive-server-components)

## Closure of circuits when there are no remaining Interactive Server components

Interactive Server components handle web UI events using a real-time connection with the browser called a circuit. A circuit and its associated state are created when a root Interactive Server component is rendered. The circuit is closed when there are no remaining Interactive Server components on the page, which frees up server resources.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#ihttpcontextaccessorhttpcontext-in-razor-components)

## `IHttpContextAccessor`/`HttpContext` in Razor components

[IHttpContextAccessor](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.http.ihttpcontextaccessor) must be avoided with interactive rendering because there isn't a valid `HttpContext` available.

[IHttpContextAccessor](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.http.ihttpcontextaccessor) can be used for components that are statically rendered on the server. **However, we recommend avoiding it if possible.**

[HttpContext](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.http.httpcontext) can be used as a [cascading parameter](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.components.cascadingparameterattribute) only in _statically-rendered root components_ for general tasks, such as inspecting and modifying headers or other properties in the `App` component (`Components/App.razor`). The value is always `null` for interactive rendering.

```
<span>[<span>CascadingParameter</span>]
<span>public</span> HttpContext? HttpContext { <span>get</span>; <span>set</span>; }
</span>
```

For scenarios where the [HttpContext](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/dotnet/api/microsoft.aspnetcore.http.httpcontext) is required in interactive components, we recommend flowing the data via persistent component state from the server. For more information, see [Server-side ASP.NET Core Blazor additional security scenarios](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/server/additional-scenarios?view=aspnetcore-8.0#pass-tokens-to-a-server-side-blazor-app).

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/_generated_background_page.html#additional-server-side-resources)

## Additional server-side resources

-   [Server-side host and deployment guidance: SignalR configuration](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/server?view=aspnetcore-8.0#signalr-configuration)
-   [Overview of ASP.NET Core SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-8.0)
-   [ASP.NET Core SignalR configuration](https://learn.microsoft.com/en-us/aspnet/core/signalr/configuration?view=aspnetcore-8.0)
-   Server-side security documentation
    -   [ASP.NET Core Blazor authentication and authorization](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/?view=aspnetcore-8.0)
    -   [Secure ASP.NET Core server-side Blazor apps](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/server/?view=aspnetcore-8.0)
    -   [Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/server/interactive-server-side-rendering?view=aspnetcore-8.0)
    -   [Server-side ASP.NET Core Blazor additional security scenarios](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/server/additional-scenarios?view=aspnetcore-8.0)
-   [Server-side reconnection events and component lifecycle events](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-8.0#blazor-server-reconnection-events)
-   [What is Azure SignalR Service?](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/azure/azure-signalr/signalr-overview)
-   [Performance guide for Azure SignalR Service](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/azure/azure-signalr/signalr-concept-performance)
-   [Publish an ASP.NET Core SignalR app to Azure App Service](https://learn.microsoft.com/en-us/aspnet/core/signalr/publish-to-azure-web-app?view=aspnetcore-8.0)
-   [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/?view=aspnetcore-8.0#sample-apps))

Collaborate with us on GitHub

The source for this content can be found on GitHub, where you can also create and review issues and pull requests. For more information, see [our contributor guide](https://learn.microsoft.com/contribute/content/dotnet/dotnet-contribute).

## Additional resources

___

Training

___

Documentation

-   [Use ASP.NET Core SignalR with Blazor](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/blazor/tutorials/signalr-blazor?source=recommendations)
    
    Create a chat app that uses ASP.NET Core SignalR with Blazor.
    
-   [Tutorial: Build a Blazor Server chat app - Azure SignalR](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/azure/azure-signalr/signalr-tutorial-build-blazor-server-chat-app?source=recommendations)
    
    In this tutorial, you learn how to build and modify a Blazor Server app with Azure SignalR Service.
    
-   [ASP.NET Core Blazor startup](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/blazor/fundamentals/startup?source=recommendations)
    
    Learn how to configure Blazor startup.
    
-   [ASP.NET Core Blazor state management](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/en-us/aspnet/core/blazor/state-management?source=recommendations)
    
    Learn how to persist user data (state) in Blazor apps.

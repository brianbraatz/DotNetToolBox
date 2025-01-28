---
created: 2024-07-27T08:40:41 (UTC -05:00)
tags: []
source: https://github.com/BlazorExtensions/SignalR
author: BlazorExtensions
---

# GitHub - BlazorExtensions/SignalR: SignalR Core support for Microsoft ASP.NET Core Blazor

source: https://github.com/BlazorExtensions/SignalR

> ## Excerpt
> SignalR Core support for Microsoft ASP.NET Core Blazor - BlazorExtensions/SignalR

---
[![Build](https://github.com/BlazorExtensions/SignalR/workflows/CI/badge.svg)](https://github.com/BlazorExtensions/SignalR/actions) [![Package Version](https://camo.githubusercontent.com/92bab466e84d153e60f59f54dcd3477202e731de2b869a9cc9d0d9013d569a1c/68747470733a2f2f696d672e736869656c64732e696f2f6e756765742f762f426c617a6f722e457874656e73696f6e732e5369676e616c522e737667)](https://www.nuget.org/packages/Blazor.Extensions.SignalR) [![NuGet Downloads](https://camo.githubusercontent.com/229517cba74bcbf60d88563cad355c99b6b4690c1357a2719ed53b3a0c42766e/68747470733a2f2f696d672e736869656c64732e696f2f6e756765742f64742f426c617a6f722e457874656e73696f6e732e5369676e616c522e737667)](https://www.nuget.org/packages/Blazor.Extensions.SignalR) [![License](https://camo.githubusercontent.com/f083147dd8b2a182c457829b6ce3aac1de984947b8ef39863d6865e953a6d8cb/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f426c617a6f72457874656e73696f6e732f5369676e616c522e737667)](https://github.com/BlazorExtensions/SignalR/blob/master/LICENSE)

> **DEPRECATION NOTE**: This package is no longer required since [Blazor WebAssembly now supports SignalR Client](https://devblogs.microsoft.com/aspnet/blazor-webassembly-3-2-0-preview-1-release-now-available/). Users of this package should stop using it and use the official client instead.

## Blazor Extensions

Blazor Extensions is a set of packages with the goal of adding useful features to [Blazor](https://blazor.net/).

## Blazor Extensions SignalR

This package adds a [Microsoft ASP.NET Core SignalR](https://github.com/aspnet/SignalR) client library for [Microsoft ASP.NET Blazor](https://github.com/aspnet/Blazor).

The package aims to mimic the C# APIs of SignalR Client as much as possible and it is developed by wrapping the TypeScript client by using Blazor's interop capabilities.

For more information about SignalR development, please check [SignalR documentation](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.1).

## Features

This package implements all public features of SignalR Typescript client.

> Note: The _Streaming_ APIs are not implemented yet. We will add it soon.

## Sample usage

The following snippet shows how to setup the client to send and receive messages using SignalR.

The HubConnectionBuilder needs to get injected, which must be registered:

```cs
// in Startup.cs, ConfigureServices()
   services.AddTransient<HubConnectionBuilder>();
```

```cs
// in Component class
[Inject]
private HubConnectionBuilder _hubConnectionBuilder { get; set; }
```

```cs
// in Component Initialization code
var connection = _hubConnectionBuilder // the injected one from above.
        .WithUrl("/myHub", // The hub URL. If the Hub is hosted on the server where the blazor is hosted, you can just use the relative path.
        opt =>
        {
            opt.LogLevel = SignalRLogLevel.Trace; // Client log level
            opt.Transport = HttpTransportType.WebSockets; // Which transport you want to use for this connection
        })
        .Build(); // Build the HubConnection

connection.On("Receive", this.Handle); // Subscribe to messages sent from the Hub to the "Receive" method by passing a handle (Func<object, Task>) to process messages.
await connection.StartAsync(); // Start the connection.

await connection.InvokeAsync("ServerMethod", param1, param2, paramX); // Invoke a method on the server called "ServerMethod" and pass parameters to it. 

var result = await connection.InvokeAsync<MyResult>("ServerMethod", param1, param2, paramX); // Invoke a method on the server called "ServerMethod", pass parameters to it and get the result back.
```

## Contributions and feedback

Please feel free to use the component, open issues, fix bugs or provide feedback.

## Contributors

The following people are the maintainers of the Blazor Extensions projects:

-   [Attila Hajdrik](https://github.com/attilah)
-   [Gutemberg Ribiero](https://github.com/galvesribeiro)

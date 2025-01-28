---
created: 2024-07-26T11:31:06 (UTC -05:00)
tags: []
source: https://github.com/Mestafor/signalr-server-web-docker
author: Mestafor
---

# GitHub - Mestafor/signalr-server-web-docker: SignalR App with docker compose.

source: https://github.com/Mestafor/signalr-server-web-docker

> ## Excerpt
> SignalR App with docker compose. Contribute to Mestafor/signalr-server-web-docker development by creating an account on GitHub.

---
## Repository files navigation

-   [README](https://github.com/Mestafor/signalr-server-web-docker#)

## WebSocket instalation

1.  `dotnet new webapi -n WebSockets`
2.  `dotnet new sln`
3.  `dotnet sln add WebSockets`
4.  `dotnet add WebSockets/ package Microsoft.AspNet.SignalR`
5.  Add `app.UseWebSockets();` to the `Startup.cs` `Configure` method
6.  `dotnet run --project WebSockets`

## WebSocket

1.  Add a new route called `ws/`
2.  Check if the current request is via WebSockets otherwise throw a 400.
3.  Wait until client initiates a request.
4.  Going into a loop until the client closes the connection.
5.  Within the loop, we will prepend “Server: Hello. You said: <client’s message>” to the message and send it back to the client.
6.  Wait until the client send another request.

## SignalR

1.  `dotnet new webapi -n ServerSignalR`
2.  `dotnet new sln`
3.  `dotnet sln add ServerSignalR`
4.  `dotnet add ServerSignalR/ package Microsoft.AspNetCore.SignalR`
5.  Optional `dotnet add ServerSignalR/ package Microsoft.AspNetCore.SignalR.Protocols.MessagePack`
6.  `services.AddSignalR();`
7.  ```
     app.UseEndpoints(endpoints =&gt;
     {
         endpoints.MapHub&lt;ChatHub&gt;("/chathub");
     });
    ```
    

## React App

1.  `dotnet new react -n WebApp`
2.  `dotnet sln add WebApp`
3.  Remove `ClientApp` folder
4.  `npx create-react-app my-app --template typescript`
5.  `Startup.cs` rename `ClientApp` to the `my-app`
6.  `WebApp.csproj` rename `<SpaRoot>ClientApp\</SpaRoot>` to the `<SpaRoot>my-app\</SpaRoot>`
7.  `cd WebApp/my-app` `npm add @microsoft/signalr @types/node`
8.  `dotnet run --project WebApp`

## Docker on Windows 10

1.  `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All`

## Docker instalation and running with ssl

1.  create `Dockerfile` and configure `https://docs.microsoft.com/en-us/dotnet/core/docker/build-container?tabs=windows`
2.  `docker build -t server-signal-r .`
3.  Note: `%USERPROFILE% -> $env:USERPROFILE` in powershell
4.  `dotnet dev-certs https --clean`
5.  `dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\aspnetapp.pfx -p mypass123`
6.  `dotnet dev-certs https --trust`
7.  `docker run -d -p 5000:80 -p 5001:443 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=5001 -e ASPNETCORE_Kestrel__Certificates__Default__Password="mypass123" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx -v $env:USERPROFILE\.aspnet\https:/https/ --name server-signal-r server-signal-r`
8.  `cd WebApp && docker build -t signalr-webapp .`
9.  `docker run -d -p 4000:80 -p 4001:443 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=5001 -e ASPNETCORE_Kestrel__Certificates__Default__Password="mypass123" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx -v $env:USERPROFILE\.aspnet\https:/https/ --name signalr-webapp signalr-webapp`

## Docker compose

1.  Create `docker-compose.yml` file and configure it
2.  `docker-compose build`
3.  `docker-compose up -d` - run in background. Builded if not exists and run containers
4.  `docker-compose help`

---
Compiles: false
Runs: false
Docker: false
SignalR: false
DotNetVersion: 2.2
description: finally works .net 5 docker chat- the WSL doesnt work- try to recreate .net 8 maybe
tags:
  - SampleCode
---
[[signalr-chat-sample Test SignalR with Docker]]

Run commands:

> cd src/ChatSample

> docker build -t chatsample . <--- there is a dot here at the end

> docker run -d -p 8080:80 --name MyChatApp chatsample

Then access from browser [http://localhost:8080](http://localhost:8080/).

References:

- Copy of [https://github.com/aspnet/SignalR-samples/tree/master/ChatSample](https://github.com/aspnet/SignalR-samples/tree/master/ChatSample)
- [https://hub.docker.com/_/microsoft-dotnet-core-aspnet/](https://hub.docker.com/_/microsoft-dotnet-core-aspnet/)
- [https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-2.2](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-2.2)
- [https://github.com/dotnet/dotnet-docker/blob/master/samples/aspnetapp/Dockerfile](https://github.com/dotnet/dotnet-docker/blob/master/samples/aspnetapp/Dockerfile)

![[ChatSample.sln]]

# signalrchatsamplewdocker

%% Begin Waypoint %%
- [[signalr-chat-sample Test SignalR with Docker]]
- **signalr-chat-sample-master**
	- **signalr-chat-sample-master**
		- [[readme]]
		- **src**
			- **ChatSample**
				- **bin**
					- **Debug**
						- **netcoreapp2.2**

				- **Hubs**

				- **obj**
					- **Debug**
						- **netcoreapp2.2**

				- **Properties**

				- **wwwroot**
					- **lib**


%% End Waypoint %%
 
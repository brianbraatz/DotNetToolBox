---
Compiles: false
Runs: false
Docker: false
SignalR: false
DotNetVersion: 8
description: .NET 8 Minimal SignalR Sample With Server  Client and incorporating JWT SignalR
tags:
  - SampleCode
---
![[BlazorSignalRDocker/signalr-sampledockermodern/signalr-sample-master/signalr-sample-master/SignalR-Sample.sln]]
# SignalR Sample With Server & Client

[](https://github.com/ouzdev/signalr-sample#signalr-sample-with-server--client)

[![.NET](https://github.com/ouzdev/signalr-sample/actions/workflows/dotnet.yml/badge.svg)](https://github.com/ouzdev/signalr-sample/actions/workflows/dotnet.yml) [![CodeQL](https://github.com/ouzdev/signalr-sample/actions/workflows/codeql.yml/badge.svg)](https://github.com/ouzdev/signalr-sample/actions/workflows/codeql.yml)

This project comprises a SignalR Server utilizing .NET 8 Minimal API and incorporating JWT (JSON Web Token) authentication for security.

## Server Project

[](https://github.com/ouzdev/signalr-sample#server-project)

This project is a simple SignalR Server that accepts a message from a client and broadcasts it to all connected clients.

### Requirements

[](https://github.com/ouzdev/signalr-sample#requirements)

- .NET 8

## Client Project

[](https://github.com/ouzdev/signalr-sample#client-project)

This project is a simple console application that connects to the SignalR Server and sends a message to the server.

### Requirements

[](https://github.com/ouzdev/signalr-sample#requirements-1)

- .NET 8


# signalr-sampledockermodern

%% Begin Waypoint %%
- **signalr-sample-master**
	- **signalr-sample-master**
		- [[README]]
		- **src**
			- **Client**
				- **SignalR.Console**
					- **bin**
						- **Debug**
							- **net8.0**

					- **obj**
						- **Debug**
							- **net8.0**
								- **ref**

								- **refint**

			- **Server**
				- **SignalR.Server**
					- **bin**
						- **Debug**
							- **net8.0**

					- **Configurations**

					- **Hubs**

					- **obj**
						- **Debug**
							- **net8.0**
								- **ref**

								- **refint**

								- **staticwebassets**

					- **Properties**

					- **Services**
						- **Jwt**

						- **SignalR**

					- **Settings**


%% End Waypoint %%
 
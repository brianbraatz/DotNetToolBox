Run commands:

> cd src/ChatSample

> docker build -t chatsample . <--- there is a dot here at the end

> docker run -d -p 8080:80 --name MyChatApp chatsample

Then access from browser http://localhost:8080.

References:

- Copy of https://github.com/aspnet/SignalR-samples/tree/master/ChatSample
- https://hub.docker.com/_/microsoft-dotnet-core-aspnet/
- https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-2.2
- https://github.com/dotnet/dotnet-docker/blob/master/samples/aspnetapp/Dockerfile

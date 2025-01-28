---
created: 2024-07-26T11:39:09 (UTC -05:00)
tags: []
source: https://github.com/cealer/chat_signalr_scale_out
author: cealer
---

# GitHub - cealer/chat_signalr_scale_out: Scaling a realtime chat with SignalR and Docker Swarm

source: https://github.com/cealer/chat_signalr_scale_out

> ## Excerpt
> Scaling a  realtime chat with SignalR and Docker Swarm - cealer/chat_signalr_scale_out

---
## Scale out a Realtime Chat with SignalR and Docker Swarm

The purpose of this project is to show how to scale out a SignalR service with Docker swarm. This project uses SignalR Redis backplane to scale out.

"The SignalR Redis backplane uses the pub/sub feature to forward messages to other servers. When a client makes a connection, the connection information is passed to the backplane. When a server wants to send a message to all clients, it sends to the backplane. The backplane knows all connected clients and which servers they're on. It sends the message to all clients via their respective servers."

This process is illustrated in the following diagram:

[![alt text](https://camo.githubusercontent.com/b26fe26572495ca2ff65f7310db9c6e23ceb84770951c926e6c3b3ac0711c8df/68747470733a2f2f646f63732e6d6963726f736f66742e636f6d2f656e2d75732f6173706e65742f636f72652f7369676e616c722f7363616c652f5f7374617469632f72656469732d6261636b706c616e652e706e673f766965773d6173706e6574636f72652d332e31)](https://camo.githubusercontent.com/b26fe26572495ca2ff65f7310db9c6e23ceb84770951c926e6c3b3ac0711c8df/68747470733a2f2f646f63732e6d6963726f736f66742e636f6d2f656e2d75732f6173706e65742f636f72652f7369676e616c722f7363616c652f5f7374617469632f72656469732d6261636b706c616e652e706e673f766965773d6173706e6574636f72652d332e31)

More Information: [https://docs.microsoft.com/en-us/aspnet/core/signalr/scale?view=aspnetcore-3.1#redis-backplane](https://docs.microsoft.com/en-us/aspnet/core/signalr/scale?view=aspnetcore-3.1#redis-backplane)

### Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on production enviroment.

### Prerequisites 📋

### Installing 🔧

_Build the docker image_

```
docker build -t chat_service -f signalr_scale_out/Dockerfile .
```

_Create the Swarm_

_Create the Stack_

```
docker stack deploy ChatApp --compose-file stack.yml
```

_Testing the app_

[![alt text](https://github.com/cealer/chat_signalr_scale_out/raw/master/Chats.png?raw=true)](https://github.com/cealer/chat_signalr_scale_out/blob/master/Chats.png?raw=true)

### Deployment 📦

For production use, a Redis backplane is recommended only when it runs in the same data center as the SignalR app. Otherwise, network latency degrades performance. If your SignalR app is running in the Azure cloud, we recommend Azure SignalR Service instead of a Redis backplane. You can use the Azure Redis Cache Service for development and test environments.

More Information: [https://docs.microsoft.com/en-us/aspnet/core/signalr/redis-backplane?view=aspnetcore-3.1#set-up-a-redis-backplane](https://docs.microsoft.com/en-us/aspnet/core/signalr/redis-backplane?view=aspnetcore-3.1#set-up-a-redis-backplane)

### License 📄

This project is licensed under the MIT License - see the LICENSE.md file for details

### Acknowledgments 🖇️

⌨️ con ❤️ por [Cesar Gonzales](https://github.com/cealer) 😊

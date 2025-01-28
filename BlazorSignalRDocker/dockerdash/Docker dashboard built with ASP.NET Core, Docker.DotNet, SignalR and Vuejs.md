---
created: 2024-07-26T11:45:19 (UTC -05:00)
tags: []
source: https://github.com/stefanprodan/dockerdash
author: stefanprodan
---

# GitHub - stefanprodan/dockerdash: Docker dashboard built with ASP.NET Core, Docker.DotNet, SignalR and Vuejs

source: https://github.com/stefanprodan/dockerdash

> ## Excerpt
> Docker dashboard built with ASP.NET Core, Docker.DotNet, SignalR and Vuejs - stefanprodan/dockerdash

---
## dockerdash

[![Build status](https://camo.githubusercontent.com/690d3fc1a71618d2626da2e2e37a85c0351306ca0d48acbfebe00d7503c8c23d/68747470733a2f2f63692e6170707665796f722e636f6d2f6170692f70726f6a656374732f7374617475732f713532646b62386469343537386d68393f7376673d74727565)](https://ci.appveyor.com/project/stefanprodan/dockerdash) [![Layers](https://camo.githubusercontent.com/fd98a7873b61be10d14e26f06e3ebb9b8489737afe6789ba8c78280dc9be8dc6/68747470733a2f2f696d616765732e6d6963726f6261646765722e636f6d2f6261646765732f696d6167652f73746566616e70726f64616e2f646f636b6572646173682e737667)](https://microbadger.com/images/stefanprodan/dockerdash)

Docker dashboard is compatible with Docker v1.12.x

### Run

Connect to Docker remote API by mounting the unix socket:

```
docker pull stefanprodan/dockerdash:latest

docker run -d -p 5050:5050 \
-v /var/run/docker.sock:/var/run/docker.sock \
-e DOCKERDASH_USER='admin' \
-e DOCKERDASH_PASSWORD='changeme' \
--name dockerdash \
stefanprodan/dockerdash
```

Connect to a Docker remote API via TCP:

```
docker run -d -p 5050:5050 \
-e DOCKER_REMOTE_API='tcp://192.168.1.134:4243' \
-e DOCKERDASH_USER='admin' \
-e DOCKERDASH_PASSWORD='changeme' \
--name dockerdash \
stefanprodan/dockerdash
```

### Features

-   Host information
-   Containers real-time status via web sockets
-   Container details, resource usage and logs
-   Images information
-   Networks information
-   Dashboard user/password authentication

### Todo

-   Swarm information
-   Nodes status and details
-   Services status and details

### Dev Stack

-   .NET Platform Standard 1.6
-   ASP.NET Core
-   Docker.DotNet
-   SignalR
-   JWT auth
-   Vuejs
-   Bootstrap

### Screenshots

_**Host containers**_

[![Containers](https://raw.githubusercontent.com/stefanprodan/dockerdash/master/screens/host-containers-dockerdash.png)](https://raw.githubusercontent.com/stefanprodan/dockerdash/master/screens/host-containers-dockerdash.png)

_**Container detais**_

[![Container](https://raw.githubusercontent.com/stefanprodan/dockerdash/master/screens/container-details-dockerdash.png)](https://raw.githubusercontent.com/stefanprodan/dockerdash/master/screens/container-details-dockerdash.png)

_**Host images**_

[![Containers](https://raw.githubusercontent.com/stefanprodan/dockerdash/master/screens/host-images-dockerdash.png)](https://raw.githubusercontent.com/stefanprodan/dockerdash/master/screens/host-images-dockerdash.png)

_**Host networks**_

[![Containers](https://raw.githubusercontent.com/stefanprodan/dockerdash/master/screens/host-networks-dockerdash.png)](https://raw.githubusercontent.com/stefanprodan/dockerdash/master/screens/host-networks-dockerdash.png)

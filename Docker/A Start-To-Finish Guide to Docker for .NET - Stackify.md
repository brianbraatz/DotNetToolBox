---
created: 2024-07-17T15:29:45 (UTC -05:00)
tags: []
source: https://stackify.com/a-start-to-finish-guide-to-docker-for-net/
author: Daniel Hilgarth
---

# A Start-To-Finish Guide to Docker for .NET - Stackify

source: https://stackify.com/a-start-to-finish-guide-to-docker-for-net/

> ## Excerpt
> Docker has become a staple of modern programming. In this .NET Docker guide, learn all about containerizing .NET applications.

---
![A Start-To-Finish Guide to Docker for .NET](https://stackify.com/wp-content/uploads/2023/08/Docker-Start-to-Finish.png)

Docker: it’s one of those technologies that seems to be everywhere. Whether you’re a junior developer just starting out or a seasoned .NET developer, at some point in your career, you’ll most likely come across Docker for .NET.

So, what is Docker? [According to Wikipedia](https://en.wikipedia.org/wiki/Docker_(software)), “Docker is a set of coupled software-as-a-service and platform-as-a-service products that use operating-system-level virtualization to develop and deliver software in packages called containers.” Let’s pull that apart and understand what it really means.

The heart of Docker is that you can package applications in so-called [images](https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/), giving the applications a well-defined environment to run in. An image bundles all relevant executables, libraries, and configuration files of the application.

A container is a specific instance of such an image. You can think of images as class definitions and containers as class instances. Just like a class definition in the OOP world, an image defines the structure, which the container then parametrizes.

![](https://stackify.com/wp-content/uploads/2019/07/image-19-1024x684.jpeg)

Before we continue this deep dive into the theory of what Docker is, let’s first set it up and do some hands-on experiments.

## Table of Contents

-   [Can You Run .NET In Docker?](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#can-you-run)
-   [Theory](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#theory)
    -   [Layers](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#layers)
    -   [Volumes](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#volumes)
    -   [Base Images](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#base-images)
    -   [Container Registry](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#container-registry)
    -   [Docker Theory Summary](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#docker-theory-summary)
-   [Creating An Image](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#creating-an-image)
    -   [Dockerfile](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#dockerfile)
    -   [Building the Image](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#building-the-image)
    -   [How To Run a .NET Docker Image](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#how-to-run)
    -   [Multi-stage builds](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#multi-stage-builds)
    -   [Redeploy container with new version of the image](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#redeploy-container)
    -   [List objects](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#list-objects)
    -   [Execute command in container](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#execute-command-in-container)
-   [Multi-container Applications](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#multi-container-applications)
    -   [Docker Compose](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#docker-compose)
-   [Starting the Application](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#starting-the-application)
-   [Logging](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#logging)
-   [Docker, Windows, and the .NET Framework](https://stackify.com/a-start-to-finish-guide-to-docker-for-net/#docker-windows)

## Can You Run .NET In Docker?

We’re going to set up Docker on a Ubuntu machine. Detailed instructions are available [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1)—here’s the short version:

```
sudo apt-get update

sudo apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"

sudo apt-get install docker-ce docker-ce-cli containerd.io
```

To verify that Docker has been installed successfully, execute the Hello World container:

```
sudo docker run hello-world
```

It downloads the image **hello-world** from the Docker registry, creates a container from it, and runs that. When everything is successful, the container prints a short message and then exits.

By default, Docker commands need to be executed as root. The commands in the rest of this post will omit the **sudo**for brevity. So, if you get a permission denied error, you probably forgot to use **sudo**.

## Theory

That short command touched on many aspects we should examine more closely.

We’ve established that containers are created from images. An example of an image is the SQL Server 2017 image from Microsoft. There’s only one such image, but potentially thousands of containers are created from it. In a typical software development environment, you could have three SQL Server 2017 containers—one for development, one for staging, and one for production. Each container would have its own password for the SA user and its own IP address.

“So, it’s a VM,” you say. And at first, it does look like a VM since a container is a virtualization concept. It can have its own IP address, it isolates its processes from all other containers, and it can contain its changes to the file system.

But that’s where the similarities end. VMs virtualize hardware, like the CPU, memory, or network cards, whereas containers don’t. VMs contain and run their own operating system, including the kernel, while containers don’t.

When I started with Docker, this was where I got confused. I knew Docker containers were a virtualization, but there’s no virtualized hardware—so what’s being virtualized? Docker virtualizes the operating system’s kernel and the file system. Thus, we can conclude that all containers must be running on the same kernel.

The kernel of the host operating system is running the applications that are defined inside the containers. Because of the kernel’s virtualization features, those processes are isolated from each other, but it’s still just a single kernel running them all.

This leads us to one advantage of containers over VMs: they require fewer resources. They require less CPU and memory, because they don’t run an operating system. They also require less disk space because different images can share layers, and containers created from the same image share all layers.

### Layers

_Layers_ is another term we need to define. To understand layers, we need to understand how images are created and structured. It all begins with a file named **Dockerfile**.

This file contains instructions on how to create the image. Each instruction can affect the file system of the image and thus creates a new layer. Consequently, a layer is a set of file system changes, and an image is a stack of layers that are applied one after the other to produce the final file system state.

Usually, images are based on other images, inheriting their layers. If you’ve built a REST API with ASP.NET Core and want to package it into an image, you’ll want to base your image on Microsoft’s ASP.NET Core Runtime image. As the name implies, this image already contains the runtime needed to execute your application.

Now, assume you have a microservices architecture with multiple REST APIs, all based on ASP.NET Core. You package each API into an image. The layers for the ASP.NET Core Runtime will still exist only once on the host and will be shared by all containers created from these images.

With this background, it should be immediately obvious that the layers of images are read-only. Otherwise, changes to one container’s file system could affect the file system of other containers.

To give containers a writable file system, a writable layer is put on top of the layers from the image. Therefore, this writable layer will contain all changes made to the file system of the container.

This writable layer is tied to the container. Thus, this writable layer is removed when you remove or recreate a container, and all file system changes made by the container are lost.

This shows that containers are transient. They get created and deleted quickly. So, a container should never store important data in its writable layer.

To allow a container to store persistent data, we need to employ another feature of Docker: volumes.

![](https://stackify.com/wp-content/uploads/2019/07/image-20-1024x683.jpeg)

### Volumes

A volume is a persistent data store that you map to a folder of the container’s file system. Whenever the container writes files inside that folder, it doesn’t write them to the writable layer of the container but to the volume.

When you delete or recreate a volume, mapped volumes are not deleted. In fact, volumes don’t belong to a container but exist on their own.

You can list all volumes with:

```
docker volume ls
```

### Base Images

A base image like **mcr.microsoft.com/dotnet/core/aspnet**, which contains the ASP.NET Core Runtime, makes immediate sense. But you’ll see—and maybe create—many images that are based on images like Ubuntu, Alpine Linux, or Windows Server Core.

We already established that containers don’t run an operating system and that the host system’s kernel runs the processes of the containers. So why are a lot of containers based on operating system images?

This happens because the container uses the operating system’s user space applications at runtime or when preparing the image. Often, **apt-get** is used to install required dependencies.

But because we have only a single kernel that executes the applications, the applications in the containers need to match the host system’s kernel. For Linux, this usually isn’t a problem. For Windows containers, this is more of a problem; so, for Windows containers, the base image needs to match the host Windows version.

### Container registry

We’ve established that you usually want to create images that are based on other images. But where do we actually get these base images from? That’s where a container registry comes into play. A container registry hosts images, similar to how a NuGet feed hosts NuGet packages.

[Docker Hub](https://hub.docker.com/search?q=&type=image) is the default registry of the Docker CLI. If you want to use other registries, you’ll need to login to them using:

```
docker login &lt;url&gt;
```

### Docker theory summary

Allow me to briefly summarize the theory behind Docker containers. Containers are created from images, which are stacks of layers. Images usually inherit layers from base images. Layers are sets of file system changes.

Images are pushed to a registry and are pulled from there when a container is created from an image. Containers add a writable layer on top of the read-only layers of the image. The writable layer is discarded when the container is deleted or recreated. To store persistent data, volumes are used.

## Creating an Image

So, with the theory out of the way, let’s get started with some container building!

With .NET Core being the future of .NET, and Docker support for Linux being more mature, this guide will mostly use Linux and Linux-based containers. There will be a short section for Windows containers and .NET Framework at the end.

### Dockerfile

To build an image, you need a Dockerfile. Here’s a very simple example of a Dockerfile:

```
FROM mcr.microsoft.com/dotnet/aspnet:6.0
RUN mkdir app
COPY docker-guide/dist/* /app/
EXPOSE 80
ENTRYPOINT ["dotnet", "/app/docker-guide.dll"]
```

From top to bottom, this file instructs Docker to:

-   Use the ASP.NET 6.0 image as the base image
-   Execute a command to create a folder **app** in the image
-   Copy all files from the subfolder **docker-guide/dist** of the host to the app folder inside the image
-   Expose port 80
-   Execute **dotnet /app/docker-guide.dll** when the container is started

All in all, the format is rather straightforward. The only point to keep in mind is that everything—except the commands **ENTRYPOINT** and **CMD**—is run when the image is being built.

Details about the available commands in Dockerfiles can be found [here](https://docs.docker.com/engine/reference/builder/).

![](https://stackify.com/wp-content/uploads/2019/07/image-21.jpeg)

### Building the image

Assuming that we have a published ASP.NET Core WebAPI in **docker-guide/dist**, we can now build the image:

```
docker build -t docker-guide .
```

This will build the image from the Dockerfile in the current directory—the period at the end—and tag it with **docker-guide:latest**, with **docker-guide** being the image name and **latest** being the tag name. A tag always references a specific version of an image, but the version a tag points to can change. Usually, there are two types of tag names: stable ones and dynamic ones.

Stable tag names always refer to the same image version, once the tag has been created. Usually, you would name these tags after the version of the packaged application. An example of such a tag name could be 1.15.1.

Dynamic tag names usually change with each new release and always point to the latest image version of a specific category. The tag name **latest** will always point to the latest version of the image, so over time, it could first point to 1.15.1, then to 1.15.2, and then to 1.16.0 as you release these versions. Other dynamic tags could be **en** or **de**. These would always point to the latest version of the image in English or German.

### How To Run a .NET Docker Image

Now you can finally create and run a container from that image:

```
docker run -d -p 7991:80 --name docker-guide-api docker-guide
```

There’s a bit going on here; let’s dissect it:

**\-d**: This is short for **detach** and means that the Docker container will run in the background. We won’t be seeing any output from the application that’s running inside the container. If we want to see that output, we can use:

```
docker logs docker-guide-api
```

**\-p 7991:80**: This publishes the port 80 of the container as the port 7991 on the host. Thanks to that, the API will be available on the host at **http://localhost:7991**. If we omitted that, we’d need to access the API at port 80 with the IP address of the container. To get the IP address of a known container, use:

```
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' docker-guide-api
```

**–name docker-guide-api**: Our container will be available under the name **docker-guide-api**. You can use this name in other Docker commands, such as the **logs** command or the **inspect** command.

**docker-guide**: This is the name of the image we want to use to create the container. It’s the same name that we used when we built the image. We omitted the tag name, so it’ll default to **latest**. We also could have specified it explicitly:

```
docker run -d -p 7991:80 --name docker-guide-api docker-guide:latest
```

If you followed along and actually had the **dotnet publish** output of an ASP.NET WebAPI in the correct folder, the API should be running now, and you can use **curl** to call it:

```
curl http://localhost:7991/api/values
```

Congratulations! You just Dockerized your first .NET Core application.

### Multi-stage builds

If you followed along, you noticed that we needed to have the publish output of the project in a specific folder. So, you either needed to build it on another machine and transfer it to the Docker host, or you needed to check out and build the project on the Docker host.

Both approaches have drawbacks. With the first approach, it’s that we need to transfer the build output from the build server to the Docker host. With the second approach, the drawback is that we need the .NET Core SDK on the Docker host.

But there’s a third way: multi-stage builds. This is a new feature of Docker that lets you put multiple image definitions in a single Dockerfile, where later images can access the files from the ones defined earlier in the file. All images except the last one are temporary and will be removed after the build.

A multi-stage build for an ASP.NET Core WebAPI project looks like this:

```
FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /app
COPY --from=build-env /app/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "/app/docker-guide.dll"]
```

This file first defines an image with a base image that contains the .NET Core SDK. The API’s source code is copied to the image, and the project is built inside the image. The second image uses the ASP.NET Core image as the base image and copies the build output from the previous image.

With this approach, you can even encapsulate the build process in a container. This is very helpful if you have many different images with different technologies.

### Redeploy container with new version of the image

We discussed how to build an image from an application’s source code. We’ve used “docker run” to start a container from that image. That container is now running. But say we now make changes to our app and need to redeploy the container based on a new version of the image—what do we do?

It’s rather straightforward:

1.  Stop the container
2.  Delete the container
3.  Create a new version of the image
4.  Run the container

The commands for that would be:

```
docker stop docker-guide-api
docker rm docker-guide-api
docker build -t docker-guide .
docker run -d -p 7991:80 --name docker-guide-api docker-guide
```

You can also merge the first two commands into a single command:

```
docker rm -f docker-guide-api
```

### List objects

You can get a list of all running containers with either **docker ps** or **docker container ls**.

For each running container, this will show information like the image it’s based on, the exposed and published ports, and the container name.

If you also want to see stopped containers, add the flag **–all**:

```
docker ps --all
```

You can also list all images that exist locally—either because you built them yourself or because you pulled them from the registry—by using:

```
docker image ls
```

### Execute command in container

It can be very helpful to be able to execute arbitrary commands in your running container. Especially when building new ones, this can simplify your troubleshooting.

You can do this by using **docker exec**. To list all files in the **/app** folder of the **docker-guide-api** container, use:

```
docker exec docker-guide-api ls /app
```

## Multi-container Applications

OK, so now you know how to Dockerize a simple, independent application. However, in real-world scenarios, this won’t suffice.

A more realistic scenario could involve an API, a UI, and a database—which in turn means three containers.

Obviously, you could start all three of them using **docker run** and for simplicity, you could put those three calls into a shell script so you don’t have to type them out whenever you need to start the containers. But I’m sure you’ll agree that this is a rather crude method.

Enter Docker Compose.

![](https://stackify.com/wp-content/uploads/2019/07/image-17-1024x683.jpeg)

### Docker Compose

Docker Compose lets you define multi-container applications by describing the different parts of your application—the **services**—in a YAML file.

To install Docker Compose on Ubuntu, use these commands:

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

See **[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)** for detailed instructions.

Implementing a sample app with a UI, a REST API, and a database would be out of scope for this guide, so I’ve prepared it and uploaded it to GitHub: **https://github.com/dhilgarth/docker-guide**.

Get it via **git clone git@github.com:dhilgarth/docker-guide.git** and build the application using the provided script: **./build.sh**.

This will build the UI, the API, and their respective Docker images. The Dockerfiles for these containers are also inside the repository. Both Dockerfiles again use the multi-stage build, so the machine that builds the Docker images doesn’t need any of the build-time requirements, like **dotnet** or **npm**. The build script will create two images: **docker-guide/ui** and **docker-guide/api**.

Now let’s create our Docker Compose file. Create a new file **docker-compose.yml** with this content:

```
version: "3.7"

services:
  docker-guide-db:
    image: mcr.microsoft.com/mssql/server:2017-latest-ubuntu
    environment:
      ACCEPT_EULA: Y
      SA_PASSWORD: ${DB_PASSWORD}
    volumes:
      - type: volume
        source: docker-guide-data
        target: /var/opt/mssql

  docker-guide-api:
    image: docker-guide/api
    environment:
      DB_CONNECTIONSTRING: "Data Source='docker-guide-db';Initial Catalog='DockerSample';User ID=sa;Password=${DB_PASSWORD}"
    ports:
      - "7992:80"
    depends_on:
      - docker-guide-db

  docker-guide-ui:
    image: docker-guide/ui
    environment:
      API_URL: http://public-ip:7992
    ports:
      - "7993:80"
    depends_on:
      - docker-guide-api

volumes:
  docker-guide-data:
```

The Docker Compose team did a good job of keeping the format of this file readable. Still, there are a few details we need to walk through.

At the top, we specify that we want to use version 3.7—currently the latest—of the **docker-compose.yml** specification. After that, we have the **services** section, where we define three services:

-   docker-guide-db
-   docker-guide-api
-   docker-guide-ui

#### Service 1: docker-guide-db

The first service—**docker-guide-db**—uses the Ubuntu-based SQL Server 2017 image from Microsoft. Docker Compose will set two environment variables inside the container. It will use the fixed value **Y** for the environment variable **ACCEPT\_EULA**. For the environment variable **SA\_PASSWORD**, it will read the value from the **.env** file. It will use the value with the key **DB\_PASSWORD**.

The **.env** file is a simple file with lines in the form of **KEY=VALUE**. Docker Compose looks for this file in the current working directory. In our case, the file will look like this:

```
DB_PASSWORD=YourStrong!Passw0rd
```

Use the **.env** file to keep sensitive information out of Docker Compose files. Usually, you’d check in a Docker Compose file into a version control system like Git, but you wouldn’t checkin an **.env** file—instead, you’d create it directly on the Docker host.

The database service uses a named volume **docker-guide-data**. We map this volume to the folder **/var/opt/mssql**inside the container. It is defined at the end of the file in the **volumes** section.

#### Service 2: docker-guide-api

The second service—**docker-guide-api**—uses the API image that we built previously. It sets the connection string as an environment variable inside the container and reads the database password from the environment file.

The connection string uses the DNS name **docker-guide-db** to specify where the data source is located. This is the name of the first service in this file. Docker Compose assigns the name of the service as the DNS name of the running container. However, those DNS names are available only from inside the Docker network.

The service also publishes port 80 of the container as port 7992 of the host.

Finally, the service definition states that the service depends on the database image.

#### Service 3: docker-guide-ui

The third service—**docker-guide-ui**—uses the UI image that we built previously. It sets **API\_URL** as an environment variable. The UI uses this URL to connect to its back end, so you can’t use the Docker DNS name of our service here. It has to be available from the computer that opens the UI in the browser.

The port 80 of the container is published as port 7993 of the host.

![](https://stackify.com/wp-content/uploads/2019/07/image-18.jpeg)

## Starting the Application

To start a multi-container application with Docker Compose, execute **docker-compose up -d**. This will create and run the containers defined in the **docker-compose.yml** file in the current folder. The containers will be running in the background because of the **\-d** flag. To view the logs of the started containers, you can use **docker logs <container name>** to view the logs of a single container or **docker-compose logs** to view the logs of all containers that have been brought up.

To see the result of our hard work, open a browser and navigate to **http://<docker-host>:7993**.

## Logging

When you deploy an application to a server, it’s rather easy to use SSH or RDP to connect to that server and check out the log files that your application writes. With your applications in Docker containers, this becomes more tedious.

To simplify access to your logs, a [centralized logging solution](https://stackify.com/retrace-log-management/) like the one included with [Retrace](https://stackify.com/retrace/) comes in handy. It also gives a high-level overview of all of your applications, allowing you to easily gauge the health of your setup.

## Docker, Windows, and the .NET Framework

Docker is native to Linux. So, whenever possible, you should use it with Linux containers on a Linux host. However, with Windows Server 2019, the Windows support for Docker has significantly improved. Windows Server 2019 has native container support, and it supports running both Windows containers and Linux containers—but not simultaneously, so you’ll need to choose.

If you need to Dockerize a .NET Framework application, you have only one option: Windows containers on a Windows host.

Once you’ve made that decision, the approach is the same as before: you write your Dockerfile and choose an appropriate base image. A list of them is available here.

## Conclusion

Docker is a mature technology that helps you package your applications. It reduces the time necessary to bring applications to production and simplifies reasoning about them. Furthermore, Docker encourages a deployment style that’s scripted and automatic. As such, it promotes reproducible deployments.

This guide covered everything you need to know to run Docker on a single host. However, a single host isn’t always enough. In this case, you’ll need to use a container orchestration tool like [Kubernetes or Docker swarm](https://stackify.com/docker-swarm-vs-kubernetes-a-helpful-guide-for-picking-one/) mode.

#### Improve Your Code with Retrace APM

Stackify's APM tools are used by thousands of .NET, Java, PHP, Node.js, Python, & Ruby developers all over the world.  
Explore Retrace's product features to learn more.

[Learn More](https://stackify.com/retrace/)

![](https://secure.gravatar.com/avatar/db02c10f850236b90698f3b080a57a40?s=100&d=mm&r=g)

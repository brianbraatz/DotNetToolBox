---
created: 2024-07-16T14:29:22 (UTC -05:00)
tags: []
source: https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-server-app/
author: 
---

# Containerising a Blazor Server App | Chris Sainty - Building with Blazor

source: https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-server-app/

> ## Excerpt
> In this post, I give an introduction to Docker and some of its key concepts. Then show you how to containerise a Blazor Server App using a dockerfile.

---
Containers are all the rage now-a-days and for good reason. They solve the problem of how to have an application work consistently regardless of the environment it is run on. This is achieved by bundling the whole runtime environment - the application, it’s dependencies, configuration files, etc… Into a single _image_. This image can then be shared and instances of it, known as _containers_, can then be run.

In this post, I’m going to show you how to run a Blazor Server application in a container. We’re going to have a look at how to create images and from there how to create containers.

> All the code for this post is [available on GitHub](https://github.com/chrissainty/BlazorServerWithDocker).

Before we get into things, let’s cover what Docker is and a few key concepts.

## What is Docker?

Docker is a platform which provides services and tools to allow the building, sharing and running of containers. These containers are isolated from one another but run on a shared OS kernel, making them far more lightweight than virtual machines. This allows more containers to be run on the same physical hardware giving containers an advantage over traditional virtual machines.

As containers only contain what is needed to run the application it makes them extremely quick to spin up. This makes them exceptionally good at scaling on demand. Where a traditional VM would need a few minutes before additional capacity comes online, a container can be started in a few fractions of a second.

### Dockerfile

You can think of a dockerfile as a blueprint which contains all the commands, in order, needed to create an _image_ of your application. Docker images are created by running the `docker build` command against a dockerfile.

### Image

Docker images are the result of running a dockerfile. Images are built up in layers, just like an onion, and each layer can also be cached to help speed up build times. Images are immutable once created, but they can be used as base images in a dockerfile to allow customisation. Images can be stored in an image repository such as [Docker Hub](https://hub.docker.com/) or [Azure Container Registry](https://azure.microsoft.com/en-gb/services/container-registry/) - think NuGet but for containers - which allows them to be shared with others.

### Container

A container is an instance of an image. You can spin up many containers from a single image. They’re started by using the `docker run` command and specifying the image to use to create the container.

## Containerising a Blazor Server App

### Prerequisites

If you’ve not done any work with Docker before you will need to install [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) or [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/). Just follow the setup instructions and you will be up and running in a couple of minutes. For the purpose of this post we’re going to be using the default project template for a Blazor Server app.

### Creating a Dockerfile

The first thing we’re going to do is create a dockerfile in the root of the project. If you’re using something other than Visual Studio, such as VS Code then just create a new file in the root of your project called `dockerfile` with no extension and paste in the code from a bit further down.

If you’re using Visual Studio then right click on your project and select **Add** > **Docker Support…**

![](https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-server-app/images/Screenshot-2019-08-20-at-16.13.06.png)

You will then be asked what target OS you want.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-server-app/images/Screenshot-2019-08-20-at-16.17.10.png)

I’m choosing Linux as I’m on a Mac anyway plus hosting is cheaper when I want to push this to Azure. If your application does require something Windows specific then make sure to chose Windows here. Once you’re done then click **OK**. After a few seconds you should see a _Dockerfile_ appear in the root of the project.

**A word of warning here -** I’ve found this file doesn’t always seem to work properly. It seems to expect a certain folder structure where the _dockerfile_ is one level higher than the project, if that’s not the case then things won’t work. Below is a version of the dockerfile after a couple of modifications to remove the folder structure assumption.

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base WORKDIR /app EXPOSE 80 EXPOSE 443 FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build WORKDIR /src COPY ["BlazorServerWithDocker.csproj", "."] RUN dotnet restore "BlazorServerWithDocker.csproj" COPY . . RUN dotnet build "BlazorServerWithDocker.csproj" -c Release -o /app/build FROM build AS publish RUN dotnet publish "BlazorServerWithDocker.csproj" -c Release -o /app/publish FROM base AS final WORKDIR /app COPY --from=publish /app/publish . ENTRYPOINT ["dotnet", "BlazorServerWithDocker.dll"]
```

You can see that there is a repeating pattern, each section starts using the `FROM` keyword. As I mentioned earlier, images are like onions, they’re built up with lots of layers, one on top of the other. Let’s break this all down to understand what each step is doing.

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base WORKDIR /app EXPOSE 80 EXPOSE 443
```

The first section defines the base image that we’re going to use to create our applications image, although we’re not actually going to use it till the end. It’s provided by Microsoft and contains just the ASP.NET Core runtime. We’re setting the working directory to be `app` and exposing ports `80` and `443` which are the ports the container will listen on at runtime. We’ll come back to this one at the end.

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build WORKDIR /src COPY ["BlazorServerWithDocker.csproj", "."] RUN dotnet restore "BlazorServerWithDocker.csproj" COPY . . RUN dotnet build "BlazorServerWithDocker.csproj" -c Release -o /app/build
```

The next section is responsible for building the application. This is based on another image provided by Microsoft which contains the full .NET SDK. The `WORKDIR` command sets the working directory inside the container - any actions will now be relative to that directory.

We `COPY` the `csproj` from our project to the containers working directory, then run a `dotnet restore`. After that the `COPY` command copies over all the other files in the project to the working directory before running a `dotnet build` in release configuration.

```dockerfile
FROM build AS publish RUN dotnet publish "BlazorServerWithDocker.csproj" -c Release -o /app/publish
```

This section publishes our app. Here we’re specifying the previous build image as the base for this layer, then calling `dotnet publish`.

```dockerfile
FROM base AS final WORKDIR /app COPY --from=publish /app/publish . ENTRYPOINT ["dotnet", "BlazorServerWithDocker.dll"]
```

The last section is what creates our final image. Here you can see we’re using the `base` image from the start of the file, which was the .NET Core runtime image. We set the `WORKDIR` to `app` then copy over the published files from the previous publish layer. Finally, we set the entry point for the application. This is the instruction that tells the image how to start the process it will run for us.

### Building an Image

Now we have a dockerfile which defines our image we need to use a docker command to actually create it.

```bash
bashdocker build -t blazor-server-with-docker .
```

The `-t` switch tells docker to tag the image with `blazor-server-with-docker` which is useful for identifying the image later on. The dot (.) at the end tells docker to look for the dockerfile in the current directory.

This is the output when the command is run.

```bash
bash[+] Building 61.1s (17/17) FINISHED => [internal] load build definition from Dockerfile => => transferring dockerfile: 590B => [internal] load .dockerignore => => transferring context: 380B => [internal] load metadata for mcr.microsoft.com/dotnet/sdk:6.0 => [internal] load metadata for mcr.microsoft.com/dotnet/aspnet:6.0 => [build 1/6] FROM mcr.microsoft.com/dotnet/sdk:6.0@sha256:90b566b141a8e2747f2805d9e4b2935ce09040a2926a1591c94 => => resolve mcr.microsoft.com/dotnet/sdk:6.0@sha256:90b566b141a8e2747f2805d9e4b2935ce09040a2926a1591c94108a83b => => sha256:90b566b141a8e2747f2805d9e4b2935ce09040a2926a1591c94108a83ba10309 2.17kB / 2.17kB => => sha256:e86d68dca8c7c8106c1599d293fc00aabaa59dac69e4c849392667e9276d55a9 7.31kB / 7.31kB => => sha256:7423077999145aa09211f3b975495be42a009a990a72d799e1cb55833abc8745 31.61MB / 31.61MB => => sha256:148a3465a035ddc2e0ac2eebcd5f5cb3db715843d784d1b303d1464cd978a391 2.01kB / 2.01kB => => sha256:08af7dd3c6400833072349685c6aeaf7b86f68441f75b5ffd46206924c6b0267 15.17MB / 15.17MB => => sha256:a2abf6c4d29d43a4bf9fbb769f524d0fb36a2edab49819c1bf3e76f409f953ea 31.36MB / 31.36MB => => sha256:a260dbcd03fce6db3fe06b0998f5f3e54c437f647220aa3a89e5ddd9495f707e 156B / 156B => => sha256:96c3c696f47eb55c55e43c338922842013fc980b21c457826fd97f625c0ab497 9.44MB / 9.44MB => => sha256:d81364490ceb3caecbe62b7c722959258251458e6d1ba5acfc60db679c4411f8 25.36MB / 25.36MB => => sha256:3e56f7c4d95f973a8cd8cf1187e56ee59c1cc1f0eb4a6c9690a1d6d6adf72b4e 136.50MB / 136.50MB => => sha256:9939dbdaf4a702d0243b574a728eca401402f305a80b277acbfa5b3252625135 13.37MB / 13.37MB => => extracting sha256:a2abf6c4d29d43a4bf9fbb769f524d0fb36a2edab49819c1bf3e76f409f953ea => => extracting sha256:08af7dd3c6400833072349685c6aeaf7b86f68441f75b5ffd46206924c6b0267 => => extracting sha256:7423077999145aa09211f3b975495be42a009a990a72d799e1cb55833abc8745 => => extracting sha256:a260dbcd03fce6db3fe06b0998f5f3e54c437f647220aa3a89e5ddd9495f707e => => extracting sha256:96c3c696f47eb55c55e43c338922842013fc980b21c457826fd97f625c0ab497 => => extracting sha256:d81364490ceb3caecbe62b7c722959258251458e6d1ba5acfc60db679c4411f8 => => extracting sha256:3e56f7c4d95f973a8cd8cf1187e56ee59c1cc1f0eb4a6c9690a1d6d6adf72b4e => => extracting sha256:9939dbdaf4a702d0243b574a728eca401402f305a80b277acbfa5b3252625135 => [base 1/2] FROM mcr.microsoft.com/dotnet/aspnet:6.0@sha256:edb108fddbb69db67ad136e4ffc93d5d9ddcfd28fc7f269be => => resolve mcr.microsoft.com/dotnet/aspnet:6.0@sha256:edb108fddbb69db67ad136e4ffc93d5d9ddcfd28fc7f269be541790 => => sha256:edb108fddbb69db67ad136e4ffc93d5d9ddcfd28fc7f269be541790423399f55 2.17kB / 2.17kB => => sha256:5b4a077a17943113fee94818046e6f9839e11ec692481bf122ffacb849cf67de 1.37kB / 1.37kB => => sha256:8d32e18b77a4db7f10ec4985cc85c1e385dc6abd16f9573a8c2bc268cad4aab9 3.38kB / 3.38kB => => sha256:a2abf6c4d29d43a4bf9fbb769f524d0fb36a2edab49819c1bf3e76f409f953ea 31.36MB / 31.36MB => => sha256:08af7dd3c6400833072349685c6aeaf7b86f68441f75b5ffd46206924c6b0267 15.17MB / 15.17MB => => sha256:7423077999145aa09211f3b975495be42a009a990a72d799e1cb55833abc8745 31.61MB / 31.61MB => => sha256:a260dbcd03fce6db3fe06b0998f5f3e54c437f647220aa3a89e5ddd9495f707e 156B / 156B => => sha256:96c3c696f47eb55c55e43c338922842013fc980b21c457826fd97f625c0ab497 9.44MB / 9.44MB => => extracting sha256:a2abf6c4d29d43a4bf9fbb769f524d0fb36a2edab49819c1bf3e76f409f953ea => => extracting sha256:08af7dd3c6400833072349685c6aeaf7b86f68441f75b5ffd46206924c6b0267 => => extracting sha256:7423077999145aa09211f3b975495be42a009a990a72d799e1cb55833abc8745 => => extracting sha256:a260dbcd03fce6db3fe06b0998f5f3e54c437f647220aa3a89e5ddd9495f707e => => extracting sha256:96c3c696f47eb55c55e43c338922842013fc980b21c457826fd97f625c0ab497 => [internal] load build context => => transferring context: 802.94kB => [base 2/2] WORKDIR /app => [final 1/2] WORKDIR /app => [build 2/6] WORKDIR /src => [build 3/6] COPY [BlazorServerWithDocker.csproj, .] => [build 4/6] RUN dotnet restore "BlazorServerWithDocker.csproj" => [build 5/6] COPY . . => [build 6/6] RUN dotnet build "BlazorServerWithDocker.csproj" -c Release -o /app/build => [publish 1/1] RUN dotnet publish "BlazorServerWithDocker.csproj" -c Release -o /app/publish => [final 2/2] COPY --from=publish /app/publish . => exporting to image => => exporting layers => => writing image sha256:4f2237c5ef4cd8038224f6892c7056a7412e58c41313023c5f62941f8b331396 => => naming to docker.io/library/blazor-server-with-docker
```

As you can see each step in the dockerfile is executed until the final image is built and tagged.

Another great thing about Docker is it’s really efficient when building images. It caches each layer so future builds can be sped up. If you run the build command again you will see this in action.

```bash
bash[+] Building 0.3s (17/17) FINISHED => [internal] load build definition from Dockerfile => => transferring dockerfile: 37B => [internal] load .dockerignore => => transferring context: 35B => [internal] load metadata for mcr.microsoft.com/dotnet/sdk:6.0 => [internal] load metadata for mcr.microsoft.com/dotnet/aspnet:6.0 => [base 1/2] FROM mcr.microsoft.com/dotnet/aspnet:6.0@sha256:edb108fddbb69db67ad136e4ffc93d5d9ddcfd28fc7f269be5 => [build 1/6] FROM mcr.microsoft.com/dotnet/sdk:6.0@sha256:90b566b141a8e2747f2805d9e4b2935ce09040a2926a1591c941 => [internal] load build context => => transferring context: 2.11kB => CACHED [base 2/2] WORKDIR /app => CACHED [final 1/2] WORKDIR /app => CACHED [build 2/6] WORKDIR /src => CACHED [build 3/6] COPY [BlazorServerWithDocker.csproj, .] => CACHED [build 4/6] RUN dotnet restore "BlazorServerWithDocker.csproj" => CACHED [build 5/6] COPY . . => CACHED [build 6/6] RUN dotnet build "BlazorServerWithDocker.csproj" -c Release -o /app/build => CACHED [publish 1/1] RUN dotnet publish "BlazorServerWithDocker.csproj" -c Release -o /app/publish => CACHED [final 2/2] COPY --from=publish /app/publish . => exporting to image => => exporting layers => => writing image sha256:4f2237c5ef4cd8038224f6892c7056a7412e58c41313023c5f62941f8b331396 => => naming to docker.io/library/blazor-server-with-docker
```

As nothing has changed Docker has used the cached version of all the images used during the first build, resulting in a near instant build.

### Starting a container

All that’s left now is to start an instance of our new image and make sure everything works. We can start a new container using the `docker run` command.

```bash
bashdocker run -p 8080:80 blazor-server-with-docker
```

The `-p` switch tell docker to map port `8080` on the host machine to port `80` on the container. Earlier, we used the `EXPOSE` keyword when creating the image to define which ports our container would listen on, this is where it comes into play. Also having tagged our image has made things much simpler here, we can just use the tag name to specify the image rather than its GUID.

If all goes well you should see something like this.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-server-app/images/docker-run-output.png)

Open a browser and go to `http://localhost:8080/` and you should see the app load.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-server-app/images/blazor-server-app-running-in-docker-container.png)

## Summary

In this post, we’ve looked at what Docker and containers are as well as what benefits they offer over more traditional virtual machines. As well as covering some of the core concepts in Docker. We then used the standard Blazor Server App template to build a Docker _image_ by adding and configuring a _dockerfile_. Finally we used that image to create a _container_ which ran our Blazor Server application.

Next time we’ll look at how we can do the same thing with a Blazor WebAssembly application.

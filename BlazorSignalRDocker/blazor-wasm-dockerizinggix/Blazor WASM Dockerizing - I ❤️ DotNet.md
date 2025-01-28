---
created: 2024-07-24T15:06:28 (UTC -05:00)
tags: [.NET, DotNet, I Love DotNet, I ❤️ DotNet, Blazor, Blazor (WebAssembly), Blazor Wasm, C#, Entity Framework, LINQ, ML.NET, Web API, TDD, OOPS, Middleware, JWT, Dependency Injection, Report, Design Pattern, SOLID, HTTP Client, OWASP, SignalR, Docker, Dockerizing, Container, Containerizing]
source: chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/
author: Abdul Rahman Shabeek Mohamed
---

# Blazor WASM Dockerizing - I ❤️ DotNet

source: chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/

> ## Excerpt
> In this post I will teach you how to dockerize stand alone blazor wasm app in .NET. All with live working demo.

---
In this article, let's learn about `Dockerizing` Blazor apps.

**Note:** If you have not done so already, I recommend you read the article on [Blazor WASM Pre Rendering](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/blogs/blazor-wasm-pre-rendering).

### Table of Contents

1.  [Introduction](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/blogs/blazor-wasm-dockerizing#introduction)
2.  [What is Docker?](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/blogs/blazor-wasm-dockerizing#what-is-docker)
3.  [Containerising a Blazor WASM App](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/blogs/blazor-wasm-dockerizing#containerising-blazor-wasm-app)
4.  [Summary](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/blogs/blazor-wasm-dockerizing#summary)

### Introduction

Containers are like packages that contain everything an application needs to run, including the application code, its dependencies, configuration files, and more. By putting all of these things together in one place, containers make it easy to run an application consistently across different environments.

To use containers, you first create an image that contains all of the necessary components. Then, you can create instances of this image, which are called containers, and run them on any machine that supports the container platform.

In this tutorial, we'll learn how to use containers to run a Blazor Server application. We'll cover how to create an image that includes all of the necessary components, and then how to use that image to create and run containers.

Before we get into things, let's cover what Docker is and a few key concepts.

### What is Docker?

`Docker` is a tool that helps people build, share, and run containers. Containers are like tiny packages that contain just what an application needs to run, and they can be run on a shared operating system kernel. Because they're so lightweight, many containers can be run on a single physical machine, making them more efficient than traditional virtual machines.

`Containers` are quick to start up because they only contain what's necessary to run the application. This makes them great for scaling on demand, because new containers can be started in just a few seconds. In contrast, traditional virtual machines take a few minutes to start up, so they're not as good for scaling quickly.

#### Docker File

A `Dockerfile` is like a step-by-step instruction manual that tells Docker how to create an image of your application. When you run the `docker build` command with a Dockerfile, Docker uses the instructions in the file to create an image.

#### Image

When you run a Dockerfile, it creates a Docker `image` that contains your application. This image is built up in layers, like an onion. Each layer can be cached to speed up the build process. Once an image is created, it cannot be changed, but it can be used as a starting point for creating new images.

Docker images can be stored in an image repository, which is like a library of images. Some examples of image repositories are `Docker Hub` and `Azure Container Registry`. Image repositories make it easy to share your images with others who might need them. It's kind of like `NuGet`, but for containers.

#### Container

When you run an image, it creates a `container`. A container is like a copy of the image that's running and doing the work. You can create many containers from a single image. To start a container, you use the `docker run` command and tell Docker which image to use as the basis for the container.

### Containerising a Blazor WASM App

#### Challenge

Blazor WebAssembly projects require a different approach because they produce static files when published. Unlike other ASP.NET Core apps, we don't need to use the ASP.NET Core runtime to serve them. This means we don't need to use the ASP.NET Core runtime Docker image as the base for our final image. So, how are we going to serve our files? The solution is to use NGINX.

#### What is NGINX?

`NGINX` is a free and open-source web server that can be used as a reverse proxy, load balancer, and HTTP cache. It's great at serving static content quickly. Compared to Apache, it uses less memory and can handle up to four times the number of requests per second.

There's a Docker image available for NGINX, with several different versions to choose from. We'll be using the `NGINX:Alpine` image, which is very small - less than 5MB - and contains everything we need to serve our Blazor WebAssembly application.

#### Prerequisites

If you haven't used `Docker` before, you'll need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Rancher Desktop](https://rancherdesktop.io/) for either Windows or Mac. Just follow the instructions provided during the setup process and you should be up and running within a few minutes. For this tutorial, we'll be using the [ilovedotnet](https://github.com/ILoveDotNet/ilovedotnet) project repo for a Blazor WASM application.

#### Creating a NGINX Configuration File

To serve our Blazor WebAssembly application in our container, we need to use NGINX web server. Since our app is a Single Page Application (SPA), we need to configure NGINX to route all requests to `index.html`. To do this, we create a new file named `nginx.conf` in the project's root directory and paste the provided code.

![[Pasted image 20240724151433.png]]

#### Code Sample - NGINX Configuration File

Let's break down the above code and understand in detail

`events` section defines the event loop used by NGINX. In this case, the default values are used, so the section is empty.

`http` section defines the HTTP server, including the server block and the location block.

The `include mime.types` directive loads the MIME types file, which defines the file types and their associated content types that NGINX can serve.

The `types` block defines additional MIME types that NGINX should recognize. In this case, the `application/wasm` MIME type is added.

The `server` block defines the virtual server. The listen directive specifies the IP address and port number that the server should listen on. In this case, it listens on port `80`.

The `index` directive specifies the default file name that should be served when a directory is requested. In this case, `index.html` is served.

The `location` block specifies how NGINX should handle requests for a specific location. In this case, requests to the root URL `/` are handled. The `root` directive specifies the directory where NGINX should look for files to serve. In this case, it's `/user/share/nginx/html`.

The `try_files` directive tells NGINX to try to serve the requested file first `$uri`, followed by any directory with the same name as the requested file `$uri/`. If neither of those exists, NGINX will serve the `index.html` file. If that file doesn't exist either, NGINX returns a 404 error `=404`.

Overall, this configuration sets up a basic `HTTP server` that listens on `port 80` and serves files from the `/usr/share/nginx/html`, with support for the `application/wasm` `MIME` type. If you plan to use this in production, it is recommended to refer to the NGINX docs for all configuration options.

#### Creating a Docker File

Let's create a dockerfile in the project's root directory with the following code.
![[Pasted image 20240724151503.png]]
#### Code Sample - Docker File

Let's break down the above code and understand in detail

FROM `mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build-env` specifies the base image for the build environment. The `AS` keyword is used to create a named build-env which is an Alpine-based image that includes the .NET Core SDK.

`RUN apk add nodejs` and `RUN apk add npm` install Node.js and NPM package manager using Alpine's package manager apk.

`WORKDIR /app` sets the working directory inside the container to `/app`.

`COPY . ./` copies all files from the host machine to the container's `/app` directory.

`RUN npm --prefix Web install` installs the required packages and dependencies of the Node.js application found in the Web directory, which is a subdirectory inside `/app`. The `--prefix` option specifies the installation path of the packages.

`RUN dotnet publish "Web/Web.csproj" -c Release -o output` builds and publishes the .NET Core application found in the `Web/Web.csproj` file. The -c option specifies the build configuration and -o option specifies the output directory.

`FROM nginx:alpine` specifies the base image for the final image, which is Nginx in this case.

`WORKDIR /user/share/nginx/html` sets the working directory inside the container to `/user/share/nginx/html`.

`COPY --from=build-env /app/output/wwwroot .` copies the published output of the .NET Core application from the previous build stage to the current image's working directory. The `--from` option specifies the build stage to copy from.

`COPY Web/nginx.conf /etc/nginx/nginx.conf` copies the Nginx configuration file found in the Web directory to the `/etc/nginx` directory inside the container.

`EXPOSE 80` exposes `port 80` of the container to the host machine.

Overall, this Dockerfile sets up an environment to build a .NET Core application and an Nginx web server. The build environment installs Node.js and NPM, copies the .NET Core application and its dependencies, builds and publishes the .NET Core application, and outputs the published files to a designated folder. Then, in the final image, Nginx is installed and configured to serve the published files, and port 80 is exposed for access.

A word of caution!!. The docker file created above doesnt work directly with `docker build` command. There exists some path issues. So I have decided to use docker compose to up and run with above docker file.

#### Creating a Docker Compose File

Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to define a set of containers and their configurations in a single file, called a Docker Compose file. The Docker Compose file is written in YAML syntax and contains information about each container, such as its image, environment variables, network settings, and volumes.

By defining all the containers in a single file, Docker Compose allows you to easily spin up and manage complex applications with multiple containers, such as web servers, databases, and messaging systems. You can start all the containers in the application with a single command, and Docker Compose will ensure that they are started in the correct order and with the correct configuration.

Create the following `docker-compose.yml` at the root of the `Solution` folder.

![[Pasted image 20240724151539.png]]

#### Code Sample - Docker Compose File

This Docker Compose file sets up a service named `ilovedotnet` that runs a pre-built Docker image or builds an image from a Dockerfile, sets environment variables, and maps the container's port 80 to the host machine's port 8080.

#### Up and Run via Docker

Time to see a demo. We have our `docker-compose.yml` setup at `solution folder level` and `Dockerfile` and `nginx.conf` setup at `project folder level`.

All we need to do now is to run command `docker compose up` from the solution folder level. This will build the image and start the container. You can clone the [ilovedotnet](https://github.com/ILoveDotNet/ilovedotnet) repo and execute the above command.

After running the command, open a web browser and navigate to `http://localhost:8080`. The application should load successfully as shown below.

![I Love Dotnet Running from Container](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/image/blogs/blazor/wasm/dockerizing/running%20from%20container.png)
https://ilovedotnet.org/image/blogs/blazor/wasm/dockerizing/running%20from%20container.png

![[Pasted image 20240724151727.png]]
### Summary

This article covered the challenges that come with running a Blazor WebAssembly application in a container. We created an image for our application that utilizes NGINX to serve the static content generated by Blazor WebAssembly applications. Finally, we verified that everything was working as expected by starting a container using our docker compose setup.

[👉🏼 Click here to Join I ❤️ .NET WhatsApp Channel to get 🔔 notified about new articles and other updates.](https://whatsapp.com/channel/0029VaAGMV2LtOj5S5MHd23h)

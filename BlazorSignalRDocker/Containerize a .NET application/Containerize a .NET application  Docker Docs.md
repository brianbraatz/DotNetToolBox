---
created: 2024-07-17T15:50:30 (UTC -05:00)
tags: [.net,containerize,initialize]
source: https://docs.docker.com/language/dotnet/containerize/
author: 
---

# Containerize a .NET application | Docker Docs

source: https://docs.docker.com/language/dotnet/containerize/

> ## Excerpt
> Learn how to containerize an ASP.NET application.

---
## [Prerequisites](https://docs.docker.com/language/dotnet/containerize/#prerequisites)

-   You have installed the latest version of [Docker Desktop](https://docs.docker.com/get-docker/).
-   You have a [git client](https://git-scm.com/downloads). The examples in this section use a command-line based git client, but you can use any client.

## [Overview](https://docs.docker.com/language/dotnet/containerize/#overview)

This section walks you through containerizing and running a .NET application.

## [Get the sample applications](https://docs.docker.com/language/dotnet/containerize/#get-the-sample-applications)

In this guide, you will use a pre-built .NET application. The application is similar to the application built in the Docker Blog article, [Building a Multi-Container .NET App Using Docker Desktop](https://www.docker.com/blog/building-multi-container-net-app-using-docker-desktop/?_gl=1*11wt3gw*_ga*MzgyMzYwMDI0LjE3MjEwNzkxNTU.*_ga_XJWPQMJYHQ*MTcyMTI0ODEyMy4zLjEuMTcyMTI0ODYxOC42MC4wLjA.).

Open a terminal, change directory to a directory that you want to work in, and run the following command to clone the repository.

## [Initialize Docker assets](https://docs.docker.com/language/dotnet/containerize/#initialize-docker-assets)

Now that you have an application, you can use `docker init` to create the necessary Docker assets to containerize your application. Inside the `docker-dotnet-sample` directory, run the `docker init` command in a terminal. `docker init` provides some default configuration, but you'll need to answer a few questions about your application. Refer to the following example to answer the prompts from `docker init` and use the same answers for your prompts.

You should now have the following contents in your `docker-dotnet-sample` directory.

To learn more about the files that `docker init` added, see the following:

-   [Dockerfile](https://docs.docker.com/reference/dockerfile/)
-   [.dockerignore](https://docs.docker.com/reference/dockerfile/#dockerignore-file)
-   [compose.yaml](https://docs.docker.com/compose/compose-file/)

## [Run the application](https://docs.docker.com/language/dotnet/containerize/#run-the-application)

Inside the `docker-dotnet-sample` directory, run the following command in a terminal.

Open a browser and view the application at [http://localhost:8080](http://localhost:8080/). You should see a simple web application.

In the terminal, press `ctrl`+`c` to stop the application.

### [Run the application in the background](https://docs.docker.com/language/dotnet/containerize/#run-the-application-in-the-background)

You can run the application detached from the terminal by adding the `-d` option. Inside the `docker-dotnet-sample` directory, run the following command in a terminal.

Open a browser and view the application at [http://localhost:8080](http://localhost:8080/). You should see a simple web application.

In the terminal, run the following command to stop the application.

For more information about Compose commands, see the [Compose CLI reference](https://docs.docker.com/compose/reference/).

## [Summary](https://docs.docker.com/language/dotnet/containerize/#summary)

In this section, you learned how you can containerize and run your .NET application using Docker.

Related information:

-   [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
-   [Build with Docker guide](https://docs.docker.com/build/guide/)
-   [.dockerignore file reference](https://docs.docker.com/reference/dockerfile/#dockerignore-file)
-   [Docker Compose overview](https://docs.docker.com/compose/)

## [Next steps](https://docs.docker.com/language/dotnet/containerize/#next-steps)

In the next section, you'll learn how you can develop your application using Docker containers.

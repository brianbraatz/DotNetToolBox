---
created: 2024-07-25T07:48:38 (UTC -05:00)
tags: []
source: https://github.com/ivanzcai/eShopOnContainers
author: ivanzcai
---

# GitHub - ivanzcai/eShopOnContainers: Easy to get started sample reference microservice and container based application. Cross-platform on Linux and Windows Docker Containers, powered by .NET Core 2.2, Docker engine and optionally Azure, Kubernetes or Service Fabric. Supports Visual Studio, VS for Mac and CLI based environments with Docker CLI, dotnet CLI, VS Code or any other code editor.

source: https://github.com/ivanzcai/eShopOnContainers

> ## Excerpt
> Easy to get started sample reference microservice and container based application. Cross-platform on Linux and Windows Docker Containers, powered by .NET Core 2.2, Docker engine and optionally Azur...

---
## eShopOnContainers - Microservices Architecture and Containers based Reference Application (**BETA state** - Visual Studio and CLI environments compatible)

Sample .NET Core reference application, powered by Microsoft, based on a simplified microservices architecture and Docker containers.

## Linux Build Status for 'dev' branch

Dev branch contains the latest "stable" code, and their images are tagged with `:dev` in our [Docker Hub](https://cloud.docker.com/u/eshop/repository/list):

| Basket API | Catalog API | Identity API | Location API |
| --- | --- | --- | --- |
| [![Basket API](https://camo.githubusercontent.com/879c1e952d61340d2b45b7a96979cb2195bff4d943d95d92b8a2af21405bf5f9/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f6261736b65743f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=199&branchName=dev) | [![Catalog API](https://camo.githubusercontent.com/80344577fe978a120459c06a35dad4f3064e9c4d3fd0d17b514d25173f265e0a/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f636174616c6f673f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=197&branchName=dev) | [![Identity API](https://camo.githubusercontent.com/3569b6b21692402f843455144be6fdee1ade365373417435e3d2902335fbb7f8/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f6964656e746974793f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=200&branchName=dev) | [![Location API](https://camo.githubusercontent.com/61e91cb08defa17ae475fccff40a69f4473828cd97e68b2b0cd009a66b88b4c3/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f6c6f636174696f6e3f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=202&branchName=dev) |

| Marketing API | Ordering API | Payment API | Api Gateways base image |
| --- | --- | --- | --- |
| [![Marketing API](https://camo.githubusercontent.com/bf1710a769c24fe9ad4a65aca60fa35c71469b014ce6636a2159f67be8419ee7/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f6d61726b6574696e673f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=203&branchName=dev) | [![Ordering API](https://camo.githubusercontent.com/9fac3447c123bc6c285d6405ba12cb2b1df0ff9140d0a01a5ea84ff11920d87d/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f6f72646572696e673f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=198&branchName=dev) | [![Payment API](https://camo.githubusercontent.com/f4bf99d0481bcbc612bdf3fae94f94292d391970c4321e9ea2337873018d1ee4/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f7061796d656e743f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=205&branchName=dev) | [![Api Gateways base image](https://camo.githubusercontent.com/cff1cc02f7db5b000752e7f9c423a09c06d37788a703a2a6f7c85d75979abacf/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f6170696777733f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=201&branchName=dev) |

| Web Shopping Aggregator | Mobile Shopping Aggregator | WebMVC Client | WebSPA Client |
| --- | --- | --- | --- |
| [![Web Shopping Aggregator](https://camo.githubusercontent.com/c2e7c4711901abdf63e8871ec2ec83275a73f82b2860e4a6267b666a46bcbdf7/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f7765622d73686f7070696e672d6167673f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=206&branchName=dev) | [![Mobile Shopping Aggregator](https://camo.githubusercontent.com/e1b002bb5f13acfebb4bfdba67eaa13edfe875c1054b2f924cbdf544248fc376/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f6d6f62696c652d73686f7070696e672d6167673f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=204&branchName=dev) | [![WebMVC Client](https://camo.githubusercontent.com/1abc745313f0d2dfff155bda9a500d8359282dd31d41a5d14c41f5c24988d194/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f7765626d76633f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=209&branchName=dev) | [![WebSPA Client](https://camo.githubusercontent.com/46012e7e7f9f0303157ebd1bd71f2068845170b7235840672ef74e6d18202c9c/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f7765627370613f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=210&branchName=dev) |

| Web Status | Webhooks API | Webbhooks demo client |
| --- | --- | --- |
| [![Web Status](https://camo.githubusercontent.com/a0aed457e35bf0defc4f3d1a93d8aec1b701f4a6de32f2a630f199b2d5255915/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f7765627374617475733f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=211&branchName=dev) | [![Webhooks API](https://camo.githubusercontent.com/cfe27c3a98a5b18c191759c0dbb621fa2d399206ff2f6435d4cd3026a03eee0a/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f776562686f6f6b733f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=207&branchName=dev) | [![Webhooks demo client](https://camo.githubusercontent.com/2dbc07dfd2b9184d93ba645bc85be442d08208ac05909f5e5546fc0bdf7f6a72/68747470733a2f2f6d736674646576746f6f6c732e76697375616c73747564696f2e636f6d2f6553686f704f6e436f6e7461696e6572732f5f617069732f6275696c642f7374617475732f6d6963726f73657276696365732f776562686f6f6b732d636c69656e743f6272616e63684e616d653d646576)](https://msftdevtools.visualstudio.com/eShopOnContainers/_build/latest?definitionId=208&branchName=dev) |

## IMPORTANT NOTES!

**You can use either the latest version of Visual Studio or simply Docker CLI and .NET CLI for Windows, Mac and Linux**.

**Note for Pull Requests (PRs)**: We accept pull request from the community. When doing it, please do it onto the **DEV branch** which is the consolidated work-in-progress branch. Do not request it onto Master branch, if possible.

**NEWS / ANNOUNCEMENTS** Do you want to be up-to-date on .NET Architecture guidance and reference apps like eShopOnContainers? --> Subscribe by "WATCHING" this new GitHub repo: [https://github.com/dotnet-architecture/News](https://github.com/dotnet-architecture/News)

## Updated for .NET Core 2.2 "wave" of technologies

eShopOnContainers is updated to .NET Core 2.x (currently updated to 2.2) "wave" of technologies. Not just compilation but also new recommended code in EF Core, ASP.NET Core, and other new related versions.

The **dockerfiles** in the solution have also been updated and now support [**Docker Multi-Stage**](https://blogs.msdn.microsoft.com/stevelasker/2017/09/11/net-and-multistage-dockerfiles/) since mid-December 2017.

> **PLEASE** Read our [branch guide](https://github.com/ivanzcai/eShopOnContainers/blob/dev/branch-guide.md) to know about our branching policy

> ### DISCLAIMER
> 
> **IMPORTANT:** The current state of this sample application is **BETA**, because we are constantly evolving towards newly released technologies. Therefore, many areas could be improved and change significantly while refactoring the current code and implementing new features. Feedback with improvements and pull requests from the community will be highly appreciated and accepted.
> 
> This reference application proposes a simplified microservice oriented architecture implementation to introduce technologies like .NET Core with Docker containers through a comprehensive application. The chosen domain is eShop/eCommerce but simply because it is a well-known domain by most people/developers. However, this sample application should not be considered as an "eCommerce reference model" at all. The implemented business domain might not be ideal from an eCommerce business point of view. It is neither trying to solve all the problems in a large, scalable and mission-critical distributed system. It is just a bootstrap for developers to easily get started in the world of Docker containers and microservices with .NET Core.
> 
> For example, the next step after running the solution in the local dev PC and understanding Docker containers and microservices development with .NET Core, is to select a microservice cluster/orchestrator like Kubernetes in Azure (AKS) or Azure Service Fabric, both environments tested and supported by this solution. Additional steps would be to move your databases to HA cloud services (like Azure SQL Database) or switch your EventBus to use Azure Service Bus (instead of bare-bone RabbitMQ) or any other production-ready Service Bus in the market.

[![image](https://user-images.githubusercontent.com/1712635/40397331-059a7ec6-5de7-11e8-8542-a597eca16fef.png)](https://user-images.githubusercontent.com/1712635/40397331-059a7ec6-5de7-11e8-8542-a597eca16fef.png)

> Read the planned [Roadmap and Milestones for future releases of eShopOnContainers](https://github.com/dotnet/eShopOnContainers/wiki/01.-Roadmap-and-Milestones-for-future-releases) within the Wiki for further info about possible new implementations and provide feedback at the [ISSUES section](https://github.com/dotnet/eShopOnContainers/issues) if you'd like to see any specific scenario implemented or improved. Also, feel free to discuss on any current issue.

### Architecture overview

This reference application is cross-platform at the server and client side, thanks to .NET Core services capable of running on Linux or Windows containers depending on your Docker host, and to Xamarin for mobile apps running on Android, iOS or Windows/UWP plus any browser for the client web apps. The architecture proposes a microservice oriented architecture implementation with multiple autonomous microservices (each one owning its own data/db) and implementing different approaches within each microservice (simple CRUD vs. DDD/CQRS patterns) using Http as the communication protocol between the client apps and the microservices and supports asynchronous communication for data updates propagation across multiple services based on Integration Events and an Event Bus (a light message broker, to choose between RabbitMQ or Azure Service Bus, underneath) plus other features defined at the [roadmap](https://github.com/dotnet/eShopOnContainers/wiki/01.-Roadmap-and-Milestones-for-future-releases).

[![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/eshop_logo.png)](https://github.com/ivanzcai/eShopOnContainers/blob/dev/img/eshop_logo.png) [![](https://user-images.githubusercontent.com/1712635/38758862-d4b42498-3f27-11e8-8dad-db60b0fa05d3.png)](https://user-images.githubusercontent.com/1712635/38758862-d4b42498-3f27-11e8-8dad-db60b0fa05d3.png)

> ### Important Note on API Gateways and published APIs
> 
> Since April 2018, we have introduced the implementation of the [API Gateway pattern](http://microservices.io/patterns/apigateway.html) and [Backend-For-Front-End (BFF) pattern](https://samnewman.io/patterns/architectural/bff/) in eShopOnContainers architecture, so you can filter and publish simplified APIs and URIs and apply additional security in that tier while hiding/securing the internal microservices to the client apps or outside consumers. These sample API Gateways in eShopOnContainers are based on [Ocelot](https://github.com/ThreeMammals/Ocelot), an OSS lightweight API Gateway solution explained [here](http://threemammals.com/ocelot). The deployed API Gateways are autonomous and can be deployed as your own custom microservices/containers, as it is currently done in eShopOnContainers, so you can test it even in a simple development environment with just Docker engine or deploy it into orchestrators like Kubernetes in AKS or Service Fabric.

> For your production-ready architecture you can either keep using [Ocelot](https://github.com/ThreeMammals/Ocelot) which is simple and easy to use and used in production by significant companies or if you need further functionality and a much richer set of features suitable for commercial APIs, you can also substitute those API Gateways and use [Azure API Management](https://azure.microsoft.com/en-us/services/api-management/) or any other commercial API Gateway, as shown in the following image.

[![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/eShopOnContainers-Architecture-With-Azure-API-Management.png)](https://github.com/ivanzcai/eShopOnContainers/blob/dev/img/eShopOnContainers-Architecture-With-Azure-API-Management.png)

> The sample code in this repo is NOT making use of Azure API Management in order to be able to provide an "F5 experience" in Visual Studio (or CLI) of the sample with no up-front dependencies in Azure. But you could evaluate API Gateways alternatives when building for production.

> ### Internal architecture and design of the microservices

> The microservices are different in type, meaning different internal architecture pattern approaches depending on its purpose, as shown in the image below.

[![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/eShopOnContainers_Types_Of_Microservices.png)](https://github.com/ivanzcai/eShopOnContainers/blob/dev/img/eShopOnContainers_Types_Of_Microservices.png)

> ### Important Note on Database Servers/Containers
> 
> In this solution's current configuration for a development environment, the SQL databases are automatically deployed with sample data into a single SQL Server container (a single shared Docker container for SQL databases) so the whole solution can be up and running without any dependency to any cloud or a specific server. Each database could also be deployed as a single Docker container, but then you'd need more than 8GB of RAM assigned to Docker in your development machine in order to be able to run 3 SQL Server Docker containers in your Docker Linux host in "Docker for Windows" or "Docker for Mac" development environments.
> 
> A similar case is defined in regard to Redis cache running as a container for the development environment. Or a No-SQL database (MongoDB) running as a container.
> 
> However, in a real production environment it is recommended to have your databases (SQL Server, Redis, and the NO-SQL database, in this case) in HA (High Available) services like Azure SQL Database, Redis as a service and Azure CosmosDB instead the MongoDB container (as both systems share the same access protocol). If you want to change to a production configuration, you'll just need to change the connection strings once you have set up the servers in an HA cloud or on-premises.

> ### Important Note on EventBus
> 
> In this solution's current EventBus is a simplified implementation, mainly used for learning purposes (development and testing), so it doesn't handle all production scenarios, most notably on error handling.
> 
> The following forks provide production environment level implementation examples with eShopOnContainers :
> 
> -   Implementation with [CAP](https://github.com/dotnetcore/CAP) : [https://github.com/yang-xiaodong/eShopOnContainers](https://github.com/yang-xiaodong/eShopOnContainers)
> -   Implementation with [NServiceBus](https://github.com/Particular/NServiceBus) : [https://github.com/Particular/eShopOnContainers](https://github.com/Particular/eShopOnContainers)

## Related documentation and guidance

While developing this reference application, we've been creating a reference **Guide/eBook** focusing on **architecting and developing containerized and microservice based .NET Applications** (download link available below) which explains in detail how to develop this kind of architectural style (microservices, Docker containers, Domain-Driven Design for certain microservices) plus other simpler architectural styles, like monolithic apps that can also live as Docker containers.

There are also additional eBooks focusing on Containers/Docker lifecycle (DevOps, CI/CD, etc.) with Microsoft Tools, already published plus an additional eBook focusing on Enterprise Apps Patterns with Xamarin.Forms. You can download them and start reviewing these Guides/eBooks here:

| Architecting & Developing | Containers Lifecycle & CI/CD | App patterns with Xamarin.Forms |
| --- | --- | --- |
| [![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/ebook_arch_dev_microservices_containers_cover.png)](https://aka.ms/microservicesebook) | [![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/ebook_containers_lifecycle.png)](https://aka.ms/dockerlifecycleebook) | [![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/xamarin-enterprise-patterns-ebook-cover-small.png)](https://aka.ms/xamarinpatternsebook) |
| <sup><a href="https://aka.ms/microservicesebook" rel="nofollow"><strong>Download .PDF</strong> (v2.2 Edition)</a></sup> | <sup><a href="https://aka.ms/dockerlifecycleebook" rel="nofollow"><strong>Download</strong></a></sup> | <sup><a href="https://aka.ms/xamarinpatternsebook" rel="nofollow"><strong>Download</strong></a></sup> |

Download in other formats (**eReaders** like **MOBI**, **EPUB**) and other eBooks at the [.NET Architecture center](http://dot.net/architecture).

Send feedback to [dotnet-architecture-ebooks-feedback@service.microsoft.com](https://github.com/ivanzcai/eShopOnContainers/blob/dev/dotnet-architecture-ebooks-feedback@service.microsoft.com)

However, we encourage you to download and review the [Architecting and Developing Microservices eBook](https://aka.ms/microservicesebook) because the architectural styles and architectural patterns and technologies explained in the guide are using this reference application when explaining many pattern implementations, so you'll understand the context, design and decisions taken in the current architecture and internal designs much better.

## Overview of the application code

In this repo you can find a sample reference application that will help you to understand how to implement a microservice architecture based application using **.NET Core** and **Docker**.

The example business domain or scenario is based on an eShop or eCommerce which is implemented as a multi-container application. Each container is a microservice deployment (like the basket-microservice, catalog-microservice, ordering-microservice and the identity-microservice) which is developed using ASP.NET Core running on .NET Core so they can run either on Linux Containers and Windows Containers. The screenshot below shows the VS Solution structure for those microservices/containers and client apps.

-   (_Recommended when getting started_) Open **eShopOnContainers-ServicesAndWebApps.sln** for a solution containing just the server-side projects related to the microservices and web applications.
-   Open **eShopOnContainers-MobileApps.sln** for a solution containing just the client mobile app projects (Xamarin mobile apps only). It works independently based on mocks, too.
-   Open **eShopOnContainers.sln** for a solution containing all the projects (All client apps and services).

[![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/vs-solution-structure.png)](https://github.com/ivanzcai/eShopOnContainers/blob/dev/img/vs-solution-structure.png)

Finally, those microservices are consumed by multiple client web and mobile apps, as described below.  
**_MVC Application (ASP.NET Core)_**: It's an MVC application where you can find interesting scenarios on how to consume HTTP-based microservices from C# running in the server side, as it is a typical ASP.NET Core MVC application. Since it is a server-side application, access to other containers/microservices is done within the internal Docker Host network with its internal name resolution. [![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/eshop-webmvc-app-screenshot.png)](https://github.com/ivanzcai/eShopOnContainers/blob/dev/img/eshop-webmvc-app-screenshot.png)  
**_SPA (Single Page Application)_**: Providing similar "eShop business functionality" but developed with Angular, Typescript and slightly using ASP.NET Core MVC. This is another approach for client web applications to be used when you want to have a more modern client behavior which is not behaving with the typical browser round-trip on every action but behaving like a Single-Page-Application which is more similar to a desktop app usage experience. The consumption of the HTTP-based microservices is done from TypeScript/JavaScript in the client browser, so the client calls to the microservices come from out of the Docker Host internal network (Like from your network or even from the Internet). [![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/eshop-webspa-app-screenshot.png)](https://github.com/ivanzcai/eShopOnContainers/blob/dev/img/eshop-webspa-app-screenshot.png)  
**_Xamarin Mobile App (For iOS, Android and Windows/UWP)_**: It is a client mobile app supporting the most common mobile OS platforms (iOS, Android and Windows/UWP). In this case, the consumption of the microservices is done from C# but running on the client devices, so out of the Docker Host internal network (Like from your network or even the Internet).

[![](https://github.com/ivanzcai/eShopOnContainers/raw/dev/img/xamarin-mobile-App.png)](https://github.com/ivanzcai/eShopOnContainers/blob/dev/img/xamarin-mobile-App.png)

## Setting up your development environment for eShopOnContainers

### Visual Studio 2017 (or above) and Windows based

This is the more straightforward way to get started: [https://github.com/dotnet-architecture/eShopOnContainers/wiki/02.-Setting-eShopOnContainers-in-a-Visual-Studio-2017-environment](https://github.com/dotnet-architecture/eShopOnContainers/wiki/02.-Setting-eShopOnContainers-in-a-Visual-Studio-2017-environment)

### CLI and Windows based

For those who prefer the CLI on Windows, using dotnet CLI, docker CLI and VS Code for Windows: [https://github.com/dotnet/eShopOnContainers/wiki/03.-Setting-the-eShopOnContainers-solution-up-in-a-Windows-CLI-environment-(dotnet-CLI,-Docker-CLI-and-VS-Code)](https://github.com/dotnet/eShopOnContainers/wiki/03.-Setting-the-eShopOnContainers-solution-up-in-a-Windows-CLI-environment-(dotnet-CLI,-Docker-CLI-and-VS-Code))

### CLI and Mac based

For those who prefer the CLI on a Mac, using dotnet CLI, docker CLI and VS Code for Mac: [https://github.com/dotnet-architecture/eShopOnContainers/wiki/04.-Setting-eShopOnContainer-solution-up-in-a-Mac,-VS-for-Mac-or-with-CLI-environment--(dotnet-CLI,-Docker-CLI-and-VS-Code)](https://github.com/dotnet-architecture/eShopOnContainers/wiki/04.-Setting-eShopOnContainer-solution-up-in-a-Mac,-VS-for-Mac-or-with-CLI-environment--(dotnet-CLI,-Docker-CLI-and-VS-Code))

## Orchestrators: Kubernetes and Service Fabric

See at the [Wiki](https://github.com/dotnet-architecture/eShopOnContainers/wiki) the posts on setup/instructions about how to deploy to Kubernetes or Service Fabric in Azure (although you could also deploy to any other cloud or on-premises).

## Sending feedback and pull requests

As mentioned, we'd appreciate your feedback, improvements and ideas. You can create new issues at the issues section, do pull requests and/or send emails to **[eshop\_feedback@service.microsoft.com](mailto:eshop_feedback@service.microsoft.com)**

## Questions

\[QUESTION\] Answer +1 if the solution is working for you (Through VS or CLI environment): [dotnet-architecture#107](https://github.com/dotnet-architecture/eShopOnContainers/issues/107)

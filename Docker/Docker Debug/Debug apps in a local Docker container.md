---
created: 2024-07-28T11:20:44 (UTC -05:00)
tags: []
source: chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html
author: ghogen
---

# 

source: chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html

> ## Excerpt
> Modify applications running in a local Docker container, refresh with the Edit and Refresh actions, and set debugging breakpoints.

---
Debug apps in a local Docker container


> ## Excerpt
> Modify applications running in a local Docker container, refresh with the Edit and Refresh actions, and set debugging breakpoints.

---
# Debug apps in a local Docker container

-   Article
-   04/26/2024
-   20 contributors

Feedback

## In this article

1.  [Prerequisites](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#prerequisites)
2.  [Create a web app](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#create-a-web-app)
3.  [Create a .NET Framework console app](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#create-a-net-framework-console-app)
4.  [Authenticating to Azure services using the token proxy](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#authenticating-to-azure-services-using-the-token-proxy)

Show 4 more

Visual Studio provides a consistent way to develop Docker containers and validate your application locally. You can run and debug your apps in Linux or Windows containers running on your local Windows desktop with Docker installed, and you don't have to restart the container each time you make a code change.

This article illustrates how to use Visual Studio to start an app in a local Docker container, make changes, and then refresh the browser to see the changes. This article also shows you how to set breakpoints for debugging for containerized apps. Supported project types include web app, console app, and Azure function targeting .NET Framework and .NET Core. The examples presented in this article, are a project of type ASP.NET Core Web App and a project of type Console App (.NET Framework).

If you already have a project of a supported type, Visual Studio can create a Dockerfile and configure your project to run in a container. See [Container Tools in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/containers/overview?view=vs-2022).

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#prerequisites)

## Prerequisites

To debug apps in a local Docker container, the following tools must be installed:

-   [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/?cid=learn-onpage-download-cta) with the Web Development workload installed

To run Docker containers locally, you must have a local Docker client. You can use [Docker Desktop](https://www.docker.com/get-docker), which requires Windows 10 or later.

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#create-a-web-app)

## Create a web app

If you have a project and you've added Docker support as described in the [overview](https://learn.microsoft.com/en-us/visualstudio/containers/overview?view=vs-2022), skip this section.

1.  In the Visual Studio start window, select **Create a new project**.
    
2.  Select **ASP.NET Core Web App**, and then select **Next**.
    
3.  Enter a name for your new application (or use the default name), specify the location on disk, and then select **Next**.
    
4.  Choose the .NET version you want to target. If you don't know, [choose the LTS (long-term support) release](https://dotnet.microsoft.com/download/dotnet).
    
    ![Create a web project - Additional information screen](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html../azure/media/create-aspnet5-app/asp-net-enable-docker-support-visual-studio.png?view=vs-2022)
    
5.  Choose whether you want SSL support by selecting or clearing the **Configure for HTTPS** checkbox.
    
6.  Select the **Enable Docker** checkbox.
    
7.  In the **Docker OS** textbox, select the type of container you want (Windows or Linux), and then select **Create**.
    

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#edit-your-razor-pages-and-refresh)

### Edit your Razor pages and refresh

To quickly iterate changes in your Razor pages, you can start your application in a container. Then, continue to make changes, viewing them as you would with Internet Information Services (IIS) Express.

1.  Make sure that Docker is set up to use the container type (Linux or Windows) that you are using. Right-click on the Docker icon on the Taskbar, and choose **Switch to Linux containers** or **Switch to Windows containers** as appropriate.
    
2.  Editing your code and refreshing the running site as described in this section is not enabled in the default templates in .NET Core and .NET 5 and later. To enable it, add the NuGet package [Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation/). Add a call to the extension method [AddRazorRuntimeCompilation](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/en-us/dotnet/api/microsoft.extensions.dependencyinjection.razorruntimecompilationmvcbuilderextensions.addrazorruntimecompilation) to the code in the `Startup.ConfigureServices` method. You only need this enabled in DEBUG mode, so code it as follows in the `Main` method:
    
    C# Copy
    
    ```
    <span><span class="hljs-comment">// Add services to the container.</span>
    <span class="hljs-keyword">var</span> mvcBuilder = builder.Services.AddRazorPages();
    <span class="hljs-meta">#<span class="hljs-meta-keyword">if</span> DEBUG</span>
        <span class="hljs-keyword">if</span> (Env.IsDevelopment())
        {
            mvcBuilder.AddRazorRuntimeCompilation();
        }
    <span class="hljs-meta">#<span class="hljs-meta-keyword">endif</span></span>
    </span>
    ```
    ![[Pasted image 20240729105424.png]]

    For more information, see [Razor file compilation in ASP.NET Core](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/en-us/aspnet/core/mvc/views/view-compilation?view=aspnetcore-3.1&preserve-view=true). The exact code might vary, depending on the target framework and the project template you used.
    
3.  Set **Solution Configuration** to **Debug**. Then, press **Ctrl**+**F5** to build your Docker image and run it locally.
    
    When the container image is built and running in a Docker container, Visual Studio launches the web app in your default browser.
    
4.  Go to the _Index_ page. We'll make changes on this page.
    
5.  Return to Visual Studio and open _Index.cshtml_.
    
6.  Add the following HTML content to the end of the file, and then save the changes.
    
    HTML Copy
    
    ```
    <span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello from a Docker container!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    </span>
    ```
    ![[Pasted image 20240729105453.png]]

1.  In the output window, when the .NET build is finished and you see the following lines, switch back to your browser and refresh the page:
    
    Output Copy
    
    ```
    Now listening on: http://*:80
    Application started. Press Ctrl+C to shut down.
    ```
    ![[Pasted image 20240729105522.png]]
    

Your changes have been applied!

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#debug-with-breakpoints)

### Debug with breakpoints

Often, changes require further inspection. You can use the debugging features of Visual Studio for this task.

1.  In Visual Studio, open _Index.cshtml.cs_.
    
2.  Replace the contents of the `OnGet` method with the following code:
    
    C# Copy
    
    ```
    <span>    ViewData[<span class="hljs-string">"Message"</span>] = <span class="hljs-string">"Your application description page from within a container"</span>;
    </span>
    ```

	ViewData["Message"] = "Your application description page from within a container";

1.  To the left of the code line, set a breakpoint.
    
4.  To start debugging and hit the breakpoint, press F5.
    
5.  Switch to Visual Studio to view the breakpoint. Inspect values.
    ![[Pasted image 20240729105603.png]]
    ![Screenshot showing part of the code for Index.cshtml.cs in Visual Studio with a breakpoint set to the left of a code line that is highlighted in yellow.](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.htmlmedia/edit-and-refresh/vs-2022/breakpoint.png?view=vs-2022)
    

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#create-a-net-framework-console-app)

## Create a .NET Framework console app

This section presents how to debug a .NET Framework console app project in a local Docker container by first showing how to add Docker support to the project. It's important to recognize that different project types have different levels of Docker support. There are even different levels of Docker support for .NET Core (including .NET 5 and later) console app projects versus .NET Framework console app projects.

When a .NET Framework console app project is created, there's no option to enable Docker support. After creating such a project, there's no way to explicitly add Docker support to the project. For a .NET Framework console app project, it's possible to add support for container orchestration. A side effect of adding orchestration support to the .NET Framework console app project is that it adds Docker support to the project.

The following procedure demonstrates how to add orchestration support to a .NET Framework console app project, which subsequently adds Docker support to the project and allows the project to be debugged in a local Docker container.

1.  Create a new .NET Framework Console app project.
2.  In Solution Explorer, right-click the project node, and then select **Add** > **Container Orchestration Support**. In the dialog box that appears, select **Docker Compose**. A Dockerfile is added to your project and a Docker Compose project with associated support files is added.

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#debug-with-breakpoints-1)

### Debug with breakpoints

1.  In Solution Explorer, open _Program.cs_.
    
2.  Replace the contents of the `Main` method with the following code:
    
    C# Copy
    
    ```
    <span>    System.Console.WriteLine(<span class="hljs-string">"Hello, world!"</span>);
    </span>
    ```

	System.Console.WriteLine("Hello, world!");

1.  Set a breakpoint to the left of the code line.
    
4.  Press **F5** to start debugging and hit the breakpoint.
    
5.  Switch to Visual Studio to view the breakpoint and inspect values.
    

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#authenticating-to-azure-services-using-the-token-proxy)

## Authenticating to Azure services using the token proxy

When you're using Azure services from a container, you can use [DefaultAzureCredential](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/en-us/dotnet/api/azure.identity.defaultazurecredential) (with the [VisualStudioCredential](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/en-us/dotnet/api/azure.identity.visualstudiocredential) enabled) to authenticate with Azure services with your Microsoft Entra account without any additional configuration in the container. To enable this, see [How to configure Visual Studio Container Tools](https://learn.microsoft.com/en-us/visualstudio/containers/container-tools-configure?view=vs-2022). Also, you need to set up Azure authentication in Visual Studio by following the instructions at [Authenticate Visual Studio with Azure](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/en-us/dotnet/azure/configure-visual-studio#authenticate-visual-studio-with-azure). The support for VisualStudioCredential in a container is available in Visual Studio version 17.6 and later.

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#azure-functions)

### Azure Functions

If you're debugging an integrated Azure Functions project and using the token proxy in the container to handle authentication to Azure services, you need to copy the .NET runtime onto the container for the token proxy to run. If you're debugging an isolated Azure Functions project, it already has the .NET runtime, so there's no need for this extra step.

To ensure the .NET runtime is available to the token proxy, add, or modify the `debug` layer in the Dockerfile that copies the .NET runtime into the container image. For Linux containers, you can add the following code to the Dockerfile:

Dockerfile Copy

```
<span><span class="hljs-comment"># This layer is to support debugging, VS's Token Proxy requires the runtime to be installed in the container</span>
<span class="hljs-keyword">FROM</span> mcr.microsoft.com/dotnet/runtime:<span class="hljs-number">8.0</span> AS runtime
<span class="hljs-keyword">FROM</span> base as debug
<span class="hljs-keyword">COPY</span><span class="bash"> --from=runtime /usr/share/dotnet /usr/share/dotnet</span>
<span class="hljs-keyword">RUN</span><span class="bash"> ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet</span>
</span>
```


# This layer is to support debugging, VS's Token Proxy requires the runtime to be installed in the container
FROM mcr.microsoft.com/dotnet/runtime:8.0 AS runtime
FROM base as debug
COPY --from=runtime /usr/share/dotnet /usr/share/dotnet
RUN ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet
![[Pasted image 20240729111348.png]]


Also, in the Visual Studio project, you need to make some changes to specify this as the layer to use when debugging in Fast Mode. For an explanation of Fast Mode, see [Customize Docker containers in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/containers/container-build?view=vs-2022#debugging). For single container scenarios (not Docker Compose), set the MSBuild property `DockerfileFastModeStage` to `debug` in order to use that layer for debugging. For Docker Compose, modify the `docker-compose.vs.debug.yml` as follows:

yml Copy

```
<span><span class="hljs-comment"># Set the stage to debug to use an image with the .NET runtime in it</span>
<span class="hljs-attr">services:</span>
<span class="hljs-attr">  functionappintegrated:</span>
<span class="hljs-attr">    build:</span>
<span class="hljs-attr">      target:</span> <span class="hljs-string">debug</span>
</span>
```
![[Pasted image 20240729111934.png]]


For a code sample of authentication with Azure Functions, including both integrated and isolated scenarios, see [VisualStudioCredentialExample](https://github.com/NCarlsonMSFT/VisualStudioCredentialExample).

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#container-reuse)

## Container reuse

When you use [Fast Mode](https://learn.microsoft.com/en-us/visualstudio/containers/container-build?view=vs-2022#debugging), which Visual Studio normally uses for the Debug configuration, Visual Studio rebuilds only your container images and the container itself when you change the Dockerfile. If you don't change the Dockerfile, Visual Studio reuses the container from an earlier run.

If you manually modified your container and want to restart with a clean container image, use the **Build** > **Clean** command in Visual Studio, and then build as normal.

When you're not using Fast Mode, which is typical for the Release configuration, Visual Studio rebuilds the container each time the project is built.

You can configure when Fast Mode is used; see [How to configure Visual Studio Container Tools](https://learn.microsoft.com/en-us/visualstudio/containers/container-tools-configure?view=vs-2022).

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#troubleshoot)

## Troubleshoot

Learn how to [troubleshoot Visual Studio Docker development](https://learn.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2022).

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#related-content)

## Related content

Get more details by reading [How Visual Studio builds containerized apps](https://learn.microsoft.com/en-us/visualstudio/containers/container-build?view=vs-2022).

[](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#more-about-docker-with-visual-studio-windows-and-azure)

## More about Docker with Visual Studio, Windows, and Azure

-   Learn more about [container development with Visual Studio](https://learn.microsoft.com/en-us/visualstudio/containers/?view=vs-2022).
-   To build and deploy a Docker container, see [Docker integration for Azure Pipelines](https://marketplace.visualstudio.com/items?itemName=ms-vscs-rm.docker).
-   For an index of Windows Server and Nano Server articles, see [Windows container information](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/en-us/virtualization/windowscontainers/).
-   Learn about [Azure Kubernetes Service](https://azure.microsoft.com/services/kubernetes-service/) and review the [Azure Kubernetes Service documentation](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/en-us/azure/aks).

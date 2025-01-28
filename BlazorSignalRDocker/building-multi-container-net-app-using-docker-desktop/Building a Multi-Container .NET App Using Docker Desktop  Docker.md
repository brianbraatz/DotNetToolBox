---
created: 2024-07-17T15:57:44 (UTC -05:00)
tags: []
source: https://www.docker.com/blog/building-multi-container-net-app-using-docker-desktop/?_gl=1*11wt3gw*_ga*MzgyMzYwMDI0LjE3MjEwNzkxNTU.*_ga_XJWPQMJYHQ*MTcyMTI0ODEyMy4zLjEuMTcyMTI0ODYxOC42MC4wLjA.
author: 
---

# Building a Multi-Container .NET App Using Docker Desktop | Docker

source: https://www.docker.com/blog/building-multi-container-net-app-using-docker-desktop/?_gl=1*11wt3gw*_ga*MzgyMzYwMDI0LjE3MjEwNzkxNTU.*_ga_XJWPQMJYHQ*MTcyMTI0ODEyMy4zLjEuMTcyMTI0ODYxOC42MC4wLjA.

> ## Excerpt
> Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version

---
![Whalepurpleguy](https://www.docker.com/wp-content/uploads/2022/04/image1-1110x282.png "Whalepurpleguy - Image1")

[.NET](https://docs.microsoft.com/dotnet/core/) is a free, open-source development platform for building numerous apps, such as web apps, web APIs, serverless functions in the cloud, mobile apps and much more. .NET is a general purpose development platform maintained by Microsoft and the .NET community on [GitHub](https://github.com/dotnet/core). It is [cross-platform](https://dotnet.microsoft.com/en-us/download), supporting Windows, macOS and Linux, and can be used in device, cloud, and embedded/IoT scenarios.

Docker is quite popular among the .NET community. .NET Core can easily [run in a Docker container](https://hub.docker.com/_/microsoft-dotnet). .NET has several capabilities that make development easier, including [automatic memory management](https://docs.microsoft.com/en-us/dotnet/standard/automatic-memory-management), (runtime) generic types, [reflection](https://docs.microsoft.com/en-us/dotnet/visual-basic/programming-guide/concepts/reflection), [asynchrony,](https://docs.microsoft.com/en-us/dotnet/fsharp/tutorials/async) [concurrency](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/concurrency?view=aspnetcore-6.0), and [native interop](https://docs.microsoft.com/en-us/dotnet/standard/native-interop/). Millions of developers take advantage of these capabilities to efficiently build high-quality applications.

### Building the Application

In this tutorial, you will see how to containerize a .NET application using [Docker Compose.](https://docs.docker.com/compose/) The application used in this blog is a Webapp communicating with a [Postgresql](https://www.postgresql.org/) database. When the page is loaded, it will query the Student table for the record with ID and display the name of student on the page.

### What will you need?

-   [Docker Desktop](https://docs.docker.com/desktop/)
-   [Docker Compose](https://docs.docker.com/compose/cli-command/)
-   [Microsoft Visual Studio Code](https://code.visualstudio.com/docs/remote/containers)

### Getting Started

Visit [https://www.docker.com/get-started/](https://www.docker.com/get-started/) to download Docker Desktop for Mac and install it in your system.

![Getting started with docker](https://www.docker.com/wp-content/uploads/2022/04/image2-883x1024.png "Getting Started With Docker - Image2")

Once the installation gets completed, click “About Docker Desktop” to verify the version of Docker running on your system.

![About docker desktop pull down menu](https://www.docker.com/wp-content/uploads/2022/04/image3-1005x1024.png "About Docker Desktop Pull Down Menu - Image3")

If you follow the above steps, you will always find the latest version of Docker desktop installed on your system.

## ![Docker desktop version 4. 7 welcome](https://www.docker.com/wp-content/uploads/2022/04/image4-1110x738.png "Docker Desktop Version 4.7 Welcome - Image4")

1\. In your terminal, type the following command

`dotnet new webApp -o myWebApp --no-https`

The \`[dotnet new](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new)\` command creates a .NET project or other artifacts based on a template.

You should see the output in terminal

<table><tbody><tr><td><p>1</p><p>2</p></td><td><div><p><code>The template ASP.NET Core Web App was created successfully.</code></p><p><code>This template contains technologies from parties other than Microsoft, see https:</code><code>//aka</code><code>.ms</code><code>/aspnetcore/6</code><code>.0-third-party-notices </code><code>for</code> <code>details.</code></p></div></td></tr></tbody></table>

This will bootstrap a new web application from a template shipped with dotnet sdk. The -o parameter creates a directory named myWebApp where your app is stored.

2\. Navigate to the application directory

`cd myWebApp`

you will have a list of files –

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p><p>31</p></td><td><div><p><code>tree -L 2</code></p><p><code>.</code></p><p><code>├── Pages</code></p><p><code>│ ├── Error.cshtml</code></p><p><code>│ ├── Error.cshtml.cs</code></p><p><code>│ ├── Index.cshtml</code></p><p><code>│ ├── Index.cshtml.cs</code></p><p><code>│ ├── Privacy.cshtml</code></p><p><code>│ ├── Privacy.cshtml.cs</code></p><p><code>│ ├── Shared</code></p><p><code>│ ├── _ViewImports.cshtml</code></p><p><code>│ └── _ViewStart.cshtml</code></p><p><code>├── Program.cs</code></p><p><code>├── Properties</code></p><p><code>│ └── launchSettings.json</code></p><p><code>├── appsettings.Development.json</code></p><p><code>├── appsettings.json</code></p><p><code>├── myWebApp.csproj</code></p><p><code>├── obj</code></p><p><code>│ ├── myWebApp.csproj.nuget.dgspec.json</code></p><p><code>│ ├── myWebApp.csproj.nuget.g.props</code></p><p><code>│ ├── myWebApp.csproj.nuget.g.targets</code></p><p><code>│ ├── project.assets.json</code></p><p><code>│ └── project.nuget.cache</code></p><p><code>└── wwwroot</code></p><p><code>├── css</code></p><p><code>├── favicon.ico</code></p><p><code>├── js</code></p><p><code>└── lib</code></p><p><code>8 directories, 19 files</code></p></div></td></tr></tbody></table>

3\. In your terminal, type the following command to run your application

The `dotnet run` command provides a convenient option to run your application from the source code.

`dotnet run –urls http://localhost:5000`

The application will start to listen on `port 5000` for requests

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p></td><td><div><p><code>Building...</code></p><p><code>warn: Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository[60]</code></p><p><code>Storing keys </code><code>in</code> <code>a directory </code><code>'/root/.aspnet/DataProtection-Keys'</code> <code>that may not be persisted outside of the container. Protected data will be unavailable when the container is destroyed.</code></p><p><code>warn: Microsoft.AspNetCore.Server.Kestrel[0]</code></p><p><code>Unable to bind to http:</code><code>//localhost</code><code>:5000 on the IPv6 loopback interface: </code><code>'Cannot assign requested address'</code><code>.</code></p><p><code>info: Microsoft.Hosting.Lifetime[0]</code></p><p><code>Now listening on: http:</code><code>//localhost</code><code>:5000</code></p><p><code>info: Microsoft.Hosting.Lifetime[0]</code></p><p><code>Application started. Press Ctrl+C to shut down.</code></p><p><code>info: Microsoft.Hosting.Lifetime[0]</code></p><p><code>Hosting environment: Development</code></p><p><code>info: Microsoft.Hosting.Lifetime[0]</code></p><p><code>Content root path: </code><code>/src</code></p></div></td></tr></tbody></table>

4\. Test the application

Run the `curl` command to test the connection of the web application.

`# curl http://localhost:5000`

![Welcome 1 mywebapp](https://www.docker.com/wp-content/uploads/2022/04/unnamed.png "Welcome 1 Mywebapp - Unnamed")

5\. Put the application in the container

In order to run the same application in a Docker container, let us create a Dockerfile with the following content:

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p></td><td><div><p><code>FROM mcr.microsoft.com/dotnet/sdk as build</code></p><p><code>COPY . ./src</code></p><p><code>WORKDIR /src</code></p><p><code>RUN dotnet build -o /app</code></p><p><code>RUN dotnet publish -o /publish</code></p><p><code>FROM mcr.microsoft.com/dotnet/aspnet as base</code></p><p><code>COPY --from=build&nbsp; /publish /app</code></p><p><code>WORKDIR /app</code></p><p><code>EXPOSE 80</code></p><p><code>CMD ["./myWebApp"]</code></p></div></td></tr></tbody></table>

This is a [Multistage](https://docs.docker.com/develop/develop-images/multistage-build/) Dockerfile. The build stage uses SDK images to build the application and create final artifacts in the publish folder. Then in the final stage copy artifacts from the build stage to the app folder, expose port 80 to incoming requests and specify the command to run the application **myWebApp.**

Now that we have defined everything we need to run in our Dockerfile, we can now build an image using this file. In order to do that, we’ll need to run the following command:

`$ docker build -t mywebapp .`

We can now verify that our image exists on our machine by using docker images command:

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p></td><td><div><p><code>$ docker images</code></p><p><code>REPOSITORY TAG IMAGE ID CREATED SIZE</code></p><p><code>mywebapp latest 6acc7ebf3a1d 25 seconds ago 210MB</code></p></div></td></tr></tbody></table>

In order to run this newly created image, we can use the docker run command and specify the ports that we want to map to and the image we wish to run.

`$ docker run --rm - p 5000:80 mywebapp`

-   `- p 5000:80`– This exposes our application which is running on port 80 within our container on http://localhost:5000 on our local machine.
-   `--rm` – This flag will clean the container after it runs
-   `mywebapp` – This is the name of the image that we want to run in a container.

Now we start the browser and put http://localhost:5000 to address bar

![Welcome mywebapp](https://www.docker.com/wp-content/uploads/2022/04/image5-1110x715.png "Welcome Mywebapp - Image5")

### Update application

The myWebApp and Postgresql will be running in two separate containers, and thus making this a multi-container application.

1.  Add package to allow app talk to database

Change directory to myWebapp and run the following command:  
`dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL`

2\. Create student model

-   Create a Models folder in the project folder
-   Create Models/Student.cs with the following code:

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p></td><td><div><p><code>using</code> <code>System;</code></p><p><code>using</code> <code>System.Collections.Generic;</code></p><p><code>namespace</code> <code>myWebApp.Models</code></p><p><code>{</code></p><p><code>public</code> <code>class</code> <code>Student</code></p><p><code>{</code></p><p><code>public</code> <code>int</code> <code>ID { </code><code>get</code><code>; </code><code>set</code><code>; }</code></p><p><code>public</code> <code>string</code> <code>LastName { </code><code>get</code><code>; </code><code>set</code><code>; }</code></p><p><code>public</code> <code>string</code> <code>FirstMidName { </code><code>get</code><code>; </code><code>set</code><code>; }</code></p><p><code>public</code> <code>DateTime EnrollmentDate { </code><code>get</code><code>; </code><code>set</code><code>; }</code></p><p><code>}</code></p><p><code>}</code></p></div></td></tr></tbody></table>

3\. Create the \`SchoolContext\` with the following code:

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p></td><td><div><p><code>using</code> <code>Microsoft.EntityFrameworkCore;</code></p><p><code>namespace</code> <code>myWebApp.Data</code></p><p><code>{</code></p><p><code>public</code> <code>class</code> <code>SchoolContext : DbContext</code></p><p><code>{</code></p><p><code>public</code> <code>SchoolContext(DbContextOptions&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;SchoolContext&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt; options) : </code><code>base</code><code>(options) { }</code></p><p><code>public</code> <code>DbSet&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;Models.Student&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;? Students { </code><code>get</code><code>; </code><code>set</code><code>; }</code></p><p><code>}</code></p><p><code>}</code></p></div></td></tr></tbody></table>

4\. Register `SchoolContext` to DI in Startup.cs

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p></td><td><div><p><code>using</code> <code>Microsoft.EntityFrameworkCore;</code></p><p><code>using</code> <code>myWebApp.Models;</code></p><p><code>using</code> <code>myWebApp.Data;</code></p><p><code>var</code> <code>builder = WebApplication.CreateBuilder(args);</code></p><p><code>builder.Services.AddDbContext&amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;SchoolContext&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;(options =&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;</code></p><p><code>options.UseNpgsql(builder.Configuration.GetConnectionString(</code><code>"SchoolContext"</code><code>)));</code></p><p><code>builder.Services.AddRazorPages();</code></p></div></td></tr></tbody></table>

5\. Adding database connection string to \`appsettings.json\`

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p></td><td><div><p><code>{</code></p><p><code>"Logging"</code><code>: {</code></p><p><code>"LogLevel"</code><code>: {</code></p><p><code>"Default"</code><code>: </code><code>"Information"</code><code>,</code></p><p><code>"Microsoft"</code><code>: </code><code>"Warning"</code><code>,</code></p><p><code>"Microsoft.Hosting.Lifetime"</code><code>: </code><code>"Information"</code></p><p><code>}</code></p><p><code>},</code></p><p><code>"AllowedHosts"</code><code>: </code><code>"*"</code><code>,</code></p><p><code>"ConnectionStrings"</code><code>: {</code></p><p><code>"SchoolContext"</code><code>:</code></p><p><code>"Host=db;Database=my_db;Username=postgres;Password=example"</code></p><p><code>}</code></p><p><code>}</code></p></div></td></tr></tbody></table>

6\. Bootstrap the table if it does not exist in `Program.cs`

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p><p>31</p><p>32</p><p>33</p><p>34</p><p>35</p><p>36</p><p>37</p><p>38</p><p>39</p><p>40</p><p>41</p><p>42</p><p>43</p><p>44</p><p>45</p><p>46</p></td><td><div><p><code>using</code> <code>Microsoft.EntityFrameworkCore;</code></p><p><code>using</code> <code>myWebApp.Data;</code></p><p><code>var</code> <code>builder = WebApplication.CreateBuilder(args);</code></p><p><code>builder.Services.AddRazorPages();</code></p><p><code>builder.Services.AddDbContext&amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;SchoolContext&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;(options =&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;</code></p><p><code>options.UseNpgsql(builder.Configuration.GetConnectionString(</code><code>"SchoolContext"</code><code>)));</code></p><p><code>var</code> <code>app = builder.Build();</code></p><p><code>using</code> <code>(</code><code>var</code> <code>scope = app.Services.CreateScope())</code></p><p><code>{</code></p><p><code>var</code> <code>services = scope.ServiceProvider;</code></p><p><code>try</code></p><p><code>{</code></p><p><code>System.Threading.Thread.Sleep(10000);</code></p><p><code>var</code> <code>context = services.GetRequiredService&amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;SchoolContext&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;();</code></p><p><code>var</code> <code>created = context.Database.EnsureCreated();</code></p><p><code>}</code></p><p><code>catch</code> <code>(Exception ex)</code></p><p><code>{</code></p><p><code>var</code> <code>logger = services.GetRequiredService&amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;ILogger&amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;Program&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;();</code></p><p><code>logger.LogError(ex, </code><code>"An error occurred creating the DB."</code><code>);</code></p><p><code>}</code></p><p><code>}</code></p><p><code>if</code> <code>(!app.Environment.IsDevelopment())</code></p><p><code>{</code></p><p><code>app.UseExceptionHandler(</code><code>"/Error"</code><code>);</code></p><p><code>}</code></p><p><code>app.UseStaticFiles();</code></p><p><code>app.UseRouting();</code></p><p><code>app.UseAuthorization();</code></p><p><code>app.MapRazorPages();</code></p><p><code>app.Run();</code></p><p><code>&amp;amp;amp;amp;amp;amp;amp;amp;amp;nbsp;</code></p></div></td></tr></tbody></table>

### Update the UI

Add the following to \`Pages/Index.cshtml\`

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p></td><td><div><p><code>&amp;amp;amp;lt;div </code><code>class</code><code>=</code><code>"row mb-auto"</code><code>&amp;amp;amp;gt;</code></p><p><code>&amp;amp;amp;lt;p&amp;amp;amp;gt;Student Name </code><code>is</code> <code>@Model.StudentName&amp;amp;amp;lt;/p&amp;amp;amp;gt;</code></p><p><code>&amp;amp;amp;lt;/div&amp;amp;amp;gt;</code></p></div></td></tr></tbody></table>

and update \`Pages/Index.cshtml.cs\` as shown below:

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p></td><td><div><p><code>public</code> <code>class</code> <code>IndexModel : PageModel</code></p><p><code>{</code></p><p><code>public</code> <code>string</code> <code>StudentName { </code><code>get</code><code>; </code><code>private</code> <code>set</code><code>; } = </code><code>"PageModel in C#"</code><code>;</code></p><p><code>private</code> <code>readonly</code> <code>ILogger&amp;amp;amp;lt;IndexModel&amp;amp;amp;gt; _logger;</code></p><p><code>private</code> <code>readonly</code> <code>myWebApp.Data.SchoolContext _context;</code></p><p><code>public</code> <code>IndexModel(ILogger&amp;amp;amp;lt;IndexModel&amp;amp;amp;gt; logger, myWebApp.Data.SchoolContext context)</code></p><p><code>{</code></p><p><code>_logger = logger;</code></p><p><code>_context= context;</code></p><p><code>}</code></p><p><code>public</code> <code>void</code> <code>OnGet()</code></p><p><code>{</code></p><p><code>var</code> <code>s =_context.Students?.Where(d=&amp;amp;amp;gt;d.ID==1).FirstOrDefault();</code></p><p><code>this</code><code>.StudentName =</code></p><p><code>quot;{s?.FirstMidName} {s?.LastName}";</code></p><p><code>}</code></p><p><code>}</code></p></div></td></tr></tbody></table>

### Configuration file

The entry point to Docker Compose is a Compose file, usually called `docker-compose.yml`

In the project directory, create a new file `docker-compose.yml` in it. Add the following contents:

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p></td><td><div><p><code>services:</code></p><p><code>db:</code></p><p><code>image: postgres</code></p><p><code>restart: always</code></p><p><code>environment:</code></p><p><code>POSTGRES_PASSWORD: example</code></p><p><code>volumes:</code></p><p><code>- postgres-data:/</code><code>var</code><code>/lib/postgresql/data</code></p><p><code>adminer:</code></p><p><code>image: adminer</code></p><p><code>restart: always</code></p><p><code>ports:</code></p><p><code>- 8080:8080</code></p><p><code>app:</code></p><p><code>build:</code></p><p><code>context: .</code></p><p><code>dockerfile: ./Dockerfile</code></p><p><code>ports:</code></p><p><code>- 5000:80</code></p><p><code>depends_on:</code></p><p><code>- db</code></p><p><code>volumes:</code></p><p><code>postgres-data:</code></p></div></td></tr></tbody></table>

In this Compose file:

-   Two services in this Compose are defined by the name `db` and `web` attributes; the adminer service is a helper for us to access db
-   Image name for each service defined using `image` attribute
-   The `postgres` image starts the Postgres server.
-   `environment` attribute defines environment variables to initialize postgres server.
    -   `POSTGRES_PASSWORD` is used to set the default user’s, **postgres,** password. This user will be granted superuser permissions for the database **my\_db** in the connectionstring.
-   app application uses the  `db` service as specified in the connection string
-   The app image is built using the Dockerfile in the project directory
-   Port forwarding is achieved using `ports` attribute.
-   `depends_on` attribute allows to express dependency between services. In this case, Postgres will be started before the app. Application-level health checks are still the user’s responsibility.

### Start the application

All services in the application can be started, in detached mode, by giving the command:

`docker-compose up -d`

An alternate Compose file name can be specified using `-f`option.

An alternate directory where the compose file exists can be specified using `-p` option.

This shows the output as:

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p></td><td><div><p><code>ocker compose up -d</code></p><p><code>[+] Running 4/4</code></p><p><code>⠿ Network mywebapp_default&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.1s</code></p><p><code>⠿ Container mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Started&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.4s</code></p><p><code>⠿ Container mywebapp-adminer-1&nbsp; Started&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.3s</code></p><p><code>⠿ Container mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Started&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.8s</code></p><p><code>0</code></p></div></td></tr></tbody></table>

The output may differ slightly if the images are downloaded as well.

Started services can be verified using the command `docker-compose ps:`

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p></td><td><div><p><code>ocker compose ps</code></p><p><code>NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; COMMAND&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SERVICE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; STATUS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PORTS</code></p><p><code>mywebapp-adminer-1&nbsp;&nbsp; </code><code>"entrypoint.sh docke…"</code>&nbsp;&nbsp; <code>adminer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; running&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.0.0.0:8080-&amp;amp;amp;gt;8080/tcp</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </code><code>"./mywebapp"</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>app&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; running&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.0.0.0:5000-&amp;amp;amp;gt;80/tcp</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </code><code>"docker-entrypoint.s…"</code>&nbsp;&nbsp; <code>db&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; running&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5432/tcp</code></p></div></td></tr></tbody></table>

This provides a consolidated view of all the services, and containers within each of them.

Alternatively, the containers in this application, and any additional containers running on this Docker host can be verified by using the usual `docker container ls` command

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p></td><td><div><p><code>docker container ls</code></p><p><code>CONTAINER ID&nbsp;&nbsp; IMAGE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; COMMAND&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CREATED&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; STATUS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PORTS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NAMES</code></p><p><code>f38fd86eb54f&nbsp;&nbsp; mywebapp_app&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </code><code>"./mywebapp"</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>About a minute ago&nbsp;&nbsp; Up About a minute&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.0.0.0:5000-&amp;amp;amp;gt;80/tcp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mywebapp-app-1</code></p><p><code>7b6b555585b9&nbsp;&nbsp; adminer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </code><code>"entrypoint.sh docke…"</code>&nbsp;&nbsp; <code>About a minute ago&nbsp;&nbsp; Up About a minute&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.0.0.0:8080-&amp;amp;amp;gt;8080/tcp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mywebapp-adminer-1</code></p><p><code>5ea39a742206&nbsp;&nbsp; postgres&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </code><code>"docker-entrypoint.s…"</code>&nbsp;&nbsp; <code>About a minute ago&nbsp;&nbsp; Up About a minute&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5432/tcp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mywebapp-db-1</code></p></div></td></tr></tbody></table>

Service logs can be seen using `docker-compose logs` command, and looks like:

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p></td><td><div><p><code>docker compose logs</code></p><p><code>mywebapp-adminer-1&nbsp; | [Fri Apr 15 12:38:31 2022] PHP 7.4.16 Development Server (http:</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | PostgreSQL Database directory appears to contain a database; Skipping initialization</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 2022-04-15 12:38:32.033 UTC [1] LOG:&nbsp; starting PostgreSQL 13.2 (Debian 13.2-1.pgdg100+1) </code><code>on</code> <code>x86_64-pc-linux-gnu, compiled </code><code>by</code> <code>gcc (Debian 8.3.0-6) 8.3.0, 64-bit</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 2022-04-15 12:38:32.034 UTC [1] LOG:&nbsp; listening </code><code>on</code> <code>IPv4 address </code><code>"0.0.0.0"</code><code>, port 5432</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 2022-04-15 12:38:32.034 UTC [1] LOG:&nbsp; listening </code><code>on</code> <code>IPv6 address </code><code>"::"</code><code>, port 5432</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 2022-04-15 12:38:32.056 UTC [1] LOG:&nbsp; listening </code><code>on</code> <code>Unix socket </code><code>"/var/run/postgresql/.s.PGSQL.5432"</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 2022-04-15 12:38:32.084 UTC [27] LOG:&nbsp; database system was shut down at 2021-11-13 22:52:29 UTC</code></p><p><code>mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 2022-04-15 12:38:32.171 UTC [1] LOG:&nbsp; database system </code><code>is</code> <code>ready to accept connections</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | warn: Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository[60]</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Storing keys </code><code>in</code> <code>a directory </code><code>'/root/.aspnet/DataProtection-Keys'</code> <code>that may not be persisted outside of the container. Protected data will be unavailable when container </code><code>is</code> <code>destroyed.</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | warn: Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager[35]</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No XML encryptor configured. Key {e94371f0-08d1-43a0-b286-255e0005605c} may be persisted to storage </code><code>in</code> <code>unencrypted form.</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | info: Microsoft.Hosting.Lifetime[0]</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Now listening </code><code>on</code><code>: http:</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | info: Microsoft.Hosting.Lifetime[0]</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Application started. Press Ctrl+C to shut down.</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | info: Microsoft.Hosting.Lifetime[0]</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hosting environment: Production</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | info: Microsoft.Hosting.Lifetime[0]</code></p><p><code>mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Content root path: /app</code></p></div></td></tr></tbody></table>

### Verify application

Let’s access the application. In your browser address bar type http://localhost:5000

you will see the page show no student name since the database is empty.

![Student name myweb app](https://www.docker.com/wp-content/uploads/2022/04/image6-1110x661.png "Student Name Myweb App - Image6")

Open a new tab with address http://localhost:8080 and you will be asked to login:

![Adminer login](https://www.docker.com/wp-content/uploads/2022/04/image7-1110x464.png "Adminer Login - Image7")

Use **postgres** and **example** as username/password to login  `my_db`. Once you are logged in, you can create a new student record as shown:

![Creating a student record](https://www.docker.com/wp-content/uploads/2022/04/creating_a_student_record.png "- Creating A Student Record")

Next, refresh the app page at http://localhost:5000, the new added student name will be displayed:

![Awesome james](https://www.docker.com/wp-content/uploads/2022/04/image9-1110x620.png "Awesome James - Image9")

### Shutdown application

Shutdown the application using `docker-compose down:`

<table><tbody><tr><td><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p></td><td><div><p><code>docker compose down</code></p><p><code>[+] Running 4/4</code></p><p><code>⠿ Container mywebapp-app-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Removed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.4s</code></p><p><code>⠿ Container mywebapp-adminer-1&nbsp; Removed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.3s</code></p><p><code>⠿ Container mywebapp-db-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Removed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.4s</code></p><p><code>⠿ Network mywebapp_default&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Removed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.1s</code></p></div></td></tr></tbody></table>

This stops the container in each service and removes all the services. It also deletes any networks that were created as part of this application.

### Conclusion

We demonstrated the containerization of .NET application and the usage of docker compose to construct a two layers simple web application with dotnet. The real world business application can be composed of multiple similar applications, ie. microservice application, that can be described by docker compose file. The same process in the tutorial can be applied to much more complicated applications.

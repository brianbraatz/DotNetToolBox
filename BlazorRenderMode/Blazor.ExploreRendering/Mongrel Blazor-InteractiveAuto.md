---
created: 2024-07-27T07:27:23 (UTC -05:00)
tags: []
source: chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/
author: 
---

# Mongrel Blazor

source: chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/

> ## Excerpt
> This post explains why Blazor's InteractiveAuto and Per Page/Component mode is a rocky road to choose for your first Blazor project.

---
<small>This post explains why Blazor's InteractiveAuto and Per Page/Component mode is a rocky road to choose for your first Blazor project.</small>

There's a honeypot in the Blazor Web App template : _InteractiveAuto_ with Interactivity set for _Per Page/Component_. Almost everyone new to Blazor goes for it. The full works, freedom to choose. The problem is you're unaware of the consequences of that decision. It's not your fault, it's Microsoft's, for putting the honeypot there in the first place, and for not giving it a serious government health warning.

In this post I'll take a look at how this template option works, discuss design and deployment issues and explain what I believe are the only two use cases for choosing this _modus operandi_.

A word on acronyms and terminology. I'll talk about three modes of rendering:

1.  **SSSR** - classic Static Server Side Rendering.
2.  **ASSR** - Active Server Side Rendering. Blazor Server.
3.  **CSR** - Client Side Rendering. Blazor WASM/Web Assembly.

I'll use these throughout the rest of this article.

The Repo for this article is [Blazr.ExploreRendering](https://github.com/ShaunCurtis/Blazor.ExploreRendering).

## Create a Solution

Create a solution using the _Blazor Web Project_ with the _InteractiveAuto_ and _Per Page/Component_ options.

You get two projects:

1.  The Web Server/Interactive Server project.
2.  The Client project containing the Web Assembly project.

Both of these are deployment projects: they create a deployable solution.

### Adding RenderState to the Solution

The _RenderState_ Nuget package provides some simple infrastructure to log and display the render mode of components. See [Blazr.RenderState Repo on GitHub](https://github.com/ShaunCurtis/Blazr.RenderState)

Add the following Nuget packages to the projects:

Web Server :

```
   <span>&lt;</span><span>PackageReference</span> <span>Include</span><span>=</span><span>"</span><span>Blazr.RenderState.Server</span><span>"</span> <span>Version</span><span>=</span><span>"</span><span>0.9.1</span><span>"</span> <span>/&gt;</span>
```

Client :

```
   <span>&lt;</span><span>PackageReference</span> <span>Include</span><span>=</span><span>"</span><span>Blazr.RenderState.WASM</span><span>"</span> <span>Version</span><span>=</span><span>"</span><span>0.9.1</span><span>"</span> <span>/&gt;</span>
```

Add the following services to the Server `Program`:

```
<span>using</span> Blazr.RenderState.Server;
<span>//...</span>
builder.AddBlazrRenderStateServerServices();
```

And the following services to the Client `Program`:

```
<span>using</span> Blazr.RenderState.WASM;
<span>//...</span>
builder.AddBlazrRenderStateWASMServices();
```

And add the following `using` to both project's `_Imports.razor`.

## The Pages/Components

Note most of the components are in the Server project. Only `Counter` is in Client Project.

Add the following component to `Home`, `Counter` and `Weather` below the `Page Title` :

```
@page <span>"/"</span>
&lt;PageTitle&gt;Home&lt;/PageTitle&gt;
&lt;RenderStateViewer Parent=<span>"this"</span> /&gt;
<span>//...</span>
```

Add it to `MainLayout`:

```
    &lt;main&gt;
        &lt;div <span>class</span>=<span>"top-row px-4"</span>&gt;
            &lt;RenderStateViewer Parent=<span>"this"</span> /&gt;
            &lt;a href=<span>"https://learn.microsoft.com/aspnet/core/"</span> target=<span>"_blank"</span>&gt;About&lt;/a&gt;
        &lt;/div&gt;

        &lt;article <span>class</span>=<span>"content px-4"</span>&gt;
            @Body
        &lt;/article&gt;
```

And to `NavMenu` along with some extra navigation links:

```
&lt;div <span>class</span>=<span>"top-row ps-3 navbar navbar-dark"</span>&gt;
    &lt;div <span>class</span>=<span>"container-fluid"</span>&gt;
        &lt;a <span>class</span>=<span>"navbar-brand"</span> href=<span>""</span>&gt;Blazor.ExploreRendering&lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;input type=<span>"checkbox"</span> title=<span>"Navigation menu"</span> <span>class</span>=<span>"navbar-toggler"</span> /&gt;

&lt;div <span>class</span>=<span>"nav-scrollable"</span> onclick=<span>"document.querySelector('.navbar-toggler').click()"</span>&gt;
    &lt;nav <span>class</span>=<span>"flex-column"</span>&gt;
        &lt;div <span>class</span>=<span>"nav-item px-3"</span>&gt;
            &lt;NavLink <span>class</span>=<span>"nav-link"</span> href=<span>""</span> Match=<span>"NavLinkMatch.All"</span>&gt;
                &lt;span <span>class</span>=<span>"bi bi-house-door-fill-nav-menu"</span> aria-hidden=<span>"true"</span>&gt;&lt;/span&gt; Home
            &lt;/NavLink&gt;
        &lt;/div&gt;

        &lt;div <span>class</span>=<span>"nav-item px-3"</span>&gt;
            &lt;NavLink <span>class</span>=<span>"nav-link"</span> href=<span>"counter"</span>&gt;
                &lt;span <span>class</span>=<span>"bi bi-plus-square-fill-nav-menu"</span> aria-hidden=<span>"true"</span>&gt;&lt;/span&gt; Counter
            &lt;/NavLink&gt;
        &lt;/div&gt;

        &lt;div <span>class</span>=<span>"nav-item px-3"</span>&gt;
            &lt;NavLink <span>class</span>=<span>"nav-link"</span> href=<span>"sssr"</span>&gt;
                &lt;span <span>class</span>=<span>"bi bi-plus-square-fill-nav-menu"</span> aria-hidden=<span>"true"</span>&gt;&lt;/span&gt; SSSR
            &lt;/NavLink&gt;
        &lt;/div&gt;

        &lt;div <span>class</span>=<span>"nav-item px-3"</span>&gt;
            &lt;NavLink <span>class</span>=<span>"nav-link"</span> href=<span>"assr"</span>&gt;
                &lt;span <span>class</span>=<span>"bi bi-plus-square-fill-nav-menu"</span> aria-hidden=<span>"true"</span>&gt;&lt;/span&gt; ASSR
            &lt;/NavLink&gt;
        &lt;/div&gt;

        &lt;div <span>class</span>=<span>"nav-item px-3"</span>&gt;
            &lt;NavLink <span>class</span>=<span>"nav-link"</span> href=<span>"csr"</span>&gt;
                &lt;span <span>class</span>=<span>"bi bi-plus-square-fill-nav-menu"</span> aria-hidden=<span>"true"</span>&gt;&lt;/span&gt; CSR
            &lt;/NavLink&gt;
        &lt;/div&gt;

        &lt;div <span>class</span>=<span>"nav-item px-3"</span>&gt;
            &lt;NavLink <span>class</span>=<span>"nav-link"</span> href=<span>"mongrel"</span>&gt;
                &lt;span <span>class</span>=<span>"bi bi-plus-square-fill-nav-menu"</span> aria-hidden=<span>"true"</span>&gt;&lt;/span&gt; Mongrel
            &lt;/NavLink&gt;
        &lt;/div&gt;

        &lt;div <span>class</span>=<span>"nav-item px-3"</span>&gt;
            &lt;NavLink <span>class</span>=<span>"nav-link"</span> href=<span>"weather"</span>&gt;
                &lt;span <span>class</span>=<span>"bi bi-list-nested-nav-menu"</span> aria-hidden=<span>"true"</span>&gt;&lt;/span&gt; Weather
            &lt;/NavLink&gt;
        &lt;/div&gt;
        &lt;RenderStateViewer Parent=<span>"this"</span> /&gt;
    &lt;/nav&gt;
&lt;/div&gt;
```

Create some new pages to the _Server_ project:

_ASSR.razor_

```
@page <span>"/assr"</span>
@rendermode InteractiveServer

&lt;PageTitle&gt;Home&lt;/PageTitle&gt;

&lt;RenderStateViewer Parent=<span>"this"</span> /&gt;

&lt;h1&gt;Hello, world!&lt;/h1&gt;

Welcome to your <span>new</span> app.
```

_SSSR.razor_

```
@page <span>"/sssr"</span>

&lt;PageTitle&gt;Home&lt;/PageTitle&gt;

&lt;RenderStateViewer Parent=<span>"this"</span> /&gt;

&lt;h1&gt;Hello, world!&lt;/h1&gt;

Welcome to your <span>new</span> app.
```

_CSR.razor_

```
@page <span>"/CSR"</span>
@rendermode InteractiveWebAssembly

&lt;PageTitle&gt;CSR&lt;/PageTitle&gt;

&lt;RenderStateViewer Parent=<span>"this"</span> /&gt;

&lt;h1&gt;Hello, world!&lt;/h1&gt;

Welcome to your <span>new</span> app.
```

_Mongrel.razor_

```
@page <span>"/mongrel"</span>

&lt;PageTitle&gt;Home&lt;/PageTitle&gt;

&lt;RenderStateViewer Parent=<span>"this"</span> /&gt;

&lt;RenderStateViewer @rendermode=<span>"InteractiveAuto"</span> Parent=<span>"this"</span> /&gt;

&lt;RenderStateViewer @rendermode=<span>"InteractiveServer"</span> Parent=<span>"this"</span> /&gt;

&lt;RenderStateViewer @rendermode=<span>"InteractiveWebAssembly"</span> Parent=<span>"this"</span> /&gt;

&lt;h1&gt;Hello, world!&lt;/h1&gt;

Welcome to your <span>new</span> app.
```

### Run the Solution

You see this:

![Home Server Rendered](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/assets/Mongrel-Blazor/Home-ServerRendered.png)

`RenderStateViewer` displays three pieces of information:

```text
Parent Compoment Name => Unique ID of the Scoped Session Service => Render Mode of the Component
```

## Behaviours

Switch between components and noting the render modes and the Id's of the Scoped conponent. You will find various combinations that confuse. I'll look at a few and explain.

### Everything is SSSR on the Home Page

Review `App.razor`. The two top level components have no render mode set: default is therefore SSSR. `Routes` is rendered SSSR, so `Router` and `Layout` are also statically rendered.

```
&lt;!DOCTYPE html&gt;
&lt;html lang=<span>"en"</span>&gt;

&lt;head&gt;
<span>//..</span>
    &lt;HeadOutlet /&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;Routes /&gt;
    &lt;script src=<span>"_framework/blazor.web.js"</span>&gt;&lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;
```

### Everything causes a full page refresh

`App`, `Route`, `Router`, `MainLayout` are all SSSR as described above. The router runs on the server so it can make the correct render mode decision.

It's interesting to note that although you make a trip to the server to route between two client side pages, CSR => Counter for example, the client side Blazor session is maintained. The same is the case with the server Hub sessions.

### Different Components have different Scoped Session instances

Go to _Mongrel_ and note the different Service Id's.

-   _Pre-Rendered_ SSSR components all have the same ID. This is the scoped service created for the lifetime of the Http Request. Every page request creates a new _Scoped_ container and _Scoped_ services.
    
-   The SSR service is alive in the Blazor Hub session running on the server. It's lifetime is scoped to the SPA session. All SSSR components share this service instance.
    
-   The CSR service is alive in the Blazor SPA session running in the Web Assembly container on the Browser. It's a different instance from the SSR instance.
    
-   The Auto component has rendered in CSR mode, so has the CST service instance.
    

Consider how this complicates application design. How does a ASSR render component and a CSR component use the same notification service? How do they share data?

SSSR and ASSR share the same _Singleton_ service, but ASSR and CSR have different instances. They are totally separate applications.

Blazor does provide a mechanism for passing pre-render data to active components, but doesn't help much.

### InteractiveAuto Pages don't always render in the same mode

Go to _Home_ and then to _Counter_. _Counter_ renders in CSR mode with the CSR service instance.

Now go to _ASSR_ and then back to _Counter_. It's now rendered in ASSR mode, and uses the Blazor Hub service instance.

Consider saving the state of the counter in a service. You get different states depending on the render mode.

### I can't set the RenderMode on Layouts

`Layouts` would be a great place to set the render mode for a group of pages.

Set the Render mode on the `MainLayout` or `RouteView`.

You will get the following rather confusing runtime exception:

![Render Fragment Exception](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/assets/Mongrel-Blazor/RenderFragment-exception.png)

You either set it at the top in `App` or individually on the pages or lower level components.

But why not?

You can't set the rendermode on a component that defines one or more `RenderFragment` Parameters. _Layouts_ define `Body`. In most cases it's `ChildContent`.

Consider this simple case:

```
\\no render mode <span>set</span> so inherits SSSR

&lt;MyDiv @rendermode=<span>"InteractiveServer"</span>&gt;
    @_helloWorld
&lt;/MyDiv&gt;
@code
{
    <span>private</span> <span>string</span> _helloWorld = <span>"Hello Blazor"</span>;
}
```

`@_helloWorld` is a render fragment owned by the parent and passed to `MyDiv` as the `ChildContent` Parameter. The parent is statically rendered so it tries to serialize the data it sends to the child component. A `RenderFragment` is a `delegate` which can't be serialized, so Bang!

## This isn't a Single Page Application

Blazor was conceived as a Single Page Application, running either in a Server Hub environment or in a Web Assembly environment in the Browser. An intial Http request trip to the server to get the page, a few side trips to get resources. Run some JS and the application is up and running in the browser: no more Http requests.

This hybrid isn't that. The Router runs on the server. Every page request is a Http request to the server. The layout is statically rendered.

Basically a static server rendered application with a JS front end. I hesitate to say this but: What Microsoft have been trying to deliver for it's Asp.Net, Razor, MVC customer base for years!

If you want old Blazor \[seems quite a strange statement to make for a new technology\], choose one of the pure modes with `Global` interactivity.

## More to Come

I'll add some more detail as I discover new wrinkles.

## My Personal Initial Conclusions and Observations

> Note these are personal views and opinions.

My gut feeling is that using **Per Page/Component** mode isn't hybrid, it's a mongrel.

Most who came to old Blazor struggled with the component concept and were confused with the lifecycle and events. Throwing in render modes adds another level of complexity. I can see so many scenarios where components are talking to the wrong instances or types of services. Throw `Auto` to the mix and the complexity spirals \[out of control\]. Think of the exotic concoctions and black holes people will come up!

My recommendation is go with either _Interactive Server_ or _Interactive WebAssembly_ and _Global_ application.

I see only two use cases for the `InteractiveAuto` and `Per page/component` deployment:

1.  You're coming from a classic server side rendered application that has been migrated to Net8.0 and you want a phased migration to Blazor.
    
2.  You want freedom to choose but don't have the knowledge to know how bad that decision will turn out.
    

Hopefully I've disuaded you from choosing the second option. The design will be complex. You will spend a lot of time debugging. You will find yourself in some very deep dark holes.

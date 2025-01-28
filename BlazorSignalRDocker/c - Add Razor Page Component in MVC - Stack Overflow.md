---
created: 2024-07-26T19:22:15 (UTC -05:00)
tags: []
source: https://stackoverflow.com/questions/75494366/add-razor-page-component-in-mvc
author: Adam Shakhabov
        
            1,30422 gold badges1717 silver badges3939 bronze badges
---

# c# - Add Razor Page Component in MVC - Stack Overflow

source: https://stackoverflow.com/questions/75494366/add-razor-page-component-in-mvc

> ## Excerpt
> I've added Razor Page Component to my existing MVC application
Pages/Test.razor
@page "/test"

<h1>Hello World!</h1>

@code {
    
}

Program.cs
var builder = WebApplication.

---
You need to install the `Microsoft.AspNetCore.Components` package and add the `_Host.cshtml`, `App.razor`, `_Imports.razor` files to your MVC project.

\_Imports.razor:

```csharp
@using System.Net.Http @using Microsoft.AspNetCore.Authorization @using Microsoft.AspNetCore.Components.Authorization @using Microsoft.AspNetCore.Components.Forms @using Microsoft.AspNetCore.Components.Routing @using Microsoft.AspNetCore.Components.Web @using Microsoft.AspNetCore.Components.Web.Virtualization @using Microsoft.JSInterop @using Project
```

\_Host.cshtml:

```csharp
@page "/" @namespace Project.Pages @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers @{ Layout = "_Layout"; } <component type="typeof(App)" render-mode="ServerPrerendered" />
```

App.razor:

```csharp
@using Microsoft.AspNetCore.Components.Routing <Router AppAssembly="@typeof(App).Assembly"> <Found Context="routeData"> <RouteView RouteData="@routeData" /> <FocusOnNavigate RouteData="@routeData" Selector="h1" /> </Found> <NotFound> <PageTitle>Not found</PageTitle> <LayoutView> <p role="alert">Sorry, there's nothing at this address.</p> </LayoutView> </NotFound> </Router>
```

Your Endpoints:

```csharp
app.UseEndpoints(endpoints => { endpoints.MapControllerRoute( name: "default", pattern: "{controller=Home}/{action=Index}/{id?}"); endpoints.MapRazorPages(); endpoints.MapBlazorHub(); endpoints.MapFallbackToPage("/_Host"); });
```

Test Result:

[![enter image description here](https://i.sstatic.net/rlLR6.png)](https://i.sstatic.net/rlLR6.png)

If you want to use the UI in Blazor, you can also copy `MainLayout.razor` from a Blazor App and use it in `App.razor` like this:

```csharp
//... <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" /> //... <LayoutView Layout="@typeof(MainLayout)"> //...
```

Note that if you do this, your default page will be a Razor Component with `@page "/"` defined instead of `Index.cshtml`.

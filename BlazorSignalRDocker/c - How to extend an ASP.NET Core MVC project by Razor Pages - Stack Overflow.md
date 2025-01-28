---
created: 2024-07-26T19:21:21 (UTC -05:00)
tags: []
source: https://stackoverflow.com/questions/62863196/how-to-extend-an-asp-net-core-mvc-project-by-razor-pages
author: Tim Meyer
        
            12.5k88 gold badges6666 silver badges9999 bronze badges
---

# c# - How to extend an ASP.NET Core MVC project by Razor Pages? - Stack Overflow

source: https://stackoverflow.com/questions/62863196/how-to-extend-an-asp-net-core-mvc-project-by-razor-pages

> ## Excerpt
> I'm currently trying to extend an existing ASP.NET Core MVC project by a Razor page (since several tutorial videos claim that MVC, API, Razor and Blazor can coexist in the same project - but none o...

---
I'm currently trying to extend an existing ASP.NET Core MVC project by a Razor page (since several tutorial videos claim that MVC, API, Razor and Blazor can coexist in the same project - but none of them shows how it's done).

I already figured out I need to extend Startup.cs by

```csharp
services.AddRazorPages();
```

and

```csharp
app.UseEndpoints(endpoints => { // This was here already endpoints.MapControllerRoute( name: "default", pattern: "{controller=Home}/{action=Index}/{id?}"); // I added this endpoints.MapRazorPages(); });
```

I tried simply adding a razor page "Test" to the `Views` folder, extending the `_Layout.cshtml` by

```csharp
<li class="nav-item"> <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Test">Test</a> </li>
```

then extending `HomeController` by

```csharp
public IActionResult Test() { return View(); }
```

However, this causes several issues with breakpoints not being hit, or the `ViewData` dictionary being `null` (with the identical code working in a pure Razor Page project), probably since it tries treating the Razor Page as an MVC view or something.

I've also tried adding something like

```csharp
<li class="nav-item"> <a class="nav-link text-dark" asp-area="" asp-page="/Home/Test">Test</a> </li>
```

to the layout instead, but this produces an URL like

```csharp
https://localhost:5001/?page=%2FHome%2FTest
```

when clicking the navbar item.

I can perfectly have both things in separate VS projects, but isn't there a way to use both of them in a single VS project and a single layout?

If you want to try it out before answering, use the following steps:

1.  Create a new project/solution in Visual Studio 2019
2.  Select "ASP.NET Core Web Application" as project template
3.  Click "Create" and select "Web Application (Model-View-Controller)" as template with default settings
4.  Add Razor Support in Startup.cs
5.  Try to make a simple razor page working in this project

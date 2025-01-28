---
created: 2024-07-26T11:06:44 (UTC -05:00)
tags: []
source: https://www.codementor.io/@qaisermughal/add-blazor-into-existing-asp-net-core-project-1w8bk3vzi9
author: Qaiser Mehmood
---

# Add blazor to existing asp.net core project | Codementor

source: https://www.codementor.io/@qaisermughal/add-blazor-into-existing-asp-net-core-project-1w8bk3vzi9

> ## Excerpt
> Add blazor ui and components into any existing asp.net core or mvc project. Its very simple to use and enjoy rich layout with c# code mixed with html.

---
[

![Codementor Events](https://lite-cdn.codementor.io/static/images/Article/cme-explore-events-banner.png)

](https://www.codementor.io/events?ref=cmty)

<small>Published Aug 14, 2022</small><small>Last updated Sep 09, 2022</small>

![Add blazor to existing asp.net core project](https://ucarecdn.com/8ac889f0-919b-481d-9d89-39e3fc654651/-/resize/1050/)

If you want to add server-side Blazor to your existing ASP.NET Core application, its simple and easy. C# code lovers will enjoy working in mixed mode with html/c# code in single/multiple pages. Its compelety fun to add blazor into existing views with other html components. I will guide you in this article step by step how to integrate it and reuse components anywhere in application.

## Pre-requisites.

.NET Core 3.1  
Visual Studio 2019 16.3+

## Add follow configuration lines into sections.

1.  ConfigureServices
    
    ```
    services.AddServerSideBlazor(o =&gt; o.DetailedErrors = true);
    ```
    

![s1.png](https://ucarecdn.com/0dcc78e3-c579-407d-9df2-11e007971505/)

2.  app.UseEndpoints(endpoints =>
    
    ```
    endpoints.MapBlazorHub();
    ```
    

![s2.png](https://ucarecdn.com/1dfb5b38-2345-4648-8cad-132d406de9f4/)

3.  In Layout page before body tag closed add js file reference
    
    ```
    &lt;script src="_framework/blazor.server.js"&gt;&lt;/script&gt;
    ```
    

![s3.png](https://ucarecdn.com/3e3b6bea-1a81-4b56-a4a4-4aa12993ab7f/)

**We are all set now to include existing or new blazor components.**

![s5.png](https://ucarecdn.com/ea3e212a-2d30-423c-aafa-35e802020730/) ![s4.png](https://ucarecdn.com/ea4f0c0a-c4f1-4565-8ccc-3f7f8afca8a3/)

```
@using Microsoft.AspNetCore.Components.Web
&lt;h1&gt;Counter&lt;/h1&gt;

&lt;p&gt;Current count: @currentCount&lt;/p&gt;

&lt;button class="btn btn-primary" @onclick="IncrementCount"&gt;Click me&lt;/button&gt;

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```

**Now lets put component into any view and add reference into div**

![s6.png](https://ucarecdn.com/a2d9f260-4655-483b-a4a8-c55159b6ee1e/)

```
  @page
  @using WebApplication2.Pages.Component
  @model IndexModel
  @{
      ViewData["Title"] = "Home page";
  }

  &lt;div class="text-center"&gt;
      &lt;h1 class="display-4"&gt;Welcome&lt;/h1&gt;
      &lt;p&gt;Learn about &lt;a href="https://docs.microsoft.com/aspnet/core"&gt;building Web apps with ASP.NET Core&lt;/a&gt;.&lt;/p&gt;
  &lt;/div&gt;

  &lt;div class="text-center"&gt;
      @(await Html.RenderComponentAsync&lt;CountComponent&gt;(RenderMode.Server))
  &lt;/div&gt;
```

**So two main lines of code for magic anywhere in views.**

```
  @using WebApplication2.Pages.Component
  @(await Html.RenderComponentAsync&lt;CountComponent&gt;(RenderMode.Server))
```

**Here you will see the component out.**

![s8.png](https://ucarecdn.com/6ded3977-ec37-4107-a385-fa275327f9c4/)

That's all you need to do, enjoy blazor ui.

Regards  
Qaiser Mehmood Mughal

Enjoy this post? Give **Qaiser Mehmood** a like if it's helpful.

[![post comments](https://lite-cdn.codementor.io/static/images/Community/icon-comment.png)](https://www.codementor.io/@qaisermughal/add-blazor-into-existing-asp-net-core-project-1w8bk3vzi9#comments-1w8bk3vzi9)

[![Qaiser Mehmood](https://ucarecdn.com/f6ad1c9e-44fb-4c69-9e00-9370902d08b6/-/crop/3024x2473/0,0/-/preview/-/resize/120/)](https://www.codementor.io/@qaisermughal)

Full-stack . NET Core Developer | C# | Blazor | React.js | JavaScript

I am a highly-skilled senior software engineer with 17 years of experience in C# .Net standard & core frameworks. I can analyze, design, develop and manage small to large-scale applications. I do testing with xunit, bunit, moq, nu...

![Qaiser Mehmood](https://ucarecdn.com/f6ad1c9e-44fb-4c69-9e00-9370902d08b6/-/crop/3024x2473/0,0/-/preview/-/resize/120/)

Discover and read more posts from **Qaiser Mehmood**

[![post comments](https://lite-cdn.codementor.io/static/images/Community/icon-comment.png)](https://www.codementor.io/@qaisermughal/add-blazor-into-existing-asp-net-core-project-1w8bk3vzi9#comments-1w8bk3vzi9)

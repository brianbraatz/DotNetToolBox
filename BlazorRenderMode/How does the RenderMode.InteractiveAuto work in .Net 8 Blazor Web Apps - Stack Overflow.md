---
created: 2024-07-27T07:26:46 (UTC -05:00)
tags: []
source: https://stackoverflow.com/questions/77752664/how-does-the-rendermode-interactiveauto-work-in-net-8-blazor-web-apps
author: yanis-abc
        
            5177 bronze badges
---

# How does the RenderMode.InteractiveAuto work in .Net 8 Blazor Web Apps? - Stack Overflow

source: https://stackoverflow.com/questions/77752664/how-does-the-rendermode-interactiveauto-work-in-net-8-blazor-web-apps

> ## Excerpt
> I'm trying to understand the render mode "RenderMode.InteractiveAuto".
Everything works until I visit a page with the render mode "RenderMode.InteractiveServer", after that all my

---
I'm trying to understand the render mode "RenderMode.InteractiveAuto". Everything works until I visit a page with the render mode "RenderMode.InteractiveServer", after that all my pages stay in render mode server.

I added this code : `OperatingSystem.IsBrowser() ? "WASM":"SERVEUR"` for display in which mode my page is render.

For example with the sample project "Blazor Web App", I duplicate the counter but I set the render mode to : @rendermode InteractiveServer [My Visual Studio files explorer](https://i.sstatic.net/Sg7LP.png)

There is the code of Counter.razor :

```
@page "/counter"
@rendermode InteractiveAuto

&lt;PageTitle&gt;Counter&lt;/PageTitle&gt;

&lt;h1&gt;Counter&lt;/h1&gt;

&lt;p role="status"&gt;Current count: @currentCount&lt;/p&gt;

&lt;button class="btn btn-primary" @onclick="IncrementCount"&gt;Click me&lt;/button&gt;

&lt;p&gt;@(OperatingSystem.IsBrowser() ? "WASM" : "SRV")&lt;/p&gt;

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```

There is the code of CounterServeur.razor :

```
@page "/counterSRV"
@rendermode InteractiveServer

&lt;PageTitle&gt;Counter&lt;/PageTitle&gt;

&lt;h1&gt;Counter&lt;/h1&gt;

&lt;p role="status"&gt;Current count: @currentCount&lt;/p&gt;

&lt;button class="btn btn-primary" @onclick="IncrementCount"&gt;Click me&lt;/button&gt;

&lt;p&gt;@(OperatingSystem.IsBrowser() ? "WASM" : "SRV")&lt;/p&gt;

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```

When I launch the application and then I go to Counter.razor (with NavMenu), my page is in WASM mode (it's ok) : [Screenshot of the result](https://i.sstatic.net/KSEIN.png)

After that I go to CounterServeur.razor (with NavMenu), my page is in SERVER mode (it's ok) : [Screenshot of the result](https://i.sstatic.net/ZXxRm.png)

And then when I go back to Counter.razor (with NavMenu), my page is in SERVER mode and not in WASM mode : [Screenshot of the result](https://i.sstatic.net/9J6iI.png)

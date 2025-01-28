---
created: 2024-07-26T19:22:38 (UTC -05:00)
tags: []
source: https://stackoverflow.com/questions/76319385/adding-a-default-razor-page-index-to-a-net-core-api-project
author: iaacp
        
            4,7851212 gold badges3535 silver badges3939 bronze badges
---

# c# - Adding a default Razor page/index to a .Net Core API project - Stack Overflow

source: https://stackoverflow.com/questions/76319385/adding-a-default-razor-page-index-to-a-net-core-api-project

> ## Excerpt
> I'd like to add a default page/index page that is Razor (cshtml) to my .NET Core 6 project.
I've created the wwwroot directory inside my project, and added a Razor page named index.cshtml inside of...

---
I'd like to add a default page/index page that is Razor (cshtml) to my .NET Core 6 project. I've created the `wwwroot` directory inside my project, and added a Razor page named `index.cshtml` inside of it. In it, I've added some HTML and added `@page "/"` to signify that it should be the root.

Because it is an API project, in my launchSettings.json file, I've commented out the `launchurl` so that it is no longer pointing to swagger:

[![enter image description here](https://i.sstatic.net/rPBA2.png)](https://i.sstatic.net/rPBA2.png)

In my Program.cs, I've tried both including and excluding the following code (I think it should be excluded since cshtml is not a static file):

```csharp
app.UseStaticFiles( new StaticFileOptions() { FileProvider = new PhysicalFileProvider( Path.Combine( Directory.GetCurrentDirectory(), @"wwwroot" ) ) } );
```

However, the end result is the same - when I run my API locally, my browser opens to a blank page. Is there something I've missed? I tried adding a static page (index.html) and it _did_ work, but I need the functionality of a Razor page. What am I missing?

---
created: 2024-07-26T11:02:06 (UTC -05:00)
tags: []
source: https://www.telerik.com/blogs/integrate-blazor-webassembly-existing-aspnet-core-web-application
author: Carey Payette
---

# How to Integrate Blazor WASM into Existing ASP.NET Core App

source: https://www.telerik.com/blogs/integrate-blazor-webassembly-existing-aspnet-core-web-application

> ## Excerpt
> See how to integrate a Blazor WebAssembly project into an existing ASP.NET Core web application, using C# code files and Razor syntax to implement your web UI.

---
See how to integrate a Blazor WebAssembly project into an existing ASP.NET Core web application, using familiar C# code files and Razor syntax to implement your web UI.

When you think of developing a user interface for the interactive web, your thoughts may immediately turn to JavaScript. Consequently, for many C# developers, this would mean learning the ins and outs of an entirely new programming language.

However, this doesn’t have to be the case! [Blazor WASM (aka Blazor WebAssembly)](https://learn.microsoft.com/aspnet/core/blazor/hosting-models?view=aspnetcore-7.0#blazor-webassembly) allows developers to implement web user interfaces using familiar C# code files and Razor syntax. These source files are then compiled into byte code for download to run atop the WebAssembly runtime in the client browser, yielding improved runtime performance due to the compilation.

![A block diagram displays indicating Razor components written in .NET are compiled down to byte code and run on the WebAssembly runtime which in turn interacts with the DOM of the web page.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/blazorwebassemblyblockdiagram.png?sfvrsn=edc96ada_3 "Blazor WebAssembly block diagram")  
[Image source](https://learn.microsoft.com/en-us/aspnet/core/blazor/hosting-models?view=aspnetcore-7.0#blazor-webassembly)

Blazor WebAssembly is a prevalent solution for single-page web applications (or SPAs) that adheres to the typical n-layer pattern of web application development. In the n-layer design, the user interface is implemented separately from the business logic and data access, with the latter two typically deployed as an API service.

Getting started with Blazor WASM in new greenfield projects is simplified as Visual Studio includes templates for Blazor WebAssembly projects, but what happens when you want to integrate Blazor WASM with an existing ASP.NET Core web application? How do we slowly migrate and modernize existing web applications to harness the power of Blazor WASM?

In this article, you will learn how to integrate a Blazor WebAssembly project into an existing ASP.NET Core web application. Furthermore, you’ll learn how to incorporate Progress [Telerik UI for Blazor](https://www.telerik.com/blazor-ui), which provides ready-to-use components for building compelling web user interface experiences with Blazor WebAssembly.

## Step 1. Set up the Web Application and Blazor WASM Projects

In this demonstration, we’ll create two projects. The first project is an ASP.NET Core Web Application representing our existing web application. The second project is a Blazor WebAssembly project where we’ll build new Blazor components to integrate into our existing web application.

1.  Open **Visual Studio 2022** and choose to `Create a new project`.

![The Visual Studio 2022 dialog displays with the option to Create a new project highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/vs2022_createnewproject.png?sfvrsn=e086d6f1_3 "Create new project")

2.  On the **Create a new project** dialog, search for and select `ASP.NET Core Web App`. Press **Next**.

![The Create a new project dialog displays with ASP.NET Core Web App entered in the search bar and selected from the list of results. The Next button is selected.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/vs2022_newprojectdialog.png?sfvrsn=de7c98f1_3 "Create new ASP.NET Core Web App project")

3.  On the **Configure your new project** dialog, name the project `Existing.Web`, optionally choose the file system location and press **Next**.

![The Configure your new project dialog displays with the project name set to Existing.Web and the next button is selected.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/configureprojectdialog.png?sfvrsn=b9a121c7_3 "Configure the project name and file location")

4.  On the **Additional information** dialog, select **.NET 7.0 (Standard Term Support)** for the **Framework** then press **Create**.

![The Additional information dialog displays with .NET 7.0 selected as the framework and the Create button is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/additionalinformationdialog.png?sfvrsn=ec42ce4_3 "Setting Framework version")

> **Note**: The guidance in this article will also work with .NET 6.0 projects. .NET 5 is out of support, so it is recommended to upgrade existing applications to at least .NET 6.0 first.

5.  In the **Solution Explorer** panel, right-click the solution and expand the **Add** menu. Select **New Project**.

![The context menu of the solution displays with the Add menu item expanded and the New Project item selected.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/solutionexploreraddnewproject.png?sfvrsn=4c4f72fb_3 "Add new project to the solution")

6.  In the **Add new project** dialog, search for `Blazor WebAssembly` and select **Blazor WebAssembly App** from the search results. Press **Next**.

![The Add a new project dialog displays with Blazor WebAssembly entered in the search box. The Blazor WebAssembly App item is selected from the search results and the Next button is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/newprojectwebassembly.png?sfvrsn=a4dc50c4_3 "Create new Blazor WebAssembly App project")

7.  In the **Configure your new project** dialog, name the project `BlazorApp` and press **Next**.

![The Configure your new project dialog displays with BlazorApp entered for the project name. The Next button is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/configureblazorproject.png?sfvrsn=5ba4a05e_3 "Configure Blazor WebAssembly app")

8.  On the **Additional information** dialog, select **.NET 7.0 (Standard Term Support)** for the **Framework** then press **Create**.

![The Additional information dialog displays with .NET 7.0 selected as the framework and the Create button is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/additionalinformationblazor.png?sfvrsn=13571ccb_3 "Setting Framework version")

> **Note**: The guidance in this article will also work with .NET 6.0 projects. .NET 5 is out of support, so it is recommended to upgrade existing applications to at least .NET 6.0 first.

## Step 2. Prepare the Blazor WebAssembly Application

The Blazor WebAssembly App template generates a single-page application (SPA). Therefore, when the Blazor application runs, it looks for an HTML element with the ID of `app` to contain and display the running application. This functionality needs to be disabled as, in this case, we want the existing web application to provide the overall user experience while allowing us to incorporate Blazor components developed in the Blazor WASM project.

1.  In the **Solution Explorer** panel, locate the **BlazorApp** project and open the **Program.cs** file.
    
2.  In the **Program.cs** file, comment out the following line of code and save the file:
    

![Visual Studio 2022 displays with the BlazorApp project expanded and the Program.cs code file selected. In the code editor window the line of code mentioned above is commented out.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/commentoutappblazor.png?sfvrsn=7e883dff_3 "Comment out the aforementioned line of code")

## Step 3. Prepare the Existing Web Application Project

In order for the existing ASP.NET Core web application to make use of the Blazor Web Assembly components, we will need a project reference, NuGet package and some infrastructure code.

1.  In the **Solution Explorer** panel, locate the **Existing.Web** project then right-click and expand the **Add** item. Select **Project Reference**.

![The context menu for the Existing.Web project displays with the Add item expanded and the Project reference item selected.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/addprojectreference.png?sfvrsn=a68698d6_3 "Add Project Reference")

2.  In the **Reference Manager** dialog, check the box next to **BlazorApp** and press **OK**.

![The Reference Manager dialog displays with a checked box next to BlazorApp and the OK button is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/referencemanagerdialog.png?sfvrsn=28186d9d_3 "Add project reference to the BlazorApp project")

3.  Right-click the **Existing.Web** project once more and select **Manage NuGet Packages**.

![The Solution Explorer panel displays with the context menu expanded and the Manage NuGet Packages item highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/existingwebmanagenugetpackagesmenu.png?sfvrsn=44b2459a_3 "Manage NuGet Packages for Existing.Web")

4.  On the **NuGet** screen, select the **Browse** tab and enter `Microsoft.AspNetCore.Components.WebAssembly.Server` into the search box. Select **Microsoft.AspNetCore.Components.WebAssembly.Server** from the search results and press **Install**. Accept any Licenses.

[![The NuGet screen displays with the Browse tab selected and Microsoft.AspNetCore.Components.WebAssembly.Server entered in the search box. The Microsoft.AspNetCore.Components.WebAssembly.Server item is selected from the search results and the Install button is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/addwebassemblyserverpackage.png?sfvrsn=4e277393_3 "Install the Microsoft.AspNetCore.Components.WebAssembly.Server NuGet Package")](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/addwebassemblyserverpackage.png?sfvrsn=4e277393_3)

5.  In the **Solution Explorer** panel, locate the **Existing.Web** project and open the **Program.cs** file.

![The Solution Explorer panel displays with the Existing.Web project expanded and the Program.cs file selected.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/existingwebprogramcssolutionexplorer.png?sfvrsn=80b1bcf7_3 "Open Program.cs from the Existing.Web project")

6.  Add an **else** condition to the **if (!app.Environment.IsDevelopment())** code block with the following code:

![A portion of the Program.cs window displays with the code mentioned above highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/usewebassemblydebugging.png?sfvrsn=a0f30091_3 "Add WebAssembly debugging")

7.  Directly below the **if (!app.Environment.IsDevelopment())** code block, add the following code and save the file:

![A portion of the Program.cs window displays with the code mentioned above highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/addblazorfiles.png?sfvrsn=129965b9_3 "Add Blazor Framework files and fall back")

1.  In the **Existing.Web** project, expand the **Pages** folder. Expand the **Shared** folder, locate and open the **\_Layout.cshtml** file.

![The Solution Explorer panel displays with the Existing.Web project expanded along with the Pages and Shared folders. The _Layout.cshtml file is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/existingwebsolutionexplorerlayout.png?sfvrsn=e9e7bb47_3 "Open _Layout.cshtml")

8.  Locate the script references close to the bottom of the page. Add the following script reference, and save the file:

![A portion of the code window for _Layout.cshtml displays with the aforementioned code highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/addwebassemblyscript.png?sfvrsn=80e027d_3 "Adding the Blazor WebAssembly JavaScript file")

> **Note**: Adding the script to **\_Layout.cs** will allow you to add Blazor components to any view. Alternatively, you can choose to only include the script on each specific view that Blazor components are needed.

## Step 4. Add a Blazor Component to a View in the Existing Web Application

The Blazor WebAssembly App project comes with a **Counter** component scaffolded. We’ll now add this component to a view in our existing ASP.NET Core Web Application (Existing.Web).

1.  In **Solution Explorer**, locate the **Existing.Web** project and expand the **Pages** folder. Open the **Index.cshtml** file. This is the default view that displays when the Existing.Web application is run.

![The Solution Explorer panel displays with the Existing.Web project expanded along with the Pages folder. The Index.cshtml file is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/openindexviewexistingweb.png?sfvrsn=9a844542_3 "Open Index.cshtml from the Existing.Web project")

2.  Directly beneath the **@page** annotation, add the following using statement to give us access to the **Counter** component:

![A portion of the code window for Index.cshtml displays with the above code highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/indexusingexistingweb.png?sfvrsn=a813981d_3 "The using statement is added to the code")

3.  Beneath the **div** element, add the following code to include the **Counter** component in the view:

![A portion of the code window for Index.cshtml displays with the above markup highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/addcountermarkup.png?sfvrsn=70b08024_3 "The counter component markup is added")

## Step 5. Run the Existing Web Application

Run the existing web application project and notice how you can interact with the **Counter** component from the Blazor WebAssembly project.

1.  In **Solution Explorer**, right-click the **Existing.Web** project and select the **Set as Startup Project** item.

![The Solution Explorer displays with the context menu expanded on the Existing.Web project. The Set as Startup Project item is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/setstartupproject.png?sfvrsn=e0f5b621_3 "Set Startup Project")

2.  Right-click the **Existing.Web** project once more and expand the **Debug** item. Select **Start Without Debugging**. This will run the existing web application project.

![The context menu of the Existing.Web project displays with the Debug item expanded and the Start Without Debugging option selected.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/startwithoutdebugging.png?sfvrsn=33d70c65_3 "Start Existing.Web without Debugging")

> **Note**: Alternatively, since we set the startup project you can also start an instance (with or without debugging) from the toolbar menu.

3.  In the browser window, press the Counter component’s **Click me** button multiple times and notice how the counter increases.

![The Counter component displays within the existing web application. The Click me button is selected and the counter total is highlighted.](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/counterclickui.png?sfvrsn=9c114a17_3 "Counter component is hosted in the existing web application")

## Step 6. Incorporate Telerik UI for Blazor

Now that we’ve successfully used a Blazor WebAssembly component in our existing ASP.NET Core Web Application, we can take advantage of the components provided by Progress Telerik UI for Blazor. This component library is compatible with both Blazor WebAssembly and Blazor Server projects.

1.  Follow the guidance to [add Telerik UI for Blazor in the **BlazorApp** project](https://docs.telerik.com/blazor-ui/getting-started/client-blazor), **follow Steps 2 through 4**.

> **Note**: The **Server** project in our case is the **Existing.Web** project, and we’ve already added the **app.UseStaticFiles()** code, so this step can be skipped (Step 4, item #2 in the article linked).

2.  Now we’ll add a Telerik UI for Blazor component to the existing **Counter** component. In the **BlazorApp** project, locate and open the **Pages/Counter.razor** file.

3.  Replace the code in the file with the following and save the file:

4.  Run the application once more, and press the **Say Hello** button to use the TelerikButton component!

![The Counter widget is displayed with the Telerik button component. The message displays Hello from Telerik Blazor with a timestamp and Now you can use C# to write front-end!](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-02/telerikbutton.png?sfvrsn=1d4edc7a_3 "Telerik button displays in the Counter component")

## Conclusion

In this article, we integrated Blazor components into an existing ASP.NET Core web application. This opens up a less disruptive migration path for moving existing projects to Blazor WebAssembly.

## Try Telerik UI for Blazor

Develop new Blazor apps and modernize legacy web projects in half the time with a high-performing Grid and 100+ truly native, easy-to-customize Blazor components to cover any requirement. Try it for free with our 30-day trial and enjoy our industry-leading support.

[Try Now](https://www.telerik.com/try/ui-for-blazor)

Feel free to share your feedback or questions in the comments section below. Your input makes a difference.

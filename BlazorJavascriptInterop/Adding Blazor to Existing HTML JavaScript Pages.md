---
created: 2024-07-26T11:05:49 (UTC -05:00)
tags: [blazor,javascript]
source: https://visualstudiomagazine.com/Articles/2018/10/01/adding-blazor.aspx
author: By Peter Vogel11/02/2018
---

# Adding Blazor to Existing HTML+JavaScript Pages -- Visual Studio Magazine

source: https://visualstudiomagazine.com/Articles/2018/10/01/adding-blazor.aspx

> ## Excerpt
> Not only can you integrate JavaScript with Blazor, that integration provides a strategy for moving your existing pages to Blazor without having to rewrite your existing JavaScript code.

---
[The Practical Client](https://visualstudiomagazine.com/Articles/List/Practical-JavaScript.aspx)

### Adding Blazor to Existing HTML+JavaScript Pages

![](https://visualstudiomagazine.com/Articles/2018/10/01/~/media/ECG/VirtualizationReview/Images/introimages2014/GEN1ArrowLightsRight.ashx)

If you're thinking about Blazor at all, you have to be wondering if it's possible to integrate Blazor into existing pages. The current state of Blazor suggests that it's possible to integrate JavaScript and Blazor to either move a site incrementally to Blazor or even incrementally move individual pages from JavaScript to Blazor. This allows you to not only add new functionality to a page in Blazor but also to selectively replace functionality created in JavaScript with C# code where it makes sense (or even to create common Blazor code and share it among pages).

I say "suggest" because Blazor is an 'experimental' technology and all its releases are marked as alpha -- much that's possible now may turn out to be impossible in a final, production-ready, reliable version of the technology.

You can create a Blazor application right now in Visual Studio 2017 (version 15.8 or later with .Net Core 2.1 2.1 v2.1.403 installed) using Blazor Language Services 0.6.0.

With Visual Studio's default Blazor projects, when you run a Blazor project you initially open an HTML page (index.html) which loads Blazor and then transfers control to a Blazor page (index.cshtml). You can have JavaScript code in the .html file you went through on the way to the .cshtml file but not in the .cshtml file that is sent to the user. However, the JavaScript in the .html has access to the HTML elements defined in the .cshtml page. The primary restriction on that JavaScript code is that it should not change the structure of the page's HTML by adding or removing elements -- that interferes with Blazor's representation of the page.

**Initializing HTML and Blazor**  
This means that your first step in moving an existing HTML+JavaScript page to Blazor begins with putting your page's HTML in a .cshtml file while leaving your JavaScript in the related .html file.

Following this plan, an .html file might consist of some combination of the basic HTML skeleton elements (the html and body elements), script elements to load any required JavaScript files, a script tag that loads Blazor, and the JavaScript from the original page.

A typical .html file that references jQuery and opens a script element might look like this:

```
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;BlazorAndJS2&lt;/title&gt;
    &lt;base href="/" /&gt;
    &lt;script src="https://code.jquery.com/jquery-3.3.1.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;script src="_framework/blazor.webassembly.js"&gt;&lt;/script&gt;
    &lt;script&gt;
      ...the page's JavaScript functions...
```

In a typical HTML+JavaScript page, processing begins with jQuery's ready function, which calls functions that initialize the page. To create a Blazor-enabled version of the page (and to make as few changes as possible) all you need to do is wrap that method in another function and call that function from your Blazor code.

Following that plan, the start of the script block in the .file page might look like the following code. As an example, I've included sample code that wires up a JavaScript function to the click event of an HTML button, now defined in the .cshtml file:

```
function InitPage() 
{
  $(function () 
  {
    $("#mybutton").click(function () 
    {
      ...code to execute on a button click...
    });
  });
}
```

In the .cshtml file, probably the best place to call that JavaScript code is from Blazor's OnAfterRenderAsync method, which is automatically invoked when Blazor has finished rendering the page. Below is a simple .cshmtl page with just the HTML for the button referenced from my JavaScript code. Following the HTML is an OnAfterRenderSysnc method that calls my JavaScript InitPage function (I've covered the JSRuntime's InvokeAsync method in more detail in an [earlier column](https://visualstudiomagazine.com/articles/2018/08/01/integrating-blazor-javascript.aspx)):

```
@page "/"

&lt;input type="button" id="mybutton" value="click me" /&gt;

protected async override Task OnAfterRenderAsync()
{
  base.OnAfterRender();
  await JSRuntime.Current.InvokeAsync&lt;object&gt;("InitPage");
}
```

Your existing JavaScript code should now, probably, interact with your HTML as before (I did mention that Blazor is "experimental" technology in alpha release, right?). More importantly, you're now positioned to either extend this page or replace its existing JavaScript code with C# code. Either approach is probably going to require more integration between existing JavaScript and C# than what I've outlined here ... and, perhaps, a more architectural approach to structuring your Blazor code. I'll cover the architectural approach to handling that problem in my next column.

  

About the Author

Peter Vogel is a system architect and principal in PH&V Information Services. PH&V provides full-stack consulting from UX design through object modeling to database design. Peter tweets about his VSM columns with the hashtag #vogelarticles. His blog posts on user experience design can be found at [http://blog.learningtree.com/tag/ui/](http://blog.learningtree.com/tag/ui/).

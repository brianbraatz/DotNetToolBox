---
created: 2024-07-26T11:02:40 (UTC -05:00)
tags: []
source: chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/
author: 
---

# Add JavaScript to Blazor in Blazor WebAssembly .NET 6 - Blazor School

source: chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/

> ## Excerpt
> Tutorial on how to add JS to Blazor

---
[](https://github.com/Blazor-School/blazor-school-docs/edit/master/contents/blazor-wasm/dotnet6/add-javascript-to-blazor-412635/index.html "Suggest Edits")

Before you can interact with a JavaScript library, you need to add it to Blazor first. In this tutorial, you will discover:

-   JavaScript module and standard JavaScript.
-   Global standard JavaScript.
-   Load JavaScript module on demand.

> You can [download the example](https://github.com/Blazor-School/javascript-interaction-blazor-wasm-dotnet6) code used in this topic on GitHub.

___

## JavaScript module and standard JavaScript

There are 2 types of JavaScript: module and standard. You will need to determine what is your JavaScript library type before using it. We assume that you understand what is JavaScript module and standard JavaScript, we will give you a quick catch-up to distinguish between the two. A JavaScript module is a file of classes/functions declared with `export` keyword. A standard JavaScript is a file of classes/functions declared without the `export` keyword. For example:

A JavaScript module:

```
<span>export</span> <span>function</span> <span>exampleFunction</span>(<span></span>)
{
    <span>alert</span>(<span>"Hello Blazor School"</span>)
}
```

A standard JavaScript:

```
<span>function</span> <span>exampleFunction</span>(<span></span>)
{
    <span>alert</span>(<span>"Hello Blazor School"</span>)
}
```

A JavaScript module can contain one or more `export` declaration. The following code is also a JavaScript module:

```
<span>export</span> <span>function</span> <span>exampleFunction1</span>(<span></span>)
{
    <span>alert</span>(<span>"Hello Blazor School"</span>)
}

<span>export</span> <span>function</span> <span>exampleFunction2</span>(<span></span>)
{
    <span>alert</span>(<span>"Hello Blazor School"</span>)
}
```

___

## Global standard JavaScript

This technique will let you use a standard JavaScript function everywhere in your website. To implement this technique, you need to load your standard JavaScript with `<script>` tag. There are 2 places that you can put your `<script>` tag: inside `<head>` tag and inside `<body>` tag.

### Advantages

-   Easy to implement.
-   Can apply to some specific libraries.

### Disadvantages

-   Pollute the naming pool.
-   Make first render slower.

### Import in `<head>`

Import in `<head>` tag will block the render thread until every script in the `<head>` are fetched. It will make your website slow down on the first render. Most of the time, you don't need to put scripts in the `<head>` tag.

### Import in `<body>`

Import in `<body>` tag is a good way. By doing this, you will not block the render thread and allow the `<script>` tags to be fetched asynchronously.

### Implementation

1.  Put your standard JavaScript file in **wwwroot**.
2.  In your **wwwroot/index.html**, add the `<script>` tag to import the standard JavaScript.

For example: assuming you have the `wwwroot/js/global.js`. Your **index.html** will look like:

```
...
<span>&lt;!DOCTYPE <span>html</span>&gt;</span>
<span>&lt;<span>html</span> <span>lang</span>=<span>"en"</span>&gt;</span>
<span>&lt;<span>head</span>&gt;</span>
...
<span>&lt;/<span>head</span>&gt;</span>
<span>&lt;<span>body</span>&gt;</span>
...
    <span>&lt;<span>script</span> <span>src</span>=<span>"~/js/global.js"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
    <span>&lt;<span>script</span> <span>src</span>=<span>"_framework/blazor.webassembly.js"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span>
<span>&lt;/<span>body</span>&gt;</span>
<span>&lt;/<span>html</span>&gt;</span>
```

> You cannot make a JavaScript module as global.

> You must put your script under **wwwroot** folder.

___

## Load JavaScript module on demand

This technique will let you load a JavaScript module only when you need it. Each JavaScript module has it own scope. This means you can have 2 functions with the same name in different modules. There are 2 places to put your JavaScript module: **wwwroot** and collocate with a component.

### Advantages

-   Don't pollute the naming pool.
-   Make first render faster.
-   Can apply to some specific libraries.

### Disadvantage

-   Have to write more code.

### Module in **wwwroot**

You will need to put your module file under the **wwwroot** folder. There is no side effect for this approach.

### Collocate with a component

You will need to name your module as **<ComponentName>.razor.js**. When done correctly, you will see your JavaScript module and Razor component nested like this (File nesting must be turned on):

![collocate-js-module.png](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/contents/blazor-wasm/dotnet6/add-javascript-to-blazor-412635/collocate-js-module.png)

### Implementation

1.  In your component, inject the `IJSRuntime` and implement the `IAsyncDisposable` interface in the directive section.

```
<span>@inject</span><span> IJSRuntime JS</span>
<span>@</span><span id="code-lang-csharp">implements</span> IAsyncDisposable
```

2.  Declare a `Lazy<IJSObjectReference>` or each of your module in the code section. For example:

```
<span>@code {</span><span id="code-lang-csharp">
    <span>private</span> Lazy</span><span>&lt;<span>IJSObjectReference</span>&gt;</span><span id="code-lang-csharp"> ExampleModule = <span>new</span>();
</span><span>}</span>
```

3.  In the code section, initialize the `Lazy<IJSObjectReference>` and dispose it after use. For example:

![external-module-folder-tree.png](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/contents/blazor-wasm/dotnet6/add-javascript-to-blazor-412635/external-module-folder-tree.png)

```
<span>@code {</span><span id="code-lang-csharp">
    ...
    <span><span>protected</span> <span>override</span> <span>async</span> Task <span>OnAfterRenderAsync</span>(<span><span>bool</span> firstRender</span>)</span>
    {
        <span>if</span> (firstRender)
        {
            ExampleModule = <span>new</span>(<span>await</span> JS.InvokeAsync&lt;IJSObjectReference&gt;(<span>"import"</span>, <span>"./js/exampleModule.js"</span>));
        }
    }

    <span><span>public</span> <span>async</span> ValueTask <span>DisposeAsync</span>()</span>
    {
        <span>if</span>(ExampleModule.IsValueCreated)
        {
            <span>await</span> ExampleModule.Value.DisposeAsync();
        }
    }
</span><span>}</span>
```

For collocated JavaScript module, you need to change the path to JavaScript module. For example, you have the following folder tree:

![collocate-js-module-folder-tree.png](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/contents/blazor-wasm/dotnet6/add-javascript-to-blazor-412635/collocate-js-module-folder-tree.png)

Then you need to change the path to JavaScript module as follows:

```
CollocateJsModule = <span>new</span>(<span>await</span> JS.InvokeAsync&lt;IJSObjectReference&gt;(<span>"import"</span>, <span>"./Pages/LoadOnDemand/CollocateJS.razor.js"</span>));
```

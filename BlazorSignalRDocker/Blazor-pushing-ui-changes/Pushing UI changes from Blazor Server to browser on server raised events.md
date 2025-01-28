---
created: 2024-07-24T15:19:37 (UTC -05:00)
tags: []
source: https://swimburger.net/blog/dotnet/pushing-ui-changes-from-blazor-server-to-browser-on-server-raised-events
author: Niels Swimberghe
---

# Pushing UI changes from Blazor Server to browser on server raised events

source: https://swimburger.net/blog/dotnet/pushing-ui-changes-from-blazor-server-to-browser-on-server-raised-events

> ## Excerpt
> Blazor Server is built on SignalR, and SignalR is built on websockets among other techniques. The combination of these technologies allow Blazor Server to push UI changes into the client without the client requesting those changes.

---
A typical interaction between a web browser and a web server consists of a series of HTTP requests and responses. As opposed to HTTP, a websocket will open a persistent bi-directional connection where multiple messages can be sent back and forth. This also means the server can send messages to the client at any time. **Blazor Server is built on SignalR, and SignalR is built on websockets** among other techniques. The combination of these technologies allow **Blazor Server to push UI changes into the client without the client requesting those changes**.

Client side events such as button clicks are send to the Blazor Server, the server changes its state, and re-renders. Though, in some applications there are also events that are are raised elsewhere. In this article, those types of events will be referred to as 'server raised events'. Server raised events could be triggered by

-   invocation of Web API's or webhooks
-   a different user interacting with your server
-   Queues and Event Buses
-   Query Notifications in SQL Server to notify the application of data changes
-   listening to data changes in real-time database such as Firestore ([see walkthrough](https://www.twilio.com/blog/building-real-time-applications-with-blazor-server-and-firestore))

When these events cause the state to change, **Blazor Server will not automatically re-render the components**. Two problems need to be resolve for the components to update:

1.  Blazor Server needs to be notified of the state changes. You can resolve this by calling `StateHasChanged()`.
2.  The code responding to the event may **not be on the same thread as the renderer**.  
    Calling `StateHasChanged()` may be ignored or throw an exception when done off the renderer's thread. Instead, you can pass an action to `InvokeAsync` which will invoke the action on the right thread and within the renderer's synchronization context.

When you call `StateHasChanged()` in the action passed to `InvokeAsync`, Blazor Server will successfully re-render the components and push the changes to the browser using SignalR.  
To simulate server raised events, you can use a `Timer` that will invoke code on an interval.

## Server raised events sample [#](https://swimburger.net/blog/dotnet/pushing-ui-changes-from-blazor-server-to-browser-on-server-raised-events#server-raised-events-sample)

You can find the sample code on this [GitHub Repository](https://github.com/Swimburger/BlazorServerEvents).

Prerequisites:

-   .NET Core 3.1 or higher ([download here](https://dotnet.microsoft.com/download/dotnet-core/3.1))

Follow these steps to simulate server raised events in Blazor Server:

1.  Create a new Blazor Server application by running these commands:  
    
    ```
    mkdir <span>BlazorServerSample</span>
    cd <span>BlazorServerSample</span>
    dotnet <span>new</span> <span>blazorserver</span>
    ```
    
2.  Update the component `Pages\Counter.razor` to match the code below:  
    
    ```
    @page <span>"</span><span>/counter</span><span>"</span>
    @implements IDisposable
    @<span>using</span> System<span>.</span>Timers
    
    <span>&lt;</span>h1<span>&gt;</span>Counter<span>&lt;</span><span>/</span>h1<span>&gt;</span>
    
    <span>&lt;</span>p<span>&gt;</span>Current count<span>:</span> @currentCount<span>&lt;</span><span>/</span>p<span>&gt;</span>
    
    <span>&lt;</span>button <span>class</span><span>=</span><span>"</span><span>btn btn-primary</span><span>"</span> @onclick<span>=</span><span>"</span><span>IncrementCount</span><span>"</span><span>&gt;</span>Click me<span>&lt;</span><span>/</span>button<span>&gt;</span>
    
    @code <span>{</span>
        <span>private</span> <span>int</span> currentCount <span>=</span> <span>0</span><span>;</span>
    
        <span>private</span> <span>void</span> IncrementCount<span>(</span><span>)</span>
        <span>{</span>
            currentCount<span>+</span><span>+</span><span>;</span>
            Console<span>.</span>WriteLine<span>(</span>$<span>"</span><span>Count incremented: {currentCount}</span><span>"</span><span>)</span><span>;</span>
        <span>}</span>
    
        <span>private</span> Timer timer<span>;</span>
    
        <span>protected</span> <span>override</span> <span>void</span> OnAfterRender<span>(</span><span>bool</span> firstRender<span>)</span>
        <span>{</span>
            <span>if</span> <span>(</span>firstRender<span>)</span>
            <span>{</span>
                timer <span>=</span> <span>new</span> Timer<span>(</span><span>)</span><span>;</span>
                timer<span>.</span>Interval <span>=</span> <span>1000</span><span>;</span>
                timer<span>.</span>Elapsed <span>+</span><span>=</span> OnTimerInterval<span>;</span>
                timer<span>.</span>AutoReset <span>=</span> <span>true</span><span>;</span>
                <span>// Start the timer</span>
                timer<span>.</span>Enabled <span>=</span> <span>true</span><span>;</span>
            <span>}</span>
            <span>base</span><span>.</span>OnAfterRender<span>(</span>firstRender<span>)</span><span>;</span>
        <span>}</span>
    
        <span>private</span> <span>void</span> OnTimerInterval<span>(</span><span>object</span> sender<span>,</span> ElapsedEventArgs e<span>)</span>
        <span>{</span>
            IncrementCount<span>(</span><span>)</span><span>;</span>
        <span>}</span>
        
        <span>public</span> <span>void</span> Dispose<span>(</span><span>)</span>
        <span>{</span>
            <span>// During prerender, this component is rendered without calling OnAfterRender and then immediately disposed</span>
            <span>// this mean timer will be null so we have to check for null or use the Null-conditional operator ? </span>
            timer?<span>.</span>Dispose<span>(</span><span>)</span><span>;</span>
        <span>}</span>
    <span>}</span>
    ```
    
    Counter.razor will now configure a timer with an interval of 1000ms aka 1s. This will call `IncrementCount()` every second for as long as you are viewing the counter-page.  
    When navigating to another page, `Dispose` will be called and the timer resource will be cleaned up stopping the interval.
    
3.  Run the application by running the command: `dotnet run`
4.  Open a browser and navigate to the Blazor Server Application, usually at `https://localhost:5001`
5.  Navigate to the counter-page and observe the changes

![Screenshot of Blazor Server Counter page](https://swimburger.net/media/10zhz2ce/counter.png)

Unfortunately, the "Current count" does not change every second even though you programmed it to do so. You can confirm the interval is working as expected by looking at the console output, but the `currentCount` state change is not reflected in the browser. This is what the output looks like:

```
dotnet <span>run</span>
<span># output:</span>
<span>#   info: Microsoft.Hosting.Lifetime[0]</span>
<span>#         Now listening on: </span><span>https://localhost:5001</span>
<span>#   info: Microsoft.Hosting.Lifetime[0]</span>
<span>#         Now listening on: </span><span>http://localhost:5000</span>
<span>#   info: Microsoft.Hosting.Lifetime[0]</span>
<span>#         Application started. Press Ctrl+C to shut down.</span>
<span>#   info: Microsoft.Hosting.Lifetime[0]</span>
<span>#         Hosting environment: Development</span>
<span>#   info: Microsoft.Hosting.Lifetime[0]</span>
<span>#         Content root path: C:\Users\niels\source\repos\BlazorServerEvents</span>
<span>#   Count incremented: 1</span>
<span>#   Count incremented: 2</span>
<span>#   Count incremented: 3</span>
<span>#   Count incremented: 4</span>
<span>#   Count incremented: 5</span>
<span>#   Count incremented: 6</span>
<span>#   Count incremented: 7</span>
<span>#   Count incremented: 8</span>
```

Click the "Click me" button and suddenly the number shown in the browser reflects the `currentCount` on the server.

When client events are send to Blazor Server, you don't have to worry about which thread you are on and you don't need to explicitly notify Blazor of the state change. All that happens automatically.  
When you click the "Click me" button, `IncrementCount` is invoked and will increment the `currentCount` field which is also incremented by the timer. This results in Blazor re-rendering the component with the latest `currentCount` state.

To make sure that the state is in sync on both client and server, add `InvokeAsync(() => StateHasChanged());` to the timer interval callback. Update the function `OnTimerInterval` as below:

```
<span>private</span> <span>void</span> OnTimerInterval<span>(</span><span>object</span> sender<span>,</span> ElapsedEventArgs e<span>)</span>
<span>{</span>
    IncrementCount<span>(</span><span>)</span><span>;</span>
    InvokeAsync<span>(</span><span>(</span><span>)</span> <span>=</span><span>&gt;</span> StateHasChanged<span>(</span><span>)</span><span>)</span><span>;</span>
<span>}</span>
```

When you re-run the application again, the number in the browser will be incremented every second!

## Events raised outside of the Blazor Component [#](https://swimburger.net/blog/dotnet/pushing-ui-changes-from-blazor-server-to-browser-on-server-raised-events#events-raised-outside-of-the-blazor-component)

The timer illustrates how to handle server raised events that are being raised from within the Blazor Component class, but other events may be raised outside of the component. In that case, how would you send the event data to the active components? There are multiple ways to solve this problem, here are two suggestions:

-   If the event is raised within the same .NET Core server instance (not load balanced), you could use a library like '[Blazor.EventAggregator](https://github.com/mikoskinen/Blazor.EventAggregator)' which allows you to publish/subscribe to events. Using this library, you can publish an event from a webhook and subscribe to an event inside your Blazor component.
-   In a load balanced environment or when your webhook is hosted separately, you could use one of many event/pub/sub systems (like [Redis](https://redis.io/topics/pubsub)) which allows you to submit an event from one server and have it delivered to multiple servers.

## Summary [#](https://swimburger.net/blog/dotnet/pushing-ui-changes-from-blazor-server-to-browser-on-server-raised-events#summary)

Websockets are bi-directional persistent connections over which multiple messages can be send. Websockets enable servers to push messages to the client at any time. Blazor Server is built on SignalR, which is built on websockets. Due to the bi-directional persistent connection, **Blazor Server can push UI changes to the browser without the browser requesting those changes**. Instead the changes to the UI can be triggered by server raised events. To ensure that the state and UI change are pushed to the client, you have to invoke `InvokeAsync(() => StateHasChanged());`.

This counter example may be anti-climatic, but imagine using a real-time database instead of a timer. Your Blazor Server UI can re-render in real-time!

Check out this walkthrough "[Building Real-Time Applications with Blazor Server and Firestore](https://www.twilio.com/blog/building-real-time-applications-with-blazor-server-and-firestore)".

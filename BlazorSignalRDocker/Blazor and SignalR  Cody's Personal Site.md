---
created: 2024-07-27T08:41:20 (UTC -05:00)
tags: []
source: chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/
author: A Engineer with a passion for Platform Architecture and Tool Development.
---

# Blazor and SignalR | Cody's Personal Site

source: chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/

> ## Excerpt
> In this Article I go over how to connect out to a SignalR Server from Blazor Wasm, sneak peak its the same as the C# SignalR client.

---
In this Article I go over how to connect out to a SignalR Server from Blazor Wasm, sneak peak its the same as the C# SignalR client.

## What is SignalR

> ASP.NET Core SignalR is an open-source library that simplifies adding real-time web functionality to apps. Real-time web functionality enables server-side code to push content to clients instantly. - [SignalR Introduction](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-5.0)

This abstracts away all the complicated logic you would have to create your self to support real-time communication between all your connected users. SignalR does not just give you real-time communication, it also take care of choosing the best transport layer available to the client, has Authentication/Authorization built in, supports streaming data from the server, built in logging and diagnostics. SignalR comes is two parts, a server which hosts the connection points and logic, and a client which connects to the server to trigger logic and cross client communication.

## What is ASP.NET Core Blazor

> Blazor is a framework for building interactive client-side web UI with .NET - [ASP.NET Core Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/?view=aspnetcore-5.0)

Blazor is built on top of Components, so having experience with other component based frameworks, like ReactJS or VueJS, should make the transition to Blazor easier. The components model also makes it easy to reuse rendering logic across your application, and with its use of the Razor markup reusing already acquired knowledge from prior ASP.NET building practices will make the transition to Blazor easy as well. In my personal opinion, Razor and Blazor feel more close to native HTML/JavaScript development than even the other Component based frameworks, since what you write in your HTML markup layer looks very similar to HTML you would write, with most of the Blazor functionality layered in with already existing attributes. The biggest gotcha in Blazor I would say is how to handle Forms, which can be different from what is normally done, we will touch on forms a little in this article.

## What are we doing

Here we will go over creating an application that takes care of CRUD operations on a user profile record, but using SignalR to keep all connected browser clients in sync and up-to-date on what the others are working on. Source snippets will be show in this article, and a fully functioning application on GitHub can be found on [canhorn/EventHorizon.Blazor.UserManagement](https://github.com/canhorn/EventHorizon.Blazor.UserManagement "A fully functioning example project using SignalR and Blazor to create a Real-Time Application.") .

The `ManagementComponentBase` below is a nice abstraction that the pages from the project inherit from to help with the setup of the connection to the SignalR Hub `UserManagementHub`, which is also below.

**ManagementComponentBase**

**UserManagementHub**

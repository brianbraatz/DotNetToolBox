---
created: 2024-07-24T15:36:44 (UTC -05:00)
tags: []
source: https://github.com/conficient/BlazorChatSample/
author: conficient
---

# GitHub - conficient/BlazorChatSample: A sample Blazor chat application using SignalR

source: https://github.com/conficient/BlazorChatSample/

> ## Excerpt
> A sample Blazor chat application using SignalR. Contribute to conficient/BlazorChatSample development by creating an account on GitHub.

---
## Blazor Chat Sample

[![Build Status](https://camo.githubusercontent.com/74cef1f250ebcc9c8d23a3d7c23db594afd2497db1a1368d69beb84ddb2ded0f/68747470733a2f2f6465762e617a7572652e636f6d2f636f6e66696369656e742f426c617a6f724368617453616d706c652f5f617069732f6275696c642f7374617475732f636f6e66696369656e742e426c617a6f724368617453616d706c653f6272616e63684e616d653d6d6173746572)](https://dev.azure.com/conficient/BlazorChatSample/_build/latest?definitionId=2&branchName=master)

> Now upgraded for [.NET 5 RTM](https://devblogs.microsoft.com/aspnet/announcing-asp-net-core-in-net-5/) - Please ensure you have the .NET 5 SDK loaded and VS 2019 v16.8 or later. One change since the release candidates is that the scoped CSS is now `AppName.styles.css` in place of the `_framework/scoped.styles.css`

This application demonstrates the use of [SignalR](https://www.asp.net/signalr) to create a [Blazor](https://blazor.net/) chat application.

### Now JavaScript-Free!

The app now uses the `Microsoft.AspNetCore.SignalR.Client` library which is now compatible with the Mono WASM runtime. This really simplifies the `ChatClient` code.

Previously this sample used JavaScript SignalR client. If you want to see how the JavaScript client version worked, I've retained it in [this branch](https://github.com/conficient/BlazorChatSample/tree/netcore-3.2.0-preview1)

## .NET 6

Upgraded the demo to .NET 6.

## Demo

A demo application is available at [https://blazorchatsample.azurewebsites.net](https://blazorchatsample.azurewebsites.net/)

### Improvements & Suggestions

If you have any improvements or suggestions please submit as issues/pull requests on the Github repo.

### Acknowledgements

Thanks to Code-Boxx for the article [https://code-boxx.com/responsive-css-speech-bubbles/](https://code-boxx.com/responsive-css-speech-bubbles/) that helped me create simple CSS speech bubbles that improve the layout.

---
created: 2024-07-24T15:26:38 (UTC -05:00)
tags: 
source: https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample
author: "---\rcreated: 2024-07-24T15:27:13 (UTC -05:00)\rtags: []\rsource: https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample\rauthor: khalidabuhakmeh\r---\r\r# GitHub - khalidabuhakmeh/Blazor-Weather-App-Sample: Example of a Blazor app calling a Weather API for forecasts\r\rsource: https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample\r\r> ## Excerpt\r> Example of a Blazor app calling a Weather API for forecasts - khalidabuhakmeh/Blazor-Weather-App-Sample\r\r---\rExample of a Blazor app calling a Weather API for forecasts"
---

# GitHub - khalidabuhakmeh/Blazor-Weather-App-Sample: Example of a Blazor app calling a Weather API for forecasts

source: https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample

> ## Excerpt
> Example of a Blazor app calling a Weather API for forecasts - khalidabuhakmeh/Blazor-Weather-App-Sample

---
Example of a Blazor app calling a Weather API for forecasts

## Weather Search

[](https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample#weather-search)

[![screenshot of blazor weather app](https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample/raw/main/screenshot.png)](https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample/blob/main/screenshot.png)

I wrote this Blazor application to learn more about the framework. This example uses [WeatherAPI](https://www.weatherapi.com/) and an alpha NuGet package. **If you want to use this in some production capacity, I suggest you build your own API wrapper, since the NuGet package is out of date with the current API.**

## Getting Started

[](https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample#getting-started)

1. Go to [WeatherAPI](https://www.weatherapi.com/) and sign up for a **Free** account. You'll need the API Key.
2. Change the `Weather:ApiKey` setting in `appsettings.json` (or use user secrets).
3. Run the application

## Notable Blazor Features & Techniques

[](https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample#notable-blazor-features--techniques)

1. Use of `EditForm`, a wrapper around an HTML form with convenience extensions.
2. `DataAnnotationsValidator` component to trigger validation.
3. Validation model using `DataAnnotations`
4. Using `CancellationTokenSource` to timeout web request that's taking too long.

## Suggestions

[](https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample#suggestions)

In the WeatherAPI account page, you may want to uncheck `Astro` response fields if you intend to use the `WeatherAPI` NuGet package along with the most recent API. There is a mismatch which causes a deserialization error.

## Thanks

[](https://github.com/khalidabuhakmeh/Blazor-Weather-App-Sample#thanks)

Be sure to follow me on Twitter ([@buhakmeh](https://twitter.com/buhakmeh)) and feel free to ask any questions.

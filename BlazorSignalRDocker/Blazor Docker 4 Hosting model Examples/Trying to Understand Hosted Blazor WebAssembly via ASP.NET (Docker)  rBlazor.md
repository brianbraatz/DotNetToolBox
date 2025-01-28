---
created: 2024-07-24T16:22:47 (UTC -05:00)
tags: []
source: https://www.reddit.com/r/Blazor/comments/rec4z7/trying_to_understand_hosted_blazor_webassembly/
author: seawolf1896
---

# Trying to Understand Hosted Blazor WebAssembly via ASP.NET (Docker) : r/Blazor

source: https://www.reddit.com/r/Blazor/comments/rec4z7/trying_to_understand_hosted_blazor_webassembly/

Trying to Understand Hosted Blazor WebAssembly via ASP.NET (Docker)
I understand in general the difference between the major Blazor hosting models: Blazor Server and Blazor WebAssembly.

However, having determined Blazor WebAssembly is a good fit for my project, I am now looking into the different ways to "Dockerize" a Blazor Wasm application, which involves understanding the different approaches to hosting a WebAssembly app.

I came across these templates which demonstrate Docker-Compose files for 4 different hosting models: https://github.com/jongio/BlazorDocker

I am trying to understand two things:

In the Hosted Wasm Approach, how does the Server project actually serve the WebAssembly client? I don't see where this logic is specified anywhere. I have no experience with using an ASP.NET Core backend to serve static files, but doesn't the Client need to be published and the static files stored somewhere accessible to the Server in order for this model to work? I am grinding gears trying to figure out how this template accomplishes this, thank you to anyone who can provide clarification on this.

What is the advantage of the Client-Server-Wasm approach over the Hosted-Wasm approach? Where the Web API is hosted in one container and the WebAssembly client is served in a separate environment via Nginx, vs the frontend being served from the same server that hosts the backend. The only advantage I can think of here would be for a situation where the Web API is meant to serve other clients in addition to the Web Assembly client. Are there any other benefits or is that the general motivation for doing something like that?

Thanks for the clarification, please let me know if I need to be more specific. I have been tracking down all kinds of resources on Blazor and much of what I have found has been very helpful, particularly in regards to things like dependency-injection and local-object-stores, etc. So my thanks as well to those who have contributed to the Blazor knowledge-base thus far.

Edit: Right now I am just working on configuring Docker-Compose for my development environment, but obviously it would be ideal to have this inform the production environment down the road


Upvote
3

Downvote

6
comments


Share
Share
u/CyberCoachUS avatar
u/CyberCoachUS
•
Promoted

Easily launch a complete role-based security awareness program (including AI security, and Secure Development Training for Developers) to meet ISO27001, GDPR, HIPAA, PCI DSS and various other compliance requirements.

Sign Up
Get started free. Directly in Teams and Slack.
Clickable image which will reveal the video player: Easily launch a complete role-based security awareness program (including AI security, and Secure Development Training for Developers) to meet ISO27001, GDPR, HIPAA, PCI DSS and various other compliance requirements.
Collapse video player
Add a comment
Sort by:

Best

Search Comments
Expand comment search
u/RedditorLvcisAeterna avatar
RedditorLvcisAeterna
•
1y ago
Hello, did you ever get Docker to work with WASM ASP.NET hosted project?



Upvote
2

Downvote
Reply
reply

Award

Share
Share

u/seawolf1896 avatar
seawolf1896
OP
•
1y ago
I made a very slim prototype with Blazor, then moved to AvaloniaUI, now moving away from .NET over to Kotlin MP for practical reasons. I archived the project on Gitlab but dm me your Gitlab username or email address and I'll see if I can add you to an archived project (or just unarchive it).

I can't remember how far I got, I'm pretty sure I did get this working. Sorry I can't give you a more technical answer.



Upvote
1

Downvote
Reply
reply

Award

Share
Share

u/RedditorLvcisAeterna avatar
RedditorLvcisAeterna
•
1y ago
It's okay, thanks for the answer. I actually got it working.

For those stumbling upon this thread later: The reason it didn't work was because Docker runs the published project, which means it looks at appSettings.Production.json

For me this file was empty, and in my default appSettings.json I had no certificate for my Identity server I used for user management. I fixed it by temporarily making a self-signed certificate and referencing this in appSettings.Production.json.

This fixed my problem.


Upvote
2

Downvote
Reply
reply

Award

Share
Share

Amazing-Counter9410
•
3y ago
Blazor wasm without asp .net hosted model is just a front end application run on client browser, just like other javascript framework like react or Angular.

With asp .net hosted Model, you will have a server project to become your backend server which receive api request from your Client project which will be downloaded to client browser. The advantage of this option is you will have the full support of a standard web api application with identity server working out of the box when you create a new project(login, log out, register, forgot password, reset passwork, and even more secure since you are using the standard way of Microsoft, hashing user password in your database) all of this is created when you create a new project with asp .net hosted.

Without asp .net hosted, you will need to find a 3rd party security like oauth and have to work more on the identity part of the apllication. And since you dont have your api server, you will need to find one and deal with cors and token to authorize your api.

Personally, I usually work with blazor wasm with asp .net hosted because it easy to get started and very secure since I'm using Microsoft Identity server. I don't have to care about docker to host my blazor because i usually host it in Azure App Service which works very well ans easy. about database, you can use a 3rd party cloud database, I used Postgres SQL on Heroku which cost me $50/month, I never need to care about database configuration again.

If you plan to use asp .net hosted, I suggest you to follow this video: https://youtu.be/Czh9cGLVRNA

He will shows you to host it on Azure App Service.

If you plan to host it out site of Azure App Service, I'm afaid that you will have to spent A LOT of time dealing a lot of docker to finish your configuration, believe me, you will not feel well when doing it, I tried using docker to host it on amazon but failed several times :)



Upvote
1

Downvote
Reply
reply

Award

Share
Share

u/seawolf1896 avatar
seawolf1896
OP
•
3y ago
Thank you for the detailed reply. In the hosted-scenario, will the WebAssembly client continue to function when the app is offline, after it has been served to the browser via the ASP.NET backend? In otherwords, the Progressive Web App model is still applicable to hosted Blazor Wasm apps, correct? Thank you.

The goal in my case would be store data locally using IndexedDB and then have a service worker sync this data to a remote database via the ASP.NET Web API at some regular interval when the app is online



Upvote
1

Downvote
Reply
reply

Award

Share
Share

Amazing-Counter9410
•
3y ago
Blazor wasm when downloaded to Client browser will be able to run offline and you can use Local Storage to store data. PWA or Progressive Application just to make your app run natively which will allow user to download and use it as a Desktop or Mobile app but using browser engine. Therefore, you dont need PWA to make your Blazor wasm run locally. PWA just a fancy tool to allow your user to download it, It's good to have but not necessary.

I'm not familiar with Indexeddb so I cant give you advise on it.

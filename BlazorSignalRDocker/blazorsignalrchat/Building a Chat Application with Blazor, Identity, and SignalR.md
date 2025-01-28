In this Guide, we will be building a full-fledged Chat Application With Blazor WebAssembly using Identity and SignalR from scratch. When I got started with building a Chat Component for [BlazorHero](https://codewithmukesh.com/blog/blazor-hero-quick-start-guide/), I was not able to find many resources online that covered this specific requirement to the fullest. All I could get was simple applications that just demonstrated the basic usage of SignalR in Blazor, which were not pretty looking as well.

So, I am compiling this guide to cover each and everything you would need to know while building Realtime Chat Applications with Blazor that is linked to Microsoft Identity as well. This enables us to have a one-on-one chat with the registered users in our system. You can find the [entire source code of the application here](https://github.com/iammukeshm/BlazorChat).

I would also make sure that the application that we are about to build looks clean and professional. To help me with this, I will be using MudBlazor Component Library for Blazor.

Here is the list of features and topics we will be covering in this implementation:

-   Blazor WebAssembly 5.0 with ASP.NET Core Hosted Model.
-   MudBlazor Integrations - Super cool UI.
-   SignalR Integrations - Realtime Messaging.
-   Cascade Parameters.
-   Chat with Registered Users.
-   Chats get stored to Database via EFCore.
-   Notification Popup for new messages.
-   Notification Tone for new messages.

PRO TIP : As this guide covers everything from the database point to building a Clean UI with Blazor , the content is quite vast as well. I would recommend you to bookmark this page so that you can refer whenever needed. Grab your favorite drink as well ;)

## Setting up the Blazor WebAssembly Project

As mentioned earlier, let’s start off by creating a new Blazor WebAssembly App Project in [Visual Studio](https://codewithmukesh.com/blog/install-visual-studio-2019-community/) 2019. Make sure you have the latest SDK of .NET installed.

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image.BNDJ9tvu_Z1ttgPJ.webp "realtime-chat-application-with-blazor")

I am naming the application BlazorChat for obvious reasons :P

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-1.ojZ2T5Ie_ZPcrik.webp "realtime-chat-application-with-blazor")

**Make sure that you choose Individual Accounts for the Authentication Type so that Visual Studio can scaffold the code required for Login / Registration and Profile Management.** I took this approach, so as to keep this implementation simple since our prime focus is building the Chat Application with Blazor.

Also, ensure that you have checked the ASP.NET Core Hosted Checkbox, as SignalR will need a Server Model. We will be dealing with the HttpClient also in this implementation to fetch and save chat records to our Local Database.

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/devenv_ewbpQqiFYy.DCaiGcli_1px0l6.webp "realtime-chat-application-with-blazor")

Once Visual Studio has created your new shiny Blazor Application, the first thing to always do is to update all the existing packages. For this, open up the Package Manager Console and run the following command.

## Integrating Mudblazor Components

Now, let’s add some Material Design to our application. MudBlazor is one of the Libraries that has come the closest to offer Material UI feel to Blazor Applications. I have used this awesome component Library in BlazorHero as well.

Let’s setup MudBlazor for Blazor. Open up the package manager console and make sure that you have set the BlazorChat.Client as the default project (as seen in the below screenshot). Run the following command to install the latest version of MudBlazor on to your application.

```
<div><p><span>Install-Package MudBlazor</span></p></div>
```

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/devenv_GHQgizqrdU.BhZ3GE1k_29T5SU.webp "realtime-chat-application-with-blazor")

Once it is installed, open up the \_Imports.razor file in the Client project under Pages folder, and add the following to the bottom of the file. This helps us to use MudBlazor components throughout the application without having to import the namespace into each and every component/page. We will be adding other interfaces/services to this razor component later in this guide as well.

I have put together some UI code throughout the guide to get you started with MudBlazor without wasting much time. We will try to build a Admin Dashboard UX with Navigation Bar (top) , Side Menu (sidebar) and the content at the middle. Get the idea, yeah?

Firstly, open up the index.html from the wwwroot folder of the BlazorChat.Client project. Replace the entire HTML with the code below. In simple words, what we did is to use MudBlazor Stylesheets and some of it’s js file instead of the default styles that we get out of the box with Blazor.

```
<div><p><span>&lt;!DOCTYPE html&gt;</span></p></div><div><p><span>&lt;html&gt;</span></p></div><div><p><span>&lt;head&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;meta charset="utf-8" /&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;title&gt;Blazor Chat&lt;/title&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;base href="/" /&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap" rel="stylesheet" /&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;link href="_content/MudBlazor/MudBlazor.min.css" rel="stylesheet" /&gt;</span></p></div><div><p><span>&lt;/head&gt;</span></p></div><div><p><span>&lt;body&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;div id="app"&gt;Loading...&lt;/div&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;div id="blazor-error-ui"&gt;</span></p></div><div><p><span><span>        </span></span><span>An unhandled error has occurred.</span></p></div><div><p><span><span>        </span></span><span>&lt;a href="" class="reload"&gt;Reload&lt;/a&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;a class="dismiss"&gt;🗙&lt;/a&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"&gt;&lt;/script&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;script src="_framework/blazor.webassembly.js"&gt;&lt;/script&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;script src="_content/MudBlazor/MudBlazor.min.js"&gt;&lt;/script&gt;</span></p></div><div><p><span>&lt;/body&gt;</span></p></div><div><p><span>&lt;/html&gt;</span></p></div>
```

Next up, we need to register MudBlazor within our ASP.NET Core’s service container to resolve certain internal dependencies. You can also find these steps in MudBlazor documentation.

Open up Program.cs of the Client project and add the following registration along with importing the required namespace.

```
<div><p><span>using MudBlazor.Services;</span></p></div><div><p><span>.</span></p></div><div><p><span>builder.Services.AddMudServices(c =&gt; { c.SnackbarConfiguration.PositionClass = Defaults.Classes.Position.BottomRight; });</span></p></div>
```

SnackbarConfiguration is something that we will be using later on in the implementation.

Next, let’s create the Database and apply the migrations. Open up appsettings.json in the server project. Here you can modify the Connection string as you want. I will use the default localdb instance for this development.

```
<div><p><span>"ConnectionStrings": {</span></p></div><div><p><span><span>  </span></span><span>"DefaultConnection": "Server=(localdb)mssqllocaldb;Database=BlazorChat;Trusted_Connection=True;MultipleActiveResultSets=true"</span></p></div><div><p><span>},</span></p></div>
```

With that done, open up the package manager console again. This time, make the server project as the default project (refer the below screenshot). Run the following command.

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-2.CK4OKolR_1jpICV.webp "realtime-chat-application-with-blazor")

Once done, your new database would been setup for you.

With the database done, let’s get back to the MudBlazor Integration. We will be modifying few of the Razor components / layouts in this section .Under the Shared folder of the Client Project, open up the MainLayout.razor component. Paste in the following code snippet over the existing code.

```
<div><p><span>@inherits LayoutComponentBase</span></p></div><div><p><span>&lt;MudThemeProvider /&gt;</span></p></div><div><p><span>&lt;MudDialogProvider /&gt;</span></p></div><div><p><span>&lt;MudSnackbarProvider /&gt;</span></p></div><div><p><span>&lt;MudLayout&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;MudAppBar Elevation="0"&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;MudText Typo="Typo.h6" Class="ml-4"&gt;Blazor Chat&lt;/MudText&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;MudAppBarSpacer /&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;LoginDisplay /&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;/MudAppBar&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;MudDrawer @bind-Open="_drawerOpen" Elevation="1"&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;NavMenu /&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;/MudDrawer&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;MudMainContent&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;MudToolBar DisableGutters="true"&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudIconButton Icon="@Icons.Material.Outlined.Menu" Color="Color.Inherit" OnClick="@((e) =&gt; DrawerToggle())" Class="ml-3" /&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;/MudToolBar&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;MudContainer MaxWidth="MaxWidth.False" Class="mt-4"&gt;</span></p></div><div><p><span><span>            </span></span><span>@Body</span></p></div><div><p><span><span>        </span></span><span>&lt;/MudContainer&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;/MudMainContent&gt;</span></p></div><div><p><span>&lt;/MudLayout&gt;</span></p></div><div><p><span>@code {</span></p></div><div><p><span><span>    </span></span><span>bool _drawerOpen = false;</span></p></div><div><p><span><span>    </span></span><span>void DrawerToggle()</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>_drawerOpen = !_drawerOpen;</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>}</span></p></div>
```

Line 2-4 : Mandatory components to get MudBlazor functional.  
Line 9 : This is a component that was generated by Visual Studio when we checked the Individual User Accounts while creating the Blazor project, remember? We will be modifying this component in a while.  
Line 12 : NavMenu component will be rendered here. We will be modifying this component as well.  
Line 19 : Here is where the Body of the application would be rendered.

That’s almost everything you need to be aware of on this Layout Page. Drawer Toggle is another cool feature implemented. It gives the application a Fluid UI while toggling the sidebar. We will be coming back to this layout page later in this guide to implement Cascading parameters and to add some code around SignalR as well.

Next, Open up the LoginDisplay component and replace the entire component with the following piece of code.

```
<div><p><span>@using Microsoft.AspNetCore.Components.Authorization</span></p></div><div><p><span>@using Microsoft.AspNetCore.Components.WebAssembly.Authentication</span></p></div><div><p><span>@inject NavigationManager Navigation</span></p></div><div><p><span>@inject SignOutSessionStateManager SignOutManager</span></p></div><div><p><span>&lt;AuthorizeView&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;Authorized&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;div class="pa-4 justify-center my-4 mud-text-align-center"&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudButton Variant="Variant.Filled" Color="Color.Primary" Link="authentication/profile"&gt;Hi, @context.User.Identity.Name!&lt;/MudButton&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="BeginSignOut"&gt;Log Out&lt;/MudButton&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;/Authorized&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;NotAuthorized&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;div class="pa-4 justify-center my-4 mud-text-align-center"&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudButton Variant="Variant.Filled" Color="Color.Primary" Link="authentication/register"&gt;Register&lt;/MudButton&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudButton Variant="Variant.Filled" Color="Color.Secondary" Link="authentication/login"&gt;Log in&lt;/MudButton&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;/NotAuthorized&gt;</span></p></div><div><p><span>&lt;/AuthorizeView&gt;</span></p></div><div><p><span>@code{</span></p></div><div><p><span><span>    </span></span><span>private async Task BeginSignOut(MouseEventArgs args)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>await SignOutManager.SetSignOutState();</span></p></div><div><p><span><span>        </span></span><span>Navigation.NavigateTo("authentication/logout");</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>}</span></p></div>
```

As you can see, the above component is a part of the NavBar which is responsible for displaying the Signin/Register/Logout buttons depending on the Authentication State of the application.

Line 6-11 : If the user is authenticated, he/she will get to see a welcome message alongwith the Logout button.  
Line 12-17 : If not authenticated, a login and registration button would be displayed. As simple as that.

Next, let’s fix the NavMenu component. Paste in the following source code replacing the content at **NavMenu.razor** component.

```
<div><p><span>&lt;MudNavMenu&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;MudNavLink Href="/home" Icon="@Icons.Material.Outlined.Home"&gt;</span></p></div><div><p><span><span>        </span></span><span>Home</span></p></div><div><p><span><span>    </span></span><span>&lt;/MudNavLink&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;MudNavLink Href="/chat" Icon="@Icons.Material.Outlined.Dashboard"&gt;</span></p></div><div><p><span><span>        </span></span><span>Chat</span></p></div><div><p><span><span>    </span></span><span>&lt;/MudNavLink&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;MudNavLink Href="https://codewithmukesh.com/blog/realtime-chat-application-with-blazor/" Target="_blank" Icon="@Icons.Material.Outlined.QuestionAnswer"&gt;</span></p></div><div><p><span><span>        </span></span><span>Documentation / Guide</span></p></div><div><p><span><span>    </span></span><span>&lt;/MudNavLink&gt;</span></p></div><div><p><span>&lt;/MudNavMenu&gt;</span></p></div>
```

Let’s add some dummy content just for the sake of it. Open up Index.razor and paste in the following. This is not very important. I am just adding it to make the app look better.

```
<div><p><span>@page "/home"</span></p></div><div><p><span>@page "/"</span></p></div><div><p><span>&lt;MudContainer Style="display: inline-block; position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 900px; height: 300px; margin: auto; "&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;MudGrid&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;MudItem xs="12" sm="12" md="12"&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudText Align="Align.Center" Typo="Typo.h2" Class="mt-4"&gt;Blazor Chat&lt;/MudText&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudText  Align="Align.Center"  Typo="Typo.subtitle1" Class="smaller"&gt;Complete Chat Application in Blazor WebAssembly 5.0 with SignalR and Identity. UI is taken care by MudBlazor Component Library.&lt;/MudText&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;/MudGrid&gt;</span></p></div><div><p><span>&lt;/MudContainer&gt;</span></p></div>
```

Let’s run the application and see what we have right now.

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-7.BKcXxnvS_20tq47.webp "realtime-chat-application-with-blazor")

Pretty cool, yeah? So we have the sidebar that will help us with the navigation, a couple of buttons on the NavBar that relates to authentication, and finally the content right at the middle of the page.

Let’s try to register some users into the system.

Make sure that you don’t delete or modify the Authentication.razor component under the Pages folder of the Client project. This is quite a vital component that deals with routing to the Identity (Auth) pages.

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-8.DJIvkULi_Z1S1Tlu.webp "realtime-chat-application-with-blazor")

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-9.BdO2-ISp_2foeY3.webp "realtime-chat-application-with-blazor")

This way, I managed to register 3 users - **mukesh, john and henry** for our test purposes.

## Adding the Chat Models

Now, let’s come to the Core Feature of our implementation. So far we have integrated Mudblazor with our application to make it look cooler. Now, let’s add some Model Classes for chat and related entities.

One major step in this section is related to the architecture of the project. In the server project, under the Models folder, you get to see a ApplicationUser class. This class is used to add extra properties to our Identity user. For example, we need to add in the Birthday of the user, we just have to add in the DateTime property in this ApplicationUser class. It inherits the fields from IdentityUser class. Get the idea, yeah?

Due to certain dependency issues, we would have to **move this ApplicationUser class to BlazorChat.Shared Project**. Make sure to change the namespace of the ApplicationUser class as well. Delete the ApplicationUser class from the Server project. This would also mean that there would be a couple of reference issues that would arise due to this action. You can easily fix these issues by pointing to the ApplicationUser class which is now in the Shared project. I hope I am being clear with this. Feel free to [check out the repository](https://github.com/iammukeshm/BlazorChat) in case any confusions arise.

Another action to take, is to install the EntityFrameworkCore package to the Shared project. I am doing all this to keep the project simple. Else we would have to deal with a lot of DTO classes. To get the ideal way of development with clean architecture, do check out the BlazorHero project.

Open up Package Manager console, set the default project to BlazorChat.Shared and run the following command.

```
<div><p><span>Install-Package Microsoft.AspNetCore.Identity.EntityFrameworkCore</span></p></div>
```

Let’s start adding our Core ChatMessage Model. In the BlazorChat.Shared Project create a new class and name it ChatMessage.cs

```
<div><p><span>public class ChatMessage</span></p></div><div><p><span>{</span></p></div><div><p><span><span>    </span></span><span>public long Id { get; set; }</span></p></div><div><p><span><span>    </span></span><span>public string FromUserId { get; set; }</span></p></div><div><p><span><span>    </span></span><span>public string ToUserId { get; set; }</span></p></div><div><p><span><span>    </span></span><span>public string Message { get; set; }</span></p></div><div><p><span><span>    </span></span><span>public DateTime CreatedDate { get; set; }</span></p></div><div><p><span><span>    </span></span><span>public virtual ApplicationUser FromUser { get; set; }</span></p></div><div><p><span><span>    </span></span><span>public virtual ApplicationUser ToUser { get; set; }</span></p></div><div><p><span>}</span></p></div>
```

As you can understand, we are creating the Entity ChatMessage that is supposed to hold all details of a single chat message. This includes the Id, the User Ids of the participants, the actual message, the date of creation, and few virtual properties that can give us the access to the properties of the Participating Users. It’s clear, yeah?

## Extending ApplicationUser Class

Now that we have added the Chat Message entity model, let’s extend the ApplicationUser by adding a couple of collections. The idea is that a given user will have many outgoing and incoming chats. This means that User A can be the Receiver of a set of Chat Messages as well as the Sender of a collection of chats. Thus, we add virtual collections so that users are keyed with the messages. This will help us later to extract the required converation details.

Open up the ApplicationUser.cs in the Shared Project and add in the following.

```
<div><p><span>public class ApplicationUser : IdentityUser</span></p></div><div><p><span>{</span></p></div><div><p><span><span>    </span></span><span>public virtual ICollection&lt;ChatMessage&gt; ChatMessagesFromUsers { get; set; }</span></p></div><div><p><span><span>    </span></span><span>public virtual ICollection&lt;ChatMessage&gt; ChatMessagesToUsers { get; set; }</span></p></div><div><p><span><span>    </span></span><span>public ApplicationUser()</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>ChatMessagesFromUsers = new HashSet&lt;ChatMessage&gt;();</span></p></div><div><p><span><span>        </span></span><span>ChatMessagesToUsers = new HashSet&lt;ChatMessage&gt;();</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>}</span></p></div>
```

With that done, open up the Context class in the BlazorChat.Server Project. It’s usually under the Data Folder with the name as ApplicationDbContext. Here is where you need to add the entities and Builder Logics that will be directly reflected on to our database. Since we have created the ChatMessage Entity, let’s add it here.

```
<div><p><span>public class ApplicationDbContext : ApiAuthorizationDbContext&lt;ApplicationUser&gt;</span></p></div><div><p><span>{</span></p></div><div><p><span><span>    </span></span><span>public ApplicationDbContext(DbContextOptions options,IOptions&lt;OperationalStoreOptions&gt; operationalStoreOptions) : base(options, operationalStoreOptions){}</span></p></div><div><p><span><span>    </span></span><span>public DbSet&lt;ChatMessage&gt; ChatMessages { get; set; }</span></p></div><div><p><span><span>    </span></span><span>protected override void OnModelCreating(ModelBuilder builder)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>base.OnModelCreating(builder);</span></p></div><div><p><span><span>        </span></span><span>builder.Entity&lt;ChatMessage&gt;(entity =&gt;</span></p></div><div><p><span><span>        </span></span><span>{</span></p></div><div><p><span><span>            </span></span><span>entity.HasOne(d =&gt; d.FromUser)</span></p></div><div><p><span><span>                </span></span><span>.WithMany(p =&gt; p.ChatMessagesFromUsers)</span></p></div><div><p><span><span>                </span></span><span>.HasForeignKey(d =&gt; d.FromUserId)</span></p></div><div><p><span><span>                </span></span><span>.OnDelete(DeleteBehavior.ClientSetNull);</span></p></div><div><p><span><span>            </span></span><span>entity.HasOne(d =&gt; d.ToUser)</span></p></div><div><p><span><span>                </span></span><span>.WithMany(p =&gt; p.ChatMessagesToUsers)</span></p></div><div><p><span><span>                </span></span><span>.HasForeignKey(d =&gt; d.ToUserId)</span></p></div><div><p><span><span>                </span></span><span>.OnDelete(DeleteBehavior.ClientSetNull);</span></p></div><div><p><span><span>        </span></span><span>});</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>}</span></p></div>
```

Line 4 : Here we define a DbSet of ChatMessage with the name as ChatMessages. This will be how our Table will be named.  
Line 8-10 : Here we mention the One To Many relationship between the User and the ChatMessages.

## Adding Migrations and Updating the Database

Now, save all the changes and open up the Package Manager Console. Remeber to set the default project to the Server Project whenever you are dooing something that relates to the database, as the data contexts live within the server project.

Run the following commands. This updates your database, adds in the new ChatMessages table and sets up the foreign key references.

```
<div><p><span>add-migration chatModels</span></p></div><div><p><span>update-database</span></p></div>
```

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-3.Ci9O7TOe_1A0F8s.webp "realtime-chat-application-with-blazor")

Let’s check out our database to see the changes and additions. You can see the expected result here.

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-4.BmJUozmR_2pTtPr.webp "realtime-chat-application-with-blazor")

## Setting Up the Chat Controller

Since we are completed with the Database part of the implementation, let’s move on the Server Side implementation. Here we would ideally need a controller that can return / commit data to the ChatMessages table. For this project, we need 4 endpoints on this controller. They are as follows:

-   Accepts the Participant Id and returns a list of ChatMessages that occurred between the 2 participants.
-   Returns a list of users who are available for chat.
-   Returns the details of a chat user.
-   Saves a particular chat message (with participant ids) onto the database.

Why we need these endpoints? Let me make it more clear from the UI perspective. Our Chat UI Components will have 2 sections ideally (Mind map it for now).

-   Section A - to actually chat,
-   Section B - to display the available chat users.

On clicking on a chat user in Section B, the chat history with the user has to load up on Section A. We will also need to able to send in new messages. Thus, these 3 endpoints are quite mandatory.

I believe this makes quite a lot of sense. Let’s get started with our controller now. Under the Controllers folder of the Server Project, add in a new controller and name it **ChatController.cs**

```
<div><p><span>[Route("api/[controller]")]</span></p></div><div><p><span>[ApiController]</span></p></div><div><p><span>[Authorize]</span></p></div><div><p><span>public class ChatController : ControllerBase</span></p></div><div><p><span>{</span></p></div><div><p><span><span>    </span></span><span>private readonly UserManager&lt;ApplicationUser&gt; _userManager;</span></p></div><div><p><span><span>    </span></span><span>private readonly ApplicationDbContext _context;</span></p></div><div><p><span><span>    </span></span><span>public ChatController(UserManager&lt;ApplicationUser&gt; userManager, ApplicationDbContext context)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>_userManager = userManager;</span></p></div><div><p><span><span>        </span></span><span>_context = context;</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>}</span></p></div>
```

This is how our controller would look like initially. You can note that the entire controller is secured with an Authorize Attribute. Also, I have injected the ApplicationDbContext as well as the UserManager to the constructor of the controller. Now, let’s add each of the endpoints here.

### Get All Users

First off, let’s get all the registered users from our database.

```
<div><p><span>[HttpGet("users")]</span></p></div><div><p><span>public async Task&lt;IActionResult&gt; GetUsersAsync()</span></p></div><div><p><span>{</span></p></div><div><p><span><span>    </span></span><span>var userId = User.Claims.Where(a =&gt; a.Type == ClaimTypes.NameIdentifier).Select(a =&gt; a.Value).FirstOrDefault();</span></p></div><div><p><span><span>    </span></span><span>var allUsers = await _context.Users.Where(user =&gt; user.Id != userId).ToListAsync();</span></p></div><div><p><span><span>    </span></span><span>return Ok(allUsers);</span></p></div><div><p><span>}</span></p></div>
```

Line 3 : Getting the userid from the user claims.  
Line 4 : Returns a list of all registered users, excluding the current user. You really don’t want to see your own name in the contact list, do you? :P

### Get User Details

Similarly, with the help of ApplicationDbContext, we return the details of a single user related to the passed userid.

```
<div><p><span>[HttpGet("users/{userId}")]</span></p></div><div><p><span>public async Task&lt;IActionResult&gt; GetUserDetailsAsync(string userId)</span></p></div><div><p><span>{</span></p></div><div><p><span><span>    </span></span><span>var user = await _context.Users.Where(user =&gt; user.Id == userId).FirstOrDefaultAsync();</span></p></div><div><p><span><span>    </span></span><span>return Ok(user);</span></p></div><div><p><span>}</span></p></div>
```

### Save Chat Message

Our client project would send a ChatMessage object to this endpoint with the message. In this endpoint, we are adding the current user as the sender, created date, and the receiving user data as well. Finally we save the data into our database.

```
<div><p><span>[</span><span>HttpPost</span><span>]</span></p></div><div><p><span>public</span><span> </span><span>async</span><span> </span><span>Task</span><span>&lt;</span><span>IActionResult</span><span>&gt; </span><span>SaveMessageAsync</span><span>(</span><span>ChatMessage</span><span> message)</span></p></div><div><p><span>{</span></p></div><div><p><span>    </span><span>var</span><span> </span><span>userId</span><span> = </span><span>User</span><span>.</span><span>Claims</span><span>.</span><span>Where</span><span>(a =&gt; </span><span>a</span><span>.</span><span>Type</span><span> == </span><span>ClaimTypes</span><span>.</span><span>NameIdentifier</span><span>).</span><span>Select</span><span>(a =&gt; </span><span>a</span><span>.</span><span>Value</span><span>).</span><span>FirstOrDefault</span><span>();</span></p></div><div><p><span>    </span><span>message</span><span>.</span><span>FromUserId</span><span> = </span><span>userId</span><span>;</span></p></div><div><p><span>    </span><span>message</span><span>.</span><span>CreatedDate</span><span> = </span><span>DateTime</span><span>.</span><span>Now</span><span>;</span></p></div><div><p><span>    </span><span>message</span><span>.</span><span>ToUser</span><span> = await </span><span>_context</span><span>.</span><span>Users</span><span>.</span><span>Where</span><span>(user =&gt; </span><span>user</span><span>.</span><span>Id</span><span> == </span><span>message</span><span>.</span><span>ToUserId</span><span>).</span><span>FirstOrDefaultAsync</span><span>();</span></p></div><div><p><span><span>    </span></span><span>await </span><span>_context</span><span>.</span><span>ChatMessages</span><span>.</span><span>AddAsync</span><span>(</span><span>message</span><span>);</span></p></div><div><p><span>    </span><span>return</span><span> </span><span>Ok</span><span>(await </span><span>_context</span><span>.</span><span>SaveChangesAsync</span><span>());</span></p></div><div><p><span>}</span></p></div>
```

### Get Conversation Between 2 Participants

So, here is the idea. The client would request for the list of chat message with a particular user. This API endpoint would then get the current user id from the User principal, fetch data from the database with both the participant ids and return a list of chat messages.

```
<div><p><span>[</span><span>HttpGet</span><span>(</span><span>"{contactId}"</span><span>)]</span></p></div><div><p><span>public</span><span> </span><span>async</span><span> </span><span>Task</span><span>&lt;</span><span>IActionResult</span><span>&gt; </span><span>GetConversationAsync</span><span>(</span><span>string</span><span> contactId)</span></p></div><div><p><span>{</span></p></div><div><p><span>    </span><span>var</span><span> </span><span>userId</span><span> = </span><span>User</span><span>.</span><span>Claims</span><span>.</span><span>Where</span><span>(a =&gt; </span><span>a</span><span>.</span><span>Type</span><span> == </span><span>ClaimTypes</span><span>.</span><span>NameIdentifier</span><span>).</span><span>Select</span><span>(a =&gt; </span><span>a</span><span>.</span><span>Value</span><span>).</span><span>FirstOrDefault</span><span>();</span></p></div><div><p><span>    </span><span>var</span><span> </span><span>messages</span><span> = await </span><span>_context</span><span>.</span><span>ChatMessages</span></p></div><div><p><span><span>            </span></span><span>.</span><span>Where</span><span>(h =&gt; (</span><span>h</span><span>.</span><span>FromUserId</span><span> == </span><span>contactId</span><span> &amp;&amp; </span><span>h</span><span>.</span><span>ToUserId</span><span> == </span><span>userId</span><span>) || (</span><span>h</span><span>.</span><span>FromUserId</span><span> == </span><span>userId</span><span> &amp;&amp; </span><span>h</span><span>.</span><span>ToUserId</span><span> == </span><span>contactId</span><span>))</span></p></div><div><p><span><span>            </span></span><span>.</span><span>OrderBy</span><span>(a =&gt; </span><span>a</span><span>.</span><span>CreatedDate</span><span>)</span></p></div><div><p><span><span>            </span></span><span>.</span><span>Include</span><span>(a =&gt; </span><span>a</span><span>.</span><span>FromUser</span><span>)</span></p></div><div><p><span><span>            </span></span><span>.</span><span>Include</span><span>(a =&gt; </span><span>a</span><span>.</span><span>ToUser</span><span>)</span></p></div><div><p><span><span>            </span></span><span>.</span><span>Select</span><span>(x =&gt; new </span><span>ChatMessage</span></p></div><div><p><span><span>            </span></span><span>{</span></p></div><div><p><span>                </span><span>FromUserId</span><span> = </span><span>x</span><span>.</span><span>FromUserId</span><span>,</span></p></div><div><p><span>                </span><span>Message</span><span> = </span><span>x</span><span>.</span><span>Message</span><span>,</span></p></div><div><p><span>                </span><span>CreatedDate</span><span> = </span><span>x</span><span>.</span><span>CreatedDate</span><span>,</span></p></div><div><p><span>                </span><span>Id</span><span> = </span><span>x</span><span>.</span><span>Id</span><span>,</span></p></div><div><p><span>                </span><span>ToUserId</span><span> = </span><span>x</span><span>.</span><span>ToUserId</span><span>,</span></p></div><div><p><span>                </span><span>ToUser</span><span> = </span><span>x</span><span>.</span><span>ToUser</span><span>,</span></p></div><div><p><span>                </span><span>FromUser</span><span> = </span><span>x</span><span>.</span><span>FromUser</span></p></div><div><p><span><span>            </span></span><span>}).</span><span>ToListAsync</span><span>();</span></p></div><div><p><span>    </span><span>return</span><span> </span><span>Ok</span><span>(</span><span>messages</span><span>);</span></p></div><div><p><span>}</span></p></div>
```

Line 4 : Gets the current userId from the ClaimsPrincipal.  
Line 6 : Filters the Chat Messages table that includes both of the userIds as the conversation participants.  
Line 7 : So that Messages are sorted by the creation time.  
Line 8-9 : Includes User Entities as well.  
Line 20 : Returns the Filtered Chats.

## Adding SignalR Hub

**Now for the hero of the show, SignalR.** Let’s try to understand what SignalR is and how it would help our application become more lively. According to Wikipedia, SignalR is an Open Source Package for Microsoft technologies that essentially enables the server code to send notifications to the client-side applications. So, if something changes on the server, it can notify all the clients (browsers) of this change. It would be more like an event when triggered. It is also possible to make the clients send notifications to other clients via the server using SignalR Hubs.

So, the idea is whenever a user types in a message and hits send, it will hit the Hub Function that notifies the receiver (user / client), that a new message has been received. In this event, we will add snackbar (toast notification) that alerts the participant of a new message. Also, whenever the message is sent, to make it realtime, we have to ensure that new message popups for both the users even without them having to refresh their browsers. You will understand more on this while we write the code.

In the Server Project, add a new class and name it SignalRHub.

```
<div><p><span>public</span><span> </span><span>class</span><span> </span><span>SignalRHub</span><span> : </span><span>Hub</span></p></div><div><p><span>{</span></p></div><div><p><span>    </span><span>public</span><span> </span><span>async</span><span> </span><span>Task</span><span> </span><span>SendMessageAsync</span><span>(</span><span>ChatMessage</span><span> message, </span><span>string</span><span> userName)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>await </span><span>Clients</span><span>.</span><span>All</span><span>.</span><span>SendAsync</span><span>(</span><span>"ReceiveMessage"</span><span>, </span><span>message</span><span>, </span><span>userName</span><span>);</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>    </span><span>public</span><span> </span><span>async</span><span> </span><span>Task</span><span> </span><span>ChatNotificationAsync</span><span>(</span><span>string</span><span> message, </span><span>string</span><span> receiverUserId, </span><span>string</span><span> senderUserId)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>await </span><span>Clients</span><span>.</span><span>All</span><span>.</span><span>SendAsync</span><span>(</span><span>"ReceiveChatNotification"</span><span>, </span><span>message</span><span>, </span><span>receiverUserId</span><span>, </span><span>senderUserId</span><span>);</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>}</span></p></div>
```

Line 3 : Notifies all clients and add a new message to the chat.  
Line 4 : Notifies the client who was logged in with a particular userId that a new message has been received.

Let’s do the service registration of SignalR now. Open up Startup.cs of the Server project and add in the following into the **ConfigureServices** method.

Next in the Configure method, add **Line 6** to the UseEndpoints extension.

```
<div><p><span>app</span><span>.</span><span>UseEndpoints</span><span>(endpoints =&gt;</span></p></div><div><p><span>{</span></p></div><div><p><span>    </span><span>endpoints</span><span>.</span><span>MapRazorPages</span><span>();</span></p></div><div><p><span>    </span><span>endpoints</span><span>.</span><span>MapControllers</span><span>();</span></p></div><div><p><span>    </span><span>endpoints</span><span>.</span><span>MapFallbackToFile</span><span>(</span><span>"index.html"</span><span>);</span></p></div><div><p><span>    </span><span>endpoints</span><span>.</span><span>MapHub</span><span>&lt;</span><span>SignalRHub</span><span>&gt;(</span><span>"/signalRHub"</span><span>);</span></p></div><div><p><span>});</span></p></div>
```

Till now, we have finished our database design, API endpoints, adding and configuring the SignalHub. Now the only task that remains is to make our BlazorChat.Client consume the created API and design the Chat Components as required. Let’s get started with the Client Side implementation.

## Chat Manager - Client Side

To consume our API endpoints in a cleaner way, let’s create an interface and it’s implemention. In the BlazorChat.Client, create a new folder name Manager and add in a class ChatManager.cs and an interface **IChatManager.cs**.

```
<div><p><span>public</span><span> </span><span>interface</span><span> </span><span>IChatManager</span></p></div><div><p><span>{</span></p></div><div><p><span>    </span><span>Task</span><span>&lt;</span><span>List</span><span>&lt;</span><span>ApplicationUser</span><span>&gt;&gt; </span><span>GetUsersAsync</span><span>();</span></p></div><div><p><span>    </span><span>Task</span><span> </span><span>SaveMessageAsync</span><span>(</span><span>ChatMessage</span><span> message);</span></p></div><div><p><span>    </span><span>Task</span><span>&lt;</span><span>List</span><span>&lt;</span><span>ChatMessage</span><span>&gt;&gt; </span><span>GetConversationAsync</span><span>(</span><span>string</span><span> contactId);</span></p></div><div><p><span>    </span><span>Task</span><span>&lt;</span><span>ApplicationUser</span><span>&gt; </span><span>GetUserDetailsAsync</span><span>(</span><span>string</span><span> userId);</span></p></div><div><p><span>}</span></p></div>
```

```
<div><p><span>public</span><span> </span><span>class</span><span> </span><span>ChatManager</span><span> : </span><span>IChatManager</span></p></div><div><p><span>{</span></p></div><div><p><span>    </span><span>private</span><span> </span><span>readonly</span><span> </span><span>HttpClient</span><span> _httpClient;</span></p></div><div><p><span>    </span><span>public</span><span> </span><span>ChatManager</span><span>(</span><span>HttpClient</span><span> httpClient)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span>        </span><span>_httpClient</span><span> = </span><span>httpClient</span><span>;</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>    </span><span>public</span><span> </span><span>async</span><span> </span><span>Task</span><span>&lt;</span><span>List</span><span>&lt;</span><span>ChatMessage</span><span>&gt;&gt; </span><span>GetConversationAsync</span><span>(</span><span>string</span><span> contactId)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span>        </span><span>return</span><span> await </span><span>_httpClient</span><span>.</span><span>GetFromJsonAsync</span><span>&lt;</span><span>List</span><span>&lt;</span><span>ChatMessage</span><span>&gt;&gt;(</span><span>$"api/chat/{</span><span>contactId</span><span>}"</span><span>);</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>    </span><span>public</span><span> </span><span>async</span><span> </span><span>Task</span><span>&lt;</span><span>ApplicationUser</span><span>&gt; </span><span>GetUserDetailsAsync</span><span>(</span><span>string</span><span> userId)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span>        </span><span>return</span><span> await </span><span>_httpClient</span><span>.</span><span>GetFromJsonAsync</span><span>&lt;</span><span>ApplicationUser</span><span>&gt;(</span><span>$"api/chat/users/{</span><span>userId</span><span>}"</span><span>);</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>    </span><span>public</span><span> </span><span>async</span><span> </span><span>Task</span><span>&lt;</span><span>List</span><span>&lt;</span><span>ApplicationUser</span><span>&gt;&gt; </span><span>GetUsersAsync</span><span>()</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span>        </span><span>var</span><span> </span><span>data</span><span> = await </span><span>_httpClient</span><span>.</span><span>GetFromJsonAsync</span><span>&lt;</span><span>List</span><span>&lt;</span><span>ApplicationUser</span><span>&gt;&gt;(</span><span>"api/chat/users"</span><span>);</span></p></div><div><p><span>        </span><span>return</span><span> </span><span>data</span><span>;</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>    </span><span>public</span><span> </span><span>async</span><span> </span><span>Task</span><span> </span><span>SaveMessageAsync</span><span>(</span><span>ChatMessage</span><span> message)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>await </span><span>_httpClient</span><span>.</span><span>PostAsJsonAsync</span><span>(</span><span>"api/chat"</span><span>, </span><span>message</span><span>);</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>}</span></p></div>
```

Here we make use of the HttpClient instance, which’s already initialized by default. We have 4 methods, corresponding to each API endpoint. The HTTP Response Message is then converted to the required models and returned back to the callee.

Before we forget, let’s register this manager into the container of the client applications.

```
<div><p><span>builder</span><span>.</span><span>Services</span><span>.</span><span>AddTransient</span><span>&lt;</span><span>IChatManager</span><span>, </span><span>ChatManager</span><span>&gt;();</span></p></div>
```

## Installing SignalR Client Package

Open up the Package Manager Console and set the Client Project as the default project. Now, run the following command to install the SignalR client. This will be responsible for receiving notifications from the server sent by our previously created hub.

```
<div><p><span>Install-Package Microsoft.AspNetCore.SignalR.Client</span></p></div>
```

## Necessary Imports

As mentioned earlier in this article, we have to add in more imports to the \_Imports.razor component to make them available throughout other razor components. Open up the \_Imports.razor and add in the following.

```
<div><p><span>@inject NavigationManager _navigationManager</span></p></div><div><p><span>@inject ISnackbar _snackBar</span></p></div><div><p><span>@inject IJSRuntime _jsRuntime</span></p></div><div><p><span>@inject AuthenticationStateProvider _stateProvider;</span></p></div><div><p><span>@using BlazorChat.Client.Managers</span></p></div><div><p><span>@inject IChatManager _chatManager</span></p></div>
```

## Material Chat UI

Now, here is where the actual fun comes in. Let’s start building our Chat Component’s UI. This is a blueprint of how we want our UI to look like. Cool?

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-10.0Vo9huQ3_AgdVQ.webp "realtime-chat-application-with-blazor")

Let’s get started by creating a new RazorComponent under the Pages folder of the Client Project. I am naming the component as Chat.razor.

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-5.pbJkkZ40_1jOCsf.webp "realtime-chat-application-with-blazor")

Additionally, we also need to have a C# class that’s linked to this Razor component. Make sure to name it similar to your component, but with an additional .cs extension.

![realtime-chat-application-with-blazor](https://codewithmukesh.com/_astro/image-6.QnlPcJCN_ZspNvh.webp "realtime-chat-application-with-blazor")

But before going forward with the Chat Component, there are a couple of changes need in the MainLayout page. Open up the MainLayout.razor page and add in the following code snippet under the @code section of the component.

Make sure that you import the namespace for SignalR client on the MainLayout.razor component by the following code - @using Microsoft.AspNetCore.SignalR.Client; on the top of the Component’s code (below the @inherits LayoutComponentBase).

```
<div><p><span>private</span><span> </span><span>HubConnection</span><span> </span><span>hubConnection</span><span>;</span></p></div><div><p><span>public</span><span> </span><span>bool</span><span> IsConnected =&gt; </span><span>hubConnection</span><span>.</span><span>State</span><span> == </span><span>HubConnectionState</span><span>.</span><span>Connected</span><span>;</span></p></div><div><p><span>protected</span><span> </span><span>override</span><span> </span><span>async</span><span> </span><span>Task</span><span> </span><span>OnInitializedAsync</span><span>()</span></p></div><div><p><span>{</span></p></div><div><p><span>    </span><span>hubConnection</span><span> = new </span><span>HubConnectionBuilder</span><span>().</span><span>WithUrl</span><span>(</span><span>_navigationManager</span><span>.</span><span>ToAbsoluteUri</span><span>(</span><span>"/signalRHub"</span><span>)).</span><span>Build</span><span>();</span></p></div><div><p><span><span>    </span></span><span>await </span><span>hubConnection</span><span>.</span><span>StartAsync</span><span>();</span></p></div><div><p><span>    </span><span>hubConnection</span><span>.</span><span>On</span><span>&lt;</span><span>string</span><span>, </span><span>string</span><span>, </span><span>string</span><span>&gt;(</span><span>"ReceiveChatNotification"</span><span>, (message, receiverUserId, senderUserId) =&gt;</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span>        </span><span>if</span><span> (</span><span>CurrentUserId</span><span> == </span><span>receiverUserId</span><span>)</span></p></div><div><p><span><span>        </span></span><span>{</span></p></div><div><p><span>            </span><span>_snackBar</span><span>.</span><span>Add</span><span>(</span><span>message</span><span>, </span><span>Severity</span><span>.</span><span>Info</span><span>, config =&gt;</span></p></div><div><p><span><span>            </span></span><span>{</span></p></div><div><p><span>                </span><span>config</span><span>.</span><span>VisibleStateDuration</span><span> = </span><span>10000</span><span>;</span></p></div><div><p><span>                </span><span>config</span><span>.</span><span>HideTransitionDuration</span><span> = </span><span>500</span><span>;</span></p></div><div><p><span>                </span><span>config</span><span>.</span><span>ShowTransitionDuration</span><span> = </span><span>500</span><span>;</span></p></div><div><p><span>                </span><span>config</span><span>.</span><span>Action</span><span> = </span><span>"Chat?"</span><span>;</span></p></div><div><p><span>                </span><span>config</span><span>.</span><span>ActionColor</span><span> = </span><span>Color</span><span>.</span><span>Info</span><span>;</span></p></div><div><p><span>                </span><span>config</span><span>.</span><span>Onclick</span><span> = snackbar =&gt;</span></p></div><div><p><span><span>                </span></span><span>{</span></p></div><div><p><span>                    </span><span>_navigationManager</span><span>.</span><span>NavigateTo</span><span>(</span><span>$"chat/{</span><span>senderUserId</span><span>}"</span><span>);</span></p></div><div><p><span>                    </span><span>return</span><span> </span><span>Task</span><span>.</span><span>CompletedTask</span><span>;</span></p></div><div><p><span><span>                </span></span><span>};</span></p></div><div><p><span><span>            </span></span><span>});</span></p></div><div><p><span><span>        </span></span><span>}</span></p></div><div><p><span><span>    </span></span><span>});</span></p></div><div><p><span>    </span><span>var</span><span> </span><span>state</span><span> = await </span><span>_stateProvider</span><span>.</span><span>GetAuthenticationStateAsync</span><span>();</span></p></div><div><p><span>    </span><span>var</span><span> </span><span>user</span><span> = </span><span>state</span><span>.</span><span>User</span><span>;</span></p></div><div><p><span>    </span><span>CurrentUserId</span><span> = </span><span>user</span><span>.</span><span>Claims</span><span>.</span><span>Where</span><span>(a =&gt; </span><span>a</span><span>.</span><span>Type</span><span> == </span><span>"sub"</span><span>).</span><span>Select</span><span>(a =&gt; </span><span>a</span><span>.</span><span>Value</span><span>).</span><span>FirstOrDefault</span><span>();</span></p></div><div><p><span>}</span></p></div>
```

Line 1 : Here we declare the HubConnection. This is the connection that we are going to pass through to the Chat Component as well using the Cascading Parameter property.  
Line 5 : Initialized the HubConnection instance when the application runs for the first time. Note that it is subscribed to the singalrHub Endpoint of the API. Remember mapping this same endpoint to the SignalR Hub in the Server project?

Line 6 : Kick Starts the Connection.  
Line 7 : When any of the client sends a New message to the now logged in user, a notification is popped up on the UI. It is done with the help of this event.  
Line 20 : On clicking the generated notification, the user will be redirected to the chatbox of the sender. I really love this feature :D  
Line 28 : Gets the current User Id from the Claims Principal.

Finally, in the html section, remeber adding the @body tag earlier? Here we need to replace with the below code.

```
<div><p><span>&lt;CascadingValue Value="hubConnection"&gt;</span></p></div><div><p><span><span>    </span></span><span>@Body</span></p></div><div><p><span>&lt;/CascadingValue&gt;</span></p></div>
```

This means that the instance of the hubConnection will be passed down to each and every children of the Layout page, which includes our Chat component as well.

Let’s get back to our Chat Component now. I will start off with the C# Class, Chat.razor.cs.

```
<div><p><span>public partial class Chat</span></p></div><div><p><span>{</span></p></div><div><p><span><span>    </span></span><span>[CascadingParameter] public HubConnection hubConnection { get; set; }</span></p></div><div><p><span><span>    </span></span><span>[Parameter] public string CurrentMessage { get; set; }</span></p></div><div><p><span><span>    </span></span><span>[Parameter] public string CurrentUserId { get; set; }</span></p></div><div><p><span><span>    </span></span><span>[Parameter] public string CurrentUserEmail { get; set; }</span></p></div><div><p><span><span>    </span></span><span>private List&lt;ChatMessage&gt; messages = new List&lt;ChatMessage&gt;();</span></p></div><div><p><span><span>    </span></span><span>private async Task SubmitAsync()</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>if (!string.IsNullOrEmpty(CurrentMessage) &amp;&amp; !string.IsNullOrEmpty(ContactId))</span></p></div><div><p><span><span>        </span></span><span>{</span></p></div><div><p><span><span>            </span></span><span>var chatHistory = new ChatMessage()</span></p></div><div><p><span><span>            </span></span><span>{</span></p></div><div><p><span><span>                </span></span><span>Message = CurrentMessage,</span></p></div><div><p><span><span>                </span></span><span>ToUserId = ContactId,</span></p></div><div><p><span><span>                </span></span><span>CreatedDate = DateTime.Now</span></p></div><div><p><span><span>            </span></span><span>};</span></p></div><div><p><span><span>            </span></span><span>await _chatManager.SaveMessageAsync(chatHistory);</span></p></div><div><p><span><span>            </span></span><span>chatHistory.FromUserId = CurrentUserId;</span></p></div><div><p><span><span>            </span></span><span>await hubConnection.SendAsync("SendMessageAsync", chatHistory, CurrentUserEmail);</span></p></div><div><p><span><span>            </span></span><span>CurrentMessage = string.Empty;</span></p></div><div><p><span><span>        </span></span><span>}</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span><span>    </span></span><span>protected override async Task OnInitializedAsync()</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>if (hubConnection == null)</span></p></div><div><p><span><span>        </span></span><span>{</span></p></div><div><p><span><span>            </span></span><span>hubConnection = new HubConnectionBuilder().WithUrl(_navigationManager.ToAbsoluteUri("/signalRHub")).Build();</span></p></div><div><p><span><span>        </span></span><span>}</span></p></div><div><p><span><span>        </span></span><span>if (hubConnection.State == HubConnectionState.Disconnected)</span></p></div><div><p><span><span>        </span></span><span>{</span></p></div><div><p><span><span>            </span></span><span>await hubConnection.StartAsync();</span></p></div><div><p><span><span>        </span></span><span>}</span></p></div><div><p><span><span>        </span></span><span>hubConnection.On&lt;ChatMessage, string&gt;("ReceiveMessage", async (message, userName) =&gt;</span></p></div><div><p><span><span>        </span></span><span>{</span></p></div><div><p><span><span>            </span></span><span>if ((ContactId == message.ToUserId &amp;&amp; CurrentUserId == message.FromUserId) || (ContactId == message.FromUserId &amp;&amp; CurrentUserId == message.ToUserId))</span></p></div><div><p><span><span>            </span></span><span>{</span></p></div><div><p><span><span>                </span></span><span>if ((ContactId == message.ToUserId &amp;&amp; CurrentUserId == message.FromUserId))</span></p></div><div><p><span><span>                </span></span><span>{</span></p></div><div><p><span><span>                    </span></span><span>messages.Add(new ChatMessage { Message = message.Message, CreatedDate = message.CreatedDate, FromUser = new ApplicationUser() { Email = CurrentUserEmail } } );</span></p></div><div><p><span><span>                    </span></span><span>await hubConnection.SendAsync("ChatNotificationAsync", $"New Message From {userName}", ContactId, CurrentUserId);</span></p></div><div><p><span><span>                </span></span><span>}</span></p></div><div><p><span><span>                </span></span><span>else if ((ContactId == message.FromUserId &amp;&amp; CurrentUserId == message.ToUserId))</span></p></div><div><p><span><span>                </span></span><span>{</span></p></div><div><p><span><span>                    </span></span><span>messages.Add(new ChatMessage { Message = message.Message, CreatedDate = message.CreatedDate, FromUser = new ApplicationUser() { Email = ContactEmail } });</span></p></div><div><p><span><span>                </span></span><span>}</span></p></div><div><p><span><span>                </span></span><span>StateHasChanged();</span></p></div><div><p><span><span>            </span></span><span>}</span></p></div><div><p><span><span>        </span></span><span>});</span></p></div><div><p><span><span>        </span></span><span>await GetUsersAsync();</span></p></div><div><p><span><span>        </span></span><span>var state = await _stateProvider.GetAuthenticationStateAsync();</span></p></div><div><p><span><span>        </span></span><span>var user = state.User;</span></p></div><div><p><span><span>        </span></span><span>CurrentUserId = user.Claims.Where(a =&gt; a.Type == "sub").Select(a =&gt; a.Value).FirstOrDefault();</span></p></div><div><p><span><span>        </span></span><span>CurrentUserEmail = user.Claims.Where(a =&gt; a.Type == "name").Select(a =&gt; a.Value).FirstOrDefault();</span></p></div><div><p><span><span>        </span></span><span>if (!string.IsNullOrEmpty(ContactId))</span></p></div><div><p><span><span>        </span></span><span>{</span></p></div><div><p><span><span>            </span></span><span>await LoadUserChat(ContactId);</span></p></div><div><p><span><span>        </span></span><span>}</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span><span>    </span></span><span>public List&lt;ApplicationUser&gt; ChatUsers = new List&lt;ApplicationUser&gt;();</span></p></div><div><p><span><span>    </span></span><span>[Parameter] public string ContactEmail { get; set; }</span></p></div><div><p><span><span>    </span></span><span>[Parameter] public string ContactId { get; set; }</span></p></div><div><p><span><span>    </span></span><span>async Task LoadUserChat(string userId)</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>var contact = await _chatManager.GetUserDetailsAsync(userId);</span></p></div><div><p><span><span>        </span></span><span>ContactId = contact.Id;</span></p></div><div><p><span><span>        </span></span><span>ContactEmail = contact.Email;</span></p></div><div><p><span><span>        </span></span><span>_navigationManager.NavigateTo($"chat/{ContactId}");</span></p></div><div><p><span><span>        </span></span><span>messages = new List&lt;ChatMessage&gt;();</span></p></div><div><p><span><span>        </span></span><span>messages = await _chatManager.GetConversationAsync(ContactId);</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span><span>    </span></span><span>private async Task GetUsersAsync()</span></p></div><div><p><span><span>    </span></span><span>{</span></p></div><div><p><span><span>        </span></span><span>ChatUsers = await _chatManager.GetUsersAsync();</span></p></div><div><p><span><span>    </span></span><span>}</span></p></div><div><p><span>}</span></p></div>
```

Line 3 : It’s important to declare the CascadingParameter attribute, as we are receiving the instance of HubConnection from our parent component, MainLayout page.

Line 8 - 23 : When the user types in a message and clicks send, this method is invoked. It first ensures that a valid receiver is available and the message is not empty. It then maps these data to a new ChatMessage object and passes it to the API for saving it to the database. After that, the SignalR is triggered passing the message and the current user’s email.

Line 24 - 60 : This is fired up when this component loads. First, for safety, we check if the recieved hubConnection instance is not null and has not stoppped working. If so, it is rectified as the initial step. Line 34 - 50 deals with the event for adding the received message in Realtime to the chat box. We first check if the current user id or the selected contact is a part of the conversation. If so, it adds the message to the required chat box. Line 48 ensures that the component in re-rendered to make the application feel more real-time.

Line 64 - 72 : When the user clicks on an available user from the contact list, this method is invoked. Also note that the conversation is loaded via the API.

Line 73 - 76 : Loads all the registered users via API Call.

Finally, let’s add in the HTML / Components for the Chat.razor component.

```
<div><p><span>@page "/chat/{ContactId}"</span></p></div><div><p><span>@page "/chat"</span></p></div><div><p><span>&lt;div class="d-flex flex-grow-1 flex-row"&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;MudPaper Elevation="25" Class="py-4 flex-grow-1"&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;MudToolBar Dense="true"&gt;</span></p></div><div><p><span><span>            </span></span><span>@if (string.IsNullOrEmpty(ContactId))</span></p></div><div><p><span><span>            </span></span><span>{</span></p></div><div><p><span><span>                </span></span><span>&lt;MudIcon Icon="@Icons.Material.Outlined.Person" Style="margin-right:10px"&gt;&lt;/MudIcon&gt;</span></p></div><div><p><span><span>                </span></span><span>&lt;MudText Typo="Typo.h6"&gt;chat&lt;/MudText&gt;</span></p></div><div><p><span><span>            </span></span><span>}</span></p></div><div><p><span><span>            </span></span><span>else</span></p></div><div><p><span><span>            </span></span><span>{</span></p></div><div><p><span><span>                </span></span><span>&lt;MudIcon Icon="@Icons.Material.Outlined.ChatBubble" Style="margin-right:10px"&gt;&lt;/MudIcon&gt;</span></p></div><div><p><span><span>                </span></span><span>&lt;MudText Typo="Typo.h6"&gt;@ContactEmail&lt;/MudText&gt;</span></p></div><div><p><span><span>            </span></span><span>}</span></p></div><div><p><span><span>        </span></span><span>&lt;/MudToolBar&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;div class="d-flex flex-column px-4" style="max-height:65vh;min-height:65vh; overflow:scroll;" id="chatContainer"&gt;</span></p></div><div><p><span><span>            </span></span><span>@foreach (var message in messages)</span></p></div><div><p><span><span>            </span></span><span>{</span></p></div><div><p><span><span>                </span></span><span>&lt;div class="d-flex flex-row my-4"&gt;</span></p></div><div><p><span><span>                    </span></span><span>&lt;div class="mr-4"&gt;</span></p></div><div><p><span><span>                        </span></span><span>&lt;MudAvatar Color="Color.Secondary" Style="height:50px; width:50px;"&gt;@message.FromUser.Email.ToUpper().FirstOrDefault()&lt;/MudAvatar&gt;</span></p></div><div><p><span><span>                    </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>                    </span></span><span>&lt;div&gt;</span></p></div><div><p><span><span>                        </span></span><span>&lt;MudText Typo="Typo.body1"&gt;@message.FromUser.Email&lt;/MudText&gt;</span></p></div><div><p><span><span>                        </span></span><span>&lt;MudText Typo="Typo.caption" Style="font-size: xx-small!important;"&gt;@message.CreatedDate.ToString("dd MMM, yyyy hh:mm tt")&lt;/MudText&gt;</span></p></div><div><p><span><span>                        </span></span><span>&lt;MudText Typo="Typo.body2" Style=" padding: 15px;background-color: var(--mud-palette-background-grey);border-radius: 5px;margin-top:5px"&gt;@message.Message&lt;/MudText&gt;</span></p></div><div><p><span><span>                    </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>                </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>            </span></span><span>}</span></p></div><div><p><span><span>        </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;MudPaper Elevation="25" Class="d-flex flex-row px-2 mx-4" Style=""&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudTextField T="string" Placeholder="Enter your message..."DisableUnderLine="true" Class="mt-n2 mx-4"</span></p></div><div><p><span><span>                          </span></span><span>@bind-Value="CurrentMessage" For="@(()=&gt; CurrentMessage)" /&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudButton OnClick="SubmitAsync" StartIcon="@Icons.Material.Outlined.Send" Color="Color.Secondary" ButtonType="ButtonType.Button"&gt;Send&lt;/MudButton&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;/MudPaper&gt;</span></p></div><div><p><span><span>    </span></span><span>&lt;/MudPaper&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;MudPaper Elevation="25" Class="pa-3 ml-6" MinWidth="350px"&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;MudToolBar Dense="true"&gt;</span></p></div><div><p><span><span>                </span></span><span>&lt;MudText Typo="Typo.h6" Inline="true" Class="mr-2"&gt;#&lt;/MudText&gt;</span></p></div><div><p><span><span>                </span></span><span>&lt;MudText Typo="Typo.h6"&gt;contacts&lt;/MudText&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;/MudToolBar&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;div class="d-flex flex-column px-4" style="max-height:70vh;min-height:70vh; overflow:scroll;"&gt;</span></p></div><div><p><span><span>                </span></span><span>&lt;MudList Clickable="true"&gt;</span></p></div><div><p><span><span>                    </span></span><span>@foreach (var user in ChatUsers)</span></p></div><div><p><span><span>                    </span></span><span>{</span></p></div><div><p><span><span>                        </span></span><span>&lt;MudListItem Class="pa-0 px-2" OnClick="@(() =&gt; LoadUserChat(user.Id))"&gt;</span></p></div><div><p><span><span>                            </span></span><span>&lt;div class="d-flex flex-row mt-n1 mb-n1"&gt;</span></p></div><div><p><span><span>                                </span></span><span>&lt;div class="mr-4"&gt;</span></p></div><div><p><span><span>                                    </span></span><span>&lt;MudBadge Class="my-2"&gt;</span></p></div><div><p><span><span>                                        </span></span><span>@if (user.Id == ContactId)</span></p></div><div><p><span><span>                                        </span></span><span>{</span></p></div><div><p><span><span>                                            </span></span><span>&lt;MudAvatar Color="Color.Secondary" Style="height:50px; width:50px;"&gt;</span></p></div><div><p><span><span>                                                </span></span><span>@user.Email.ToUpper().FirstOrDefault()</span></p></div><div><p><span><span>                                            </span></span><span>&lt;/MudAvatar&gt;</span></p></div><div><p><span><span>                                        </span></span><span>}</span></p></div><div><p><span><span>                                        </span></span><span>else</span></p></div><div><p><span><span>                                        </span></span><span>{</span></p></div><div><p><span><span>                                            </span></span><span>&lt;MudAvatar Color="Color.Dark" Style="height:50px; width:50px;"&gt;@user.Email.ToUpper().FirstOrDefault()&lt;/MudAvatar&gt;</span></p></div><div><p><span><span>                                        </span></span><span>}</span></p></div><div><p><span><span>                                    </span></span><span>&lt;/MudBadge&gt;</span></p></div><div><p><span><span>                                </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>                                </span></span><span>&lt;div&gt;</span></p></div><div><p><span><span>                                    </span></span><span>&lt;MudText Typo="Typo.body2" Class="mt-3 mb-n2"&gt;@user.Email&lt;/MudText&gt;</span></p></div><div><p><span><span>                                    </span></span><span>&lt;MudText Typo="Typo.caption" Style="font-size: xx-small!important;"&gt;@user.Id&lt;/MudText&gt;</span></p></div><div><p><span><span>                                </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>                            </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>                        </span></span><span>&lt;/MudListItem&gt;</span></p></div><div><p><span><span>                    </span></span><span>}</span></p></div><div><p><span><span>                </span></span><span>&lt;/MudList&gt;</span></p></div><div><p><span><span>            </span></span><span>&lt;/div&gt;</span></p></div><div><p><span><span>        </span></span><span>&lt;/MudPaper&gt;</span></p></div><div><p><span>&lt;/div&gt;</span></p></div>
```

Line 1 - 2 : Declares the routes of this component.  
Line 18-30 : Loops through the list of Chat Message and renders it to the browser.  
Line 35 : The Send Message Button.  
Line 45 - 69 : Loops through all the registered Users as received from the API.

Most of the code here is for the betterment of the UI. I am skipping it’s explanations as I think it’s quite self explanatory. In case of any questions, please leave a comment below.

## Additional Customizations

However, there is always a scope for improvement. Here are a few things I had in my mind as requirements while building this Chat Component for Blazor Hero.

-   One main issue was, although the system works perfectly, the user had to scroll down to see the latest message. I googled quite a lot for this and finally ended up using IJSRuntime to acheive this.
-   Similarly, to make the system cooler and have a better user experience, why not play a notification tone when a new message comes in? IJSRuntime came in handy here as well.

Wondering why I am going with JS? Although Blazor could be written without depending on Javascript, there are still tons of scenarios and requirements that is not yet supported with C# in Blazor. Trust me, these are very minimal JS usage only.

### Auto Scroll to the Bottom of Chat.

Under the wwwroot folder, create a new folder and name it js. Here, add a new javascript file and name it scroll.js.

```
<div><p><span>window.ScrollToBottom = (elementName) =&gt; {</span></p></div><div><p><span><span>    </span></span><span>element = document.getElementById(elementName);</span></p></div><div><p><span><span>    </span></span><span>element.scrollTop = element.scrollHeight - element.clientHeight;</span></p></div><div><p><span>}</span></p></div>
```

Now, in the index.html of the wwwroot folder, add in the reference to this js file.

```
<div><p><span>&lt;script src="js/scroll.js"&gt;&lt;/script&gt;</span></p></div>
```

Now that our js is created, how and where do we invoke it?

Firstly, we need the scroll function to be invoked whenever there is a render that occurs in the chat component. Luckily for us, Blazor has a event for it. Add in the following method to the Chat.razor.cs class.

```
<div><p><span>protected override async Task OnAfterRenderAsync(bool firstRender)</span></p></div><div><p><span>{</span></p></div><div><p><span><span>    </span></span><span>await _jsRuntime.InvokeAsync&lt;string&gt;("ScrollToBottom", "chatContainer");</span></p></div><div><p><span>}</span></p></div>
```

This means that whenever there is a render, the js function gets invoked which in turn scrolls to the bottom of the div with the id **chatContainer**.

Next, in the **hubConnection.On(“ReceiveMessage”, async (message, userName) =>** event also, we need this js to be invoked. Add Line 1 of the following snippet just above the StateHasChanged method.

```
<div><p><span>await _jsRuntime.InvokeAsync&lt;string&gt;("ScrollToBottom", "chatContainer");</span></p></div><div><p><span>StateHasChanged();</span></p></div>
```

IMPORTANT : Due to Browser Caching, sometimes there can be chances where the new JS / changes may not be reflected on to the browser, which will also lead to exceptions at the browser level. I usually reload the page by using CTRL+F5 which forces chrome to reload the page without cache. It’s highly important while developing client side applications.

### Playing Notification Tone.

Here is my favorite feature. All of a sudden, BlazorHero felt like an Enterprise application , thanks to this super cool feature. We will try to play a short notification mp3 when a new message is received.

In the js folder, add a new javascript file and name it sounds.js

```
<div><p><span>window.PlayAudio = (elementName) =&gt; {</span></p></div><div><p><span><span>    </span></span><span>document.getElementById(elementName).play();</span></p></div><div><p><span>}</span></p></div>
```

As done earlier, make sure to add the reference of the sound.js to the index.html page.

Additionally, create a new folder under the wwwroot folder and name it media. Download a notification tone mp3 from the web, and place it under the media folder. I am sure that you will be able to find tons of notification tones on the web.

Next, open up the MainLayout.razor page once again and add in the Line 3 from the below code snippet just above the MudThemeProvider.

```
<div><p><span>@inherits LayoutComponentBase</span></p></div><div><p><span>@using Microsoft.AspNetCore.SignalR.Client;</span></p></div><div><p><span>&lt;audio id="notification" src="/media/notification.mp3" /&gt;</span></p></div><div><p><span>&lt;MudThemeProvider /&gt;</span></p></div><div><p><span>&lt;MudDialogProvider /&gt;</span></p></div>
```

In the same Layout page, under the OnInitializedAsync method, just below the if (CurrentUserId == receiverUserId), add the following code snippet.

```
<div><p><span>_jsRuntime.InvokeAsync&lt;string&gt;("PlayAudio", "notification");</span></p></div>
```

Run the application to test this functionality. Please note the you may need to Hard Refresh Chrome by pressing the CTRL + F5 Button.

And there you go, we have now build a Complete Realtime Chat Application with Blazor using Identity, SignalR and Mudblazor Components.

That’s pretty much it for this extremely detailed guide. I hope I have put up a clear solution for the community to work with.

## Summary

In this article, we built a full-fledged chat application in Blazor right from scratch using Identity and SignalR. The UI is taken care of with the help of MudBlazor. You can find the source code of the complete implementation here. Did you learn something new? Do let me know in the comments section. If you enjoyed this article, make sure that you share it with your colleagues and blazor developers. This helps me reach a wider audience and stay motivated to produce more content regularly.

Leave behind your valuable queries, suggestions in the comment section below. Also, if you think that you learned something new from this article, do not forget to share this within your developer community. Happy Coding!
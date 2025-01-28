---
created: 2024-07-24T15:02:40 (UTC -05:00)
tags: []
source: https://code-maze.com/blazor-webassembly-httpclient/
author: Marinko Spasojević
---

# Blazor WebAssembly HttpClient – Consuming a Web API - Code Maze

source: https://code-maze.com/blazor-webassembly-httpclient/

> ## Excerpt
> In this article, we are going to learn how to use Blazor WebAssembly HttpClient to fetch the data from the ASP.NET Core Web API application.

---
Blazor WebAssembly HttpClient – Consuming a Web API

---
created: 2024-07-24T15:03:26 (UTC -05:00)
tags: []
source: https://code-maze.com/blazor-webassembly-pagination/
author: Marinko Spasojević
---

# Blazor WebAssembly Pagination with ASP.NET Core Web API

source: https://code-maze.com/blazor-webassembly-pagination/

> ## Excerpt
> In this article, we are going to learn how to create a Blazor WebAssembly Pagination to navigate throught the data fetched from the ASP.NET Core Web API app

---
In this article, we are going to learn how to create a Blazor WebAssembly Pagination by consuming data from our Web API server project. We already have [the server-side logic to provide the data to the client](https://code-maze.com/blazor-webassembly-httpclient/), but now, we are going to modify it to fit the pagination purpose. After the server-side modification, we are going to create a client side pagination and use the data from the server.

For the complete navigation for this series, you can visit the [Blazor Series page](https://code-maze.com/blazor-webassembly-series/).

That said, we are going to implement the pagination logic in our Web API project but without detailed explanations, but should you find yourself lost, please read the article about pagination.

Support Code Maze on Patreon to get rid of ads and get the best discounts on our products!

[![Become a patron at Patreon!](https://code-maze.com/wp-content/plugins/patron-plugin-pro/plugin/lib/patron-button-and-widgets-by-codebard/images/become_a_patron_button.png)](https://www.patreon.com/oauth2/become-patron?response_type=code&min_cents=100&client_id=9_akhcsDQMGo-FTlVmNpM_uxSV4fbW3vnrz7CBRV9RxwjMPCLfWgodhrcE0UuHH4&scope=identity%20identity[email]&redirect_uri=https://code-maze.com/patreon-authorization/&state=eyJmaW5hbF9yZWRpcmVjdF91cmkiOiJodHRwczpcL1wvY29kZS1tYXplLmNvbVwvaGF0ZW9hcy1hc3BuZXQtY29yZS13ZWItYXBpXC8ifQ%3D%3D&utm_source=https%3A%2F%2Fcode-maze.com%2Fhateoas-aspnet-core-web-api%2F&utm_medium=patreon_wordpress_plugin&utm_campaign=11086160&utm_term=&utm_content=post_unlock_button)

Now, let’s start with the implementation.

We are going to create a new folder `RequestFeatures` in the `Entities` project and inside that folder a new `ProductParameters` class:

Next, in the same folder, we are going to create the `MetaData` class:

In this class, we just create the required properties for our client-side pagination.

Then, let’s create a new folder `Paging` in the `BlazorProduct.Server` project and a new `PagedList` class inside that folder:

In this class, we prepare all the pagination data and populate the `MetaData` property. Additionally, we have to include the `Entities.RequestFeatures` using statement to recognize the `MetaData` property.

With this in place, we can start the repository modification.

### Modifying Repository Files

Let’s start with the `IProductRepository` modification:

And of course, we have to modify the `ProductRepository` class:

Finally, let’s modify the `Get` action in the `ProductController`:

So, we just fetch the data with the parameters and extract the `MetaData` to the response header.

And that’s it. We can test this with the Postman:

[![Blazor WebAssembly Pagination Result in Postman](https://code-maze.com/wp-content/uploads/2020/07/38-Pagination-Result-API.png)](https://code-maze.com/wp-content/uploads/2020/07/38-Pagination-Result-API.png)

We can see we only have three products in the result, and that is correct because we requested three products per page. If we navigate to the Headers tab:

[![Blazor WebAssembly Pagination Headers](https://code-maze.com/wp-content/uploads/2020/07/39-Pagination-Headers.png)](https://code-maze.com/wp-content/uploads/2020/07/39-Pagination-Headers.png)

We can see the `X-Pagination` header with all the required data.

Excellent.

The last thing we have to do is to expose this custom header to the client application:

Now we can move to the Blazor WebAssembly Pagination logic.

## The Client Code Modification

Before we start with the Pagination actions, we have to make a couple of changes in our client code.

Let’s start by creating a new `Features` folder in the `Client` project and a new `PagingResponse` class inside it:

Now, we have to modify the `IProductHttpRepository` interface:

And the repository class as well:

So, we create our query parameter dictionary with the `pageNumber` key. Then in the response, we use the `QueryHelpers.AddQueryString` expression to add query string parameters in the request. For this, we have to install the `Microsoft.AspNetCore.WebUtilities` library. After that, we just create a new `pagingResponse` object, where we populate the `Items` and `MetaData` properties and return it as a result.

Finally, we have to modify the `Products.razor.cs` class:

Now, if we start our application and navigate to the Products menu, we are going to find four products. This proves that our pagination logic works because by default we ask for four products on the page:

[![Four products without pagination](https://code-maze.com/wp-content/uploads/2020/07/40-Four-products-without-pagination.png)](https://code-maze.com/wp-content/uploads/2020/07/40-Four-products-without-pagination.png)

Excellent.

Now let’s jump right to the paging implementation.

Let’s start by creating new `Pagination.razor` and `Pagination.razor.cs` files in the `Components` folder. After creation, we are going to modify the `.cs` file:

So, we have three parameters, the `MetaData`, the `Spread`, and the `SelectedPage`. The `MetaData` property is familiar to us. With the `Spread` property, we are going to configure the number of page buttons (links) that will show before and after the currently selected page in the pagination component. The last property is of type `EventCallback`. In Blazor, we use EventCallbacks to run the methods from the parent component inside the child component. In our case, every time we select a new page in the pagination component, we are going to fire the `SelectedPage` event callback which will execute the method from the parent (Products) component.

Now, let’s create a new `PagingLink` class in the `Features` folder:

In this class, we have four properties. We are going to use the `Text` property for every button text in the pagination component (Previous, Next, 1,2,3…). The `Page` property will hold the value of the current page. Finally, we are going to use the `Enabled` and `Active` properties to decide whether to add the enabled and active classes to the pagination button.

### Generating Links for the Pagination

Now, let’s get back to the `Pagination` class:

Here, we create a new `_links` variable that will hold all the links for our pagination component. As soon as our parameters get their values, the `OnParameterSet` lifecycle method will run and call the `CreatePaginationLinks` method. In that method, we create the `Previous` link, the page number links with the `Active` property set to true for the current page and the `Next` link. Additionally, we have the `OnSelectedPage` method.

This method will run as soon as the user clicks any link in the pagination component. Of course, if that link is the currently selected or disabled link, we do nothing. On the other side, we set the `CurrentPage` to the selected page and invoke our `EventCallback` property.

After these changes, we can modify the `Pagination.razor` component:

This is a simple pagination HTML code, where we iterate through each link in the `_links` field, set disabled and active classes conditionally, and run our `OnSelectedPage` local method.

And that’s it regarding the pagination component. We can now modify the `Products.razor` page:

We can see that we call the `Pagination` component and pass the values for the `MetaData` and the `Spread` properties. Furthermore, we send our local `SelectedPage` function to the `SelectedPage` EventCallback property in the `Pagination` component. Of course, we have to create our local `SelectedPage` method in the `Products.razor.cs` class:

As you can see, the logic for calling the repository method and populating the `ProductList` and `MetaData` properties are inside the `GetProducts` method. Additionally, we create the `SelectedPage` method, where we populate the `PageNumber` property inside the `_productParameters` object (which we use for the query string creation) and call the `GetProducts` method.

Now, let’s start both the server and client applications, and inspect the result:

[![Blazor WebAssembly Pagination Implemented](https://code-maze.com/wp-content/uploads/2020/07/01-Pagination-Implemented.gif)](https://code-maze.com/wp-content/uploads/2020/07/01-Pagination-Implemented.gif)

And there we go, we can see that everything works as we want it to.

Again, if you want to learn in more detail about Pagination in the Web API project, you can visit our [Pagination in Web API article](https://code-maze.com/paging-aspnet-core-webapi/) or visit the entire [ASP.NET Core Web API series](https://code-maze.com/net-core-series/) to learn in great detail about creating Web API projects.

## Conclusion

That’s all for this article.

We have learned how to create pagination in the server-side application and how to implement that result in our client-side application to generate the Blazor WebAssembly Pagination component.

In the next article, we are going to cover the [Search functionality in our application](https://code-maze.com/blazor-webassembly-searching/).

So, see you there.

Liked it? Take a second to support Code Maze on Patreon and get the ad free reading experience!

[![Become a patron at Patreon!](https://code-maze.com/wp-content/plugins/patron-plugin-pro/plugin/lib/patron-button-and-widgets-by-codebard/images/become_a_patron_button.png)](https://www.patreon.com/oauth2/become-patron?response_type=code&min_cents=100&client_id=9_akhcsDQMGo-FTlVmNpM_uxSV4fbW3vnrz7CBRV9RxwjMPCLfWgodhrcE0UuHH4&scope=identity%20identity[email]&redirect_uri=https://code-maze.com/patreon-authorization/&state=eyJmaW5hbF9yZWRpcmVjdF91cmkiOiJodHRwczpcL1wvY29kZS1tYXplLmNvbVwvYmxhem9yLXdlYmFzc2VtYmx5LXBhZ2luYXRpb25cLyJ9&utm_source=https%3A%2F%2Fcode-maze.com%2Fblazor-webassembly-pagination%2F&utm_medium=patreon_wordpress_plugin&utm_campaign=11086160&utm_term=&utm_content=post_unlock_button)


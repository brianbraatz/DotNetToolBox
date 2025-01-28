---
Compiles: false
Runs: false
Docker: false
SignalR: false
DotNetVersion: 8
description: "!good! chat included 8 works-Samples to accompany the official Microsoft Blazor documentation-includes BlazorSignalRAppBBDockerAdded"
tags:
  - SampleCode
---
status
this is working good now it seems
.net 8
need to add debugging 

https://learn.microsoft.com/en-us/visualstudio/containers/edit-and-refresh?view=vs-2022

docker run -d -p 8080:8080 --name MyBlazorSignalRApp blazorsignalrappdockeradded

http://localhost:8080/
![[Pasted image 20240728112339.png]]




--------------

Original examplke
![[BlazorSignalRApp.sln]]



[[BlazorSignalRAppBBDockerAdded]] i added docker to this
sln is here

![[BlazorSignalRAppBBDockerAdded.sln]]

![[Pasted image 20240728110357.png]]



# dotnetblazor-samples

%% Begin Waypoint %%
- **src**
	- **3.1**
		- **BlazorSample_Server**
			- **build-a-blazor-app**

			- **Data**

			- **layouts**

			- **lifecycle**

			- **Pages**
				- **advanced-scenarios**

				- **build-a-blazor-app**

				- **call-dotnet-from-js**

				- **call-js-from-dotnet**

				- **data-binding**

				- **dependency-injection**

				- **element-component-model-relationships**

				- **event-handling**

				- **forms-and-validation**

				- **generic-type-support**

				- **handle-errors**

				- **index**

				- **layouts**

				- **lifecycle**

				- **logging**

				- **overwriting-parameters**

				- **prerendering**

				- **rendering**

				- **routing**

				- **splat-attributes-and-arbitrary-parameters**

				- **synchronization-context**

				- **templated-components**

			- **Properties**

			- **routing**

			- **Shared**
				- **advanced-scenarios**

				- **call-dotnet-from-js**

				- **data-binding**

				- **element-component-model-relationships**

				- **event-handling**

				- **forms-and-validation**

				- **generic-type-support**

				- **index**

				- **layouts**

				- **overwriting-parameters**

				- **splat-attributes-and-arbitrary-parameters**

				- **templated-components**

			- **wwwroot**
				- **css**
					- **bootstrap**

					- **open-iconic**
						- **font**
							- **css**

							- **fonts**

						- [[README]]
		- **BlazorSample_WebAssembly**
			- **build-a-blazor-app**

			- **layouts**

			- **Pages**
				- **advanced-scenarios**

				- **build-a-blazor-app**

				- **call-dotnet-from-js**

				- **call-js-from-dotnet**

				- **call-web-api**

				- **configuration**

				- **data-binding**

				- **dependency-injection**

				- **element-component-model-relationships**

				- **environments**

				- **event-handling**

				- **forms-and-validation**

				- **generic-type-support**

				- **handle-errors**

				- **index**

				- **layouts**

				- **lifecycle**

				- **logging**

				- **overwriting-parameters**

				- **prerendering**

				- **rendering**

				- **routing**

				- **splat-attributes-and-arbitrary-parameters**

				- **synchronization-context**

				- **templated-components**

			- **Properties**

			- **routing**

			- **Shared**
				- **advanced-scenarios**

				- **call-dotnet-from-js**

				- **data-binding**

				- **element-component-model-relationships**

				- **event-handling**

				- **forms-and-validation**

				- **generic-type-support**

				- **index**

				- **layouts**

				- **overwriting-parameters**

				- **splat-attributes-and-arbitrary-parameters**

				- **templated-components**

			- **UIThemeClasses**

			- **wwwroot**
				- **css**
					- **bootstrap**

					- **open-iconic**
						- **font**
							- **css**

							- **fonts**

						- [[README]]
				- **sample-data**

		- **BlazorServerEFCoreSample**
			- **Data**

			- **Grid**

			- **Pages**

			- [[README]]
			- **Shared**

			- **wwwroot**
				- **css**
					- **bootstrap**

					- **open-iconic**
						- **font**
							- **css**

							- **fonts**

						- [[README]]
		- **BlazorServerSignalRApp**
			- **Data**

			- **Hubs**

			- **Pages**

			- **Shared**

			- **wwwroot**
				- **css**
					- **bootstrap**

					- **open-iconic**
						- **font**
							- **css**

							- **fonts**

						- [[README]]
		- **BlazorWebAssemblySignalRApp**
			- **Client**
				- **Pages**

				- **Shared**

				- **wwwroot**
					- **css**
						- **bootstrap**

						- **open-iconic**
							- **font**
								- **css**

								- **fonts**

							- [[README]]
			- **Server**
				- **Controllers**

				- **Hubs**

			- **Shared**

	- **6.0**
		- **BlazorSample_Server**
			- **build-a-blazor-app**

			- **Data**

			- **dependency-injection**

			- **layouts**

			- **lifecycle**

			- **Pages**
				- **advanced-scenarios**

				- **build-a-blazor-app**

				- **call-dotnet-from-js**

				- **call-js-from-dotnet**

				- **control-head-content**

				- **data-binding**

				- **dependency-injection**

				- **dynamiccomponent**

				- **element-component-model-relationships**

				- **event-handling**

				- **file-downloads**

				- **file-uploads**

				- **forms-and-validation**

				- **generic-type-support**

				- **handle-errors**

				- **images**

				- **index**

				- **layouts**

				- **lifecycle**

				- **logging**

				- **overwriting-parameters**

				- **prerendering**

				- **rendering**

				- **routing**

				- **splat-attributes-and-arbitrary-parameters**

				- **synchronization-context**

				- **templated-components**

			- **Properties**

			- **routing**

			- **Services**

			- **Shared**
				- **advanced-scenarios**

				- **call-dotnet-from-js**

				- **data-binding**

				- **dynamiccomponent**

				- **element-component-model-relationships**

				- **event-handling**

				- **forms-and-validation**

				- **generic-type-support**

				- **host-and-deploy**

				- **index**

				- **layouts**

				- **overwriting-parameters**

				- **splat-attributes-and-arbitrary-parameters**

				- **templated-components**

			- **wwwroot**
				- **css**
					- **bootstrap**

					- **open-iconic**
						- **font**
							- **css**

							- **fonts**

						- [[README]]
				- **files**

				- **images**

		- **BlazorSample_WebAssembly**
			- **build-a-blazor-app**

			- **dependency-injection**

			- **layouts**

			- **Pages**
				- **advanced-scenarios**

				- **build-a-blazor-app**

				- **call-dotnet-from-js**

				- **call-js-from-dotnet**

				- **call-web-api**

				- **configuration**

				- **control-head-content**

				- **data-binding**

				- **dependency-injection**

				- **dynamiccomponent**

				- **element-component-model-relationships**

				- **environments**

				- **event-handling**

				- **file-downloads**

				- **file-uploads**

				- **forms-and-validation**

				- **generic-type-support**

				- **handle-errors**

				- **images**

				- **index**

				- **layouts**

				- **lifecycle**

				- **logging**

				- **overwriting-parameters**

				- **prerendering**

				- **rendering**

				- **routing**

				- **splat-attributes-and-arbitrary-parameters**

				- **synchronization-context**

				- **templated-components**

			- **Properties**

			- **routing**

			- **Services**

			- **Shared**
				- **advanced-scenarios**

				- **call-dotnet-from-js**

				- **data-binding**

				- **dynamiccomponent**

				- **element-component-model-relationships**

				- **event-handling**

				- **forms-and-validation**

				- **generic-type-support**

				- **host-and-deploy**

				- **index**

				- **layouts**

				- **overwriting-parameters**

				- **splat-attributes-and-arbitrary-parameters**

				- **templated-components**

			- **UIThemeClasses**

			- **wwwroot**
				- **css**
					- **bootstrap**

					- **open-iconic**
						- **font**
							- **css**

							- **fonts**

						- [[README]]
				- **files**

				- **images**

				- **sample-data**

		- **BlazorServerEFCoreSample**
			- **Data**

			- **Grid**

			- **Pages**

			- **Properties**

			- [[README]]
			- **Shared**

			- **wwwroot**
				- **css**
					- **bootstrap**

					- **open-iconic**
						- **font**
							- **css**

							- **fonts**

						- [[README]]
		- **BlazorServerSignalRApp**
			- **Data**

			- **Hubs**

			- **Pages**

			- **Properties**

			- **Shared**

			- **wwwroot**
				- **css**
					- **bootstrap**

					- **open-iconic**
						- **font**
							- **css**

							- **fonts**

						- [[README]]
		- **BlazorWebAssemblyScopesLogger**
			- **Pages**

			- **Properties**

			- **Shared**

			- **wwwroot**
				- **css**
					- **bootstrap**

					- **open-iconic**
						- **font**
							- **css**

							- **fonts**

						- [[README]]
				- **sample-data**

		- **BlazorWebAssemblySignalRApp**
			- **Client**
				- **Pages**

				- **Properties**

				- **Shared**

				- **wwwroot**
					- **css**
						- **bootstrap**

						- **open-iconic**
							- **font**
								- **css**

								- **fonts**

							- [[README]]
			- **Server**
				- **Controllers**

				- **Hubs**

				- **Pages**

				- **Properties**

			- **Shared**

	- **8.0**
		- **BlazorSample_BlazorWebApp**
			- **Components**
				- **Layout**

				- **Pages**

			- **Properties**

			- **Services**

			- **wwwroot**
				- **bootstrap**

				- **files**

				- **images**

		- **BlazorSample_WebAssembly**
			- **Layout**

			- **Pages**

			- **Properties**

			- **Services**

			- **Shared**

			- **wwwroot**
				- **css**
					- **bootstrap**

				- **files**

				- **images**

				- **sample-data**

		- **[[BlazorSignalRApp]]**
		- **[[BlazorSignalRAppBBDockerAdded]]**
		- **BlazorWebAppEFCore**
			- **Components**
				- **Layout**

				- **Pages**

			- **Data**

			- **Grid**

			- **Properties**

			- [[README]]
			- **wwwroot**
				- **bootstrap**

		- **BlazorWebAppOidc**
			- **BlazorWebAppOidc**
				- **Components**
					- **Pages**

				- **Properties**

				- **wwwroot**
					- **bootstrap**

			- **BlazorWebAppOidc.Client**
				- **Layout**

				- **Pages**

				- **Weather**

				- **wwwroot**

			- [[README]]
		- **BlazorWebAppOidcBff**
			- **Aspire**
				- **Aspire.AppHost**
					- **Properties**

				- **Aspire.ServiceDefaults**

			- **BlazorWebAppOidc**
				- **Components**
					- **Pages**

				- **Properties**

				- **wwwroot**
					- **bootstrap**

			- **BlazorWebAppOidc.Client**
				- **Layout**

				- **Pages**

				- **Weather**

				- **wwwroot**

			- **MinimalApiJwt**
				- **Properties**

			- [[README]]
		- **BlazorWebAssemblyScopesLogger**
			- **Layout**

			- **Pages**

			- **Properties**

			- **wwwroot**
				- **css**
					- **bootstrap**

				- **sample-data**

		- **BlazorWebAssemblyStandaloneWithIdentity**
			- **Backend**
				- **Properties**

			- **BlazorWasmAuth**
				- **Components**
					- **Identity**

					- **Layout**

					- **Pages**

				- **Identity**
					- **Models**

				- **Properties**

				- **wwwroot**
					- **css**
						- **bootstrap**

					- **sample-data**

			- [[README]]
	- [[CODE-OF-CONDUCT]]
	- [[LICENSE-CODE]]
	- [[LICENSE]]
	- [[README]]

%% End Waypoint %%
 
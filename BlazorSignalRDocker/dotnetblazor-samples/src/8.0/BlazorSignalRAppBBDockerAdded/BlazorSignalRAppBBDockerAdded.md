---
Compiles: true
Runs: true
Docker: true
SignalR: true
DotNetVersion: 8
description: working sample from dotnet samples!
tags:
  - SampleCode
---
from
[[dotnetblazor-samples]]


docker build -t blazorsignalrappdockeradded .

docker run -d -p 7034:7034 --name MyBlazorSignalRApp blazorsignalrappdockeradded
docker run -d -p 8080:8080 --name MyBlazorSignalRApp blazorsignalrappdockeradded

docker run -p 8080:8080 --name MyBlazorSignalRApp blazorsignalrappdockeradded


docker stop MyBlazorSignalRApp

			   docker rm MyBlazorSignalRApp


Docker error response from daemon: "Conflict ... already in use by container"
Asked 9 years ago
Modified 24 days ago
Viewed 335k times

Report this ad
245

I've been using Docker on my PC to run Quantum GIS with the following instructions I've found here: docker-qgis-desktop - A simple docker container that runs QGIS desktop

Everything has been running fine until last week when I started to get this error message:

Error response from daemon: Conflict. 
The name "qgis-desktop-2-4" is already in use by container 235566ae17b8. 
You have to delete (or rename) that container to be able to reuse that nam

10 Answers
Sorted by:

Highest score (default)
377

It looks like a container with the name qgis-desktop-2-4 already exists in the system. You can check the output of the below command to confirm if it indeed exists:

$ docker ps -a
The last column in the above command's output is for names.

If the container exists, remove it using:

$ docker rm qgis-desktop-2-4
Or forcefully using,

$ docker rm -f qgis-desktop-2-4
And then try creating a new container.




# BlazorSignalRAppBBDockerAdded

%% Begin Waypoint %%
- **bin**
	- **Debug**
		- **net8.0**
			- **cs**

			- **de**

			- **es**

			- **fr**

			- **it**

			- **ja**

			- **ko**

			- **pl**

			- **pt-BR**

			- **refs**

			- **ru**

			- **tr**

			- **zh-Hans**

			- **zh-Hant**

- [[BlazorSignalRApp]]
- **Components**
	- **Layout**

	- **Pages**

- **Hubs**

- **obj**
	- **Container**

	- **Debug**
		- **net8.0**
			- **ref**

			- **refint**

			- **scopedcss**
				- **bundle**

				- **Components**
					- **Layout**

				- **projectbundle**

			- **staticwebassets**

- **Properties**

- **wwwroot**
	- **bootstrap**


%% End Waypoint %%
 
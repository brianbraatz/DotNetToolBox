---
created: 2024-07-22T13:26:39 (UTC -05:00)
tags: []
source: https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/
author: 
---

# Deploying Containerised Apps to Azure Web App for Containers | Chris Sainty - Building with Blazor

source: https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/

> ## Excerpt
> In this post, I show how to setup and configure the Azure Web App for Container service. I also show how to automatically deploy new images to the instance using Azure Pipelines.

---
In the first half of this series, we covered how to containerise both [Blazor Server](https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-server-app/) and [Blazor WebAssembly](https://chrissainty.com/https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-webassembly-app/) apps. In [part 3](https://chrissainty.com/containerising-blazor-applications-with-docker-publishing-to-azure-container-registry-using-azure-pipelines/), we automated that process using Azure Pipelines. We configured a CI pipeline which automatically builds code upon check-in to GitHub and publishes the Docker image to Azure Container Registry.

In this post, we’re going to learn how to deploy a Docker image from our container registry to an Azure App Service, which completes the cycle of development to release. We’re going to start by taking a look at the Web App for Containers service and why we would want to use it. Then we’ll create a Web App for Containers instance using the Azure Portal. Finally, we’ll create a build pipeline in Azure Pipelines to automate the deployment of our Docker image to that instance.

## Web App for Containers - Introduction

[Web App for Containers](https://azure.microsoft.com/en-gb/services/app-service/containers/) (WAC) is part of the [Azure App Service](https://azure.microsoft.com/en-gb/services/app-service/) platform. It allows us to _“easily deploy and run containerised applications on Windows and Linux”_. The service offers built-in load balancing and auto scaling as well as full CI/CD deployment from both Docker Hub and private registries such as Azure Container Registry.

> It has never been easier to deploy container-based web apps…

Another great thing about this service is that it manages and maintains the underlying container orchestrator, so we can focus on building our apps - which I really like. Plus, you can even run [multi-container apps](https://docs.microsoft.com/en-us/azure/app-service/containers/quickstart-multi-container) now!

## Creating a container instance in WAC

We’re going to start by walking through creating a container instance via the Azure Portal. Once you’re logged into your Azure account, go to **App Services** then click the **Add** button near the top of the blade or the **Create app service** button in the centre of the blade.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/add-app-service.png)

You’ll then see the _Create app service_ blade. Start by selecting your subscription and resource group before moving on to the app service plan details section.

Give the instance a name, set the publish option to **Docker Image** and select the OS to use, then pick a region to host it. Finally either select an existing App Service Plan or create a new one if you wish.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/configure-app-service.png)

Once you’re done, click **Next: Docker**.

On this screen we can configure our container settings. We’re only deploying a single container to we can leave the first setting alone. For Image Source, select Azure Container Registry then fill in the **Registry**, **Image** and **Tag**.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/configure-app-service-docker.png)

When you’re happy, click **Review and create**. You’ll be presented with a summary screen, double check the details and then click **Create** to finish.

After a moment you should see a message stating _Your deployment is complete_. Click on the **Go to resource** link and you can see the overview screen for the instance. You can click on the URL link in to top right of the blade to view the running instance - This does take a few seconds to fire the app up the first time.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/web-app-for-containers.png)

Congratulations, you’ve now got a fully working Blazor application running in a container on Azure!

So far so good, we have successfully deployed an image from the container registry to an app service but we don’t want to have to come here and do this manually every time we update our code.

To complete our pipeline we’re going to set up a release pipeline which will automatically deploy new images to our Web App for Containers instance.

## Deploying from Azure Pipelines

We’re going to continue where we left off in part 3. This time we’re going to head to the _**Releases**_ option under the Pipelines menu. Then we’re going to click the _**New pipeline**_ button.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/new-build-pipeline.png)

To start, we need to select a template to use for our pipeline, we’re going to select _**empty job**_ here.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/emtpy-template.png)

Once we select empty job we need to click the **_view stage tasks_** link in Stage 1.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/select-job.png)

Now click the + next to agent job to add a new task.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/add-job-to-task.png)

Using the add task search box, type in _Azure App Service_ and then add the Azure Web App for Containers task.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/add-web-app-for-containers-task.png)

Click on the task to load its configuration screen. Select your Azure subscription, then the app name, which is the instance we created in the first half of the post. Finally, fill in the image name, this is the fully qualified image name (your\_registry.azurecr.io/repo:tag\_).

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/configure-task.png)

The last thing we need to configure is where to get the image we are going to deploy. Click on the **_Pipeline_** tab, then in the artifacts box click **_Add an artifact_**. Then under source type click the _**show more**_ link and then select _**Azure Container Registry**_.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/configure-artifact.png)

Go ahead and select your service connection, resource group, azure container registry and repository. Then click **_Add_**.

That should be everything we need. If you save your pipeline using the save button at the top of the screen, you can also give your pipeline a more meaningful name by clicking on the _New release pipeline_ text in the top left.

Now it’s time to test it all out. Click the **_Create Release_** button in the top right and then click the **_Create_** button to start the release.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/create-release.png)

If all goes well, after a minute or two, you should see the stage turn green with a succeeded message.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/successful-deployment.png)

Type in the FQDN for your app instance and you should be able to see your application working.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/web-app-for-containers-1.png)

## Enabling Continuous Deployment (optional)

To create a full CD pipeline, then you’ll want to trigger a new deployment every-time a new image is built and pushed to the container registry repository. To enable this, edit the release pipeline and click the enable **Continuous deployment trigger**.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/enable-cd-trigger.png)

From here toggle the **Enabled** switch to turn on continuous deployments.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/enable-cd.png)

This will now create a new release automatically every-time a new image is pushed to the container registry repository. However, if you want a bit of control, say you only want to create a release when the image has a certain tag, you can add a tag filter.

This is just a regex expression, in the image below I’ve added the filter `^latest$` so that only images with a tag of `latest` will get deployed.

![](https://chrissainty.com/containerising-blazor-applications-with-docker-deploying-containerised-apps-to-azure-web-app-for-containers/images/add-tag-filter.png)

That’s it, we now have a continuous deployment pipeline configured.

## Summary

In this post, we started by creating a new Web App for Containers instance using the Azure Portal. Then configuring that instance to deploy and run an image from our Azure Container Registry.

Next, we built on our CI pipeline from earlier posts, adding the ability to automatically deploy new versions to our app instance via Azure Pipelines. Then finished off with an optional step to enable full continuous deployment on our pipeline.

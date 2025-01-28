# SignalR - Sample

[![Azure DevOps builds](https://img.shields.io/azure-devops/build/raschmitt/7618d927-8467-43e2-b5e9-1aeddc1fbfdc/25?label=Build&style=flat-square)](https://dev.azure.com/raschmitt/raschmitt/_build?definitionId=25)
[![Sonar Coverage](https://img.shields.io/sonar/coverage/raschmitt_signalr-sample?label=Code%20Coverage&server=https%3A%2F%2Fsonarcloud.io&style=flat-square)](https://sonarcloud.io/dashboard?id=raschmitt_signalr-sample)

This sample projects shows how to use `SignalR` to work with real-time applications in `.Net`.

For more information on `SignalR` refer to their [official repository](https://github.com/dotnet/aspnetcore/tree/main/src/SignalR).

## Dependencies 

- [Docker](https://docs.docker.com/get-docker/)

## Running the project

1. After cloning this repository go into the `signalr-sample` directory and run `docker-compose up`.

2. Access [http://localhost:8080/swagger](http://localhost/swagger) and you are good to start playing with API.

## Projetc structure

- ### Hub Sample

This project is a simple `API` wich provides methods to add and retrieve items from a list. It also provides a `SignalR Hub`, wich serves as a high-level handler for client-server communication.

Whenever a new item gets added to the list all conected `Clients` get notified.

| ROUTE | METHOD | DATA PARMS | DESCRIPTION |
| :---: | :---: | :---: | :---: |
| /items | GET | [none] | Gets the list of items
| /items | POST | "string" | Adds a new item to the list

- ### Client Sample

This project is a console application that connects to the `SignalR HUB` and prints an updated list of items whem a new item gets added to the list.

Two instances of this project get created by our `docker-compose` so we can see how `SignalR` can keep multiple client instaces updated in real-time.

## Contributions

  Contributions and feature requests are always welcome.

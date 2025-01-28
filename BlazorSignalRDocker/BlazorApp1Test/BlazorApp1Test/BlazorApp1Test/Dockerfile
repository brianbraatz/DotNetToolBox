#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["BlazorApp1Test/BlazorApp1Test/BlazorApp1Test.csproj", "BlazorApp1Test/BlazorApp1Test/"]
COPY ["BlazorApp1Test/BlazorApp1Test.Client/BlazorApp1Test.Client.csproj", "BlazorApp1Test/BlazorApp1Test.Client/"]
RUN dotnet restore "./BlazorApp1Test/BlazorApp1Test/BlazorApp1Test.csproj"
COPY . .
WORKDIR "/src/BlazorApp1Test/BlazorApp1Test"
RUN dotnet build "./BlazorApp1Test.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./BlazorApp1Test.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BlazorApp1Test.dll"]
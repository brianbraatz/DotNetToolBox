FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["signalr_scale_out/signalr_scale_out.csproj", "signalr_scale_out/"]
RUN dotnet restore "signalr_scale_out/signalr_scale_out.csproj"
COPY . .
WORKDIR "/src/signalr_scale_out"
RUN dotnet build "signalr_scale_out.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "signalr_scale_out.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "signalr_scale_out.dll"]
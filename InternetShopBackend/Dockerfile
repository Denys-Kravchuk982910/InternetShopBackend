FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish
COPY Images /app/publish/Images
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as runtime
WORKDIR /app
COPY --from=build /app/publish /app
RUN mkdir -p /app/Images
COPY --from=build /app/publish/Images /app/Images

ENTRYPOINT [ "dotnet", "/app/InternetShopBackend.dll" ]


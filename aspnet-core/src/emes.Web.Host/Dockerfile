FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/emes.Web.Host/emes.Web.Host.csproj", "src/emes.Web.Host/"]
COPY ["src/emes.Web.Core/emes.Web.Core.csproj", "src/emes.Web.Core/"]
COPY ["src/emes.Application/emes.Application.csproj", "src/emes.Application/"]
COPY ["src/emes.Core/emes.Core.csproj", "src/emes.Core/"]
COPY ["src/emes.EntityFrameworkCore/emes.EntityFrameworkCore.csproj", "src/emes.EntityFrameworkCore/"]
WORKDIR "/src/src/emes.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/emes.Web.Host", "src/emes.Web.Host"]
COPY ["src/emes.Web.Core", "src/emes.Web.Core"]
COPY ["src/emes.Application", "src/emes.Application"]
COPY ["src/emes.Core", "src/emes.Core"]
COPY ["src/emes.EntityFrameworkCore", "src/emes.EntityFrameworkCore"]
WORKDIR "/src/src/emes.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "emes.Web.Host.dll"]

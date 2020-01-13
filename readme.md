# [.NET Core](https://docs.microsoft.com/en-us/dotnet/core/) and [Angular](https://angular.io/) Demo

## Setup

### Front-End Setup

Install [Node](https://nodejs.org/)

### Install Front-End Dependencies

```shell
cd ClientApp
npm install -g @angular/cli
npm install
```

### Back-End Setup

This project was developed with [Visual Studio for Mac](https://visualstudio.microsoft.com/vs/mac/) and [Azure Data Studio](https://github.com/Microsoft/azuredatastudio) but will also work on Windows.

Create a [Microsoft Azure](http://azure.microsoft.com) SQL database called 'incidents'

Set the connection string in [appsettings.json](./NetCoreAngularDemo/appsettings.json), e.g. `Server=tcp:[servername].database.windows.net,1433;Database=Incidents;User ID=[username]@[servername];Password=[password];Trusted_Connection=False;Encrypt=True;`.

Run the script generated with [Entity Framework Core tools](https://docs.microsoft.com/en-gb/ef/core/miscellaneous/cli/dotnet):

```shell
dotnet ef migrations add migration1
dotnet ef migrations script 20200111191211_migration1 -o ./Migrations/migration1.sql
```

This is in [Migrations/migration1.sql](./NetCoreAngularDemo/Migrations/migration1.sql).

## Run

### Run the Back-End

Run the solution with Visual Studio.

Browse to [https://localhost:5001/incidents](https://localhost:5001/incidents)

Get incidents:

```shell
curl -v https://localhost:5001/incidents
```

Create an incident:

```shell
curl -d "{\"Type\": \"SomeType\", \"Description\": \"SomeDescription\", \"Person\": \"SomePerson\", \"dt\": \"2020-01-01T18:18:00.000Z\"}" -H "Content-Type: application/json" https://localhost:5001/incidents
```

Update an incident:

```shell
curl -X PUT -d "{\"Type\": \"SomeOtherType\"}" -H "Content-Type: application/json" https://localhost:5001/incidents/1
```

Delete an incident:

```shell
curl -X DELETE https://localhost:5001/incidents/1
```

### Run the Front-End

```shell
cd ClientApp
ng serve
```

Browse to [http://localhost:4200](http://localhost:4200)

### Build the Front-End

```shell
cd ClientApp
ng build --prod
```

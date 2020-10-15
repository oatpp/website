---
title: Example PostgreSQL
description: Example of a production grade entity service with Swagger-UI and configuration profiles. Storing information in PostgreSQL. Using libpq.
sidebarDepth: 0
---

# PostgreSQL Example <seo/>

[Github Repository](https://github.com/oatpp/example-postgresql)

A complete example of a "CRUD" service (UserService) built with Oat++ and using oatpp ORM with PostgreSQL.

In this example:

- How to create CRUD endpoints.
- How to use [oatpp ORM](/docs/components/orm/) - PostgreSQL example.
- How to document API with Swagger-UI and OpenApi 3.0.0.

## Overview

This project is using the following oatpp modules:

- [oatpp](https://github.com/oatpp/oatpp) 
- [oatpp-swagger](https://github.com/oatpp/oatpp-swagger)
- [oatpp-postgresql](https://github.com/oatpp/oatpp-postgresql)

### Project layout

```
|- CMakeLists.txt                        // projects CMakeLists.txt
|- src/
|    |
|    |- controller/                      // Folder containing Controller where all endpoints are declared
|    |- db/                              // Folder containing the database client
|    |- dto/                             // DTOs are declared here
|    |- service/                         // Service business logic classes (UserService)
|    |- ServiceComponent.hpp             // Service configuration (port, ObjectMapper, Database)
|    |- SwaggerComponent.hpp             // Configuration for swagger-ui
|    |- AppComponent.hpp                 // Service configuration is loaded here
|    |- DatabaseComponent.hpp            // Database config
|    |- App.cpp                          // main() is here
|    
|- test/                                 // test folder
|- utility/install-oatpp-modules.sh      // utility script to install required oatpp-modules.
|- resources/config.json                 // configuration file with configuration profiles
|- Dockerfile                            // Dockerfile
|- docker-compose.yaml                   // Docker-compose with this service and postgresql
```

---

## Build and Run

### Using CMake

**Requires** 

- This example also requires the PostgreSQL package installed.
   - On Alpine `$ apk add postgresql-dev`
   - On Ubuntu `$ apt-get install postgresql-server-dev-all`
   
   For more info see [oatpp-postgresql/README.md](https://github.com/oatpp/oatpp-postgresql/blob/master/README.md)
- `oatpp`, `oatpp-swagger` and `oatpp-postgresql` modules installed. You may run `utility/install-oatpp-modules.sh` 
script to install required oatpp modules.   

```
$ mkdir build && cd build
$ cmake ..
$ make 
$ ./example-postgresql-exe  # - run application.
```

*PostgreSQL is expected running as for `dev` config profile*

### In Docker

#### Dockerfile

```
$ docker build -t example-postgresql .
$ docker run -p 8000:8000 -e CONFIG_PROFILE='dev' -t example-postgresql
```

#### docker-compose

```
$ docker-compose up
```

*docker-compose will run service with `local-docker` config profile*

### After run

Go to [http://localhost:8000/swagger/ui](http://localhost:8000/swagger/ui) to try endpoints.

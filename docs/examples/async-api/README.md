# Async API Example <seo/>

Example project how-to use oatpp asynchronous API.

::: tip
[Github Repo](https://github.com/oatpp/example-async-api)
:::

## Overview

### Project layout

```

- CMakeLists.txt               // project loader script. load and build dependencies
- main/                        // main project directory
    |
    |- CMakeLists.txt          // projects CMakeLists.txt
    |- src/                    // source folder
    |- test/                   // test folder

```
```
- src/
    |
    |- controller/              // Folder containing controller where all endpoints are declared
    |- dto/                     // DTOs are declared here
    |- AppComponent.hpp         // Service config
    |- Logger.hpp               // Application Logger
    |- App.cpp                  // main() is here

```


## Build and Run

### Using CMake

```bash
$ mkdir build && cd build
$ cmake ..
$ make run        ## Download, build, and install all dependencies. Run project

```

### In Docker

```bash
$ docker build -t example-async-api .
$ docker run -p 8000:8000 -t example-async-api
```

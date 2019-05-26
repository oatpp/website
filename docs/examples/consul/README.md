---
title: Example Consul Integration
description: Example project how-to use oatpp-consul module.
sidebarDepth: 0
---

# Consul Integration Example <seo/>

[Github Repository](https://github.com/oatpp/example-consul)

Example project how-to use [oatpp-consul](/docs/modules/oatpp-consul/) module.

## Overview
This project is using [oatpp](/docs/modules/oatpp/) and [oatpp-consul](/docs/modules/oatpp-consul/) modules.

Currently this is trivial example.- Read/Write from/to Consul KV via endpoints declared in Controller.
More complex example later.

In this example Consul is expected to run at port 8500.

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
$ docker build -t example-consul .
$ docker run -p 8000:8000 -t example-consul
```

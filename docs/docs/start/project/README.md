---
title: Starter Project
description: Starter project based on oatpp simple API.
sidebarDepth: 0
---

# Starter Project <seo/>

Simple-API web service starter project.

::: tip
[Github Repo](https://github.com/oatpp/oatpp-starter)
:::

## Overview

### Project layout

```

- CMakeLists.txt          // project loader script. load and build dependencies
- main/                   // main project directory
    |
    |- CMakeLists.txt     // projects CMakeLists.txt
    |- src/               // source folder
    |- test/              // test folder

```
```
- src/
    |
    |- controller/              // Folder containing UserController where all endpoints are declared
    |- dto/                     // DTOs are declared here
    |- AppComponent.hpp         // Service config
    |- Logger.hpp               // Application Logger
    |- App.cpp                  // main() is here

```


## Build and Run

### Using CMake

```
$ mkdir build && cd build
$ cmake ..
$ make run        ## Download, build, and install all dependencies. Run project

```

### In Docker

```
$ docker build -t oatpp-starter .
$ docker run -p 8000:8000 -t oatpp-starter
```

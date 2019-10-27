---
title: Async Starter Project
description: Starter project based on oatpp asynchronous API.
sidebarDepth: 0
---

# Starter Project - Async API<seo/>

[Github Repository](https://github.com/oatpp/oatpp-starter-async)

Starter project of oat++ (AKA oatpp) application. Based on oatpp Async API.

::: tip

Async API suits best for services dedicated to a single type of tasks that run at high concurrency levels.  
Example:
- Simultanious download of multiple files.
- Streaming to large number of clients (1K or more).
- Chats.

**For all other purposes use simple API**.

:::

## Before you start

Read:

- [Simple API vs Async API](/docs/simple-vs-async/)
- [Async](/docs/async/)
- [Oatpp-Coroutines](/docs/oatpp-coroutines/)
- [ENDPOINT_ASYNC](/docs/components/api-controller/#endpoint-async-specifics)

## Overview

### Project layout

```
|- CMakeLists.txt                        // projects CMakeLists.txt
|- src/
|    |
|    |- controller/                      // Folder containing UserController where all endpoints are declared
|    |- dto/                             // DTOs are declared here
|    |- AppComponent.hpp                 // Service config
|    |- App.cpp                          // main() is here
|    
|- test/                                 // test folder
|- utility/install-oatpp-modules.sh      // utility script to install required oatpp-modules.
```

---

### Build and Run

#### Using CMake

**Requires** 

- `oatpp` module installed. You may run `utility/install-oatpp-modules.sh` 
script to install required oatpp modules.

```bash
$ mkdir build && cd build
$ cmake ..
$ make 
$ ./my-project-exe                  # - run application.

```

#### In Docker

```bash
$ docker build -t oatpp-starter-async .
$ docker run -p 8000:8000 -t oatpp-starter-async
```

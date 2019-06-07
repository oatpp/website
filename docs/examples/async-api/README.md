---
title: Example Async API
description: Example project how-to use oatpp asynchronous API.
sidebarDepth: 0
---

# Async API Example <seo/>

[Github Repository](https://github.com/oatpp/example-async-api)

Example project how-to use oatpp asynchronous API.

## Overview

### Project layout

```
|- CMakeLists.txt                        // projects CMakeLists.txt
|- src/
|    |
|    |- controller/                      // Folder containing controller where all endpoints are declared
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

```
$ mkdir build && cd build
$ cmake ..
$ make 
$ ./example-async-api-exe  # - run application.

```

#### In Docker

```
$ docker build -t example-async-api .
$ docker run -p 8000:8000 -t example-async-api
```

## Read More

- [Simple API vs Async API](/docs/simple-vs-async/)
- [Async](/docs/async/)
- [Oatpp-Coroutines](/docs/oatpp-coroutines/)
- [ENDPOINT_ASYNC](/docs/components/api-controller/#endpoint-async-specifics)

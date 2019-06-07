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

- `oatpp` and `oatpp-consul` modules installed. You may run `utility/install-oatpp-modules.sh` 
script to install required oatpp modules.

```bash
$ mkdir build && cd build
$ cmake ..
$ make 
$ ./example-consul-exe          # - run application.
```

#### In Docker

```bash
$ docker build -t example-consul .
$ docker run -p 8000:8000 -t example-consul
```

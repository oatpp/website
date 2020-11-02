---
title: Installation on Windows
description: Installing oatpp web framework on Windows
sidebarDepth: 0
---

# Installation on Windows <seo/>

## Requirements 

- Microsoft Visual Studio (Tested with Visual Studio 2017)
- CMake (Latest version recommended)
- Git

## Install Oat++

```bash
$ git clone https://github.com/oatpp/oatpp.git
$ cd oatpp\
$ MD build
$ cd build\

$ cmake ..
$ cmake --build . --target INSTALL
```

### Installation CMake options:

|Option|Default|Description|
|---|---|---|
|`CMAKE_BUILD_TYPE`|`Debug`|Build type.|
|`BUILD_SHARED_LIBS`|`OFF`|Leave this option to `OFF`. Oat++ is meant to be used as a static library.|
|`OATPP_BUILD_TESTS`|`ON`|Set it to `OFF` to disable tests build.|
|`OATPP_DISABLE_ENV_OBJECT_COUNTERS`|`OFF`|If `ON`, do not count oatpp objects (do not detect memory-leaks). This will increase performance. <br> **Note:** DO NOT use this flags to build/run application tests, as tests won't detect memory-leaks.|
|`OATPP_DISABLE_POOL_ALLOCATIONS`|`OFF`|If `ON`, do not use oatpp memory-pools.|
|`OATPP_COMPAT_BUILD_NO_THREAD_LOCAL`|`OFF`|Build without `thread_local` feature. See [#81](https://github.com/oatpp/oatpp/issues/81).|

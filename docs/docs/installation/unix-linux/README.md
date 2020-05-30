---
title: Installation on Unix/Linux
description: Installing oatpp web framework on Unix/Linux
sidebarDepth: 0
---

# Installation on Unix/Linux <seo/>

The installation process of Oat++ is simple and straightforward.
If you have all [prerequisites](#prerequisites) installed, jump straight to [Install Oat++](#install-oat).

[[TOC]]

## Prerequisites 

- Git
- C++ compiler supporting C++ version >= 11.
- Make
- CMake version >= 3.1

For details see [Installing Prerequisites](#installing-prerequisites).

## Install Oat++

Once all prerequisites installed - install Oat++:

```bash
$ git clone https://github.com/oatpp/oatpp.git
$ cd oatpp/

$ mkdir build && cd build

$ cmake ..
$ make install
```

### Installation CMake options:

|Option|Default|Description|
|---|---|---|
|`CMAKE_BUILD_TYPE`|`Debug`|Build type.|
|`OATPP_DISABLE_ENV_OBJECT_COUNTERS`|`OFF`|If `ON`, do not count oatpp objects (do not detect memory-leaks). This will increase performance. <br> **Note:** DO NOT use this flags to build/run application tests, as tests won't detect memory-leaks.|
|`OATPP_DISABLE_POOL_ALLOCATIONS`|`OFF`|If `ON`, do not use oatpp memory-pools.|
|`OATPP_COMPAT_BUILD_NO_THREAD_LOCAL`|`OFF`|Build without `thread_local` feature. See [#81](https://github.com/oatpp/oatpp/issues/81).|

## Installing Prerequisites

### Ubuntu

Install prerequisites:

```bash
$ apt-get install git
$ apt-get install cmake
$ apt-get install build-essential
```

### CentOS

Install prerequisites:

```bash
$ yum install git
$ yum install cmake
$ yum install gcc gcc-c++ make
$ yum install libatomic
```

### Fedora

Install prerequisites:

```bash
$ yum install git
$ yum install cmake
$ yum install gcc gcc-c++ make
$ yum install libatomic
```

### Alpine

Install prerequisites:

```bash
$ apk add git
$ apk add cmake
$ apk add g++
$ apk add make
```

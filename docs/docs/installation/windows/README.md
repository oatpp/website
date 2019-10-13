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

## Build

```bash
$ git clone https://github.com/oatpp/oatpp.git
$ cd oatpp\
$ MD build
$ cd build\

$ cmake ..
$ cmake --build . --target INSTALL
```

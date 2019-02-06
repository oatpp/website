---
sidebarDepth: 0
---

# Step by step guide

This is a step-by-step guide to the setting up and building oatpp project from scratch.
Finishing this guide you will have well-structured and extendable web-service with basic endpoints.

## Overview

oatpp is no-installation library and intended to be used in the form of a source code. No static nor dynamic libraries.
In this guide Git will be used to manage project's source code. oatpp library will be added to project's repository as a Git-Submodule.

```
ProjectRoot                     // yor project's root folder
|
 --lib                          // libraries folder
|  |
|   --oatpp                     // oatpp library folder (Git-Submodule)
|
 --src                          // Your project's source code
   |
   |--controller                // Folder containing ApiControllers
   |  |
   |   --MyController.hpp       // ApiController with basic endpoints
   |
   |--dto                       // Folder containing DTOs
   |  |
   |   --MyDto.hpp              // MyDto DTO
   |
   |--Logger.hpp                // Logger class which handles all OATPP_LOGV(...), OATPP_LOGD(...), OATPP_LOGE(...) calls
   |--AppComponent.hpp          // Application components. Application configuration
    --App.cpp                   // Main. Application entry point
```

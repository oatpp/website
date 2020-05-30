---
title: About
description: About Oat++ (AKA oatpp) web framework for C++. 
sidebarDepth: 0
---

# About Oat++ <seo/>

<br>
<div>
    <iframe src="https://ghbtns.com/github-btn.html?user=oatpp&repo=oatpp&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
    <iframe src="https://ghbtns.com/github-btn.html?user=oatpp&repo=oatpp&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="158px" height="30px"></iframe>
</div>

Latest version `1.1.0` :tada:

Oat++ is the modern web framework for C++.
It provides all the necessary features and components for production-grade development, including:

- Advanced REST controllers with request mappings and Swagger-UI annotations. See [Api Controller](/docs/components/api-controller/).
- Retrofit/Feign like client. See [Api Client](/docs/components/api-client/).
- Object Mapping. See [Data Transfer Object (DTO)](/docs/components/dto/).
- Dependency Injection
- Swagger-UI. See [oatpp-swagger](/docs/modules/oatpp-swagger/) module.

It is zero-dependency, easy-portable, and high-performance.

## Maintainers
<br>
<maintainers/>

## Contributors
<br>
<contributors/>

## Requirements

- Operating System:  
Linux, BSD, MacOS, Windows.  
*See full list of [supported platforms](/supported-platforms/).*

- C++ Version >= 11.

## Versioning

For convenience reasons, no compatibility between versions is maintained.  
All project modules (extensions) are compatible within the same version only.  
Thus if you need an extension for your oatpp version X - it's simple, take the same version.

**Example:**  
module `oatpp-swagger` version `1.1.0` will work with `oatpp` version `1.1.0` only.  
module `oatpp-swagger` version `1.0.0` will work with `oatpp` version `1.0.0` only.

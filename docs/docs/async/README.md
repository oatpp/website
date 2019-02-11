---
title: Async API
description: About Oatpp Asynchronous API
sidebarDepth: 0
---

# Async <seo/>

Roughly, Async approach can be described as iterating through NON-BLOCKING operations in the loop. 
Async operation should NOT block. If async operation blocks it makes the entire loop and the whole Async system wait for that operation to finish.
While it brings in some challenges to code-writing, it also leads to better CPU utilization and some performance increase.

If you go with Async approach you should always make sure:

- That you are using NON-BLOCKING I/O.
- Calls that you make from within Async methods are NON-BLOCKING.

All asynchronous logic in oatpp is based on `oatpp::async::Processor` and `oatpp::async::Coroutine`. 

Entities that provide Async API are named "**Async**Entity", Async methods are named "doSomething**Async**", 
code-gen macros that generate Async code are named "MACRO_**ASYNC**"
 
For better understanding and examples see [oatpp Coroutines](/docs/oatpp-coroutines/)


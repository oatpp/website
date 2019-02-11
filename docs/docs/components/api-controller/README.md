---
title: ApiController
description: Oatpp REST-API Controller. Endpoints for simple and async APIs.
sidebarDepth: 0
---

# Api Controller <seo/>

`ApiController` is the class which extends `oatpp::web::server::api::ApiController`. It implements and manages endpoints. 
Endpoints are created with the help of code-gen macros.  
Endpoints code generation section must begin with 
`#include OATPP_CODEGEN_BEGIN(ApiController)` and must be closed with 
`#include OATPP_CODEGEN_END(ApiController)`.  
*Do not forget to close code generation section in order to avoid macro conflicts later in the code!*

```cpp
#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/core/macro/codegen.hpp"

class MyController : public oatpp::web::server::api::ApiController {

  ...
  ...

  /**
   *  Begin ENDPOINTs generation ('ApiController' codegen)
   */
  #include OATPP_CODEGEN_BEGIN(ApiController)

  ENDPOINT("GET", "/", root) {
    return createResponse(Status::CODE_200, "Hello World!");
  }

  // TODO Insert Your endpoints here !!!

  /**
   *  Finish ENDPOINTs generation ('ApiController' codegen)
   */
  #include OATPP_CODEGEN_END(ApiController)

};

``` 

## Endpoint types

There are two types of generated endpoints:

- `ENDPOINT` - generates method which returns `std::shared_ptr<OutgoingResponse>`
- `ENDPOINT_ASYNC` - generates `oatpp::async::CoroutineWithResult` with `std::shared_ptr<OutgoingResponse>`return type. See oatpp coroutines for more info

## ENDPOINT specifics

`ENDPOINT` macro has the following params:

```cpp
ENDPOINT("<http-method>", "<path>", <method-name>, <optional param-mappings>)
```


### Possible param mappings:

- Map header of the incoming request to a method parameter:

   ```cpp
   HEADER(<data-type>, <param-name>, "<optional header-name>")
   ```

- Map path variable to a method parameter:
   ```cpp
   PATH(<data-type>, <param-name>, "<optional path-variable-name>")
   ```

- Map body of the incoming request to a method parameter. Body will be decoded as `oatpp::String`. Data type must be String:
   ```cpp
   BODY_STRING(String, <param-name>)
   ```

- Map body of the incoming request to a method parameter. Body will be decoded as `oatpp::String` and then deserialized using Controller's default `ObjectMapper`:
   ```cpp
   BODY_DTO(<DTO-class>::ObjectWrapper, <param-name>)
   ```

- Map entire `IncomingRequest` object to the method parameter:
   ```cpp
   REQUEST(std::shared_ptr<IncomingRequest>, request)
   ```

## ENDPOINT_ASYNC specifics

`ENDPOINT_ASYNC` macro has the following structure:

```cpp
ENDPOINT_ASYNC("GET", "/", Root /* Name of the Coroutine */) {

  //shared_ptr<IncomingRequest> request; - is available as a property of the class

  ENDPOINT_ASYNC_INIT(Root) ///< Generate constructor and default fields

  Action act() override {
    return _return(controller->createResponse(Status::CODE_200, "Hello Async"));
  }

};
```

In order to be able to access MyController's fields from the inside of the endpoint's Coroutine without additional casts add the following typedef to the controller:

```cpp
class MyController : public oatpp::web::server::api::ApiController {
public:
  typedef MyController __ControllerType;

...
...

};
```


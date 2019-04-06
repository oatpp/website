---
title: ApiController
description: Oatpp REST-API Controller. Endpoints for simple and async APIs.
sidebarDepth: 1
---

# Api Controller <seo/>

`ApiController` is the class which extends [oatpp::web::server::api::ApiController](/api/latest/oatpp/web/server/api/ApiController/). It implements and manages endpoints. 
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

## Endpoint Types

There are two types of generated endpoints:

- `ENDPOINT` - generates method which returns `std::shared_ptr<OutgoingResponse>`
- `ENDPOINT_ASYNC` - generates `oatpp::async::CoroutineWithResult` with `std::shared_ptr<OutgoingResponse>`return type. See oatpp coroutines for more info

## ENDPOINT Specifics

`ENDPOINT` macro has the following params:

```cpp
ENDPOINT("<http-method>", "<path>", <method-name>, <optional param-mappings>)
```


### Possible Param Mappings:

- Map header of the incoming request to a method parameter:

   ```cpp
   HEADER(<data-type>, <param-name>, "<optional header-name>")
   ```

- Map path variable to a method parameter:
   ```cpp
   PATH(<data-type>, <param-name>, "<optional path-variable-name>")
   ```
   
- Map query parameter to a method parameter:
  ```cpp
  QUERY(<data-type>, <param-name>, "<optional path-variable-name>")
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

## ENDPOINT_ASYNC Specifics

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

## Endpoint Annotation And API Documentation

`ApiController` code-gen also supports annotation of endpoints with additional info. This info is then can be used
to generate API documentation for Swagger-UI or for other API-documentation tools.  
*For how-to integrate Swagger-UI in oatpp application see [oatpp-swagger](/docs/modules/oatpp-swagger/)*.    

Additional endpoint info can be added in `ENDPOINT_INFO(<endpoint-name>)` block.

**example:**

- Simeple API:
   ```cpp
   ENDPOINT_INFO(createUser) {
     info->summary = "Create new User";
     info->addConsumes<UserDto::ObjectWrapper>("application/json");
     info->addResponse<UserDto::ObjectWrapper>(Status::CODE_200, "application/json");
   }
   ENDPOINT("POST", "demo/api/users", createUser,
            BODY_DTO(UserDto::ObjectWrapper, userDto)) {
     return createDtoResponse(Status::CODE_200, m_database->createUser(userDto));
   }
   ```

- Async API:
   ```cpp
   ENDPOINT_INFO(CreateUser) {
     info->summary = "Create new User";
     info->addConsumes<UserDto::ObjectWrapper>("application/json");
     info->addResponse<UserDto::ObjectWrapper>(Status::CODE_200, "application/json");
   }
   ENDPOINT_ASYNC("POST", "demo/api/users", CreateUser) {
       
     ENDPOINT_ASYNC_INIT(CreateUser)
    
     Action act() override {
       return request->readBodyToDtoAsync<UserDto>(controller->getDefaultObjectMapper()).callbackTo(&CreateUser::returnResponse);
     }
    
     Action returnResponse(const UserDto::ObjectWrapper& body){
       return _return(createDtoResponse(Status::CODE_200, m_database->createUser(userDto)));
     }
    
   };
   ```
   
Note that endpoint-name in `ENDPOINT_INFO(<endpoint-name>)` block should be exactly the same as endpoint-name in corresponding
`ENDPOINT` or `ENDPOINT_ASYNC` block.


### Endpoint Parameters Annotation

There are three types of endpoint params which can be annotated:

- Headers - can be accessed as `info->headers`
- Path Parameters - can be accessed as `info->pathParams`
- Query Parameters - can be accessed as `info->queryParams`

Parameters have next attributes as for [Parameter Object in OpenAPI 3.0.0 specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameter-object):

|Field Name|Type|Description|
|---|---|---|
|name               |`oatpp::String`  |The name of the parameter. Parameter names are case sensitive.|
|description        |`oatpp::String`  |A brief description of the parameter.|
|required           |`oatpp::Boolean` |Default value `true`. Determines whether this parameter is mandatory. If the parameter is "Path Parameter", its value MUST be `true`.|
|deprecated         |`oatpp::Boolean` |Default value `false`. Specifies that a parameter is deprecated and SHOULD be transitioned out of usage.|
|allowEmptyValue    |`oatpp::Boolean` |Default value `null`. Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a parameter with an empty value.|

**Example:**  
Add description to "userId" path parameter:

```cpp
  ENDPOINT_INFO(getUserById) {
    // general
    info->summary = "Get one User by userId";
    info->addResponse<UserDto::ObjectWrapper>(Status::CODE_200, "application/json");
    info->addResponse<String>(Status::CODE_404, "text/plain");
    // params specific
    info->pathParams["userId"].description = "User Identifier";
  }
  ENDPOINT("GET", "demo/api/users/{userId}", getUserById,
           PATH(Int32, userId)) {
    auto user = m_database->getUserById(userId);
    OATPP_ASSERT_HTTP(user, Status::CODE_404, "User not found");
    return createDtoResponse(Status::CODE_200, user);
  }
```

Add parameters which are not present in the mapping - 
use `add<type>(param-name)` instead of `[]` operator:

```cpp
  ENDPOINT_INFO(ConcatParams) {
    info->summary = "Example. Documenting path params for async APIs.";
    info->addResponse<String>(Status::CODE_200, "text/plain");
    info->pathParams.add<String>("param1").description = "just the first parameter"; // add param1 info
    info->pathParams.add<String>("param2").description = "just the second parameter"; // add param2 info
  }
  ENDPOINT_ASYNC("GET", "/params/{param1}/{param2}", ConcatParams) {

    ENDPOINT_ASYNC_INIT(ConcatParams)

    Action act() override {
      auto p1 = request->getPathVariable("param1");
      auto p2 = request->getPathVariable("param2");
      OATPP_ASSERT_HTTP(p1 && p2, Status::CODE_400, "param1 and param2 should not be null");
      return _return(controller->createResponse(Status::CODE_200, "param1 + param2 = '" + p1 + p2 + "'"));
    }

  };
```

### Examples and Q&A

- [How to upload and access a file. [Endpoint documentation]. [Swagger-UI]](https://github.com/oatpp/oatpp/issues/47)
- [Simple example how to document Async-Controller endpoints with Swagger-UI](https://github.com/lganzzzo/oatpp-swagger-with-async-api)

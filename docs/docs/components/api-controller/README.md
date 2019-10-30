---
title: ApiController
description: Detailed description of REST API controllers in Oat++ Web Framework.
sidebarDepth: 2
---

# Api Controller <seo/>

`ApiController` is the class which extends [oatpp::web::server::api::ApiController](/api/latest/oatpp/web/server/api/ApiController/). It implements and manages endpoints.

[[toc]]

## Declaration
 
Endpoints are created with the help of code-gen macros.  
Endpoints code generation section must begin with 
`#include OATPP_CODEGEN_BEGIN(ApiController)` and must be closed with 
`#include OATPP_CODEGEN_END(ApiController)`.  
*Do not forget to close the code generation section in order to avoid macro conflicts later in the code!*

```cpp
#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/core/macro/codegen.hpp"

#include OATPP_CODEGEN_BEGIN(ApiController) ///< Begin ApiController codegen section

class MyController : public oatpp::web::server::api::ApiController {
public:

  MyController(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>, objectMapper) /* Inject object mapper */)
    : oatpp::web::server::api::ApiController(objectMapper) 
  {}

  ENDPOINT("GET", "/", root) {
    return createResponse(Status::CODE_200, "Hello World!");
  }
  
  // TODO - more endpoints here

};

#include OATPP_CODEGEN_END(ApiController) ///< End ApiController codegen section
``` 

## Endpoint Types

There are two types of generated endpoints:

- `ENDPOINT` - Used with **Simple API** (multithreaded API). Generates method which returns `std::shared_ptr<OutgoingResponse>`
- `ENDPOINT_ASYNC` - Used with **Async API**. Generates `oatpp::async::CoroutineWithResult` with `std::shared_ptr<OutgoingResponse>` return type. 
See [oatpp coroutines](/docs/oatpp-coroutines/) for more information.

## ENDPOINT Specifics

`ENDPOINT` macro has the following params:

```cpp
ENDPOINT("<http-method>", "<path>", <method-name>, <optional param-mappings>)
```

### Path Variables Mapping

```cpp
ENDPOINT("GET", "/users/{userId}", getUserById,
         PATH(Int64, userId)) 
{
  OATPP_LOGD("Test", "userId=%d", userId->getValue());
  return createResponse(Status::CODE_200, "OK");
}
```

#### Path Variable Name Qualifier

```cpp
ENDPOINT("GET", "/users/{my-path-variable}", getUserById,
         PATH(Int64, userId, "my-path-variable")) 
{
  OATPP_LOGD("Test", "userId=%d", userId->getValue());
  return createResponse(Status::CODE_200, "OK");
}
```

### Headers Mapping

```cpp
ENDPOINT("GET", "/users", getUsers,
         HEADER(String, userAgent, "User-Agent")) 
{
  OATPP_LOGD("Test", "userAgent=%s", userAgent->getData());
  return createResponse(Status::CODE_200, "OK");
}
```

### Query Parameters Mapping

```cpp
ENDPOINT("GET", "/users", getUsers,
         QUERY(Int32, age)) 
{
  OATPP_LOGD("Test", "age=%d", age->getValue());
  return createResponse(Status::CODE_200, "OK");
}
```

Note:
- `age` - is **required** query parameter here. **Case sensitive.**
- Accessible URL example - `/users?age=21`.

#### Query Parameter Name Qualifier

```cpp
ENDPOINT("GET", "/users", getUsers,
         QUERY(Int32, age, "user-age")) 
{
  OATPP_LOGD("Test", "age=%d", age->getValue());
  return createResponse(Status::CODE_200, "OK");
}
```

Note:
- `user-age` - is **required** query parameter here. **Case sensitive.**
- Accessible URL example - `/users?user-age=21`.

#### Optional Query Parameters

```cpp
ENDPOINT("GET", "/users", getUsers,
         QUERIES(const QueryParams&, queryParams)) 
{
  for(auto& param : queryParams.getAll()) {
    OATPP_LOGD("param", "%s=%s", param.first.getData(), param.second.getData());
  }
  return createResponse(Status::CODE_200, "OK");
}
```

See also [QueryParams](/api/latest/oatpp/web/protocol/http/Http/#queryparams) data type.

### Request Body Mapping

#### Body As String

```cpp
ENDPOINT("POST", "/users", postUsers,
         BODY_STRING(String, userInfo))
{
  OATPP_LOGD("Test", "body='%s'", userInfo->getData());
  return createResponse(Status::CODE_200, "OK");
}
```

Note:
- Empty body is allowed here.
- Binary data is allowed here.

#### Body As DTO

```cpp
ENDPOINT("POST", "/users", postUsers,
         BODY_DTO(dto::UserDto::ObjectWrapper, userDto))
{
  OATPP_LOGD("Test", "user-name='%s'", userDto->name->getData());
  return createResponse(Status::CODE_200, "OK");
}
```

Note:
- The body is parsed using default ObjectMapper (the one passed to the constructor of ApiController).


### The Whole Request Object Mapping

```cpp
ENDPOINT("GET", "/test", testEndpoint,
         REQUEST(const std::shared_ptr<IncomingRequest>&, request))
{
  OATPP_LOGD("test", "user-agent='%s'", request->getHeader("user-agent")->getData());
  return createResponse(Status::CODE_200, "OK");
}
```

### Authorization - Basic

#### Default Basic Authorization

```cpp
using namespace oatpp::web::server::handler;

class MyController : public oatpp::web::server::api::ApiController {
public:

  MyController(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>, objectMapper) /* Inject object mapper */)
    : oatpp::web::server::api::ApiController(objectMapper) 
  {
    setDefaultAuthorizationHandler(std::make_shared<BasicAuthorizationHandler>("my-realm"));
  }

  ENDPOINT("GET", "/my/secret/resource", getResource,
           AUTHORIZATION(std::shared_ptr<DefaultBasicAuthorizationObject>, authObject)) 
  {
    OATPP_ASSERT_HTTP(authObject->userId == "Ivan" && authObject->password == "admin", Status::CODE_401, "Unauthorized");
    return createResponse(Status::CODE_200, "OK");
  }

};
```

#### Custom Basic Authorization 

##### Define Authorization Object

```cpp
class MyAuthorizationObject : public oatpp::web::server::handler::AuthorizationObject {
public:

  MyAuthorizationObject(const oatpp::String& pUserId)
    : userId(pUserId)
  {}

  oatpp::String userId;

};
```

##### Define Authorization Handler

```cpp
class MyBasicAuthorizationHandler : public oatpp::web::server::handler::BasicAuthorizationHandler {
public:

  MyBasicAuthorizationHandler()
    : BasicAuthorizationHandler("my-realm")
  {}

  std::shared_ptr<AuthorizationObject> authorize(const oatpp::String& userId, const oatpp::String& password) override {
    if(userId == "admin" && password == "admin") {
      return std::make_shared<MyAuthorizationObject>("uid-admin");
    }
    return nullptr;
  }

};
```

##### Endpoint With Custom Basic Authorization

```cpp
class MyController : public oatpp::web::server::api::ApiController {
public:

  MyController(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>, objectMapper) /* Inject object mapper */)
    : oatpp::web::server::api::ApiController(objectMapper) 
  {
    setDefaultAuthorizationHandler(std::make_shared<MyBasicAuthorizationHandler>());
  }

  ENDPOINT("GET", "/my/secret/resource", getResource,
           AUTHORIZATION(std::shared_ptr<MyAuthorizationObject>, authObject)) 
  {
    OATPP_ASSERT_HTTP(authObject->userId == "uid-admin", Status::CODE_401, "Unauthorized");
    return createResponse(Status::CODE_200, "OK");
  }

};
```

### Authorization - Bearer

#### Default Bearer Authorization

```cpp
using namespace oatpp::web::server::handler;

class MyController : public oatpp::web::server::api::ApiController {
public:

  MyController(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>, objectMapper) /* Inject object mapper */)
    : oatpp::web::server::api::ApiController(objectMapper) 
  {
    setDefaultAuthorizationHandler(std::make_shared<BearerAuthorizationHandler>("my-realm"));
  }

  ENDPOINT("GET", "/my/secret/resource", getResource,
           AUTHORIZATION(std::shared_ptr<DefaultBearerAuthorizationObject>, authObject)) 
  {
    OATPP_ASSERT_HTTP(authObject->token == "4e99e8c12de7e01535248d2bac85e732", Status::CODE_401, "Unauthorized");
    return createResponse(Status::CODE_200, "OK");
  }

};
```

#### Custom Bearer Authorization 

##### Define Authorization Object

```cpp
class MyAuthorizationObject : public oatpp::web::server::handler::AuthorizationObject {
public:

  MyAuthorizationObject(const oatpp::String& pUserId)
    : userId(pUserId)
  {}

  oatpp::String userId;

};
```

##### Define Authorization Handler

```cpp
class MyBearerAuthorizationHandler : public oatpp::web::server::handler::BearerAuthorizationHandler {
public:

  MyBearerAuthorizationHandler()
    : BearerAuthorizationHandler("my-realm")
  {}

  std::shared_ptr<AuthorizationObject> authorize(const oatpp::String& token) override {
    if(token == "4e99e8c12de7e01535248d2bac85e732") {
      return std::make_shared<MyAuthorizationObject>("uid-admin");
    }
    return nullptr;
  }

};
```

##### Endpoint With Custom Bearer Authorization

```cpp
class MyController : public oatpp::web::server::api::ApiController {
public:

  MyController(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>, objectMapper) /* Inject object mapper */)
    : oatpp::web::server::api::ApiController(objectMapper) 
  {
    setDefaultAuthorizationHandler(std::make_shared<MyBearerAuthorizationHandler>());
  }

  ENDPOINT("GET", "/my/secret/resource", getResource,
           AUTHORIZATION(std::shared_ptr<MyAuthorizationObject>, authObject)) 
  {
    OATPP_ASSERT_HTTP(authObject->userId == "uid-admin", Status::CODE_401, "Unauthorized");
    return createResponse(Status::CODE_200, "OK");
  }

};
```

### Authorization - Custom

To implement your custom Authorization - you have to extend [AuthorizationHandler](/api/latest/oatpp/web/server/handler/AuthorizationHandler/#authorizationhandler) class.

### Authorization Handler Qualifier 

You may specify the exact `AuthorizationHandler` to be used on the endpoint.

```cpp
class MyController : public oatpp::web::server::api::ApiController {
private:
  std::shared_ptr<AuthorizationHandler> m_basicAuthHandler = std::make_shared<BasicAuthorizationHandler>("my-realm");
  std::shared_ptr<AuthorizationHandler> m_bearerAuthHandler = std::make_shared<BearerAuthorizationHandler>("my-realm");
public:

  ...
  
  ENDPOINT("GET", "/basic/auth/resource", getBasicAuthResource,
           AUTHORIZATION(std::shared_ptr<DefaultBasicAuthorizationObject>, authObject, m_basicAuthHandler)) 
  {
    OATPP_ASSERT_HTTP(authObject->userId == "Ivan" && authObject->password == "admin", Status::CODE_401, "Unauthorized");
    return createResponse(Status::CODE_200, "OK");
  }

  ENDPOINT("GET", "/bearer/auth/resource", getBearerAuthResource,
           AUTHORIZATION(std::shared_ptr<DefaultBearerAuthorizationObject>, authObject, m_bearerAuthHandler)) 
  {
    OATPP_ASSERT_HTTP(authObject->token == "4e99e8c12de7e01535248d2bac85e732", Status::CODE_401, "Unauthorized");
    return createResponse(Status::CODE_200, "OK");
  }

};
```


### CORS

#### Add CORS To Endpoint 

```cpp
ADD_CORS(getHello)
ENDPOINT("GET", "hello", getHello) {
  return createResponse(Status::CODE_200, "Hello!");
}
```

#### ADD_CORS Macro Params

```cpp
ADD_CORS(<endpoint>, 
  <allow_origin = "*">, 
  <allow_methods = "GET, POST, OPTIONS">,
  <allow_headers = "DNT, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Range">,
  <max_age = "1728000">
);
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

`ApiController` code-gen also supports the annotation of endpoints with additional info. 
This info is then can be used to generate API documentation for Swagger-UI or for other API-documentation tools.  
*For how-to integrate Swagger-UI in oatpp application, see [oatpp-swagger](/docs/modules/oatpp-swagger/)*.    

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
   
Note that endpoint-name in `ENDPOINT_INFO(<endpoint-name>)` block should be the same as endpoint-name in corresponding
`ENDPOINT` or `ENDPOINT_ASYNC` block.


### Endpoint Parameters Annotation

You can annotate three types of endpoint parameters:

- Headers - can be accessed as `info->headers`
- Path Parameters - can be accessed as `info->pathParams`
- Query Parameters - can be accessed as `info->queryParams`

Parameters have next the attributes as for [Parameter Object in OpenAPI 3.0.0 specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameter-object):

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

---
title: Simple vs Async API
description: Simple and Async oatpp APIs. Pros and Cons. Configuration difference.
sidebarDepth: 0
---

# API - Simple vs Async <seo/>

## Brief

**Simple** - (multithreading plus blocking-IO approach) smaller latency, simple API, less coding. Disadvantages - comparable smaller limit of max simultaneous connections.   
**Async** - (oatpp-coroutines plus non-blocking-IO approach) High performance, ability to handle tens of thousand simultaneous connections, less resources needed. Disadvantages - comparable higher latency, more complex API, more coding.

## Thread Usage

**Simple** - (1 thread) / (1 connection) + (1 thread for accepting connections)   
**Async** - (1 thread) / (1 AsyncProcessor) + (1 thread for accepting connections)

## Api Difference

- Simple 
   - `ConnectionHandler = HttpConnectionHandler`
   - In `ApiController` - use [ENDPOINT](/docs/components/api-controller/#endpoint-specifics)
 
- Async 
   - `ConnectionHandler = AsyncHttpConnectionHandler`
   - In `ApiController` - use [ENDPOINT_ASYNC](/docs/components/api-controller/#endpoint-async-specifics)
   
### Simple

#### Config

```cpp{1,29}
#include "oatpp/web/server/HttpConnectionHandler.hpp"
#include "oatpp/web/server/HttpRouter.hpp"
#include "oatpp/network/tcp/server/ConnectionProvider.hpp"
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"
#include "oatpp/core/macro/component.hpp"

class AppComponent {
public:

  /**
   *  Create ConnectionProvider component which listens on the port
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, serverConnectionProvider)([] {
    return oatpp::network::server::tcp::ConnectionProvider::createShared({"localhost", 8000, oatpp::network::Address::IP_4});
  }());

  /**
   *  Create Router component
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, httpRouter)([] {
    return oatpp::web::server::HttpRouter::createShared();
  }());

  /**
   *  Create ConnectionHandler component which uses Router component to route requests
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ConnectionHandler>, serverConnectionHandler)([] {
    OATPP_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, router); // get Router component
    return oatpp::web::server::HttpConnectionHandler::createShared(router);
  }());

};
```

#### Controller

```cpp
ENDPOINT("POST", "demo/api/json", postJson,
         BODY_DTO(Object<MyDto>, dto)) {
  auto dtoMessage = dto->message;
  return createResponse(Status::CODE_200, "dtoMessage: " + dtoMessage);
}
```
 
### Async

```cpp{1,29}
#include "oatpp/web/server/AsyncHttpConnectionHandler.hpp"
#include "oatpp/web/server/HttpRouter.hpp"
#include "oatpp/network/tcp/server/ConnectionProvider.hpp"
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"
#include "oatpp/core/macro/component.hpp"

class AppComponent {
public:

  /**
   *  Create ConnectionProvider component which listens on the port
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, serverConnectionProvider)([] {
    return oatpp::network::server::tcp::ConnectionProvider::createShared({"localhost", 8000, oatpp::network::Address::IP_4});
  }());

  /**
   *  Create Router component
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, httpRouter)([] {
    return oatpp::web::server::HttpRouter::createShared();
  }());

  /**
   *  Create ConnectionHandler component which uses Router component to route requests
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ConnectionHandler>, serverConnectionHandler)([] {
    OATPP_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, router); // get Router component
    return oatpp::web::server::AsyncHttpConnectionHandler::createShared(router);
  }());

};
```

#### Controller

```cpp
ENDPOINT_ASYNC("POST", "demo/api_async/json", PostJSONAsync) {

  ENDPOINT_ASYNC_INIT(PostJSONAsync)

  Action act() override {
    return request->readBodyToDtoAsync<oatpp::Object<MyDto>>(controller->getDefaultObjectMapper())
                   .callbackTo(&PostJSONAsync::onBodyObtained);
  }

  Action onBodyObtained(const oatpp::Object<MyDto>& dto) {
    return _return(controller->createResponse(Status::CODE_200, "dtoMessage: " + dto->message));
  }

};
```
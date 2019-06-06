---
title: Step by step
description: Step-by-step guide how to setup and build oatpp project from scratch.
sidebarDepth: 0
---

# Step by step guide <seo/>

This is a step-by-step guide to the setting up and building oatpp project from scratch.
Finishing this guide you will have well-structured and extendable web-service with basic endpoints.

[[toc]]

## Simplest Project

### Components Overview

To get basic components overview let's take a look at the simplest oatpp server application first.

```cpp
#include "oatpp/web/server/HttpConnectionHandler.hpp"

#include "oatpp/network/server/Server.hpp"
#include "oatpp/network/server/SimpleTCPConnectionProvider.hpp"

void run() {

  /* Create Router for HTTP requests routing */
  auto router = oatpp::web::server::HttpRouter::createShared();

  /* Create HTTP connection handler with router */
  auto connectionHandler = oatpp::web::server::HttpConnectionHandler::createShared(router);

  /* Create TCP connection provider */
  auto connectionProvider = oatpp::network::server::SimpleTCPConnectionProvider::createShared(8000 /* port */);

  /* Create server which takes provided TCP connections and passes them to HTTP connection handler */
  oatpp::network::server::Server server(connectionProvider, connectionHandler);

  /* Priny info about server port */
  OATPP_LOGI("MyApp", "Server running on port %s", connectionProvider->getProperty("port").getData());

  /* Run server */
  server.run();
}

int main() {

  /* Init oatpp Environment */
  oatpp::base::Environment::init();

  /* Run App */
  run();

  /* Destroy oatpp Environment */
  oatpp::base::Environment::destroy();

  return 0;

}

```

Components used:

- [HttpRouter](/api/latest/oatpp/web/server/HttpRouter/) - 
Router of HTTP requests. It is used to map URLs to endpoint. 
The App above has no endpoints declared so server will always respond with `404` not found.
- [HttpConnectionHandler](/api/latest/oatpp/web/server/HttpConnectionHandler/) - This is the "simple" HTTP connection handler.
It handles incoming connections in multithreaded maner, creating one thread per each connection.
- [SimpleTCPConnectionProvider](/api/latest/oatpp/network/server/SimpleTCPConnectionProvider/) - Provider of `TCP` connections.
It binds on the specified port.
- [Server](/api/latest/oatpp/network/server/Server/) - Server runs loop in which it takes connection from `ConnectionProvider` 
and passes provided connection to `ConnectionHandler`.

### Add Request Handler

Application above does nothing but respond `404` to all client requests.  
To add custom response we have to add [HttpRequestHandler](/api/latest/oatpp/web/server/HttpRequestHandler/) and route
requests to it via `Router`:

```cpp{6-19,26-27}
#include "oatpp/web/server/HttpConnectionHandler.hpp"

#include "oatpp/network/server/Server.hpp"
#include "oatpp/network/server/SimpleTCPConnectionProvider.hpp"

/** 
 * Custom Request Handler
 */
class Handler : public oatpp::web::server::HttpRequestHandler {
public:

  /**
   * Handle incoming request and return outgoing response.
   */
  std::shared_ptr<OutgoingResponse> handle(const std::shared_ptr<IncomingRequest>& request) override {
    return ResponseFactory::createResponse(Status::CODE_200, "Hello World!");
  }

};

void run() {

  /* Create Router for HTTP requests routing */
  auto router = oatpp::web::server::HttpRouter::createShared();
  
  /* Route GET - "/hello" requests to Handler */
  router->route("GET", "/hello", std::make_shared<Handler>());

  /* Create HTTP connection handler with router */
  auto connectionHandler = oatpp::web::server::HttpConnectionHandler::createShared(router);

  /* Create TCP connection provider */
  auto connectionProvider = oatpp::network::server::SimpleTCPConnectionProvider::createShared(8000 /* port */);

  /* Create server which takes provided TCP connections and passes them to HTTP connection handler */
  oatpp::network::server::Server server(connectionProvider, connectionHandler);

  /* Priny info about server port */
  OATPP_LOGI("MyApp", "Server running on port %s", connectionProvider->getProperty("port").getData());

  /* Run server */
  server.run();
}

int main() {

  /* Init oatpp Environment */
  oatpp::base::Environment::init();

  /* Run App */
  run();

  /* Destroy oatpp Environment */
  oatpp::base::Environment::destroy();

  return 0;

}

```

Now if we go to `http:/localhost:8000/hello` in browser - we get `Hello World!` message.

```bash
$ curl http://localhost:8000/hello
Hello World!
```

### Respond With JSON Object

In order to Serialize/Deserialize objects oatpp uses special [Data-Transfer-Objects (DTO)](/docs/components/dto/) and 
[ObjectMappers](/api/latest/oatpp/core/data/mapping/ObjectMapper/).
 
The format in which DTO is serialized is defined by Object Mapper.   
In this particular example we are using [JSON ObjectMapper](/api/latest/oatpp/parser/json/mapping/ObjectMapper/). So our message
will be serialized to JSON.

```cpp{1,8,10-26,33,36-42,48-51,58-59,65}
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"

#include "oatpp/web/server/HttpConnectionHandler.hpp"

#include "oatpp/network/server/Server.hpp"
#include "oatpp/network/server/SimpleTCPConnectionProvider.hpp"

#include "oatpp/core/macro/codegen.hpp"

/* Begin DTO code-generation */
#include OATPP_CODEGEN_BEGIN(DTO)

/**
 * Message Data-Transfer-Object
 */
class MessageDto : public oatpp::data::mapping::type::Object {

  DTO_INIT(MessageDto, Object /* Extends */)

  DTO_FIELD(Int32, statusCode);   // Status code field
  DTO_FIELD(String, message);     // Message field

};

/* End DTO code-generation */
#include OATPP_CODEGEN_END(DTO)

/**
 * Custom Request Handler
 */
class Handler : public oatpp::web::server::HttpRequestHandler {
private:
  std::shared_ptr<oatpp::data::mapping::ObjectMapper> m_objectMapper;
public:

  /**
   * Constructor with object mapper.
   * @param objectMapper - object mapper used to serialize objects.
   */
  Handler(const std::shared_ptr<oatpp::data::mapping::ObjectMapper>& objectMapper)
    : m_objectMapper(objectMapper)
  {}

  /**
   * Handle incoming request and return outgoing response.
   */
  std::shared_ptr<OutgoingResponse> handle(const std::shared_ptr<IncomingRequest>& request) override {
    auto message = MessageDto::createShared();
    message->statusCode = 1024;
    message->message = "Hello DTO!";
    return ResponseFactory::createResponse(Status::CODE_200, message, m_objectMapper.get());
  }

};

void run() {

  /* Create json object mapper */
  auto objectMapper = oatpp::parser::json::mapping::ObjectMapper::createShared();

  /* Create Router for HTTP requests routing */
  auto router = oatpp::web::server::HttpRouter::createShared();

  /* Route GET - "/hello" requests to Handler */
  router->route("GET", "/hello", std::make_shared<Handler>(objectMapper /* json object mapper */ ));

  /* Create HTTP connection handler with router */
  auto connectionHandler = oatpp::web::server::HttpConnectionHandler::createShared(router);

  /* Create TCP connection provider */
  auto connectionProvider = oatpp::network::server::SimpleTCPConnectionProvider::createShared(8000 /* port */);

  /* Create server which takes provided TCP connections and passes them to HTTP connection handler */
  oatpp::network::server::Server server(connectionProvider, connectionHandler);

  /* Priny info about server port */
  OATPP_LOGI("MyApp", "Server running on port %s", connectionProvider->getProperty("port").getData());

  /* Run server */
  server.run();
}

int main() {

  /* Init oatpp Environment */
  oatpp::base::Environment::init();

  /* Run App */
  run();

  /* Destroy oatpp Environment */
  oatpp::base::Environment::destroy();

  return 0;

}
```  

Now if we go to `http:/localhost:8000/hello` in browser - we get the JSON response.

```bash
$ curl http://localhost:8000/hello
{"statusCode": 1024, "message": "Hello DTO!"}
```

## Well Structured Project

While creating request handler for each custom endpoint (*as described above in simplest example*) may be suitable for small projects, 
it is recommended to follow oatpp-project-structure in order to have easily configurable and extandable code.

### Project Layout

```
|- CMakeLists.txt                        // projects CMakeLists.txt
|- src/
|    |
|    |- dto/                             // DTOs are declared here
|    |- controller/                      // Folder containing API Controllers where all endpoints are declared
|    |- AppComponent.hpp                 // Application Components configuration 
|    |- App.cpp                          // main() is here
|
|- test/                                 // test folder
     |
     |- Tests.cpp                        // tests main() is here
```

### Application Components Configuration

Use oatpp provided dependency injection in order to configure your application.  

Create environment component via [OATPP_CREATE_COMPONENT](/api/latest/oatpp/core/macro/component/#oatpp-create-component) 
and inject it where needed using [OATPP_COMPONENT](/api/latest/oatpp/core/macro/component/#oatpp-component).
 
#### Modify Simple Example to use Dependency Injection

Create file `AppComponent.hpp` in you projects `src` folder and move there initialization of all application components.

`AppComponent.hpp`:

```cpp

```
 

### Use Api Controller

Instead of using bare HttpRequestHandler creating new Request Handler for every new endpoint, it is recommened to
use [Api Controller](/docs/components/api-controller/). 

API Controller makes process of adding new endpoints much easier by generating boilerplate code for you. It also helps 
you to organize your endpoints grouping them by different API Controllers.

#### Create Api Controller

In folder `src/controller/` create file `MyController.hpp`.
Add the following code to `MyController.hpp`:

```cpp
#ifndef MyController_hpp
#define MyController_hpp

#include "dto/MyDto.hpp"

#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"
#include "oatpp/core/macro/codegen.hpp"
#include "oatpp/core/macro/component.hpp"

/**
 *  EXAMPLE ApiController
 *  Basic examples of howto create ENDPOINTs
 *  More details on oatpp.io
 */
class MyController : public oatpp::web::server::api::ApiController {
protected:
  MyController(const std::shared_ptr<ObjectMapper>& objectMapper)
    : oatpp::web::server::api::ApiController(objectMapper)
  {}
public:
  
  /**
   *  Inject @objectMapper component here as default parameter
   *  Do not return bare Controllable* object! use shared_ptr!
   */
  static std::shared_ptr<MyController> createShared(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>,
                                                                 objectMapper)){
    return std::shared_ptr<MyController>(new MyController(objectMapper));
  }
  
  /**
   *  Begin ENDPOINTs generation ('ApiController' codegen)
   */
#include OATPP_CODEGEN_BEGIN(ApiController)
  
  ENDPOINT("GET", "/", root) {
    auto dto = MyDto::createShared();
    dto->statusCode = 200;
    dto->message = "Hello World!";
    return createDtoResponse(Status::CODE_200, dto);
  }
  
  // TODO Insert Your endpoints here !!!
  
  /**
   *  Finish ENDPOINTs generation ('ApiController' codegen)
   */
#include OATPP_CODEGEN_END(ApiController)
  
};

#endif /* MyController_hpp */
```
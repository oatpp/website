---
title: Step by step
description: Step-by-step guide how to setup and build oatpp project from scratch.
sidebarDepth: 2
---

# Step By Step Guide <seo/>

This step-by-step guide will help you start developing using oatpp framework.
After finishing it, you’ll have a well-structured and extendable web-service with basic endpoints.

[[toc]]

## Simplest Project

### API - Low Level Components Overview

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

Classes used:

- [HttpRouter](/api/latest/oatpp/web/server/HttpRouter/) - 
Router of HTTP requests. It maps URLs to endpoint handlers.
Our app has no endpoints declared so far hence the server will always return `404 not found`.
- [HttpConnectionHandler](/api/latest/oatpp/web/server/HttpConnectionHandler/) - This is a simple HTTP connection handler.
It handles incoming connections in a multi threaded manner, creating one thread per each connection.
- [SimpleTCPConnectionProvider](/api/latest/oatpp/network/server/SimpleTCPConnectionProvider/) - Provider of `TCP` connections.
It binds to a specified port.
- [Server](/api/latest/oatpp/network/server/Server/) - Server runs a loop which takes connections from `ConnectionProvider`
and passes them to `ConnectionHandler`.

### Add Request Handler

Application above does nothing but respond `404` to all client requests.  
To add a custom response we have to add [HttpRequestHandler](/api/latest/oatpp/web/server/HttpRequestHandler/) and route
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

```cpp{1,8,10-26,33,36-42,48-51,59,65}
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
class MessageDto : public oatpp::DTO {

  DTO_INIT(MessageDto, DTO /* Extends */)

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
    return ResponseFactory::createResponse(Status::CODE_200, message, m_objectMapper);
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
|    |- dto/                             // Folder containing DTOs definitions
|    |    |
|    |    |- DTOs.hpp                    // DTOs are declared here
|    |     
|    |- controller/                      // Folder containing API Controllers where all endpoints are declared
|    |    |
|    |    |- MyController.hpp            // Sample - MyController is declared here
|    |     
|    |- AppComponent.hpp                 // Application Components configuration 
|    |- App.cpp                          // main() is here
|
|- test/                                 // test folder
     |
     |- app/
     |    |
     |    |- MyApiTestClient.hpp         // Api client for test API calls is declared here
     |    |- TestComponent.hpp           // Test application components configuration
     |                                   
     |- MyControllerTest.cpp             // MyController test logic is here
     |- MyControllerTest.hpp             // MyController test header
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
#ifndef AppComponent_hpp
#define AppComponent_hpp

#include "oatpp/parser/json/mapping/ObjectMapper.hpp"

#include "oatpp/web/server/HttpConnectionHandler.hpp"
#include "oatpp/network/server/SimpleTCPConnectionProvider.hpp"

#include "oatpp/core/macro/component.hpp"

/**
 *  Class which creates and holds Application components and registers components in oatpp::base::Environment
 *  Order of components initialization is from top to bottom
 */
class AppComponent {
public:

  /**
   *  Create ConnectionProvider component which listens on the port
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, serverConnectionProvider)([] {
    return oatpp::network::server::SimpleTCPConnectionProvider::createShared(8000);
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
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::server::ConnectionHandler>, serverConnectionHandler)([] {
    OATPP_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, router); // get Router component
    return oatpp::web::server::HttpConnectionHandler::createShared(router);
  }());

  /**
   *  Create ObjectMapper component to serialize/deserialize DTOs in Contoller's API
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::data::mapping::ObjectMapper>, apiObjectMapper)([] {
    return oatpp::parser::json::mapping::ObjectMapper::createShared();
  }());

};

#endif /* AppComponent_hpp */
```
 
Now all major components are initialized in one place which makes it easy to configure application by substituting components.

`App.cpp` (main) can be rewritten as follows:

```cpp{31,49}
#include "AppComponent.hpp"

#include "oatpp/network/server/Server.hpp"

#include "oatpp/core/macro/codegen.hpp"

/* Begin DTO code-generation */
#include OATPP_CODEGEN_BEGIN(DTO)

/**
 * Message Data-Transfer-Object
 */
class MessageDto : public oatpp::DTO {

  DTO_INIT(MessageDto, DTO /* Extends */)

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
  /* Inject object mapper component */
  OATPP_COMPONENT(std::shared_ptr<oatpp::data::mapping::ObjectMapper>, m_objectMapper);
public:

  /**
   * Handle incoming request and return outgoing response.
   */
  std::shared_ptr<OutgoingResponse> handle(const std::shared_ptr<IncomingRequest>& request) override {
    auto message = MessageDto::createShared();
    message->statusCode = 1024;
    message->message = "Hello DTO!";
    return ResponseFactory::createResponse(Status::CODE_200, message, m_objectMapper);
  }

};

void run() {

  /* Register Components in scope of run() method */
  AppComponent components;

  /* Get router component */
  OATPP_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, router);

  /* Route GET - "/hello" requests to Handler */
  router->route("GET", "/hello", std::make_shared<Handler>());

  /* Get connection handler component */
  OATPP_COMPONENT(std::shared_ptr<oatpp::network::server::ConnectionHandler>, connectionHandler);

  /* Get connection provider component */
  OATPP_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, connectionProvider);

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

### Move DTO definitions to a separate file

In folder `src/dto/` create file `DTOs.hpp`.  
Move `MessageDto` definition to `DTOs.hpp`:

```cpp
#ifndef DTOs_hpp
#define DTOs_hpp

#include "oatpp/core/data/mapping/type/Object.hpp"
#include "oatpp/core/macro/codegen.hpp"

/* Begin DTO code-generation */
#include OATPP_CODEGEN_BEGIN(DTO)

/**
 * Message Data-Transfer-Object
 */
class MessageDto : public oatpp::DTO {

  DTO_INIT(MessageDto, DTO /* Extends */)

  DTO_FIELD(Int32, statusCode);   // Status code field
  DTO_FIELD(String, message);     // Message field

};

/* TODO - Add more DTOs here */

/* End DTO code-generation */
#include OATPP_CODEGEN_END(DTO)

#endif /* DTOs_hpp */
```

### Use API Controller

Instead of using bare HttpRequestHandler creating new Request Handler for every new endpoint, it is recommened to
use [Api Controller](/docs/components/api-controller/). 

API Controller makes process of adding new endpoints much easier by generating boilerplate code for you. It also helps 
to organize your endpoints grouping them in different API Controllers.

#### Create Api Controller

In folder `src/controller/` create file `MyController.hpp`.  
Add the following code to `MyController.hpp`:

```cpp
#ifndef MyController_hpp
#define MyController_hpp

#include "dto/DTOs.hpp"

#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/core/macro/codegen.hpp"
#include "oatpp/core/macro/component.hpp"

/**
 * Sample Api Controller.
 */
class MyController : public oatpp::web::server::api::ApiController {
public:
  /**
   * Constructor with object mapper.
   * @param objectMapper - default object mapper used to serialize/deserialize DTOs.
   */
  MyController(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>, objectMapper))
    : oatpp::web::server::api::ApiController(objectMapper)
  {}
public:
  
/**
 *  Begin ENDPOINTs generation ('ApiController' codegen)
 */
#include OATPP_CODEGEN_BEGIN(ApiController)
  
  ENDPOINT("GET", "/hello", root) {
    auto dto = MessageDto::createShared();
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

### Add Controller Endpoints to Router

In order to serve endpoints declared in Api Controller we have to add those endpoints to the Router.    
And the final look of the App.cpp is as follows:

```cpp{15-16}
#include "controller/MyController.hpp"
#include "AppComponent.hpp"

#include "oatpp/network/server/Server.hpp"

void run() {

  /* Register Components in scope of run() method */
  AppComponent components;

  /* Get router component */
  OATPP_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, router);

  /* Create MyController and add all of its endpoints to router */
  auto myController = std::make_shared<MyController>();
  myController->addEndpointsToRouter(router);

  /* Get connection handler component */
  OATPP_COMPONENT(std::shared_ptr<oatpp::network::server::ConnectionHandler>, connectionHandler);

  /* Get connection provider component */
  OATPP_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, connectionProvider);

  /* Create server which takes provided TCP connections and passes them to HTTP connection handler */
  oatpp::network::server::Server server(connectionProvider, connectionHandler);

  /* Priny info about server port */
  OATPP_LOGI("MyApp", "Server running on port %s", connectionProvider->getProperty("port").getData());

  /* Run server */
  server.run();
  
}

int main(int argc, const char * argv[]) {

  /* Init oatpp Environment */
  oatpp::base::Environment::init();

  /* Run App */
  run();

  /* Destroy oatpp Environment */
  oatpp::base::Environment::destroy();

  return 0;
}
```

## Testing Oat++ Application

Testing of a oatpp application generally means the following:

- Create application test configuration in order to run application in test-mode.
- Define [ApiClient](/docs/components/api-client/) for Application's API.
- Create test which runs application using test-configuration and makes API calls via test Api Client.

### Application Test Components Configuration

In folder `test/app/` create file `TestComponent.hpp` (similar to `AppComponent`):

```cpp{24,32,40}
#ifndef TestComponent_htpp
#define TestComponent_htpp

#include "oatpp/web/server/HttpConnectionHandler.hpp"

#include "oatpp/network/virtual_/client/ConnectionProvider.hpp"
#include "oatpp/network/virtual_/server/ConnectionProvider.hpp"
#include "oatpp/network/virtual_/Interface.hpp"

#include "oatpp/parser/json/mapping/ObjectMapper.hpp"

#include "oatpp/core/macro/component.hpp"

/**
 * Test Components config
 */
class TestComponent {
public:

  /**
   * Create oatpp virtual network interface for test networking
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::virtual_::Interface>, virtualInterface)([] {
    return oatpp::network::virtual_::Interface::createShared("virtualhost");
  }());

  /**
   * Create server ConnectionProvider of oatpp virtual connections for test
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, serverConnectionProvider)([] {
    OATPP_COMPONENT(std::shared_ptr<oatpp::network::virtual_::Interface>, interface);
    return oatpp::network::virtual_::server::ConnectionProvider::createShared(interface);
  }());

  /**
   * Create client ConnectionProvider of oatpp virtual connections for test
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ClientConnectionProvider>, clientConnectionProvider)([] {
    OATPP_COMPONENT(std::shared_ptr<oatpp::network::virtual_::Interface>, interface);
    return oatpp::network::virtual_::client::ConnectionProvider::createShared(interface);
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
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::server::ConnectionHandler>, serverConnectionHandler)([] {
    OATPP_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, router); // get Router component
    return oatpp::web::server::HttpConnectionHandler::createShared(router);
  }());

  /**
   *  Create ObjectMapper component to serialize/deserialize DTOs in Contoller's API
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::data::mapping::ObjectMapper>, apiObjectMapper)([] {
    return oatpp::parser::json::mapping::ObjectMapper::createShared();
  }());

};


#endif // TestComponent_htpp
```

Notice usage of: 

- [Network Virtual Interface](/api/latest/oatpp/network/virtual_/Interface/)
- [Server Virtual ConnectionProvider](/api/latest/oatpp/network/virtual_/server/ConnectionProvider/)
- [Client Virtual ConnectionProvider](/api/latest/oatpp/network/virtual_/client/ConnectionProvider/)

oatpp virtual network stack enables you to run application tests down to low (protocol) level without occupying the "real"
port of the host.

### API Test Client

Create test [ApiClient](/docs/components/api-client/) in order to test application API.  
In folder `test/app/` create file `MyApiTestClient.hpp` with api calls corresponding to application APIs:

```cpp{18}
#ifndef MyApiTestClient_hpp
#define MyApiTestClient_hpp

#include "oatpp/web/client/ApiClient.hpp"
#include "oatpp/core/macro/codegen.hpp"

/* Begin Api Client code generation */
#include OATPP_CODEGEN_BEGIN(ApiClient)

/**
 * Test API client.
 * Use this client to call application APIs.
 */
class MyApiTestClient : public oatpp::web::client::ApiClient {

  API_CLIENT_INIT(MyApiTestClient)

  API_CALL("GET", "/hello", getHello)

  // TODO - add more client API calls here

};

/* End Api Client code generation */
#include OATPP_CODEGEN_END(ApiClient)

#endif // MyApiTestClient_hpp

```

### Create Test

In folder `test/` create file `MyControllerTest.hpp`:

```cpp
#ifndef MyControllerTest_hpp
#define MyControllerTest_hpp

#include "oatpp-test/UnitTest.hpp"

class MyControllerTest : public oatpp::test::UnitTest {
public:

  MyControllerTest() : UnitTest("TEST[MyControllerTest]" /* Test TAG for logs */){}
  void onRun() override;

};

#endif // MyControllerTest_hpp
```

In folder `test/` create file `MyControllerTest.cpp`:

```cpp{15,21,40}
#include "MyControllerTest.hpp"

#include "controller/MyController.hpp"

#include "app/MyApiTestClient.hpp"
#include "app/TestComponent.hpp"

#include "oatpp/web/client/HttpRequestExecutor.hpp"

#include "oatpp-test/web/ClientServerTestRunner.hpp"

void MyControllerTest::onRun() {

  /* Register test components */
  TestComponent component;

  /* Create client-server test runner */
  oatpp::test::web::ClientServerTestRunner runner;

  /* Add MyController endpoints to the router of the test server */
  runner.addController(std::make_shared<MyController>());

  /* Run test */
  runner.run([this, &runner] {

    /* Get client connection provider for Api Client */
    OATPP_COMPONENT(std::shared_ptr<oatpp::network::ClientConnectionProvider>, clientConnectionProvider);

    /* Get object mapper component */
    OATPP_COMPONENT(std::shared_ptr<oatpp::data::mapping::ObjectMapper>, objectMapper);

    /* Create http request executor for Api Client */
    auto requestExecutor = oatpp::web::client::HttpRequestExecutor::createShared(clientConnectionProvider);

    /* Create Test API client */
    auto client = MyApiTestClient::createShared(requestExecutor, objectMapper);

    /* Call server API */
    /* Call hello endpoint of MyController */
    auto response = client->getHello();

    /* Assert that server responds with 200 */
    OATPP_ASSERT(response->getStatusCode() == 200);

    /* Read response body as MessageDto */
    auto message = response->readBodyToDto<MessageDto>(objectMapper);

    /* Assert that received message is as expected */
    OATPP_ASSERT(message);
    OATPP_ASSERT(message->statusCode->getValue() == 200);
    OATPP_ASSERT(message->message == "Hello World!");

  }, std::chrono::minutes(10) /* test timeout */);

  /* wait all server threads finished */
  std::this_thread::sleep_for(std::chrono::seconds(1));

}
```

The test above tests that on API call `GET /hello` server responds with expected message.  
It uses [ClientServerTestRunner](/api/latest/oatpp-test/web/ClientServerTestRunner/) to run test server.

### Run Tests

In folder `test/` create file `Tests.cpp`:

```cpp
#include "MyControllerTest.hpp"

#include <iostream>

void runTests() {

  OATPP_RUN_TEST(MyControllerTest);
  
  // TODO - Add more tests here:
  // OATPP_RUN_TEST(MyAnotherTest);
  
}

int main() {

  oatpp::base::Environment::init();

  runTests();

  /* Print how much objects were created during app running, and what have left-probably leaked */
  /* Disable object counting for release builds using '-D OATPP_DISABLE_ENV_OBJECT_COUNTERS' flag for better performance */
  std::cout << "\nEnvironment:\n";
  std::cout << "objectsCount = " << oatpp::base::Environment::getObjectsCount() << "\n";
  std::cout << "objectsCreated = " << oatpp::base::Environment::getObjectsCreated() << "\n\n";

  OATPP_ASSERT(oatpp::base::Environment::getObjectsCount() == 0);

  oatpp::base::Environment::destroy();

  return 0;
}
```

At the end of each test (and at the end of all tests) oatpp Environment is checked for leaking objects.  
Test will fail if objects leaks found (Counts only objects extending [Countable](/api/latest/oatpp/core/base/Countable/)).

::: warning
Tests binary should NOT be built linking oatpp built with `-DOATPP_DISABLE_ENV_OBJECT_COUNTERS` flag.
:::

## Complete Project Code

[Github Repository](https://github.com/oatpp/oatpp-starter)


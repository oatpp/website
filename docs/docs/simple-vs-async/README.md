# API - Simple vs Async <seo/>

## Brief

**Simple** - (multithreading plus blocking-IO approach) smaller latency, simple API, less coding. Disadvantages - comparable smaller limit of max simultaneous connections.   
**Async** - (oatpp-coroutines plus non-blocking-IO approach) High performance, ability to handle tens of thousand simultaneous connections, less resources needed. Disadvantages - comparable higher latency, more complex API, more coding.

## Thread usage

**Simple** - (1 thread) / (1 connection) + (1 thread for accepting connections)   
**Async** - (1 thread) / (1 AsyncProcessor) + (1 thread for accepting connections)

## Configuration difference

- Simple 
   - `SimpleTCPConnectionProvider::createShared(8000, false /* Non-Blocking */)`
   - `ConnectionHandler = HttpConnectionHandler`
 
- Async 
   - `SimpleTCPConnectionProvider::createShared(8000, true /* Non-Blocking */)`
   - `ConnectionHandler = AsyncHttpConnectionHandler`
   
### Simple

```cpp{1,14,29}
#include "oatpp/web/server/HttpConnectionHandler.hpp"
#include "oatpp/web/server/HttpRouter.hpp"
#include "oatpp/network/server/SimpleTCPConnectionProvider.hpp"
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"
#include "oatpp/core/macro/component.hpp"

class AppComponent {
public:

  /**
   *  Create ConnectionProvider component which listens on the port
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, serverConnectionProvider)([] {
    return oatpp::network::server::SimpleTCPConnectionProvider::createShared(8000, false /* Non-Blocking */);
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

};
```
 
### Async

```cpp{1,14,29}
#include "oatpp/web/server/AsyncHttpConnectionHandler.hpp"
#include "oatpp/web/server/HttpRouter.hpp"
#include "oatpp/network/server/SimpleTCPConnectionProvider.hpp"
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"
#include "oatpp/core/macro/component.hpp"

class AppComponent {
public:

  /**
   *  Create ConnectionProvider component which listens on the port
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, serverConnectionProvider)([] {
    return oatpp::network::server::SimpleTCPConnectionProvider::createShared(8000, true /* Non-Blocking */);
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
    return oatpp::web::server::AsyncHttpConnectionHandler::createShared(router);
  }());

};
```
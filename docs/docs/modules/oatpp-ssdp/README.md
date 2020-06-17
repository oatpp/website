---
title: oatpp-ssdp (module)
description: Oat++ extension module to work with SSDP protocol.
sidebarDepth: 0
---

# oatpp-ssdp <seo/>

[Github Repository](https://github.com/oatpp/oatpp-ssdp)  
[Example Project](https://github.com/oatpp/example-iot-hue-ssdp)

Oat++ extension module to work with SSDP (Simple Service Discovery Protocol) protocol.

## Build And Install

*Note: you need to install the main [oatpp](https://github.com/oatpp/oatpp) module first.*


- Clone this repository.
- In the root of the repository run:
   ```bash
   mkdir build && cd build
   cmake ..
   make install
   ```
   
## API

### Declare Necessary Components

In the `AppComponent.hpp` file:

```cpp
#include "oatpp-ssdp/SimpleSsdpUdpStreamProvider.hpp"
#include "oatpp-ssdp/SsdpStreamHandler.hpp"

...

/**
 * Create provider of SSDP-UDP packets stream.
 */
OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::ssdp::UdpStreamProvider>, ssdpStreamProvider)("ssdp", [] {
  return oatpp::ssdp::SimpleSsdpUdpStreamProvider::createShared();
}());

/**
 * We can reuse the HttpRouter for SSDP since SSDP message is complient to HTTP1.1.
 */
OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, ssdpRouter)("ssdp", [] {
  return oatpp::web::server::HttpRouter::createShared();
}());

/**
 * Create SsdpStreamHandler component which uses Router component to route requests.
 * It looks like a normal ConnectionHandler but is specialized on SsdpStreams and returns something conceptually very different
 */
OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::ssdp::SsdpStreamHandler>, ssdpStreamHandler)("ssdp", [] {
  OATPP_COMPONENT(std::shared_ptr<oatpp::web::server::HttpRouter>, router, "ssdp"); // get Router component
  return oatpp::ssdp::SsdpStreamHandler::createShared(router);
}());  
```

### Run SSDP Server

In the `App.cpp` file:

```cpp
/* Get stream provider component */
OATPP_COMPONENT(std::shared_ptr<oatpp::ssdp::UdpStreamProvider>, ssdpStreamProvider, "ssdp");

/* Get stream handler component */
OATPP_COMPONENT(std::shared_ptr<oatpp::ssdp::SsdpStreamHandler>, ssdpStreamHandler, "ssdp");

/* Create server which takes provided streams and passes them to stream handler */
oatpp::network::server::Server server(ssdpStreamProvider, ssdpStreamHandler);

/* Priny info about server port */
OATPP_LOGD("Server", "Running SSDP on port %s...", ssdpStreamProvider->getProperty("port").getData());

/* Run server */
server.run();
```

### Handle SSDP Messages

In the `Controller.hpp` file:

```cpp
/**
 * Other devices that want to discover you send 'M-SEARCH *' SSDP packages.
 * You have to answer with a corresponding packet on this discovery.
 */
ENDPOINT("M-SEARCH", "*", star) {
  auto response = createResponse(Status::CODE_200, "" /* empty body */);
  // TODO - add correct response headers.
  return response;
}
```

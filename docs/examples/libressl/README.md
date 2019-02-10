# TLS-LibreSSL Example <seo/>

Example project how-to use [oatpp-libressl](/docs/modules/oatpp-libressl/) module.
- Serve via HTTPS
- Make client calls via HTTPS.
- Using oatpp Async API.

::: tip
[CLONE FROM GITHUB](https://github.com/oatpp/example-libressl)
:::

## Overview
This project is using [oatpp](/docs/modules/oatpp/) and [oatpp-libressl](/docs/modules/oatpp-libressl/) modules.

### Project layout

```

|- CMakeLists.txt               // project loader script. load and build dependencies
|- main/                        // main project directory
|    |
|    |- CMakeLists.txt          // projects CMakeLists.txt
|    |- src/                    // source folder
|    |- test/                   // test folder
|
|- cert/                        // folder with test certificates

```
```
- src/
    |
    |- controller/              // Folder containing Controller where all endpoints are declared
    |- client/                   // HTTP client is here. Used in "proxy" endpoint /api/get
    |- dto/                     // DTOs are declared here
    |- AppComponent.hpp         // Service config
    |- Logger.hpp               // Application Logger
    |- App.cpp                  // main() is here

```

## Build and Run

### Using CMake
*Requires* LibreSSL installed. You may refer to this sh script - how to install libressl -
[install-libressl.sh](https://github.com/oatpp/oatpp-libressl/blob/master/utility/install-deps/install-libressl.sh).
Or try something like ```$ apk add libressl-dev```

```bash
$ mkdir build && cd build
$ cmake ..
$ make run        ## Download, build, and install all dependencies. Run project

```

### In Docker

```bash
$ docker build -t example-libressl .
$ docker run -p 8443:8443 -t example-libressl
```

## Configure AppComponent

Configure server secure connection provider

```cpp

/**
 *  Create ConnectionProvider component which listens on the port
 */
OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ServerConnectionProvider>, serverConnectionProvider)([] {
  /* non_blocking connections should be used with AsyncHttpConnectionHandler for AsyncIO */
  auto config = oatpp::libressl::Config::createDefaultServerConfig("cert/test_key.pem", "cert/test_cert.crt");
  return oatpp::libressl::server::ConnectionProvider::createShared(config, 8443, true /* true for non_blocking */);
}());

```

Configure client secure connection provider

```cpp
OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::network::ClientConnectionProvider>, sslClientConnectionProvider) ([] {
  auto config = oatpp::libressl::Config::createShared();
  tls_config_insecure_noverifycert(config->getTLSConfig());
  tls_config_insecure_noverifyname(config->getTLSConfig());
  return oatpp::libressl::client::ConnectionProvider::createShared(config, "httpbin.org", 443);
}());
```

## Endpoints

"Hello Async" root endpoint with json response
```cpp
ENDPOINT_ASYNC("GET", "/", Root) {

  ENDPOINT_ASYNC_INIT(Root)

  Action act() override {
    auto dto = HelloDto::createShared();
    dto->message = "Hello Async!";
    dto->server = Header::Value::SERVER;
    dto->userAgent = request->getHeader(Header::USER_AGENT);
    return _return(controller->createDtoResponse(Status::CODE_200, dto));
  }

};
```

result:
```bash
$ curl -X GET "https://localhost:8443/" --insecure
{"user-agent": "curl\/7.54.0", "message": "Hello Async!", "server": "oatpp\/0.19.1"}
```
---
Async proxy endpoint to ```https://httpbin.org/get```

```cpp
ENDPOINT_ASYNC("GET", "/api/get", TestApiGet) {

  ENDPOINT_ASYNC_INIT(TestApiGet)

  Action act() override {
    return controller->myApiClient->apiGetAsync(this, &TestApiGet::onResponse);
  }

  Action onResponse(const std::shared_ptr<IncomingResponse>& response){
    return response->readBodyToStringAsync(this, &TestApiGet::returnResult);
  }

  Action returnResult(const oatpp::String& body) {
    return _return(controller->createResponse(Status::CODE_200, body));
  }

};
```

result:
```bash
$ curl -X GET "https://localhost:8443/api/get" --insecure
{
  "args": {},
  "headers": {
    "Connection": "close",
    "Host": "httpbin.org"
  },
  "origin": "176.37.47.230",
  "url": "https://httpbin.org/get"
}
```

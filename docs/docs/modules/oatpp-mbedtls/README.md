---
title: oatpp-mbedtls (module)
description: Secure server and client connection providers for oatpp applications. Based on MbedTLS.
sidebarDepth: 0
---

# oatpp-mbedtls <seo/>

[Github Repository](https://github.com/oatpp/oatpp-mbedtls)

**oatpp-mbedtls** - extension of [oatpp](/docs/modules/oatpp/) module.  
It provides secure server and client connection providers for oatpp applications. Based on [MbedTLS](https://tls.mbed.org/).  
Supports both "Simple" and "Async" oatpp APIs.

## Requires

MbedTLS installed.

## APIs

### Server

#### ConnectionProvider

Create `ConnectionProvider`

```cpp
const char* serverCertificateFile = "path/to/server/certificate";
const char* serverPrivateKeyFile = "path/to/server/private/key";

/* Create Config */
auto config = oatpp::mbedtls::Config::createDefaultServerConfigShared(serverCertificateFile, serverPrivateKeyFile);

/* Create Secure Connection Provider */
auto connectionProvider = oatpp::mbedtls::server::ConnectionProvider::createShared(config, 443 /* port */);

/* Get Secure Connection Stream */
auto connection = connectionProvider->getConnection();
```

#### Custom Transport Stream

Create `ConnectionProvider` with custom transport stream.

```cpp
const char* serverCertificateFile = "path/to/server/certificate";
const char* serverPrivateKeyFile = "path/to/server/private/key";

/* Create Config */
auto config = oatpp::mbedtls::Config::createDefaultServerConfigShared(serverCertificateFile, serverPrivateKeyFile);

/* Create Transport Stream Provider */
/* Replace With Your Custom Transport Stream Provider */
auto transportStreamProvider = oatpp::network::server::SimpleTCPConnectionProvider::createShared(443 /* port */);

/* Create Secure Connection Provider */
auto connectionProvider = oatpp::mbedtls::server::ConnectionProvider::createShared(config, transportStreamProvider);

/* Get Secure Connection Stream over Custom Transport Stream */
auto connection = connectionProvider->getConnection();
```

**Note:** To use `oatpp-mbedtls` for server connections with custom transport stream you should implement:

- [oatpp::network::ServerConnectionProvider](https://oatpp.io/api/latest/oatpp/network/ConnectionProvider/#serverconnectionprovider).
- [oatpp::data::stream::IOStream](https://oatpp.io/api/latest/oatpp/core/data/stream/Stream/#iostream) - to be returned by `ConnectionProvider`.

### Client

#### ConnectionProvider

Create `ConnectionProvider`

```cpp
/* Create Config */
auto config = oatpp::mbedtls::Config::createDefaultClientConfigShared();

/* Create Secure Connection Provider */
auto connectionProvider = oatpp::mbedtls::client::ConnectionProvider::createShared(config, "httpbin.org", 443 /* port */);

/* Get Secure Connection Stream */
auto connection = connectionProvider->getConnection();
```

#### Custom Transport Stream

Create `ConnectionProvider` with custom transport stream.

```cpp
/* Create Config */
auto config = oatpp::mbedtls::Config::createDefaultClientConfigShared();

/* Create Transport Stream Provider */
/* Replace With Your Custom Transport Stream Provider */
auto transportStreamProvider = oatpp::network::client::SimpleTCPConnectionProvider::createShared("httpbin.org", 443 /* port */);

/* Create Secure Connection Provider */
auto connectionProvider = oatpp::mbedtls::client::ConnectionProvider::createShared(config, transportStreamProvider);

/* Get Secure Connection Stream over Custom Transport Stream */
auto connection = connectionProvider->getConnection();
```

**Note:** To use `oatpp-mbedtls` for client connections with custom transport stream you should implement:

- [oatpp::network::ClientConnectionProvider](https://oatpp.io/api/latest/oatpp/network/ConnectionProvider/#clientconnectionprovider).
- [oatpp::data::stream::IOStream](https://oatpp.io/api/latest/oatpp/core/data/stream/Stream/#iostream) - to be returned by `ConnectionProvider`.


## See more

- [oatpp-libressl](/docs/modules/oatpp-libressl/)

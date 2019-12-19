---
title: oatpp-libressl (module)
description: Secure server and client connection providers for oatpp applications. Based on LibreSSL.
sidebarDepth: 0
---

# oatpp-libressl <seo/>

[Github Repository](https://github.com/oatpp/oatpp-libressl)  
[Example Project](/examples/libressl/)  

**oatpp-libressl** - extension of [oatpp](/docs/modules/oatpp/) module.  
It provides secure server and client connection providers for oatpp applications. Based on [LibreSSL](https://www.libressl.org/).  
Supports both "Simple" and "Async" oatpp APIs.

## Requires

- **LibreSSL** - minimum version 3.0.0

## Example

See: [Full example project TLS-Libressl](https://github.com/oatpp/example-libressl)

### Create server connection provider

```cpp

#include "oatpp-libressl/server/ConnectionProvider.hpp"
#include "oatpp-libressl/Config.hpp"

...

const char* crtFile = "path/to/file.crt";
const char* pemFile = "path/to/file.pem";

auto config = oatpp::libressl::Config::createDefaultServerConfigShared(crtFile, pemFile /* private key */);
auto connectionProvider = oatpp::libressl::server::ConnectionProvider::createShared(config, 8443);

```

### Create client connection provider

```cpp

#include "oatpp-libressl/client/ConnectionProvider.hpp"
#include "oatpp-libressl/Config.hpp"

...

auto config = oatpp::libressl::Config::createShared();
auto connectionProvider = oatpp::libressl::client::ConnectionProvider::createShared(config, "httpbin.org", 443);

```

## Don't forget!

Set libressl lockingCallback and SIGPIPE handler on program start!

```cpp

#include "oatpp-libressl/Callbacks.hpp"

...

/* set lockingCallback for libressl */
oatpp::libressl::Callbacks::setDefaultCallbacks();

```

```cpp
#include <csignal>

...

/* ignore SIGPIPE */
std::signal(SIGPIPE, SIG_IGN);
```

## See more

- [oatpp-mbedtls](/docs/modules/oatpp-mbedtls/)

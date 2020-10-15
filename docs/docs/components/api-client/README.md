---
title: ApiClient
description: HTTP calls with oatpp Api Client.
sidebarDepth: 2
---

# Api Client <seo/>

`ApiClient` is the class which extends [oatpp::web::client::ApiClient](/api/latest/oatpp/web/client/ApiClient/). 
It provides convenient declaration of remote API calls.

[[toc]]

## Declaration

API calls are created with the help of code-gen macros.  
API calls code generation section must begin with 
`#include OATPP_CODEGEN_BEGIN(ApiClient)` and must be closed with 
`#include OATPP_CODEGEN_END(ApiClient)`.  
*Do not forget to close the code generation section in order to avoid macro conflicts later in the code!*

```cpp
#include "oatpp/web/client/ApiClient.hpp"
#include "oatpp/core/macro/codegen.hpp"

#include OATPP_CODEGEN_BEGIN(ApiClient) ///< Begin code-gen section

class MyApiClient : public oatpp::web::client::ApiClient {

  API_CLIENT_INIT(MyApiClient)

  API_CALL("GET", "/resource", getResource)

};

#include OATPP_CODEGEN_END(ApiClient) ///< End code-gen section
```

## API Call Types 

There are two types of generated API calls:

- `API_CALL` - Used with **Simple API** (multithreaded API). Generates method which returns `std::shared_ptr<IncomingResponse>` - [incoming::Response](/api/latest/oatpp/web/protocol/http/incoming/Response/). 
- `API_CALL_ASYNC` - Used with **Async API**. Generates `oatpp::async::CoroutineWithResult` with `std::shared_ptr<IncomingResponse>` return type. 
See [oatpp coroutines](/docs/oatpp-coroutines/) for more information.

 
## Declaration of API Calls

Parameters and declarations of `API_CALL` and `API_CALL_ASYNC` are absolutely identical. The difference is in the return type only.

```cpp
API_CALL        ("<http-method>", "<path>", <method-name>, <optional param-mappings>)
API_CALL_ASYNC  ("<http-method>", "<path>", <method-name>, <optional param-mappings>)
```

### Path Variables Mapping

```cpp
API_CALL("GET", "/users/{userId}", getUserById, PATH(Int64, userId))
```

#### Path Variable Name Qualifier

```cpp
API_CALL("GET", "/users/{user-id}", getUserById, PATH(Int64, userId, "user-id"))
```

### Headers Mapping

```cpp
API_CALL("GET", "/users", getUsers, HEADER(String, userId, "X-USER-ID"))
```

### Query Parameters Mapping

```cpp
API_CALL("GET", "/users", getUsers, QUERY(Int32, age))
```

Here the destination URL will be:

```
/users?age=<age>
```

If more query parameters specified:

```cpp
API_CALL("GET", "/users", getUsers, QUERY(Int32, age), QUERY(String, firstName))
```

the destination URL will be:

```
/users?age=<age>&firstName=<firstName>
```

#### Query Parameter Name Qualifier

```cpp
API_CALL("GET", "/users", getUsers, QUERY(Int32, age, "user-age"))
```

the destination URL will be:

```
/users?user-age=<age>
```

### Body Parameter Mapping

#### Body As String

```cpp
API_CALL("POST", "/users", createUser, BODY_STRING(String, userInfo))
```

#### Body As DTO

*DTO will be serialized using ObjectMapper given to the ApiClient constructor*

```cpp
API_CALL("POST", "/users", createUser, BODY_DTO(Object<UserDto>, userInfo))
```

## Create Api Client

To create API client you need `network::client::ConnectionProvider`, `web::client::RequestExecutor`, and `ObjectMapper`:

```cpp
#include "oatpp/web/client/HttpRequestExecutor.hpp"
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"
#include "oatpp/network/tcp/client/ConnectionProvider.hpp"

...

using namespace oatpp::network;
using namespace oatpp::web;
using namespace oatpp::parser;

/* create connection provider */
auto connectionProvider = tcp::client::ConnectionProvider::createShared({"httpbin.org", 80, oatpp::network::Address::IP_4});

/* create HTTP request executor */
auto requestExecutor = client::HttpRequestExecutor::createShared(connectionProvider);

/* create JSON object mapper */
auto objectMapper = json::mapping::ObjectMapper::createShared();

/* create API client */
auto client = MyApiClient::createShared(requestExecutor, objectMapper);
``` 

### Connection Pool

To use connection pool for API client requests - wrap connection provider with [ConnectionPool](/api/latest/oatpp/network/ConnectionPool/) and pass it to `RequestExecutor`:

```cpp
#include "oatpp/network/ConnectionPool.hpp"

...

using namespace oatpp::network;
using namespace oatpp::web;

/* create connection provider */
auto connectionProvider = tcp::client::ConnectionProvider::createShared({"httpbin.org", 80, oatpp::network::Address::IP_4});

/* create connection pool */
auto connectionPool = std::make_shared<ClientConnectionPool>(
        connectionProvider /* connection provider */, 
        10 /* max connections */, 
        std::chrono::seconds(5) /* max lifetime of idle connection */
);

/* create request executor */
auto requestExecutor = client::HttpRequestExecutor::createShared(connectionPool /* pass connection pool */);

/* create API client */
auto client = MyApiClient::createShared(requestExecutor, objectMapper);
```

### Automatic Retries

To enable automatic retries - provide [RetryPolicy](http://localhost:8080/api/latest/oatpp/web/client/RetryPolicy/) to the API client.

*Note: Connection pools and automatic retries can work together with no conflicts - invalid connections are dismissed from the pool right away. And after retry interval client will request a new valid connection.*

```cpp
#include "oatpp/network/ConnectionPool.hpp"

...

using namespace oatpp::network;
using namespace oatpp::web;

/* create connection provider */
auto connectionProvider = tcp::client::ConnectionProvider::createShared({"httpbin.org", 80, oatpp::network::Address::IP_4});

/* create connection pool */
auto connectionPool = std::make_shared<ClientConnectionPool>(
        connectionProvider /* connection provider */, 
        10 /* max connections */, 
        std::chrono::seconds(5) /* max lifetime of idle connection */
);

/* create retry policy */
auto retryPolicy = std::make_shared<client::SimpleRetryPolicy>(2 /* max retries */, std::chrono::seconds(1) /* retry interval */);

/* create request executor */
auto requestExecutor = client::HttpRequestExecutor::createShared(connectionPool, retryPolicy /* retry policy */);

/* create API client */
auto client = MyApiClient::createShared(requestExecutor, objectMapper);
```
   
## Examples of code
- [https://github.com/oatpp/example-api-client](https://github.com/oatpp/example-api-client)
- [https://github.com/oatpp/oatpp-consul/blob/master/src/oatpp-consul/rest/Client.hpp](https://github.com/oatpp/oatpp-consul/blob/master/src/oatpp-consul/rest/Client.hpp)
 
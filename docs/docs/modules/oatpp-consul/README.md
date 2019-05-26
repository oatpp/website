---
title: oatpp-consul (module)
description: Oatpp module for Consul integration. Consul API client.
sidebarDepth: 0
---
# oatpp-consul <seo/>

[Github Repository](https://github.com/oatpp/oatpp-consul)  
[Example Project](/examples/consul/)

**oatpp-consul** - extension of [oatpp](/docs/modules/oatpp/) module.  
It provides [Consul](https://www.consul.io/) integration for oatpp applications.

### KV

```cpp

#include "oatpp-consul/Client.hpp"

...

  /* request executor should be previously initialized */
  auto client = oatpp::consul::Client::createShared(requestExecutor);

  /* put value */
  client->kvPut("key1", "value1");

  /* get value */
  auto value = client->kvGet("key1");

  /* print value */
  OATPP_LOGD("consul", "value='%s'", value->c_str());

  /* get kv metadata */
  auto meta = client->kvGetMetadata("key1");

  /* decode and pring value from metadata */
  OATPP_LOGD("consul", "value='%s'", meta->getValueDecoded()->c_str());

...

```

### Register Service

```cpp

#include "oatpp-consul/Client.hpp"

...

  /* request executor should be previously initialized */
  auto client = oatpp::consul::Client::createShared(requestExecutor);

  /* get oatpp::consul::rest::Client */
  auto restClient = client->getRestClient();

  auto checkPayload = oatpp::consul::rest::AgentCheckRegisterPayload::createShared();
  checkPayload->id = "service_check_id";
  checkPayload->name = "service_check_name";
  checkPayload->notes = "Check on the MyService/Health endpoint";
  checkPayload->http = "http://localhost:8000/check/health";
  checkPayload->method = "GET";
  checkPayload->interval = "30s";
  checkPayload->timeout = "15s";

  auto payload = oatpp::consul::rest::AgentServiceRegisterPayload::createShared();
  payload->id = "service_id";
  payload->name = "service_name";
  payload->port = 8000;
  payload->check = checkPayload;

  /* make API call */
  auto response = restClient->agentServiceRegister(payload);

  OATPP_LOGD("consul", "response='%s'", response->readBodyToString()->c_str());

...
```


---
title: oatpp-postgresql (module)
description: PostgreSQL adapter for Oat++ ORM
sidebarDepth: 0
---

# oatpp-postgresql <seo/>

[Github Repository](https://github.com/oatpp/oatpp-postgresql)  
[Example Project](https://github.com/oatpp/example-postgresql) 

PostgreSQL adapter for Oat++ ORM..  
*Note: this alpha version, which means that not all PostgreSQL data-types are supported.*

## Build And Install

*Note: you need to install the main [oatpp](https://github.com/oatpp/oatpp) module and PostgreSQL dev package first.*

- Clone this repository.
- In the root of the repository run:
   ```bash
   mkdir build && cd build
   cmake ..
   make install
   ```
   
## API

Detailed documentation on Oat++ ORM you can find [here](https://oatpp.io/docs/components/orm/).

### Connect to Database

All you need to start using oatpp ORM with PostgreSQL is to create `oatpp::postgresql::Executor` and provide it to your `DbClient`.

```cpp
#include "db/MyClient.hpp"
#include "oatpp-postgresql/orm.hpp"

class AppComponent {
public:
  
  /**
   * Create DbClient component.
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<db::MyClient>, myDatabaseClient)([] {
    /* Create database-specific ConnectionProvider */
    auto connectionProvider = std::make_shared<oatpp::postgresql::ConnectionProvider>("<connection-string>");    
  
    /* Create database-specific ConnectionPool */
    auto connectionPool = oatpp::postgresql::ConnectionPool::createShared(connectionProvider, 
                                                                          10 /* max-connections */, 
                                                                          std::chrono::seconds(5) /* connection TTL */);
    
    /* Create database-specific Executor */
    auto executor = std::make_shared<oatpp::postgresql::Executor>(connectionPool);
  
    /* Create MyClient database client */
    return std::make_shared<MyClient>(executor);
  }());

};
```

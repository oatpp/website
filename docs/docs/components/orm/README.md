---
title: Oat++ ORM
description: About Oat++ Object-relational mapping (ORM) framework.
sidebarDepth: 2
---

# Object-Relational Mapping (ORM) framework <seo/>

:::warning WIP 
This DOC is WIP  
Have got any questions - ask them in the [devs chat on Gitter](https://gitter.im/oatpp-framework/Lobby)
:::

Oat++ ORM framework is a set of generalized interfaces and their implementations to make it easy to work with databases.

It's based on an [object-mapping framework](/docs/components/dto/) and ensures data consistency when manipulating with data. 
Also, it integrates perfectly with other Oat++ components ensuring seamless data-flow in the application 
(example: from REST to database, from the database to REST).

[[toc]]

## High-Level Overview

### Declare DbClient

The main component you are going to work with is the [DbClient](/api/latest/oatpp/orm/DbClient/). 
You may treat it as the main point interfacing with your data. Here you declare database queries and manage database schema migrations.

Database queries are declared with the help of code-gen macros.  
DbClient code generation section must begin with 
`#include OATPP_CODEGEN_BEGIN(DbClient)` and must be closed with 
`#include OATPP_CODEGEN_END(DbClient)`.  
*Do not forget to close the code generation section in order to avoid macro conflicts later in the code!*

```cpp
#include "oatpp/orm/SchemaMigration.hpp"
#include "oatpp/orm/DbClient.hpp"
#include "oatpp/core/macro/codegen.hpp"

#include OATPP_CODEGEN_BEGIN(DbClient) ///< Begin code-gen section

class MyClient : public oatpp::orm::DbClient {
public:

  MyClient(const std::shared_ptr<oatpp::orm::Executor>& executor)
    : oatpp::orm::DbClient(executor)
  {
    oatpp::orm::SchemaMigration migration(executor); // Init schema using SchemaMigration
    migration.addFile(1, "sql/initial_schema.sql");
    migration.addFile(2, "sql/schema_fix_1.sql");
    migration.migrate(); //<-- Throws an error on migration failure.
  }

  /**
   * Declare create user method
   */
  QUERY(createUser,
        "INSERT INTO users (name, email, role) VALUES (:name, :email, :role);", // SQL-template
        PARAM(oatpp::String, name), PARAM(oatpp::String, email), PARAM(oatpp::Enum<UserRoles>::AsString, role)) // Template parameters

  /**
   * Declare get user-by id method
   */
  QUERY(getUserByName, 
        "SELECT * FROM users WHERE name=:name;", // SQL-template
        PARAM(oatpp::String, name)) // Template parameters
        
};

#include OATPP_CODEGEN_END(DbClient) ///< End code-gen section
```

### Create DbClient Component And Connect to Database

DbClient is a heavy object - you want to instantiate it once and then inject it in whatever places you are going to use it.  
- **Note:** `ConnectionProvider` and `ConnectionPool` objects can be reused by multiple `Executors` unless it's 
prohibited by a database-specific implementation.
- **Note:** `Executor` can be reused by multiple DbClients unless it's prohibited by a database-specific implementation.

```cpp
#include "db/MyClient.hpp"
#include "oatpp-sqlite/orm.hpp"

class AppComponent {
public:
  
  /**
   * Create DbClient component.
   * SQLite is used as an example here. For other databases declaration is similar.
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<db::MyClient>, myDatabaseClient)([] {
    /* Create database-specific ConnectionProvider */
    auto connectionProvider = std::make_shared<oatpp::sqlite::ConnectionProvider>("/path/to/database.sqlite");    
  
    /* Create database-specific ConnectionPool */
    auto connectionPool = oatpp::sqlite::ConnectionPool::createShared(connectionProvider, 
                                                                      10 /* max-connections */, 
                                                                      std::chrono::seconds(5) /* connection TTL */);
    
    /* Create database-specific Executor */
    auto executor = std::make_shared<oatpp::sqlite::Executor>(connectionPool);
  
    /* Create MyClient database client */
    return std::make_shared<MyClient>(executor);
  }());

};
```

### DbClient Usage Example

```cpp
/* Inject MyClient database client */
OATPP_COMPONENT(std::shared_ptr<db::MyClient>, client);

/* Create new user in the database */
client->createUser("admin", "admin@domain.com", UserRoles::ADMIN);

/* Find user by name in the database */
auto result = client->getUserByName("admin");

/* Retrieve query result as a vector of UserDto objects */
/* Of cause, UserDto had to be previously defined */
/* You can also use oatpp::Fields<oatpp::Any> - instead of UserDto for any arbitrary result */
auto dataset = res->fetch<oatpp::Vector<oatpp::Object<UserDto>>>();

/* And we can easily serialize result as a json string using json object mapper */
auto json = jsonObjectMapper.writeToString(dataset);

/* Print the resultant json */
std::cout << json->c_str() << std::endl;
```

Output:

```json
[
  {
    "name": "admin",
    "email": "admin@domain.com",
    "role": "ROLE_ADMIN"
  }
]
```

## Libraries Hierarchy

The main **oatpp** module contains ORM interfaces only. In order to "plug" a specific database, 
you have to link the corresponding adaptor (ex.: **oatpp-sqlite**).

```
- oatpp                     # The main oatpp module. ORM interfaces are here.
    |
    |- oatpp-sqlite         # Sqlite adapter for oatpp ORM. Sqlite-specific implementation is here.
    |- oatpp-postgresql     # PostgreSQL adapter for oatpp ORM. PostgreSQL-specific implementation is here.
    ...
    ... etc.
```

## Examples projects

- [example-crud](https://github.com/oatpp/example-crud) - Using oatpp ORM with SQLite.
- [example-postgresql](https://github.com/oatpp/example-postgresql) - Using oatpp ORM with PostgreSQL.

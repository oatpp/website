---
title: Oat++ ORM
description: About Oat++ Object-relational mapping (ORM) framework.
sidebarDepth: 2
---

# Object-Relational Mapping (ORM) framework <seo/>

:::warning Attention 
Oat++ ORM will be available starting from version `1.2.0`. 
At the moment this docs are provided for enthusiasts doing beta-testing.   
For more info ask us a question in the [devs chat on Gitter](https://gitter.im/oatpp-framework/Lobby)
:::

:::warning WIP 
This DOC is WIP
:::


Oat++ ORM framework is a set of generalized interfaces and their implementations to make it easy to work with databases.

It's based on an [object-mapping framework](/docs/components/dto/) and ensures data consistency when manipulating with data. 
Also, it integrates perfectly with other Oat++ components ensuring seamless data-flow in the application 
(example: from REST to database, from the database to REST).

[[toc]]

## How It Looks Like

The main component you are going to work with is the [DbClient](/api/latest/oatpp/orm/DbClient/).
Here you declare database queries and manage database schema migrations.

### Declaration

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
    migration.migrate();
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

### Usage

```cpp
/* declare a client */
auto client = MyClient(executor /* database-specific executor */);

/* Create new user in the database */
client.createUser("admin", "admin@domain.com", UserRoles::ADMIN);

/* Find user by name in the database */
auto result = client.getUserByName("admin");

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


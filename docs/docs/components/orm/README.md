---
title: Oat++ ORM
description: About Oat++ Object-relational mapping (ORM) framework.
sidebarDepth: 2
---

# Object-Relational Mapping (ORM) framework <seo/>

:::tip 
Have got any questions - ask them in the [Devs Chat on Gitter](https://gitter.im/oatpp-framework/Lobby)
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
  {}

  /**
   * Create User.
   */
  QUERY(createUser,
        "INSERT INTO users (username, email, role) VALUES (:username, :email, :role);",
        PARAM(oatpp::String, username), 
        PARAM(oatpp::String, email), 
        PARAM(oatpp::Enum<UserRoles>::AsString, role)) 

  /**
   * Get User by username.
   */
  QUERY(getUserByName, 
        "SELECT * FROM users WHERE username=:username;", 
        PARAM(oatpp::String, username)) 
        
};

#include OATPP_CODEGEN_END(DbClient) ///< End code-gen section
```

### Create DbClient Component And Connect to Database

DbClient is a heavy object - you want to instantiate it once and then inject it in whatever places you are going to use it.  

```cpp
#include "db/MyClient.hpp"      //< User-declared DbClient
#include "oatpp-sqlite/orm.hpp" //< SQLite adapter for oatpp ORM

class AppComponent {
public:
  
  /**
   * Create DbClient component.
   * SQLite is used as an example here. For other databases declaration is similar.
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<db::MyClient>, myDatabaseClient)([] {

    /* Create database-specific ConnectionProvider */
    auto connectionProvider = std::make_shared<oatpp::sqlite::ConnectionProvider>("/path/to/database.sqlite");    

    /* Create database-specific Executor */
    auto executor = std::make_shared<oatpp::sqlite::Executor>(connectionProvider);
  
    /* Create MyClient database client */
    return std::make_shared<MyClient>(executor);

  }());

};
```

**Note:**
- `ConnectionProvider` and `ConnectionPool` objects can be reused by multiple `Executors` unless it's 
prohibited by a database-specific implementation.
- `Executor` can be reused by multiple DbClients unless it's prohibited by a database-specific implementation.


### DbClient Usage Example

```cpp
/* Inject MyClient database client */
OATPP_COMPONENT(std::shared_ptr<db::MyClient>, client);

/* Create new user in the database */
client->createUser("admin", "admin@domain.com", UserRoles::ADMIN);

/* Find user by username in the database */
auto result = client->getUserByUsername("admin");

/* Retrieve query result as a vector of UserDto objects */
/* Of cause, UserDto had to be previously defined */
/* You can also use oatpp::Fields<oatpp::Any> - instead of oatpp::Object<UserDto> for any arbitrary result */
auto dataset = result->fetch<oatpp::Vector<oatpp::Object<UserDto>>>();

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

## Supported Databases

### Available Database Adaptors

|Adaptor|Database|Limitations|Example Project|
|---|---|---|---|
|[oatpp-sqlite](https://github.com/oatpp/oatpp-sqlite)|SQLite|**Full feature support**|[example-crud](https://github.com/oatpp/example-crud)|
|[oatpp-postgresql](https://github.com/oatpp/oatpp-postgresql)|PostgreSQL|Doesn't support all postgres types|[example-postgresql](https://github.com/oatpp/example-postgresql)|


### Libraries Hierarchy

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

## DbClient

### Declare a Query

```cpp
QUERY(selectAllUsers, "SELECT * FROM users;") 
```

### Query With Parameters

```cpp
QUERY(selectUserByUsername, 
      "SELECT * FROM users WHERE username=:username;",
      PARAM(oatpp::String, username)) 
```

During execution the expression `username=:username` will be changed to `username='<username-parameter-value>'` and
parameter value will be properly escaped according to its type. 

### Query With DTO as a Parameter

For complex queries, it's more convenient to use DTO objects as for parameters set. Thus you ensure the correct order of arguments.

```cpp
QUERY(insertUser, 
      "INSERT INTO users "
      "(username, email, role) VALUES "
      "(:user.username, :user.email, :user.role);",
      PARAM(oatpp::Object<UserDto>, user))
```

**Note:**  
The query template variable names are now starting with `user`, like `user.username` -
where `user` is the name of the DTO parameter, and `username` is the name of DTO field.

- **Yes**, you can specify a path to nested DTO fields like `:user.path.to.nested.field`.
- **Yes**, you can have multiple DTO parameters in the query, and you can mix DTO parameters with regular parameters.


### Query With Prepared Statement

```cpp
QUERY(selectUserByUsername, 
      "SELECT * FROM users WHERE username=:username;",
      PREPARE(true), //<-- set prepare to `true` to use a prepared statement.
      PARAM(oatpp::String, username)) 
```

**Note**:  
The database adapter may ignore this. 
For example: 
- SQLite is always using prepared statements to execute queries thus **oatpp-sqlite** will ignore this parameter.
- PostgreSQL has a special method to execute prepared statements thus **oatpp-postgresql** will not ignore this parameter.

### Execute An Arbitrary Query

To execute an arbitrary query use [DbClient::executeQuery()](/api/latest/oatpp/orm/DbClient/#dbclient-executequery) method.  
Use this method when it's needed to dynamically build a query.

```cpp
auto dbResult = client.executeQuery("SELECT * FROM users;", {} /* empty params map */);
```

You can add parameters using parameters map:

```cpp
auto dbResult = client.executeQuery(
  "SELECT * FROM users WHERE id=:id AND username=:username;", 
  {
    {"id", oatpp::Int64(23)},             ///< Yes, you have to explicitly specify parameter type here - oatpp::Int64
    {"username", oatpp::String("admin")}  ///< Yes, you have to explicitly specify parameter type here - oatpp::String
  }
);
```

When building parameters map dynamically you have to use `std::unordered_map::insert()` method.  
The `[]` operator WON'T work.

```cpp
std::unordered_map<oatpp::String, oatpp::Void> params;
params.insert({"id", oatpp::Int64(23)});
params.insert({"username", oatpp::String("admin")});
auto dbResult = client.executeQuery("SELECT * FROM users WHERE id=:id AND username=:username;", params);
```

To build a query string it's recommended to use [oatpp::data::stream::BufferOutputStream](/api/latest/oatpp/core/data/stream/BufferStream/#bufferoutputstream).

```cpp
#include "oatpp/core/data/stream/BufferStream.hpp"

...

oatpp::data::stream::BufferOutputStream stream;
stream 
<< "SELECT * FROM users "
<< "WHERE "
<< "id=:id" << " AND " << "username=:username" << ";" 

std::unordered_map<oatpp::String, oatpp::Void> params;
params.insert({"id", oatpp::Int64(23)});
params.insert({"username", oatpp::String("admin")});

auto dbResult = client.executeQuery(stream.toString(), params);
```

### Enable Type Interpretations

When using custom or non-standard types as parameters in `QUERY` macro, 
as well as when reading query results to custom/non-standard structures, you have to 
explicitly enable corresponding type interpretations. 

The recommended place to do it - is the constructor:

```cpp
class MyClient : public oatpp::orm::DbClient {
public:

  MyClient(const std::shared_ptr<oatpp::orm::Executor>& executor)
    : oatpp::orm::DbClient(executor)
  {
    setEnabledInterpretations({"protobuf"});
  }

  ...
        
};
```

#### Query With Custom Type Parameter

```cpp
QUERY(insertUser, 
      "INSERT INTO users "
      "(username, email, role) VALUES "
      "(:user.username, :user.email, :user.role);",
      PARAM(oatpp::protobuf::Object<User>, user)) // Pass protobuf object
```

#### Map Query Result To Custom Type

```cpp
/* Execute query */
auto result = client->getUserByUsername("admin");

/* Map result to a vector of protobuf objects */
auto dataset = res->fetch<oatpp::Vector<oatpp::protobuf::Object<User>>>(); // Map result

for(auto& user : *dataset) {
  ...
}
```

### Transactions

Use [DbClient::beginTransaction()](/api/latest/oatpp/orm/DbClient/#dbclient-begintransaction) method to begin a transaction.  
All queries MUST be executed on the same transaction connection.

```cpp
{
  auto transaction = client.beginTransaction();
  
  client.insertUser(user1, transaction.getConnection());
  client.insertUser(user2, transaction.getConnection());
  client.insertUser(user3, transaction.getConnection());

  transaction.commit();
}
```

**Note:**  
Transaction will be automatically rollback if [Transaction::commit()](/api/latest/oatpp/orm/Transaction/#transaction-commit) method
was not called. 


## Executing Queries

```cpp
/* Execute a query */
auto queryResult = client.selectAllUsers();

/* Check if the operation was successful */
if(!queryResult->isSuccess()) {
  auto message = queryResult->getErrorMessage();
  OATPP_LOGD("Query", "Error, message=%s", message->c_str());
}

/* Fetch everything as a vector of User objects */
auto dataset = queryResult->fetch<oatpp::Vector<oatpp::Object<User>>>();
```

The `queryResult` here is the [oatpp::orm::QueryResult](/api/latest/oatpp/orm/QueryResult/) object.
All queries return `oatpp::orm::QueryResult`.

### Mapping Results

Available result mappings depend on the database adapter but here are some examples (that work for oatpp-sqlite and oatpp-postgresql)...

#### Map everything using previously decalred `UserDto` and display results

For more info on how to declare a DTO - see [oatpp::DTO](/docs/components/dto/)

```cpp
auto dataset = queryResult->fetch<oatpp::Vector<oatpp::Object<oatpp::UserDto>>>();

/* Serialize result as a json string using json object mapper */
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
  },
  {
    "name": "ivan",
    "email": "ivan@domain.com",
    "role": "ROLE_GUEST"
  }
]
```

#### Map everything using `oatpp::Any` and display results

```cpp
auto dataset = queryResult->fetch<oatpp::Vector<oatpp::Fields<oatpp::Any>>>();

/* Serialize result as a json string using json object mapper */
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
  },
  {
    "name": "ivan",
    "email": "ivan@domain.com",
    "role": "ROLE_GUEST"
  }
]
```

### Managing Connections

All declared queries have an [oatpp::orm::Connection](/api/latest/oatpp/orm/Connection/) as the last parameter.  
If the connection is not specified(`nullptr`), then the new connection will be opened to execute that query.

```cpp
{
  auto queryResult = client.selectAllUsers(); //< Open a new connection.
}

{
  auto connection = client.getConnection();
  auto queryResult = client.selectAllUsers(connection); //< Execute using the connection provided.
}

{
  auto queryResult = client.selectAllUsers(); //< Open a new connection.
  ...
  queryResult = client.insertUser(user, queryResult->getConnection()); //< Execute on the same connection as the last query.
}
```

**Note:**

The `queryResult` object holds a connection. The connection won't return to the connection pool until `queryResult` is destroyed.

## Connection Pool

It's always a good idea to use a connection pool when working with a database.

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

**Note:**
SQLite is used as an example here. For other databases declaration is similar.

## Schema Migration

Use [SchemaMigration](/api/latest/oatpp/orm/SchemaMigration/) to do schema migrations!  
The recommended place to do schema migrations is the constructor of your DbClient. 

### Overview

```cpp
class MyClient : public oatpp::orm::DbClient {
public:

  MyClient(const std::shared_ptr<oatpp::orm::Executor>& executor)
    : oatpp::orm::DbClient(executor)
  {
    oatpp::orm::SchemaMigration migration(executor); 
    migration.addFile(1 /* version */, "sql/initial_schema.sql" /* migration script */);
    migration.addFile(2 /* version */, "sql/schema_fix_1.sql"   /* migration script */);
    ...
    migration.migrate(); //<-- This guy will throw on error.
  }

  ...
        
};
```

**Note:**

- Version MUST start from `1`.
- Version MUST be incremented by `1`.
- In case of an error changes will be rolled back to the last successfully applied version.

### Schema Name

If you have multiple Schemas in your database you can manage migrations of each one independently. 
For this specify a version control table suffix:

```cpp
oatpp::orm::SchemaMigration migration(executor, "suffix");
```

**Note:**
It is recommended to have one DbClient per schema!

## Examples projects

- [example-crud](https://github.com/oatpp/example-crud) - Using oatpp ORM with SQLite.
- [example-postgresql](https://github.com/oatpp/example-postgresql) - Using oatpp ORM with PostgreSQL.

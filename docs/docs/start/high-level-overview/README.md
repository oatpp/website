---
title: High Level Overview 
description: High level overview of Oat++ web framework components.
sidebarDepth: 2
---

# High Level Overview <seo/>

This is the high level overview of Oat++ API.

[[toc]]

## API Controller - Request Mapping

For more info see [Api Controller](/docs/components/api-controller/)

### Declare Endpoint

```cpp
ENDPOINT("PUT", "/users/{userId}", putUser,
         PATH(Int64, userId),
         BODY_DTO(Object<UserDto>, userDto)) 
{
  userDto->id = userId;
  return createDtoResponse(Status::CODE_200, m_database->updateUser(userDto));
}
```

### Add CORS for Endpoint

For more info see [Api Controller / CORS](/docs/components/api-controller/#cors)

```cpp
ADD_CORS(putUser)
ENDPOINT("PUT", "/users/{userId}", putUser,
         PATH(Int64, userId),
         BODY_DTO(Object<UserDto>, userDto)) 
{
  userDto->id = userId;
  return createDtoResponse(Status::CODE_200, m_database->updateUser(userDto));
}
```

### Endpoint with Authorization

For more info see [Api Controller / Authorization](/docs/components/api-controller/#authorization-basic)

```cpp
using namespace oatpp::web::server::handler;
  
ENDPOINT("PUT", "/users/{userId}", putUser,
         AUTHORIZATION(std::shared_ptr<DefaultBasicAuthorizationObject>, authObject),
         PATH(Int64, userId),
         BODY_DTO(Object<UserDto>, userDto)) 
{
  OATPP_ASSERT_HTTP(authObject->userId == "Ivan" && authObject->password == "admin", Status::CODE_401, "Unauthorized");
  userDto->id = userId;
  return createDtoResponse(Status::CODE_200, m_database->updateUser(userDto));
}
```

## API Client - Retrofit / Feign Like Client

For more info see [Api Client](/docs/components/api-client/)

### Declare Client

```cpp
class UserService : public oatpp::web::client::ApiClient {
public:

  API_CLIENT_INIT(UserService)

  API_CALL("GET", "users", getUsers)
  API_CALL("GET", "users/{userId}", getUserById, PATH(Int64, userId))

};
```

### Using API Client

```cpp
auto response = userService->getUserById(id);
auto user = response->readBodyToDto<oatpp::Object<UserDto>>(objectMapper);
```

## Object Mapping

For more info see [Data Transfer Object (DTO)](/docs/components/dto/).

### Declare DTO

```cpp
class UserDto : public oatpp::Object {

  DTO_INIT(UserDto, Object)

  DTO_FIELD(Int64, id);
  DTO_FIELD(String, name);

};
```

### Serialize DTO Using ObjectMapper

```cpp
using namespace oatpp::parser::json::mapping;

/* Create JSON object mapper */
ObjectMapper objectMapper;

auto user = UserDto::createShared();
user->id = 1;
user->name = "Ivan";

/* Serialize DTO to JSON */
auto json = objectMapper.writeToString(user);
```

Output:

```json
{
  "id": 1,
  "name": "Ivan"
}
```

## Swagger-UI Annotations

For more info see [Endpoint Annotation And API Documentation](/docs/components/api-controller/#endpoint-annotation-and-api-documentation)

### Additional Endpoint Info

```cpp
ENDPOINT_INFO(putUser) {
  // general
  info->summary = "Update User by userId";
  info->addConsumes<Object<UserDto>>("application/json");
  info->addResponse<Object<UserDto>>(Status::CODE_200, "application/json");
  info->addResponse<String>(Status::CODE_404, "text/plain");
  // params specific
  info->pathParams["userId"].description = "User Identifier";
}
ENDPOINT("PUT", "/users/{userId}", putUser,
         PATH(Int64, userId),
         BODY_DTO(Object<UserDto>, userDto)) 
{
  userDto->id = userId;
  return createDtoResponse(Status::CODE_200, m_database->updateUser(userDto));
}
```

## ORM Framework 

For more info see [Oat++ ORM Framework](/docs/components/orm/)

### Declare DbClient

```cpp
class MyClient : public oatpp::orm::DbClient {
public:

  MyClient(const std::shared_ptr<oatpp::orm::Executor>& executor)
    : oatpp::orm::DbClient(executor)
  {}

  QUERY(createUser,
        "INSERT INTO users (username, email, role) VALUES (:username, :email, :role);",
        PARAM(oatpp::String, username), 
        PARAM(oatpp::String, email), 
        PARAM(oatpp::Enum<UserRoles>::AsString, role)) 

  QUERY(getUserByName, 
        "SELECT * FROM users WHERE username=:username;", 
        PARAM(oatpp::String, username)) 
        
};
```

### DbClient Usage Example

```cpp
...

/* Create MyClient database client */
MyClient client(executor);

/* Create new user in the database */
client.createUser("admin", "admin@domain.com", UserRoles::ADMIN);

/* Find user by username in the database */
auto result = client.getUserByUsername("admin");

/* Retrieve query result as a vector of UserDto objects */
/* Of cause, UserDto had to be previously defined */
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

## Modules And Build Status

To get an overview of oatpp modules, their hierarchy, and build status - see [build status](/status/build/).

## Read Next

- [Well Structured Project](/docs/start/step-by-step/#well-structured-project)



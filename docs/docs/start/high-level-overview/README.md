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
         BODY_DTO(dto::UserDto::ObjectWrapper, userDto)) 
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
         BODY_DTO(dto::UserDto::ObjectWrapper, userDto)) 
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
         BODY_DTO(dto::UserDto::ObjectWrapper, userDto)) 
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

  API_CALL("GET", "/users", getUsers)
  API_CALL("GET", "/users/{userId}", getUserById, PATH(Int64, userId))

};
```

### Using API Client

```cpp
auto response = userService->getUserById(id);
auto user = response->readBodyToDto<dto::UserDto>(objectMapper);
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

auto user = UserDto::createShared();
user->id = 1;
user->name = "Ivan";

auto objectMapper = ObjectMapper::createShared();
auto json = objectMapper->writeToString(user);
```

## Swagger-UI Annotations

For more info see [Endpoint Annotation And API Documentation](/docs/components/api-controller/#endpoint-annotation-and-api-documentation)

### Additional Endpoint Info

```cpp
ENDPOINT_INFO(putUser) {
  // general
  info->summary = "Update User by userId";
  info->addConsumes<dto::UserDto::ObjectWrapper>("application/json");
  info->addResponse<dto::UserDto::ObjectWrapper>(Status::CODE_200, "application/json");
  info->addResponse<String>(Status::CODE_404, "text/plain");
  // params specific
  info->pathParams["userId"].description = "User Identifier";
}
ENDPOINT("PUT", "/users/{userId}", putUser,
         PATH(Int64, userId),
         BODY_DTO(dto::UserDto::ObjectWrapper, userDto)) 
{
  userDto->id = userId;
  return createDtoResponse(Status::CODE_200, m_database->updateUser(userDto));
}
```

## Read Next

- [Well Structured Project](/docs/start/step-by-step/#well-structured-project)



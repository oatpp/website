---
title: High Level Overview 
description: High level overview of Oat++ web framework components.
sidebarDepth: 2
---

# High Level Overview <seo/>

This is a high level overview of Oat++ APIs.

[[toc]]

## Object Mapping

For more info see [Data Transfer Object (DTO)](/docs/components/dto/).

### Declare DTO

```cpp
class UserDto : public oatpp::data::mapping::type::Object {

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

## General Project Structure

For more info see [Well Structured Project](/docs/start/step-by-step/#well-structured-project)


```
|- CMakeLists.txt                        // projects CMakeLists.txt
|- src/
|    |
|    |- dto/                             // Folder containing DTOs definitions
|    |    |
|    |    |- DTOs.hpp                    // DTOs are declared here
|    |     
|    |- controller/                      // Folder containing API Controllers where all endpoints are declared
|    |    |
|    |    |- MyController.hpp            // Sample - MyController is declared here
|    |     
|    |- AppComponent.hpp                 // Application Components configuration 
|    |- App.cpp                          // main() is here
|
|- test/                                 // test folder
     |
     |- app/
     |    |
     |    |- MyApiTestClient.hpp         // Api client for test API calls is declared here
     |    |- TestComponent.hpp           // Test application components configuration
     |                                   
     |- MyControllerTest.cpp             // MyController test logic is here
     |- MyControllerTest.hpp             // MyController test header
     |- Tests.cpp                        // tests main() is here
```


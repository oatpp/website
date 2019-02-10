# Data Transfer Object (DTO) <seo/>

DTO is any object of the class which extends `oatpp::data::mapping::type::Object`. It is a special object which can be Serialized and Deserialized with the help of 
`oatpp::data::mapping::ObjectMapper`.
 
DTO objects are generated withing DTO-code-gen section. DTO code generation section must begin with  
`#include OATPP_CODEGEN_BEGIN(DTO)` and must be closed with `#include OATPP_CODEGEN_END(DTO)`. 
*Do not forget to close code generation section in order to avoid macro conflicts later in the code!*

```cpp
#include "oatpp/core/data/mapping/type/Object.hpp"
#include "oatpp/core/macro/codegen.hpp"

#include OATPP_CODEGEN_BEGIN(DTO) ///< Begin DTO codegen section

class User : public oatpp::data::mapping::type::Object {

  DTO_INIT(User, Object /* extends */)

  DTO_FIELD(String, name, "First-Name");
  DTO_FIELD(String, surname, "Family-Name");
  DTO_FIELD(Int32, age);
  DTO_FIELD(Fields<List<User::ObjectWrapper>::ObjectWrapper>::ObjectWrapper, familyMembers); ///< Map<String, List<User>>
  DTO_FIELD(Fields<String>::ObjectWrapper, additionalNotes); ///< Map<String, String>

};

#include OATPP_CODEGEN_END(DTO) ///< End DTO codegen section
```

`ObjectWrapper` is a special structure that holds data-type information. In fact all mapping-enabled types in oatpp including 
`String`, `Int32`, `Int64`, `Float32`, `Float64`, `Boolean` are ObjectWrappers over primitive types and can hold 
`nullptr` value.

## Predefined Mapping-Enabled Types

- `String` - ObjectWrapper over oatpp::base::StrBuffer. Can be null.
- `Int32` - ObjectWrapper over v_int32. Can be null.
- `Int64` - ObjectWrapper over v_int64. Can be null.
- `Float32` - ObjectWrapper over v_float32. Can be null.
- `Float64` - ObjectWrapper over v_float64. Can be null.
- `Boolean` - ObjectWrapper over bool. Can be null.
- `List<T>` - List of T. Can be null.
- `Fields<T>` - ListMap<String, T>. Can be null.

*Also one can define a custom type to be used in custom ObjectMapper*


## JSON Serialize - Deserialize example

Example of Serialization and Deserialization of the User DTO (defined above).

```cpp
/* create json ObjectMapper with default configs */
auto jsonObjectMapper = oatpp::parser::json::mapping::ObjectMapper::createShared();

/* create user */
auto user = User::createShared();
user->name = "Ivan";
user->surname = "Ovsyanochka";
user->age = 24;
user->familyMembers = user->familyMembers->createShared();
user->additionalNotes = user->additionalNotes->createShared();

/* create user */
auto brother = User::createShared();
brother->name = "Yuriy";
brother->surname = "Ovsyanochka";
brother->age = 30;

/* create user */
auto sister = User::createShared();
sister->name = "Kate";
sister->surname = "Ovsyanochka";
sister->age = 20;

/* create list of siblings */
auto siblings = oatpp::data::mapping::type::List<User::ObjectWrapper>::createShared();
siblings->pushBack(brother);
siblings->pushBack(sister);

user->familyMembers->put("siblings", siblings);
user->additionalNotes->put("Education", "Master of Computer Science");

auto json = jsonObjectMapper->writeToString(user); ///< Serialize user to json. jsonObjectMapper should have been initialized previously

OATPP_LOGD("json", "value='%s'", json->c_str()); ///< print json

auto cloneOfUser = jsonObjectMapper->readFromString<User>(json); ///< Deserialize user
```

output:
```json
{
  "additionalNotes": {
    "Education": "Master of Computer Science"
  },
  "Family-Name": "Ovsyanochka",
  "familyMembers": {
    "siblings": [
      {
        "additionalNotes": null,
        "Family-Name": "Ovsyanochka",
        "familyMembers": null,
        "age": 30,
        "First-Name": "Yuriy"
      },
      {
        "additionalNotes": null,
        "Family-Name": "Ovsyanochka",
        "familyMembers": null,
        "age": 20,
        "First-Name": "Kate"
      }
    ]
  },
  "age": 24,
  "First-Name": "Ivan"
}
```

## Examples of code

[https://github.com/oatpp/oatpp-consul/blob/master/src/oatpp-consul/rest/DTOs.hpp](https://github.com/oatpp/oatpp-consul/blob/master/src/oatpp-consul/rest/DTOs.hpp)
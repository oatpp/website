---
title: Data Transfer Object
description: Oatpp Data-Transfer-Object (DTO) and object mapping.
sidebarDepth: 2
---

# Data Transfer Object (DTO) <seo/>

DTO is any object of the class which extends [oatpp::data::mapping::type::Object](/api/latest/oatpp/core/data/mapping/type/Object/). 
It is a special object which can be Serialized and Deserialized with the help of 
[oatpp::data::mapping::ObjectMapper](/api/latest/oatpp/core/data/mapping/ObjectMapper/).

[[toc]]

## Declaration

DTO objects are generated withing DTO-code-gen section. DTO code generation section must begin with  
`#include OATPP_CODEGEN_BEGIN(DTO)` and must be closed with `#include OATPP_CODEGEN_END(DTO)`. 
*Do not forget to close code generation section in order to avoid macro conflicts later in the code!*

```cpp
#include "oatpp/core/data/mapping/type/Object.hpp"
#include "oatpp/core/macro/codegen.hpp"

#include OATPP_CODEGEN_BEGIN(DTO) ///< Begin DTO codegen section

class User : public oatpp::data::mapping::type::Object {

  DTO_INIT(User, Object /* extends */)

  DTO_FIELD(String, name);
  DTO_FIELD(Int32, age);

};

#include OATPP_CODEGEN_END(DTO) ///< End DTO codegen section
```

### Field Name Qualifier

```cpp
DTO_FIELD(String, name, "user-name");
```

### Default Value

By default all values are set to `nullptr`. You can override default values by assigning values to DTO fields.

```cpp
DTO_FIELD(String, name) = "Ivan";
```

### Primitive Types

#### Predefined primitive types

- `String` - [ObjectWrapper](#objectwrapper) over oatpp::base::StrBuffer. Can be null.
- `Int8` - [ObjectWrapper](#objectwrapper) over v_int8. Can be null.
- `Int16` - [ObjectWrapper](#objectwrapper) over v_int16. Can be null.
- `Int32` - [ObjectWrapper](#objectwrapper) over v_int32. Can be null.
- `Int64` - [ObjectWrapper](#objectwrapper) over v_int64. Can be null.
- `Float32` - [ObjectWrapper](#objectwrapper) over v_float32. Can be null.
- `Float64` - [ObjectWrapper](#objectwrapper) over v_float64. Can be null.
- `Boolean` - [ObjectWrapper](#objectwrapper) over bool. Can be null.

#### Assign value

```cpp
String s = "Hello!";
Int32 a = 32;
Boolean b = true;
```

Note: By default all values are set to `nullptr`.

#### Get value as primitive

```cpp
Int32 a = 32;
Boolean b = true;

v_int32 ap = a->getValue();
bool bp = b->getValue();
```

### Collections

#### Predefined collections

- `List<T>` - [LinkedList](/api/latest/oatpp/core/collection/LinkedList/) of T. Can be null.
- `Fields<T>` - [ListMap](/api/latest/oatpp/core/collection/ListMap/)<String, T>. Can be null.  
*With `Fields` you always map `String` to other type*.

#### Declare Field As List

List of primitives:

```cpp
DTO_FIELD(List<Int32>::ObjectWrapper, colors);
```

List of Objects:

```cpp
DTO_FIELD(List<MyObject::ObjectWrapper>::ObjectWrapper, colors);
```

#### Declare Field As Map
 

Map `String --> Int32`:

```cpp
DTO_FIELD(Fields<Int32>::ObjectWrapper, colors);
```

Map `String --> Object`:

```cpp
DTO_FIELD(Fields<MyObject::ObjectWrapper>::ObjectWrapper, colors);
```

### Custom Mapping-Enabled Types

*Please note that one can define a custom type to be used in custom ObjectMapper.*  
*This section is not documented yet.*
*For information about custom object mapping contact us in [dev-chat](https://gitter.im/oatpp-framework/Lobby)*

## ObjectWrapper

`ObjectWrapper` is a special structure that holds data-type information. In fact all mapping-enabled types in oatpp including 
`String`, `Int32`, `Int64`, `Float32`, `Float64`, `Boolean` are ObjectWrappers over primitive types and can hold 
`nullptr` value.

See [ObjectWrapper](/api/latest/oatpp/core/data/mapping/type/Type/#objectwrapper).


## Example

### Serialize / Deserialize 

#### Define DTO

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

#### Create object and set fields

```cpp
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
```

#### Create JSON object mapper

```cpp
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"

...

/* create json ObjectMapper with default configs */
auto jsonObjectMapper = oatpp::parser::json::mapping::ObjectMapper::createShared();
```

#### Serialize user to json

```cpp
oatpp::String json = jsonObjectMapper->writeToString(user); 
OATPP_LOGD("json", "value='%s'", json->c_str()); ///< print json
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

#### Deserizalize from String

```cpp
auto cloneOfUser = jsonObjectMapper->readFromString<User>(json);
```

## Examples of code

[https://github.com/oatpp/oatpp-consul/blob/master/src/oatpp-consul/rest/DTOs.hpp](https://github.com/oatpp/oatpp-consul/blob/master/src/oatpp-consul/rest/DTOs.hpp)
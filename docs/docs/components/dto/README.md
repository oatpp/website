---
title: Data Transfer Object
description: Oatpp Data-Transfer-Object (DTO) and object mapping.
sidebarDepth: 2
---

# Data Transfer Object (DTO) <seo/>

DTO is any object of the class which extends [oatpp::DTO](/api/latest/oatpp/core/Types/#dto). 
It is a special object which can be Serialized and Deserialized with the help of 
[oatpp::data::mapping::ObjectMapper](/api/latest/oatpp/core/data/mapping/ObjectMapper/).

[[toc]]

## Declaration

DTO objects are generated within DTO-code-gen section. DTO code generation section must begin with  
`#include OATPP_CODEGEN_BEGIN(DTO)` and must be closed with `#include OATPP_CODEGEN_END(DTO)`. 
*Do not forget to close code generation section in order to avoid macro conflicts later in the code!*

```cpp
#include "oatpp/core/Types.hpp"
#include "oatpp/core/macro/codegen.hpp"

#include OATPP_CODEGEN_BEGIN(DTO) ///< Begin DTO codegen section

class User : public oatpp::DTO {

  DTO_INIT(User, DTO /* extends */)

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

### Additional Field Info

```cpp
DTO_FIELD_INFO(name) {
  info->description = "user first name"; //<-- Fields description is integrated with Swagger-UI.
}
DTO_FIELD(String, name) = "Ivan";
```

### Declare Field As Object

```cpp
DTO_FIELD(Object<User>, user);
```

### Declare Field As List

List of primitives:

```cpp
DTO_FIELD(List<Int32>, colors);
```

List of Objects:

```cpp
DTO_FIELD(List<Object<MyObject>>, colors);
```

### Declare Field As Map
 

Map `String --> Int32`:

```cpp
DTO_FIELD(Fields<Int32>, colors);
```

Map `String --> Object`:

```cpp
DTO_FIELD(Fields<Object<MyObject>>, colors);
```

### Core Types

Types defined in `oatpp/core/Types.hpp`.

#### Primitives

|Type|Underlying Type|Default Value|
|-|-|-|
|[Int8](/api/latest/oatpp/core/Types/#int8)|`v_int8`|`nullptr`|
|[UInt8](/api/latest/oatpp/core/Types/#uint8)|`v_uint8`|`nullptr`|
|[Int16](/api/latest/oatpp/core/Types/#int16)|`v_int16`|`nullptr`|
|[UInt16](/api/latest/oatpp/core/Types/#uint16)|`v_uint16`|`nullptr`|
|[Int32](/api/latest/oatpp/core/Types/#int32)|`v_int32`|`nullptr`|
|[UInt32](/api/latest/oatpp/core/Types/#uint32)|`v_uint32`|`nullptr`|
|[Int64](/api/latest/oatpp/core/Types/#int64)|`v_int64`|`nullptr`|
|[UInt64](/api/latest/oatpp/core/Types/#uint64)|`v_uint64`|`nullptr`|
|[Float32](/api/latest/oatpp/core/Types/#float32)|`v_float32`|`nullptr`|
|[Float64](/api/latest/oatpp/core/Types/#float64)|`v_float64`|`nullptr`|
|[Boolean](/api/latest/oatpp/core/Types/#boolean)|`bool`|`nullptr`|

##### Examples

```cpp
oatpp::Int32 a = 32;
v_int32 va = *a;
```

#### Collections

|Type|Underlying Collection|Default Value|
|-|-|-|
|[Vector&lt;T&gt;](/api/latest/oatpp/core/Types/#vector)|`std::vector<T>`|`nullptr`|
|[List&lt;T&gt;](/api/latest/oatpp/core/Types/#list)|`std::list<T>`|`nullptr`|
|[UnorderedSet&lt;T&gt;](/api/latest/oatpp/core/Types/#unorderedset)|`std::unordered_set<T>`|`nullptr`|
|[Fields&lt;T&gt;](/api/latest/oatpp/core/Types/#fields)|`std::list<std::pair<Key, Value>>`|`nullptr`|
|[UnorderedFields&lt;T&gt;](/api/latest/oatpp/core/Types/#unorderedfields)|`std::unordered_map<Key, Value>`|`nullptr`|

##### Examples

```cpp
oatpp::Vector<oatpp::String> porridges = {"Owsianka", "Stirabout", "Zabkása"};
for(auto& porridge : *porridges) {
  ...
}
```

#### Special Types

|Type|Underlying Type|Default Value|
|-|-|-|
|[String](/api/latest/oatpp/core/Types/#string)|[oatpp::base::StrBuffer](/api/latest/oatpp/core/base/StrBuffer/)|`nullptr`|
|[Object&lt;T&gt;](/api/latest/oatpp/core/Types/#object)|class which extends [oatpp::DTO](/api/latest/oatpp/core/Types/#dto)|`nullptr`|
|[Enum&lt;T&gt;](/api/latest/oatpp/core/Types/#enum)|`enum` declared via [ENUM](/api/latest/oatpp/codegen/dto/enum_define/#enum)|`nullptr`|
|[Any](/api/latest/oatpp/core/Types/#any)|any other mapping-enabled type|`nullptr`|

##### Examples

```cpp
oatpp::Object<MyDto> dto = MyDto::createShared();
oatpp::Any any = dto;
...
auto dto = any.retrieve<oatpp::Object<MyDto>>(); // throws `std::runtime_error` if stored type doesn't match.
```

### Custom Types

To simplify the integration of custom types with oatpp Object-Mapping framework the "**Type Interpretation**" feature was introduced.  
*For information about custom object mapping contact us in [dev-chat](https://gitter.im/oatpp-framework/Lobby)*

Let's say you have some struct that is not part of oatpp object-mapping framework.

```cpp
struct VPoint {
  v_int32 x;
  v_int32 y;
  v_int32 z;
};
```

To integrate it with oatpp object-mapping you can do the following:

```cpp
namespace __class {
  class PointClass;
}

/* Declare ObjectWrapper for your type */
/* Mapping-Enabled Point */
typedef oatpp::data::mapping::type::Primitive<VPoint, __class::PointClass> Point;

namespace __class {

  /**
   * Type info
   */
  class PointClass {
  private:

    /**
     * Type interpretation
     */
    class Inter : public oatpp::Type::Interpretation<Point, oatpp::UnorderedFields<oatpp::Int32>>  {
    public:

      oatpp::UnorderedFields<oatpp::Int32> interpret(const Point& value) const override {
          return {{"x", value->x}, {"y", value->y}, {"z", value->z}};
      }

      Point reproduce(const oatpp::UnorderedFields<oatpp::Int32> map) const override {
        return Point({map["x"], map["y"], map["z"]});
      }

    };

  public:

    static const oatpp::ClassId CLASS_ID;

    static oatpp::Type* getType(){
      static Type type(CLASS_ID, nullptr, nullptr, {{"my-types", new Inter()}} /* <-- Add type interpretation */ );
      return &type;
    }

  };

  const oatpp::ClassId PointClass::CLASS_ID("my-types::Point");

}
```

Now the "Point" struct can be serialized/deserialized with object mappers.

```cpp
oatpp::parser::json::mapping::ObjectMapper mapper;

{
  auto config = mapper.getSerializer()->getConfig();
  config->enabledInterpretations = {"my-types"}; // Enable "my-types" for serializer
}

{
  auto config = mapper.getDeserializer()->getConfig();
  config->enabledInterpretations = {"my-types"}; // Enable "my-types" for deserializer
}

Point point ({1, 2, 3}); // Create mapping-enabled Point

auto json = mapper.writeToString(point); // Serialize Point
auto pointClone = mapper.readFromString<Point>(json); // Deserialize Point
```

**Note:** Type interpretations work through all framework components including REST framework, ORM, and Swagger-UI.

## Example

### Serialize / Deserialize 

#### Define DTO

```cpp
#include "oatpp/core/Types.hpp"
#include "oatpp/core/macro/codegen.hpp"

#include OATPP_CODEGEN_BEGIN(DTO) ///< Begin DTO codegen section

class User : public oatpp::DTO {

  DTO_INIT(User, DTO /* extends */)

  DTO_FIELD(String, name, "First-Name");
  DTO_FIELD(String, surname, "Family-Name");
  DTO_FIELD(Int32, age);
  DTO_FIELD(Fields<List<Object<User>>>, familyMembers); ///< Map<String, List<User>>
  DTO_FIELD(Fields<String>, additionalNotes); ///< Map<String, String>

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
user->familyMembers = {}; // Initialize empty map.
user->additionalNotes = {}; // Initialize empty map.

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
oatpp::List<oatpp::Object<User>> siblings = {brother, sister};

user->familyMembers->insert({"siblings", siblings});
user->additionalNotes->insert({"Education", "Master of Computer Science"});
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
  "First-Name": "Ivan",
  "Family-Name": "Ovsyanochka",
  "age": 24,
  "familyMembers": {
    "siblings": [
      {
        "First-Name": "Yuriy",
        "Family-Name": "Ovsyanochka",
        "age": 30,
        "familyMembers": null,
        "additionalNotes": null
      },
      {
        "First-Name": "Kate",
        "Family-Name": "Ovsyanochka",
        "age": 20,
        "familyMembers": null,
        "additionalNotes": null
      }
    ]
  },
  "additionalNotes": {
    "Education": "Master of Computer Science"
  }
}
```
*Please note: example of above output is beautified with [oatpp::parser::json::Beautifier](/api/latest/oatpp/parser/json/Beautifier/)*.  

#### Deserizalize from String

```cpp
auto cloneOfUser = jsonObjectMapper->readFromString<oatpp::Object<User>>(json);
```

### Use JSON Beautifier

Without the use of beautifier the json serializer output will contain no spaces nor newline character:

```json
{"First-Name":"Ivan","Family-Name":"Ovsyanochka","age":24 ...
```

In order to beautify json output set `useBeautifier = true` in serializer config:

```cpp
/* create serializer and deserializer configurations */
auto serializeConfig = oatpp::parser::json::mapping::Serializer::Config::createShared();
auto deserializeConfig = oatpp::parser::json::mapping::Deserializer::Config::createShared();

/* enable beautifier */
serializeConfig->useBeautifier = true;

/* create json object mapper with serializer config */
auto jsonObjectMapper = oatpp::parser::json::mapping::ObjectMapper::createShared(serializeConfig, deserializeConfig);
```

More about json object mapper configuration see:

- [Serializer::Config](/api/latest/oatpp/parser/json/mapping/Serializer/#serializer-config)
- [Deserializer::Config](/api/latest/oatpp/parser/json/mapping/Deserializer/#deserializer-config)

## Examples of code

[https://github.com/oatpp/oatpp-consul/blob/master/src/oatpp-consul/rest/DTOs.hpp](https://github.com/oatpp/oatpp-consul/blob/master/src/oatpp-consul/rest/DTOs.hpp)

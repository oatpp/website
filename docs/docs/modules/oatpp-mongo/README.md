---
title: oatpp-mongo (module)
description: Oat++ native BSON + MongoDB driver implementation based on Oat++ object-mapping sub-framework.
sidebarDepth: 0
---

# oatpp-mongo <seo/>

[Github Repository](https://github.com/oatpp/oatpp-mongo)  
[Example Project](https://github.com/oatpp/example-mongodb)  

:::warning
- **BSON ObjectMapper** - is ready-to-use.
- **Database driver** - is **in development**. While you can do basic CRUD operations, it's still on POC stage. API is not ready and it's not recommended to use.
To work with MongoDB - use BSON ObjectMapper + mongocxx driver.
:::

**oatpp-mongo** is the oatpp native client for MongoDB. It contains DTO to BSON mapper plus database driver.  

Find the complete example project using **oatpp-mongo** [here](https://github.com/oatpp/example-mongodb)

## How To Build

`oatpp-mongo` has no extrernal dependencies (*The main oatpp module is still required*).  
`libmongoxcc` is used (and linked) in module **tests only**. Use `-DOATPP_BUILD_TESTS=OFF` option to build without tests and without dependency on `libmongoxcc`.

### Install oatpp-mongo

- Clone this repository. 
- In the root of the repository run:

   ```bash
   mkdir build && cd build
   cmake -DOATPP_BUILD_TESTS=OFF ..
   make install
   ```

## API

### Temporary API (using libmongoxcc)

Since oatpp driver is not ready yet, you can use `libmongoxcc` together with oatpp BSON.  

**Why using oatpp BSON?** - because it's based on oatpp object-mapping framework and 
it's **extremely easy to use**.

#### Create `bsonxx::document` From Any oatpp Object

```cpp
/**
 * This is the utility function that you'll need while working libmongoxcc
 */
bsoncxx::document::value Database::createMongoDocument(const oatpp::Void &polymorph) {
  // if you have huge docs, you may want to increase starting BufferOutputStream size.
  // Or you may want to use oatpp::data::stream::ChunkedBuffer instead - for no-copy growth.
  oatpp::data::stream::BufferOutputStream stream;
  
  m_objectMapper.write(&stream, polymorph); //< Serialize oatpp object to BSON.
  
  bsoncxx::document::view view(stream.getData(), stream.getCurrentPosition());
  return bsoncxx::document::value(view);
}
```

Where `m_objectMapper` - is `oatpp::mongo::bson::mapping::ObjectMapper`.

#### Insert Document

Let's say you have such DTO defined:

```cpp
class User : public oatpp::DTO {

  DTO_INIT(User, DTO)

  DTO_FIELD(String, _id);
  DTO_FIELD(String, username);
  DTO_FIELD(Boolean, active);
  DTO_FIELD(String, role);

};
```

Then you can insert your DTO in the database like this:

```cpp
collection.insert_one(createMongoDocument(myDto));
```

You can also insert an arbitrary document using `oatpp::Any`

```cpp
collection.insert_one(createMongoDocument(
  oatpp::Fields<oatpp::Any>({

    {"username", oatpp::String("Mr. Porridge")},
    {"role", oatpp::String("Admin")},
    {"jacket-color", oatpp::List<oatpp::String>({"red", "green", "blue"})}

  })
));
```

#### Read Document

Let's say we have the same DTO - `User`:

```cpp
  auto result =
    collection.find_one(createMongoDocument( // <-- Filter
      oatpp::Fields<oatpp::String>({
        {"_id", oatpp::String("<id-to-find>")}
      })
    ));

  if(result) {
    auto view = result->view();
    auto bson = oatpp::String((const char*)view.data(), view.length(), false /* to not copy view data */);
    auto user = m_objectMapper.readFromString<oatpp::Object<User>>(bson);
    // TODO - do somthing with user:)
    // You can then serialize it to JSON using oatpp::parser::json::mapping::ObjectMapper
  }
```

## Examples

- [example-mongodb](https://github.com/oatpp/example-mongodb) - CRUD with MongoDB and Swagger-UI.

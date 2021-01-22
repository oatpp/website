---
title: Upload File
description: How to upload files to server using oatpp web framework.
sidebarDepth: 0
---

# Upload File <seo/>

[[toc]]

## Upload and stream to file
```cpp

#include "oatpp/core/data/stream/FileStream.hpp"

...

ENDPOINT("POST", "/upload", upload, REQUEST(std::shared_ptr<IncomingRequest>, request)) {
    oatpp::data::stream::FileOutputStream fileOutputStream("/path/to/file");
    request->transferBodyToStream(&fileOutputStream); // transfer body chunk by chunk
    return createResponse(Status::CODE_200, "OK");
}
```

## Simple API Multipart Upload

### Store Part In Memory

```cpp

  #include "oatpp/web/mime/multipart/InMemoryPartReader.hpp"
  #include "oatpp/web/mime/multipart/Reader.hpp"
  #include "oatpp/web/mime/multipart/PartList.hpp"
  
  ...
  
  namespace multipart = oatpp::web::mime::multipart;
  
  ...

ENDPOINT("POST", "upload/multipart", uploadMultipart,
    REQUEST(std::shared_ptr<IncomingRequest>, request))
{

    /* Prepare multipart container. */
    auto multipart = std::make_shared<multipart::PartList>(request->getHeaders());

    /* Create multipart reader. */
    multipart::Reader multipartReader(multipart.get());

    /* Configure to read part with name "part1" into memory */
    multipartReader.setPartReader("part1", multipart::createInMemoryPartReader(256 /* max-data-size */));

    /* Read multipart body */
    request->transferBody(&multipartReader);

    /* Print value of "part1" */
    auto part1 = multipart->getNamedPart("part1");

    /* Assert part is not null */
    OATPP_ASSERT_HTTP(part1, Status::CODE_400, "part1 is null");

    /* Print part value */
    OATPP_LOGD("Multipart", "part1='%s'", part1->getInMemoryData()->c_str());

    return createResponse(Status::CODE_200, "OK");

}

```

### Stream Part To File

```cpp

  #include "oatpp/web/mime/multipart/FileStreamProvider.hpp"
  #include "oatpp/web/mime/multipart/Reader.hpp"
  #include "oatpp/web/mime/multipart/PartList.hpp"

  
  ...
  
  namespace multipart = oatpp::web::mime::multipart;
  
  ...

  ENDPOINT("POST", "upload/multipart", uploadMultipart,
           REQUEST(std::shared_ptr<IncomingRequest>, request))
  {

    /* Prepare multipart container. */
    auto multipart = std::make_shared<multipart::PartList>(request->getHeaders());

    /* Create multipart reader. */
    multipart::Reader multipartReader(multipart.get());

    /* Configure to stream part with name "part1" to file */
    multipartReader.setPartReader("part1", multipart::createFilePartReader("/path/to/file"));

    /* Read multipart body */
    request->transferBody(&multipartReader);

    /* Print value of "part1" */
    auto part1 = multipart->getNamedPart("part1");

    /* Assert part is not null */
    OATPP_ASSERT_HTTP(part1, Status::CODE_400, "part1 is null");

    /* Get part data input stream */
    auto inputStream = part1->getInputStream();
    
    // TODO - process file stream.

    return createResponse(Status::CODE_200, "OK");

  }

```

### Complete Example

```cpp

  #include "oatpp/web/mime/multipart/FileStreamProvider.hpp"
  #include "oatpp/web/mime/multipart/InMemoryPartReader.hpp"
  #include "oatpp/web/mime/multipart/Reader.hpp"
  #include "oatpp/web/mime/multipart/PartList.hpp"

  ...
  
  namespace multipart = oatpp::web::mime::multipart;
  
  ...

  ENDPOINT("POST", "test/multipart-all", uploadMultipart,
           REQUEST(std::shared_ptr<IncomingRequest>, request))
  {

    /* Prepare multipart container. */
    auto multipart = std::make_shared<multipart::PartList>(request->getHeaders());

    /* Create multipart reader. */
    multipart::Reader multipartReader(multipart.get());

    /* Configure to read part with name "part1" into memory */
    multipartReader.setPartReader("part1", multipart::createInMemoryPartReader(256 /* max-data-size */));

    /* Configure to stream part with name "part2" to file */
    multipartReader.setPartReader("part2", multipart::createFilePartReader("/path/to/file"));

    /* Configure to read all other parts into memory */
    multipartReader.setDefaultPartReader(multipart::createInMemoryPartReader(16 * 1024 /* max-data-size */));

    /* Read multipart body */
    request->transferBody(&multipartReader);

    /* Print number of uploaded parts */
    OATPP_LOGD("Multipart", "parts_count=%d", multipart->count());

    /* Get part by name "part1" */
    auto part1 = multipart->getNamedPart("part1");

    /* Assert part is not null */
    OATPP_ASSERT_HTTP(part1, Status::CODE_400, "part1 is null");

    /* Print in-memory value of "part1" */
    OATPP_LOGD("Multipart", "part1='%s'", part1->getInMemoryData()->c_str());

    /* Get part by name "part2"*/
    auto filePart = multipart->getNamedPart("part2");

    /* Assert part is not null */
    OATPP_ASSERT_HTTP(filePart, Status::CODE_400, "part2 is null");

    /* Get part data input stream */
    auto inputStream = filePart->getInputStream();

    // TODO - process file stream.

    return createResponse(Status::CODE_200, "OK");

  }

```

## Async API Multipart Upload

### Async Store Part In Memory 

```cpp
  #include "oatpp/web/mime/multipart/InMemoryPartReader.hpp"
  #include "oatpp/web/mime/multipart/Reader.hpp"
  
  ...
  
  namespace multipart = oatpp::web::mime::multipart;
  
  ...

  ENDPOINT_ASYNC("POST", "test/multipart-all", MultipartUpload) {

    ENDPOINT_ASYNC_INIT(MultipartUpload)

    /* Coroutine State */
    std::shared_ptr<multipart::Multipart> m_multipart;

    Action act() override {

      m_multipart = std::make_shared<multipart::Multipart>(request->getHeaders());
      auto multipartReader = std::make_shared<multipart::AsyncReader>(m_multipart);

      /* Configure to read part with name "part1" into memory */
      multipartReader->setPartReader("part1", multipart::createAsyncInMemoryPartReader(256 /* max-data-size */));

      /* Read multipart body */
      return request->transferBodyAsync(multipartReader).next(yieldTo(&MultipartUpload::onUploaded));

    }

    Action onUploaded() {

      /* Get multipart by name */
      auto part1 = m_multipart->getNamedPart("part1");

      /* Asser part not-null */
      OATPP_ASSERT_HTTP(part1, Status::CODE_400, "part1 is null");

      /* Print value of "part1" */
      OATPP_LOGD("Multipart", "part1='%s'", part1->getInMemoryData()->c_str());

      return _return(controller->createResponse(Status::CODE_200, "OK"));

    }

  };
```

### Async Stream Part To File 

```cpp
  #include "oatpp/web/mime/multipart/FileStreamProvider.hpp"
  #include "oatpp/web/mime/multipart/Reader.hpp"
  
  ...
  
  namespace multipart = oatpp::web::mime::multipart;
  
  ...

  ENDPOINT_ASYNC("POST", "test/multipart-all", MultipartUpload) {

    ENDPOINT_ASYNC_INIT(MultipartUpload)

    /* Coroutine State */
    std::shared_ptr<multipart::Multipart> m_multipart;

    Action act() override {

      m_multipart = std::make_shared<multipart::Multipart>(request->getHeaders());
      auto multipartReader = std::make_shared<multipart::AsyncReader>(m_multipart);

      /* Configure to stream part with name "part1" to file */
      multipartReader->setPartReader("part1", multipart::createAsyncFilePartReader("/path/to/file"));

      /* Read multipart body */
      return request->transferBodyAsync(multipartReader).next(yieldTo(&MultipartUpload::onUploaded));

    }

    Action onUploaded() {

      /* Get multipart by name */
      auto filePart = m_multipart->getNamedPart("part1");

      /* Asser part not-null */
      OATPP_ASSERT_HTTP(filePart, Status::CODE_400, "part1 is null");

      /* Get part data input stream */
      auto inputStream = filePart->getInputStream();

      // TODO - process file stream.

      return _return(controller->createResponse(Status::CODE_200, "OK"));

    }

  };
```

### Async Complete Example


```cpp
  #include "oatpp/web/mime/multipart/FileStreamProvider.hpp"
  #include "oatpp/web/mime/multipart/InMemoryPartReader.hpp"
  #include "oatpp/web/mime/multipart/Reader.hpp"
  
  ...
  
  namespace multipart = oatpp::web::mime::multipart;
  
  ...

  ENDPOINT_ASYNC("POST", "test/multipart-all", MultipartUpload) {

    ENDPOINT_ASYNC_INIT(MultipartUpload)

    /* Coroutine State */
    std::shared_ptr<multipart::Multipart> m_multipart;

    Action act() override {

      m_multipart = std::make_shared<multipart::Multipart>(request->getHeaders());
      auto multipartReader = std::make_shared<multipart::AsyncReader>(m_multipart);

      /* Configure to read part with name "part1" into memory */
      multipartReader->setPartReader("part1", multipart::createAsyncInMemoryPartReader(256 /* max-data-size */));

      /* Configure to stream part with name "part2" to file */
      multipartReader->setPartReader("part2", multipart::createAsyncFilePartReader("/path/to/file"));

      /* Configure to read all other parts into memory */
      multipartReader->setDefaultPartReader(multipart::createAsyncInMemoryPartReader(16 * 1024 /* max-data-size */));

      /* Read multipart body */
      return request->transferBodyAsync(multipartReader).next(yieldTo(&MultipartUpload::onUploaded));

    }

    Action onUploaded() {

      /* Print number of uploaded parts */
      OATPP_LOGD("Multipart", "parts_count=%d", m_multipart->count());

      /* Get multipart by name */
      auto part1 = m_multipart->getNamedPart("part1");

      /* Asser part not-null */
      OATPP_ASSERT_HTTP(part1, Status::CODE_400, "part1 is null");

      /* Print value of "part1" */
      OATPP_LOGD("Multipart", "part1='%s'", part1->getInMemoryData()->c_str());

      /* Get multipart by name */
      auto filePart = m_multipart->getNamedPart("part2");

      /* Asser part not-null */
      OATPP_ASSERT_HTTP(filePart, Status::CODE_400, "part2 is null");

      /* Get part data input stream */
      auto inputStream = filePart->getInputStream();

      // TODO - process file stream.

      return _return(controller->createResponse(Status::CODE_200, "OK"));

    }

  };
```

---
title: Getting started
description: Getting started with Oat++ (AKA oatpp) C++ Web Framework.
sidebarDepth: 0
---

# Getting Started <seo/>

Welcome to :seedling:Oat++ 

## The recommended way to go

1. Install **oatpp**:
   - [Unix/Linux](/docs/installation/unix-linux/)
   - [Windows](/docs/installation/windows/)
   - For exotic platforms look for stories on the [Supported Platforms](/supported-platforms/) page.
   
3. Take a look at:
   - [High Level Overview](/docs/start/high-level-overview/) - Learn about the main components and features of Oat++.
   - [Step By Step Guide](/docs/start/step-by-step/) - How to create an Oat++ project from scratch. Get more low-level details. 

4. Check out [examples](/docs/start/#examples) and starter-projects:
   - [Starter Project - Simple API](/docs/start/project/)
   - [Starter project - Async API](/docs/start/project-async-api/)
   
5. :point_right:Join dev community and don't hesitate to ask questions - [Chat On Gitter](https://gitter.im/oatpp-framework/Lobby):point_left::v:
   
## Examples

### REST-API

- [REST Service](/examples/crud/) - A complete example of a "CRUD" service (UserService) built with Oat++. REST + Swagger-UI + SQLite.
- [REST Client](https://github.com/oatpp/example-api-client) - Example project of how-to use Retrofit-like client wrapper (ApiClient) and how it works.

### WebSocket

- [Can Chat](https://github.com/lganzzzo/canchat) - Feature-complete rooms-based chat for tens of thousands users. Client plus Server.
- [WebSocket](https://github.com/oatpp/example-websocket) - Collection of oatpp WebSocket examples.
- [YUV Websocket Stream](https://github.com/oatpp/example-yuv-websocket-stream) - Example project how-to create a YUV image stream from a V4L device (i.E. Webcam) using websockets.

### Databases

- [SQLite](/examples/crud/) - A complete example of a "CRUD" service. REST + Swagger-UI + SQLite.
- [PostgreSQL](/examples/postgresql/) - Example of a production-grade entity service storing information in PostgreSQL. With Swagger-UI and configuration profiles.
- [MongoDB](https://github.com/oatpp/example-mongodb) - Example project how to work with MongoDB using **oatpp-mongo** mondule. Project is a web-service with basic CRUD and Swagger-UI.
 
### IoT

- [Example-IoT-Hue](https://github.com/oatpp/example-iot-hue-ssdp) - Example project how-to create an Philips Hue compatible REST-API that is discovered and controllable by Hue compatible Smart-Home devices like Amazon Alexa or Google Echo.

### Streaming

- [HTTP Live Streaming Server](/examples/hls-media-stream/) - Example project on how to build an HLS-streaming server using Oat++ asynchronous API.
- [YUV Websocket Stream](https://github.com/oatpp/example-yuv-websocket-stream) - Example project how-to create a YUV image stream from a V4L device (i.E. Webcam) using websockets.

### TLS

- [TLS With Libressl](https://github.com/oatpp/example-libressl) - Example project how-to setup secure connection and serve via HTTPS.

### Microservices

- [Consul Integration](https://github.com/oatpp/example-consul) - Example project on how to use [oatpp::consul::Client](/api/latest/oatpp-consul/rest/Client/). Consul integration.
- [Microservices](https://github.com/oatpp/example-microservices) - Example project on how to build microservices with Oat++, 
and example on how to consolidate those microservices using [monolithization](/docs/monolithization/) technique.

### Asynchronous API

- [Async Service](https://github.com/oatpp/example-async-api) - Example project on how to use asynchronous API to handle a large number of simultaneous connections.
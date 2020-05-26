---
title: YUV-WebSocket-Stream Example
description: Example project how-to create a YUV image stream from a V4L device (i.E. Webcam) using websockets.
sidebarDepth: 0
---

# Example-YUV-Websocket-Stream <seo/>

[Github Repository](https://github.com/oatpp/example-yuv-websocket-stream)

Example project how-to create a YUV image stream from a V4L device (i.E. Webcam) using websockets.
The raw YUV image stream is send via a websocket connection. In the example Webpage, this YUV stream is converted to an HTML5 Canvas using JavaScript. 
If you experience lag in the video its either your PC not being fast enough for the JavaScript conversion or the V4L2 stack.
The example webpage also runs fine on newer Smartphones!

## Overview

This project is using [oatpp](https://github.com/oatpp/oatpp), [oatpp-websocket](https://github.com/oatpp/oatpp-websocket) and [oatpp-swagger](https://github.com/oatpp/oatpp-swagger) modules.

### Project layout

```
|- CMakeLists.txt                        // projects CMakeLists.txt
|- src/
|   |
|   |- controller/                       // Folder containing CamAPIController where all endpoints are declared
|   |- backend/                          // Folder with "business logic"
|   |- dto/                              // DTOs are declared here
|   |- SwaggerComponent.hpp              // Swagger-UI config
|   |- AppComponent.hpp                  // Service config
|   |- App.cpp                           // main() is here
|
|- utility/install-oatpp-modules.sh      // utility script to install required oatpp-modules.
```

---

### Usage
When running this example, a Oat++ REST-API is launched and a demo webpage is accessible under `<yourip/localhost>:8000/v0/cam/stream`.
The raw data is send out on the websocket (`<yourip/localhost>:8000/v0/cam/stream/ws`) as soon as one client is connected and stops if all clients have disconnected.
Each websocket frame contains a whole image as received from V4L2. 

### Quirks

#### Hardcoded Dimensions

The dimensions are Hardcoded to *640x480* interlaced YUYV. Thus each image _complete_ image is 614400 bytes.
You can change the dimensions in `src/backend/V4LGrabber.cpp:589` and have to update them in `res/cam/wsImageView.html:31-32`

**src/backend/V4LGrabber.cpp:589**

```cpp
fmt.fmt.pix.width       = 640;
fmt.fmt.pix.height      = 480;
fmt.fmt.pix.pixelformat = V4L2_PIX_FMT_YUYV;
fmt.fmt.pix.field       = V4L2_FIELD_INTERLACED;
```

**res/cam/wsImageView.html:31-32**
```js
const imgData = ctx.createImageData(640, 480);
const grayScale = new Uint8Array(640*480);
```

#### Partial Images
Some webcams or V4L2 implementations are buggy and (sometimes) transfer partial images (only).
When you know your image size, you must come up with your own stiching mechanism. 

#### Video Lags
Depending on the used IO method (`read`, `mmap` or `userptr`) between V4L2<->Oat++ some lag can occur or the stream does not work at all.
The example is programmed to use `mmap` in `src/controller/CamAPIController.cpp:31`.

```cpp
m_grabber = std::make_shared<V4LGrabber>(device, &CamAPIController::handle_frame, m_imageReceivers.get(), V4LGrabber::IO_METHOD_MMAP);
```


The methods can roughly be described by:

- **read:** Simple `read` calls on `/dev/videoX` (most simple, widely supported)
- **mmap:** Memory mapping the data to the user-memory (should be a lot faster, memory efficient)
- **userptr:** User created memory region is given to kernel and the kernel uses this region as buffer (potentially dangerous, memory efficient)


### Build and Run

#### Using CMake

**Requires**

- `oatpp`, `oatpp-websocket` and `oatpp-swagger` modules installed. You may run `utility/install-oatpp-modules.sh` 
script to install required oatpp modules.
- Linux with `V4L2` development libraries installed

```
$ mkdir build && cd build
$ cmake ..
$ make 
$ ./example-yuv-websocket-stream-exe        # - run application.
```

#### In Docker

```
$ docker build -t example-yuv-websocket-stream .
$ docker run -p 8000:8000 -t example-yuv-websocket-stream-exe
```

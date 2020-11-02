(window.webpackJsonp=window.webpackJsonp||[]).push([[302],{674:function(e,t,a){"use strict";a.r(t);var s=a(42),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"example-yuv-websocket-stream"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-yuv-websocket-stream"}},[e._v("#")]),e._v(" Example-YUV-Websocket-Stream "),a("seo")],1),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/oatpp/example-yuv-websocket-stream",target:"_blank",rel:"noopener noreferrer"}},[e._v("Github Repository"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("Example project how-to create a YUV image stream from a V4L device (i.E. Webcam) using websockets.\nThe raw YUV image stream is send via a websocket connection. In the example Webpage, this YUV stream is converted to an HTML5 Canvas using JavaScript.\nIf you experience lag in the video its either your PC not being fast enough for the JavaScript conversion or the V4L2 stack.\nThe example webpage also runs fine on newer Smartphones!")]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("This project is using "),a("a",{attrs:{href:"https://github.com/oatpp/oatpp",target:"_blank",rel:"noopener noreferrer"}},[e._v("oatpp"),a("OutboundLink")],1),e._v(", "),a("a",{attrs:{href:"https://github.com/oatpp/oatpp-websocket",target:"_blank",rel:"noopener noreferrer"}},[e._v("oatpp-websocket"),a("OutboundLink")],1),e._v(" and "),a("a",{attrs:{href:"https://github.com/oatpp/oatpp-swagger",target:"_blank",rel:"noopener noreferrer"}},[e._v("oatpp-swagger"),a("OutboundLink")],1),e._v(" modules.")]),e._v(" "),a("h3",{attrs:{id:"project-layout"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#project-layout"}},[e._v("#")]),e._v(" Project layout")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('|- CMakeLists.txt                        // projects CMakeLists.txt\n|- src/\n|   |\n|   |- controller/                       // Folder containing CamAPIController where all endpoints are declared\n|   |- backend/                          // Folder with "business logic"\n|   |- dto/                              // DTOs are declared here\n|   |- SwaggerComponent.hpp              // Swagger-UI config\n|   |- AppComponent.hpp                  // Service config\n|   |- App.cpp                           // main() is here\n|\n|- utility/install-oatpp-modules.sh      // utility script to install required oatpp-modules.\n')])])]),a("hr"),e._v(" "),a("h3",{attrs:{id:"usage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usage"}},[e._v("#")]),e._v(" Usage")]),e._v(" "),a("p",[e._v("When running this example, a Oat++ REST-API is launched and a demo webpage is accessible under "),a("code",[e._v("<yourip/localhost>:8000/v0/cam/stream")]),e._v(".\nThe raw data is send out on the websocket ("),a("code",[e._v("<yourip/localhost>:8000/v0/cam/stream/ws")]),e._v(") as soon as one client is connected and stops if all clients have disconnected.\nEach websocket frame contains a whole image as received from V4L2.")]),e._v(" "),a("h3",{attrs:{id:"quirks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#quirks"}},[e._v("#")]),e._v(" Quirks")]),e._v(" "),a("h4",{attrs:{id:"hardcoded-dimensions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hardcoded-dimensions"}},[e._v("#")]),e._v(" Hardcoded Dimensions")]),e._v(" "),a("p",[e._v("The dimensions are Hardcoded to "),a("em",[e._v("640x480")]),e._v(" interlaced YUYV. Thus each image "),a("em",[e._v("complete")]),e._v(" image is 614400 bytes.\nYou can change the dimensions in "),a("code",[e._v("src/backend/V4LGrabber.cpp:589")]),e._v(" and have to update them in "),a("code",[e._v("res/cam/wsImageView.html:31-32")])]),e._v(" "),a("p",[a("strong",[e._v("src/backend/V4LGrabber.cpp:589")])]),e._v(" "),a("div",{staticClass:"language-cpp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cpp"}},[a("code",[e._v("fmt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("fmt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("pix"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("width       "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("640")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\nfmt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("fmt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("pix"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("height      "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("480")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\nfmt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("fmt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("pix"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("pixelformat "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" V4L2_PIX_FMT_YUYV"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\nfmt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("fmt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("pix"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("field       "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" V4L2_FIELD_INTERLACED"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])])]),a("p",[a("strong",[e._v("res/cam/wsImageView.html:31-32")])]),e._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("const")]),e._v(" imgData "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" ctx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("createImageData")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("640")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("480")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("const")]),e._v(" grayScale "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("new")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("Uint8Array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("640")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("*")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("480")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])])]),a("h4",{attrs:{id:"partial-images"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#partial-images"}},[e._v("#")]),e._v(" Partial Images")]),e._v(" "),a("p",[e._v("Some webcams or V4L2 implementations are buggy and (sometimes) transfer partial images (only).\nWhen you know your image size, you must come up with your own stiching mechanism.")]),e._v(" "),a("h4",{attrs:{id:"video-lags"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#video-lags"}},[e._v("#")]),e._v(" Video Lags")]),e._v(" "),a("p",[e._v("Depending on the used IO method ("),a("code",[e._v("read")]),e._v(", "),a("code",[e._v("mmap")]),e._v(" or "),a("code",[e._v("userptr")]),e._v(") between V4L2<->Oat++ some lag can occur or the stream does not work at all.\nThe example is programmed to use "),a("code",[e._v("mmap")]),e._v(" in "),a("code",[e._v("src/controller/CamAPIController.cpp:31")]),e._v(".")]),e._v(" "),a("div",{staticClass:"language-cpp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cpp"}},[a("code",[e._v("m_grabber "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" std"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("::")]),e._v("make_shared"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("V4LGrabber"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("device"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&")]),e._v("CamAPIController"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("::")]),e._v("handle_frame"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" m_imageReceivers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" V4LGrabber"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("::")]),e._v("IO_METHOD_MMAP"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])])]),a("p",[e._v("The methods can roughly be described by:")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("read:")]),e._v(" Simple "),a("code",[e._v("read")]),e._v(" calls on "),a("code",[e._v("/dev/videoX")]),e._v(" (most simple, widely supported)")]),e._v(" "),a("li",[a("strong",[e._v("mmap:")]),e._v(" Memory mapping the data to the user-memory (should be a lot faster, memory efficient)")]),e._v(" "),a("li",[a("strong",[e._v("userptr:")]),e._v(" User created memory region is given to kernel and the kernel uses this region as buffer (potentially dangerous, memory efficient)")])]),e._v(" "),a("h3",{attrs:{id:"build-and-run"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#build-and-run"}},[e._v("#")]),e._v(" Build and Run")]),e._v(" "),a("h4",{attrs:{id:"using-cmake"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-cmake"}},[e._v("#")]),e._v(" Using CMake")]),e._v(" "),a("p",[a("strong",[e._v("Requires")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("oatpp")]),e._v(", "),a("code",[e._v("oatpp-websocket")]),e._v(" and "),a("code",[e._v("oatpp-swagger")]),e._v(" modules installed. You may run "),a("code",[e._v("utility/install-oatpp-modules.sh")]),e._v("\nscript to install required oatpp modules.")]),e._v(" "),a("li",[e._v("Linux with "),a("code",[e._v("V4L2")]),e._v(" development libraries installed")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("$ mkdir build && cd build\n$ cmake ..\n$ make \n$ ./example-yuv-websocket-stream-exe        # - run application.\n")])])]),a("h4",{attrs:{id:"in-docker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#in-docker"}},[e._v("#")]),e._v(" In Docker")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("$ docker build -t example-yuv-websocket-stream .\n$ docker run -p 8000:8000 -t example-yuv-websocket-stream-exe\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);
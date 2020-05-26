const API_latest = require('../api/latest/index.json');

module.exports = {
    title: "Oat++",
    description: "Modern Web Framework for C++. High performance, simple API, cross-platform, zero-dependency.",

    componentsDir: "docs/.vuepress/components",

    ga: "UA-72424701-2",

    shouldPrefetch: function() {
      return false;
    },

    head: [
        ['link', { rel: 'icon', href: '/logo_x64.png' }]
    ],

    themeConfig: {

        logo: "https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/logo_x400.png",

        // Assumes GitHub. Can also be a full GitLab url.
        repo: "https://github.com/oatpp/oatpp",

        // if your docs are in a different repo from your main project:
        docsRepo: "https://github.com/oatpp/website",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,

        themeConfig: {
            lastUpdated: 'Last Updated', // string | boolean
        },

        nav: [
            {text: "Docs", link: "/docs/start/"},
            {text: "About", link: "/about/"},
            {text: "Contacts", link: "/contact/"}
        ],
        sidebar: [
            {
                title: "About",
                collapsable: true,
                children: [
                    ["/about/", "About"],
                    ["/contact/", "Contacts"],
                    ["/contributing/", "Contributing"],
                    ["/supported-platforms/", "Supported Platforms"],
                    ["/status/build/", "Build Status"]
                ]
            },
            {
                title: "Benchmark",
                collapsable: true,
                children: [
                    ["/benchmark/websocket/5-million/", "5 Million WebSockets"],
                    ["/benchmark/websocket/2-million/", "2 Million WebSockets"]
                ]
            },
            {
                title: "Examples",
                collapsable: true,
                children: [
                    ["/examples/api-client/", "HTTP Requests With ApiClient"],
                    ["/examples/async-api/", "Asynchronous API"],
                    ["/examples/crud/", "CRUD API With Swagger-UI"],
                    ["/examples/consul/", "Consul Integration"],
                    ["/examples/hls-media-stream/", "HTTP Live Streaming Server"],
                    ["/examples/libressl/", "TLS With Libressl"],
                    ["/examples/microservices/", "Microservices"],
                    ["/examples/postgresql/", "PostgreSQL Database"],
                    ["/examples/websocket/", "WebSocket Examples"],
                    ["/examples/yuv-websocket-stream/", "YUV WebSocket Stream"]
                ]
            },{
                title: "Installation",
                collapsable: true,
                children: [
                    ["/docs/installation/unix-linux/", "Unix/Linux"],
                    ["/docs/installation/windows/", "Windows"]
                ]
            },{
                title: "Start",
                collapsable: true,
                children: [
                    ["/docs/start/", "Getting Started"],
                    ["/docs/start/high-level-overview/", "High Level Overview"],
                    ["/docs/start/step-by-step/", "Step By Step Guide"],
                    ["/docs/start/project/", "Starter Project"],
                    ["/docs/start/project-async-api/", "Starter Project - Async API"],
                    ["/docs/start/module/", "Starter Project - Module"],
                ]
            },            {
                title: "Overview",
                collapsable: true,
                children: [
                    ["/docs/components/dto/", "Data Transfer Object (DTO)"],
                    ["/docs/components/api-controller/", "Api Controller"],
                    ["/docs/components/api-client/", "Api Client"],
                    ["/docs/simple-vs-async/", "Simple vs Async"],
                    ["/docs/async/", "Async"],
                    ["/docs/oatpp-coroutines/", "Coroutines"],
                    ["/docs/monolithization/", "Monolithization"],
                    ["/docs/features/upload-file/", "Upload File"]
                ]
            },
            {
                title: "Modules",
                collapsable: true,
                children: [
                    ["/docs/modules/oatpp/", "oatpp"],
                    ["/docs/modules/oatpp-consul/", "oatpp-consul"],
                    ["/docs/modules/oatpp-curl/", "oatpp-curl"],
                    ["/docs/modules/oatpp-libressl/", "oatpp-libressl"],
                    ["/docs/modules/oatpp-mbedtls/", "oatpp-mbedtls"],
                    ["/docs/modules/oatpp-swagger/", "oatpp-swagger"],
                    ["/docs/modules/oatpp-websocket/", "oatpp-websocket"],
                    ["/docs/modules/oatpp-zlib/", "oatpp-zlib"]
                ]
            },
            {
                title: "API Reference",
                collapsable: true,
                children: API_latest
            }
        ]

    }
}
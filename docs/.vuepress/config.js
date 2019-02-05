module.exports = {
    title: "oat++",
    description: "Light, zero-dependency, no-installation web-framework. Create bleedingly-fast web-services. C++",

    themeConfig: {
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
            {text: "Examples", link: "/examples/crud"},
            {text: "Docs", link: "/docs/start/"}
        ],
        sidebar: [
            {
                title: "Benchmark",
                collapsable: true,
                children: [
                    ["/benchmark/aws", "Amazon Web Services"],
                    ["/benchmark/digital-ocean", "Digital Ocean"]
                ]
            },
            {
                title: "Examples",
                collapsable: true,
                children: [
                    ["/examples/hls-media-stream", "HTTP Live Streaming Server"],
                    ["/examples/crud", "CRUD API + Swagger-UI"],
                    ["/examples/async-api", "Asynchronous API"],
                    ["/examples/api-client", "HTTP Requests with ApiClient"],
                    ["/examples/libressl", "TLS with Libressl"],
                    ["/examples/consul", "Consul Integration"]
                ]
            },{
                title: "Start",
                collapsable: true,
                children: [
                    ["/docs/start/", "Start"],
                    ["/docs/start/step-by-step", "Step-By-Step Guide"]
                ]
            },
            {
                title: "Modules",
                collapsable: true,
                children: [
                    ["/docs/modules/oatpp", "oatpp"],
                    ["/docs/modules/oatpp-consul", "oatpp-consul"],
                    ["/docs/modules/oatpp-curl", "oatpp-curl"],
                    ["/docs/modules/oatpp-libressl", "oatpp-libressl"],
                    ["/docs/modules/oatpp-swagger", "oatpp-swagger"],
                    ["/docs/modules/oatpp-websocket", "oatpp-websocket"]
                ]
            },
            {
                title: "Components",
                collapsable: true,
                children: [
                    ["/docs/components/api-controller", "Api Controller"],
                    ["/docs/components/api-client", "Api Client"],
                    ["/docs/components/dto", "Data Transfer Object (DTO)"]
                ]
            }
        ]

    }
}
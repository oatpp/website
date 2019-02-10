# Benchmark oatpp - Digital Ocean cloud <seo/>

## Digital Ocean droplet 1vCPU 1GB Ubuntu 16.04 - $5/Month

Performance test of "Hello World" endpoint.  

**Machine** - Digital Ocean droplet. 1vCPU 1GB Ubuntu 16.04 - $5/Month  
**Tool** - wrk

oatpp-async compiled with: `-D OATPP_ASYNC_HTTP_CONNECTION_HANDLER_THREAD_NUM_DEFAULT=1` option.

![Digital Ocean 1vCPU 1GB](https://github.com/lganzzzo/oatpp-website-res/blob/master/do-1.png?raw=true)

- **go net/http** service performs clearly till 10 concurrent connection. At higher concurrency levels performs with "timeout" errors. Down at concurrency level 20K.  
- **oatpp-async** service performs clearly and stays available on the whole distance.  
- **oatpp-multithreaded** service performs clearly up to 5K concurrent connections. Then down at load 10K concurrent connections.


## Digital Ocean droplet 4vCPUs 8GB Ubuntu 16.04 - $40/Month

Performance test of "Hello World" endpoint.  

**Machine** - Digital Ocean droplet 4vCPUs 8GB Ubuntu 16.04 - $40/Month  
**Tool** - wrk  

oatpp-async compiled with: `-D OATPP_ASYNC_HTTP_CONNECTION_HANDLER_THREAD_NUM_DEFAULT=3` option.

![benchmark Digital Ocean droplet 4vCPUs](https://github.com/lganzzzo/oatpp-website-res/blob/master/do-2.png?raw=true)

- **go net/http** service performs clearly and stays available up till 30K concurrent connections load.
- **oatpp-async** service performs clearly and stays available up till 30K concurrent connections load.
- **oatpp-multithreaded** service performs clearly up till 1K concurrent connections load. Then down at load 2.5K concurrent connections. 
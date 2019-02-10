# Benchmark oatpp - AWS cloud <seo/>

## AWS t2.micro instance. 1vCPU 1GB Ubuntu 18.04 - free tier

Performance test of "Hello World" endpoint.  

**Machine** - AWS t2.micro instance. 1vCPU 1GB Ubuntu 18.04 - free tier  
**Tool** - wrk

oatpp-async compiled with: `-D OATPP_ASYNC_HTTP_CONNECTION_HANDLER_THREAD_NUM_DEFAULT=1` option.
 
![benchmark aws t2.micro](https://github.com/lganzzzo/oatpp-website-res/blob/master/aws-1.png?raw=true)

- **go net/http** service performs clearly till 10 concurrent connection. At higher concurrency levels performs with "timeout" errors. Down at concurrency level > 15K.
- **oatpp-async** service performs clearly and stays available up till 20K concurrent connections load. At higher loads no response. Service available if load drops.
- **oatpp-multithreaded** service shows very high performance and works clearly up to 2.5K concurrent connections. Then down at load 5K concurrent connections.


## AWS t3.xlarge instance. 4vCPUs 16GB Ubuntu 18.04 - $121.81/Month

Performance test of "Hello World" endpoint.  

**Machine** - AWS t3.xlarge instance. 4vCPUs 16GB Ubuntu 18.04 - $121.81/Month  
**Tool** - wrk

oatpp-async compiled with: 
`-D OATPP_ASYNC_HTTP_CONNECTION_HANDLER_THREAD_NUM_DEFAULT=3` option. 

![benchmark aws t3.xlarge](https://github.com/lganzzzo/oatpp-website-res/blob/master/aws-2.png?raw=true)

- **go net/http** service performs clearly till 10 concurrent connection. At higher concurrency levels (till 25K connections) performs with "timeout" errors. At 30K load no response. Service available if load drops.
- **oatpp-async** service performs clearly and stays available up till 25K concurrent connections load. At 30K load no response. Service available if load drops.
- **oatpp-multithreaded** service shows very high performance and works clearly up to 2.5K concurrent connections. At higher concurrency levels (till 20K connections) performs with "timeout" errors. Down at higher load.
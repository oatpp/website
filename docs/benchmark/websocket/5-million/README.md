---
title: Benchmark 5-million Websockets
description: oatpp benchmark for 5 Million fully-loaded concurrent websocket connections. 
sidebarDepth: 0
---

# 5 Million WebSockets <seo/>

Date - `May 20, 2019`  
Oatpp version - `0.19.4`

This article describes oatpp benchmark for 5 Million **fully-loaded** concurrent websocket connections.

It consists of two parts:
- [4 Million WebSockets test](#_4m-websockets).
- [5 Million WebSockets test](#_5m-websockets).

## The Purpose 

This benchmark is aimed to determine scalability of oatpp with increase of load and computing powers with respect to **previous** 
[2-million WebSockets benchmark](/benchmark/websocket/2-million/). 

| |Previous, 2M benchmark|This, 4M / 5M benchmark|
|---|---|---|
|Computing power|**8 vCPUs, 52 GB memory**  |**16 vCPUs, 104 GB memory**|
|Load           |**2M connections**         |**4M / 5M connections**    |
 
## 4M WebSockets
 
### Setup

<img alt="Setup diagram" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/diagram/4m-websockets-setup.svg?sanitize=true">

- Server Machine - Google-Cloud **n1-highmem-16 (16 vCPUs, 104 GB memory)** running Debian GNU/Linux 9.
- Client Machine - Google-Cloud **n1-highmem-16 (16 vCPUs, 104 GB memory)** running Debian GNU/Linux 9.

**Server application** listens to 400 ports from 8000 to 8399 
(in order to prevent ephemeral ports exhaustion on the client - as we running all 4M clients on the same machine). 
Once there is a message on WebSocket, server will echo client's message adding `"Hello from oatpp!"` at the beginning.  

**Client application** opens 10k connections on each port, waits all connections are ready (all WebSocket handshakes are done) then starts the load.
Each of 2-million websocket clients continuously sends messages to server. Once message is sent client sends another one.  

Both server and client applications are running asynchronous oatpp server/client based on [oatpp coroutines](/docs/oatpp-coroutines/).  

### Results

Server showed stable performance through all the benchmark test delivering about `17 Million` messages per minute (`~57.5 Mb/Second`):

<img alt="Server monitoring graph" src="https://github.com/lganzzzo/oatpp-website-res/raw/master/benchmark/websocket/4m/monitoring.png" width="800px">

### Server Stats

#### Resource consumption

Server memory consumption was stable at about 30GB.
  
<img alt="Server resource consumption" border="1" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/benchmark/websocket/4m/top-server.png" width="800px">

#### Throughput

```
SOCKETS:          4000000          # - Number of connected clients                                                       
FRAMES_TOTAL:     573911830        # - Frames received by server (total)                                                          
MESSAGES_TOTAL:   573905877        # - Messages received by server (total)                                                          
FRAMES_PER_MIN:   17373801.439247  # - Frames received rate per minute                                               
MESSAGES_PER_MIN: 17372968.482111  # - Messages received rate per minute  
```

### Client Stats

#### Resource consumption

Client memory consumption was stable at about 20.5GB.
  
<img alt="Server resource consumption" border="1" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/benchmark/websocket/4m/top-client.png" width="800px">

#### Throughput

```
SOCKETS:          4000000          # - Number of connected clients                                                       
FRAMES_TOTAL:     516770460        # - Frames received by client (total)                                                          
MESSAGES_TOTAL:   516405193        # - Messages received by client (total)                                                          
FRAMES_PER_MIN:   16801610.114129  # - Frames received rate per minute                                               
MESSAGES_PER_MIN: 16472169.881512  # - Messages received rate per minute  
```


## 5M WebSockets
 
### Setup

<img alt="Setup diagram" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/diagram/5m-websockets-setup.svg?sanitize=true">

- Server Machine - Google-Cloud **n1-highmem-16 (16 vCPUs, 104 GB memory)** running Debian GNU/Linux 9.
- Client Machine - Google-Cloud **n1-highmem-16 (16 vCPUs, 104 GB memory)** running Debian GNU/Linux 9.

**Server application** listens to 500 ports from 8000 to 8499 
(in order to prevent ephemeral ports exhaustion on the client - as we running all 5m clients on the same machine). 
Once there is a message on WebSocket, server will echo client's message adding `"Hello from oatpp!"` at the beginning.  

**Client application** opens 10k connections on each port, waits all connections are ready (all WebSocket handshakes are done) then starts the load.
Each of 2-million websocket clients continuously sends messages to server. Once message is sent client sends another one.  

Both server and client applications are running asynchronous oatpp server/client based on [oatpp coroutines](/docs/oatpp-coroutines/).  

<hr>

As main point of memory consumption is linux sockets buffers, for 5M connections it was required to reduce `net.ipv4.tcp_rmem` in
order for the test to be stable

```bash
sysctl -w net.ipv4.tcp_rmem='2048 2048 2048'
```

*Here we reduce read buffers as it appeared to have minimal performance impact in this particular case.*

## Results

Server showed stable performance through all the benchmark test delivering about `18 Million` messages per minute (`~58 Mb/Second`):

<img alt="Server monitoring graph" src="https://github.com/lganzzzo/oatpp-website-res/raw/master/benchmark/websocket/5m/monitoring.png" width="800px">

### Server Stats

#### Resource consumption

Server memory consumption was stable at about 36GB.
  
<img alt="Server resource consumption" border="1" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/benchmark/websocket/5m/top-server.png" width="800px">

#### Throughput

```
SOCKETS:          5000000          # - Number of connected clients                                                       
FRAMES_TOTAL:     1179521220       # - Frames received by server (total)                                                          
MESSAGES_TOTAL:   1177610133       # - Messages received by server (total)                                                          
FRAMES_PER_MIN:   19625257.718400  # - Frames received rate per minute                                               
MESSAGES_PER_MIN: 19619426.046304  # - Messages received rate per minute  
```

### Client Stats

#### Resource consumption

Client memory consumption was stable at about 24GB.
  
<img alt="Server resource consumption" border="1" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/benchmark/websocket/5m/top-client.png" width="800px">

#### Throughput

```
SOCKETS:          5000000          # - Number of connected clients                                                       
FRAMES_TOTAL:     1108906831       # - Frames received by client (total)                                                          
MESSAGES_TOTAL:   1097120434       # - Messages received by client (total)                                                          
FRAMES_PER_MIN:   17878571.176088  # - Frames received rate per minute                                               
MESSAGES_PER_MIN: 17612701.369327  # - Messages received rate per minute  
```

## Steps to Reproduce

Create two `n1-highmem-16 (16 vCPUs, 104 GB memory) - Debian GNU/Linux 9` instances in same VPC on Google Cloud.

### Execute the following commands for both instances (SSH).

- Install git

```bash
$ sudo su
$ apt-get update
...
$ apt-get install -y git
...
```

- Clone [benchmark-websocket repo](https://github.com/oatpp/benchmark-websocket) and `cd` to repo folder 

```bash
$ git clone https://github.com/oatpp/benchmark-websocket
...
$ cd benchmark-websocket
```

- Install `oatpp` and `oatpp-websocket` modules (run ./prepare.sh script).

```bash
$ ./prepare.sh
```

- Configure environment (run ./sock-config-5m.sh script)

```bash
$ ./sock-config.sh
$ ulimit -n 6000000
```

### Build and Run Server

Commands for server instance only:

- Build server

```bash
$ cd server/main/build/
$ cmake ..
$ make
```

- Run server

```bash
$ ./my-project-exe --tp 16 --tio 8 --pc 500
```
where:  
`--tp` - number of data-processing threads.  
`--tio` - number of I/O workers.  
`--pc` - number of ports to listen to.

### Build and Run Client

Commands for client instance only:

- Build client

```bash
$ cd client/main/build/
$ cmake ..
$ make
```

- Run client

```bash
$ ./my-project-exe --tp 16 --tio 8 -h <server-private-ip> --socks-max 5000000 --socks-port 10000 --si 1000 --sf 30 --pc 500
```
where:  
`--tp` - number of data-processing threads.  
`--tio` - number of I/O workers.  
`-h <server-private-ip>` - substitute **private-ip** of server instance here.  
`--socks-max` - how many client connections to establish.  
`--socks-port` - how many client connections per port.  
`--si 1000 --sf 30` - control how fast clients will connect to server. Here - each `1000` iterations sleep for `30` milliseconds.  
`--pc` - number of available server ports to connect to. 

**Note** - clients will not start load until all clients are connected.  
**Note** - client app will fail with assertion if any of clients has failed.

## Conclusion

Previous results for 2M WebSockets were **9 Million messages per minute ~32.7 Mb/Second**. So it was **expected** to
get something aroud **18 Million messages per minute ~64 Mb/Second** in this benchmark (As computing power was increased x2). 

Actual results are **17-18 Million messages per minute, with about ~58 Mb/Second** - which is a good result, almost as expected.

At this point oatpp has shown almost constant I/O performance with respect load increase. 


## Links

- [oatpp repo](https://github.com/oatpp/oatpp)
- [This benchmark repo](https://github.com/oatpp/benchmark-websocket)
- [oatpp-websocket repo](https://github.com/oatpp/oatpp-websocket)

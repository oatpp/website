---
title: Benchmark 2-million Websockets
description: oatpp benchmark for 2 Million fully-loaded concurrent websocket connections. 
sidebarDepth: 0
---

# 2 Million WebSockets <seo/>

Date - `May 5, 2019`  
Oatpp version - `0.19.4`

This article describes oatpp benchmark for 2 Million **fully-loaded** concurrent websocket connections. 

## Setup

<img alt="Setup diagram" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/diagram/2m-websockets-setup.svg?sanitize=true">

- Server Machine - Google-Cloud **n1-highmem-8 (8 vCPUs, 52 GB memory)** running Debian GNU/Linux 9.
- Client Machine - Google-Cloud **n1-highmem-8 (8 vCPUs, 52 GB memory)** running Debian GNU/Linux 9.

**Server application** listens to 100 ports from 8000 to 8099 
(in order to prevent ephemeral ports exhaustion on the client - as we running all 2m clients on the same machine). 
Once there is a message on WebSocket, server will echo client's message adding `"Hello from oatpp!"` at the beginning.  

**Client application** opens 20k connections on each port, waits all connections are ready (all WebSocket handshakes are done) then starts the load.
Each of 2-million websocket clients continuously sends messages to server. Once message is sent client sends another one.  

Both server and client applications are running asynchronous oatpp server/client based on [oatpp coroutines](/docs/oatpp-coroutines/).  

## Results

Server showed stable performance through all the benchmark test delivering about `9 Million` messages per minute (`~32.7 Mb/Second`):

<img alt="Server monitoring graph" src="https://github.com/lganzzzo/oatpp-website-res/raw/master/benchmark/websocket/2m/monitoring.png" width="800px">

### Server Stats

#### Resource consumption

Server memory consumption was stable at about 15GB.
  
<img alt="Server resource consumption" border="1" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/benchmark/websocket/2m/top-server.png" width="800px">

#### Throughput

```
SOCKETS:          2000000          # - Number of connected clients                                                       
FRAMES_TOTAL:     2055762317       # - Frames received by server (total)                                                          
MESSAGES_TOTAL:   2055711187       # - Messages received by server (total)                                                          
FRAMES_PER_MIN:   9198391.630007   # - Frames received rate per minute                                               
MESSAGES_PER_MIN: 9194998.122585   # - Messages received rate per minute  
```

### Client Stats

#### Resource consumption

Client memory consumption was stable at about 10GB.
  
<img alt="Server resource consumption" border="1" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/benchmark/websocket/2m/top-client.png" width="800px">

#### Throughput

```
SOCKETS:          2000000          # - Number of connected clients                                                       
FRAMES_TOTAL:     1986591173       # - Frames received by client (total)                                                          
MESSAGES_TOTAL:   1986358027       # - Messages received by client (total)                                                          
FRAMES_PER_MIN:   8971818.390638   # - Frames received rate per minute                                               
MESSAGES_PER_MIN: 8973755.731700   # - Messages received rate per minute  
```

## Steps to Reproduce

Create two `n1-highmem-8 (8 vCPUs, 52 GB memory) - Debian GNU/Linux 9` instances in same VPC on Google Cloud.

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

- Configure environment (run ./sock-config.sh script)

```bash
$ ./sock-config.sh
$ ulimit -n 3000000
```

### Build and Run Server

Commands for server instance only:

- Build server

```bash
$ cd server/build/
$ cmake ..
$ make
```

- Run server

```bash
$ ./wsb-server-exe --tp 9 --tio 3
```
where:  
`--tp` - number of data-processing threads.  
`--tio` - number of I/O workers.

### Build and Run Client

Commands for client instance only:

- Build client

```bash
$ cd client/build/
$ cmake ..
$ make
```

- Run client

```bash
$ ./wsb-client-exe --tp 9 --tio 3 -h <server-private-ip> --socks-max 2000000 --socks-port 20000 --si 1000 --sf 50
```
where:  
`--tp` - number of data-processing threads.  
`--tio` - number of I/O workers.  
`-h <server-private-ip>` - substitute **private-ip** of server instance here.  
`--socks-max` - how many client connections to establish.  
`--socks-port` - how many client connections per port.  
`--si 1000 --sf 50` - control how fast clients will connect to server. Here - each `1000` iterations sleep for `50` milliseconds.

**Note** - clients will not start load until all clients are connected.  
**Note** - client app will fail with assertion if any of clients has failed.

## Links

- [This benchmark repo](https://github.com/oatpp/benchmark-websocket)
- [About oatpp coroutines](/docs/oatpp-coroutines/)
- [oatpp-websocket repo](https://github.com/oatpp/oatpp-websocket)
- [oatpp repo](https://github.com/oatpp/oatpp)

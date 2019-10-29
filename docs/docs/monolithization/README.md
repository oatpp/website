---
title: Monolithization
description: Monolithization of microservices in Oat++ Web Framework. 
sidebarDepth: 2
---

# Monolithization <seo/>

Monolithization is the technique that enables you to scale your microservices better. 
You can develop regular microservices in Oat++, and when there is a little to no load in your system, 
you can consolidate your services in a single monolith. Also, consolidated services perform better and consume less memory. 
Thus you can reduce your infrastructure costs by reducing network overhead and minimizing the number of running instances.

The best way to understand Monolithization and how it works is through example.

[[toc]]

## Example

Consider the following system consisting of three trivial microservices:

- User Service
- Book Service
- Facade

<img alt="Example microservices system" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/website/monolithization/svg/load-setup.svg?sanitize=true" width="650px">

Facade requests user information from User-Service, book information from Book-Service. Then merges the data and returns to the client.

## The Problem

When there is a little load in this system, there is no need to scale its parts. 
Thus it would be better to have this system as a monolith in order not to spawn multiple instances or containers.
But you want to keep microservices architecture, in order to be flexible in the future when there is a load.

You could probably deploy all services on a single instance running in separate processes. 
But in this case, it's additional dev-ops effort. Plus, you still have the network overhead, as communicating through localhost decreases performance.


## The Concept of Monolithization

The concept is simple. - We are going to put all the services in a single process. 
And we are going to make services communicate through the Oat++ **virtual connections**. 

<img alt="Monolithization concept" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/website/monolithization/svg/microservices-monolithizated.svg?sanitize=true" width="500px">

The Oat++ virtual connections substitute the network transport layer, so that your application logic can stay isolated. 
And they utilize internal buffers so that there is no network overhead as in case of communicating through the localhost.

### Service Interfaces

Consolidated services can keep their network interfaces, to be available for remote services. 
And they have to expose the virtual interface to communicate with consolidated services via virtual connections.

<img alt="Service interfaces" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/website/monolithization/svg/monolithization-interfaces.svg?sanitize=true" width="600px">

### Build Pipeline

The good thing is that you don't have to change your build pipeline. Each team can develop its microservices independently from others.  
All you need to do is to create a monolithic configuration for each set of microservices you want to consolidate.

<img alt="Build pipeline" src="https://storage.googleapis.com/website-res/building-monolith.svg" width="600px">

### Scaling

With Monolithization, you can scale gradually. 
Step by step, adding new monolithic deployments and decoupling your monolith into smaller pieces so that you can achieve the best configuration for your cloud.

<table style="width:100%">
  <tr>
    <th>Step 1</th>
    <th>Step 2</th>
    <th>Step 3</th>
  </tr>
  <tr>
    <td><img alt="Scaling step 1" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/website/monolithization/svg/decoupling-1.svg?sanitize=true" width="180px"></td>
    <td><img alt="Scaling step 2" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/website/monolithization/svg/decoupling-2.svg?sanitize=true" width="300px"></td>
    <td><img alt="Scaling step 3" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/website/monolithization/svg/decoupling-3.svg?sanitize=true" width="400px"></td>
  </tr>
</table>

## Performance

Below is the performance comparison of Oat++ microservices(deployed on the same instance) versus same microservices consolidated via Monolithization.

<img alt="Performance test setup" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/website/monolithization/svg/load-monolithizated.svg?sanitize=true" width="650px">

### Requests Per Second

<img alt="Requests per second" src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/website/monolithization/svg/micro-vs-monolith.svg?sanitize=true" width="800px">

### Memory Usage (Mb)

||Facade|User Service|Book Service|Total|
|---|---|---|---|---|
|Oat++ (micro-svc) idle|25|3  |3  |31  |
|Oat++ (micro-svc) load|45|3.2|3.2|49.4|
|Oat++ (monolith) idle |- |-  |-  |26.7|
|Oat++ (monolith) idle |- |-  |-  |37.7|


## Links

[Example Project Repository](https://github.com/oatpp/example-microservices)


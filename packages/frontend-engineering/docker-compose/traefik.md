---
title: Traefik
---

## 边缘路由

Traefik 是一个边缘路由器，这意味着它是通往你平台的大门，它拦截和路由每一个传入的请求:它知道所有的逻辑和每一个规则来决定哪个服务处理哪个请求

```dockerfile
version: '3'

services:
  reverse-proxy:
    # The official v2 Traefik docker image
    image: traefik:v2.8
    # Enables the web UI and tells Traefik to listen to docker
    command: --api.insecure=true --providers.docker
    ports:
      # The HTTP port
      - "80:80"
      # The Web UI (enabled by --api.insecure=true)
      - "8080:8080"
    volumes:
      # So that Traefik can listen to the Docker events
      - /var/run/docker.sock:/var/run/docker.sock
```

---
title: Traefik
---

![architecture-overview](https://doc.traefik.io/traefik/assets/img/architecture-overview.png)

- Providers discover the services that live on your infrastructure (their IP, health, ...)
- Entrypoints listen for incoming traffic (ports, ...)
- Routers: 解析请求 (host, path, headers, SSL, ...)
- Services 转发请请求到你的服务 (load balancing, ...)
- Middlewares may update the request or make decisions based on the request (authentication, rate limiting, headers, ...)

## 边缘路由

Traefik 是一个边缘路由器，这意味着它是通往你平台的大门，它拦截和路由每一个传入的请求:它知道所有的逻辑和每一个规则来决定哪个服务处理哪个请求

`traefik` 与 `nginx` 一样，是一款优秀的反向代理工具，或者叫 `Edge Router`。至于使用它的原因则基于以下几点

- 无须重启即可更新配置
- 自动的服务发现与负载均衡
- 与 `docker` 完美集成，基于 `container label` 的配置
- 漂亮的 `dashboard` 界面
- `metrics` 的支持，支持对 `prometheus` 和 `k8s` 集成

## 快速开始

创建 `docker-compose.yaml` 配置文件，使用官方 Traefik 镜像定义一个 `reverse-proxy` 服务

```yaml
version: '3'

services:
  reverse-proxy:
    # The official v2 Traefik docker image
    image: traefik:v2.8
    # Enables the web UI and tells Traefik to listen to docker
    command: --api.insecure=true --providers.docker
    ports:
      # The HTTP port
      - '80:80'
      # The Web UI (enabled by --api.insecure=true)
      - '8080:8080'
    volumes:
      # So that Traefik can listen to the Docker events
      - /var/run/docker.sock:/var/run/docker.sock
```

使用以下命令启动 `reverse-proxy`

```shell
# docker-compose up -d reverse-proxy
[+] Running 2/2
 ⠿ Network traefik_default            Created                                                                                                      0.1s
 ⠿ Container traefik-reverse-proxy-1  Started
```

创建一个名为 traefik_default 的网络和一个 traefik-reverse-proxy-1 容器，访问 `[http://localhost:8080](http://localhost:8080)`

## 发现新服务

接下来我们使用 `docker-compose` 借助 `whoami` 镜像启动一个简单的 `http` 服务，`docker-compose.yaml` 配置文件如下

```yaml
version: '3'

services:
  # 改镜像会暴露出自身的 `header` 信息
  whoami:
    image: containous/whoami
    labels:
      # 设置Host 为 whoami.docker.localhost 进行域名访问
      - 'traefik.http.routers.whoami.rule=Host(`whoami.docker.localhost`)'

# 使用已存在的 traefik 的 network
networks:
  default:
    external:
      name: traefik_default
```

那 `whoami` 这个 `http` 服务做了什么事情呢

1. 暴露了一个 `http` 服务，主要提供一些 `header` 以及 `ip` 信息
1. 配置了容器的 `labels`，设置该服务的 `Host` 为 `whoami.docker.localhost`，给 `traefik` 提供标记

此时我们可以通过主机名 `whoami.docker.localhost` 来访问 `whoami` 服务，我们使用 `curl` 做测试

```bash
$ curl -H Host:whoami.docker.localhost http://127.0.0.1
Hostname: bc3e8f1a5066
IP: 127.0.0.1
IP: 172.21.0.2
RemoteAddr: 172.21.0.1:37852
GET / HTTP/1.1
Host: whoami.docker.localhost
User-Agent: curl/7.29.0
Accept: */*
Accept-Encoding: gzip
X-Forwarded-For: 127.0.0.1
X-Forwarded-Host: whoami.docker.localhost
X-Forwarded-Port: 80
X-Forwarded-Proto: http
X-Forwarded-Server: 8.8.8.8
X-Real-Ip: 127.0.0.1
```

服务正常访问。此时如果把 `Host` 配置为自己的域名，则已经可以使用自己的域名来提供服务

## 路由

![image.png](https://cdn.nlark.com/yuque/0/2022/png/226152/1652852511218-45b99ff6-7d3f-469d-9948-6a475a78756f.png#clientId=u31f52041-8d26-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=865&id=ub1aab2e2&name=image.png&originHeight=1730&originWidth=3165&originalType=binary&ratio=1&rotation=0&showTitle=false&size=470415&status=done&style=none&taskId=u54568fc2-f937-4be4-b39d-c17d78813ba&title=&width=1582.5)
路由器负责将传入的请求连接到能够处理它们的服务。

## 配置文件

![](https://docs.traefik.io/assets/img/static-dynamic-configuration.png#crop=0&crop=0&crop=1&crop=1&id=A72gv&originHeight=1728&originWidth=2690&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
在启动时，Traefik 会在以下目录中搜索一个名为 `traefik.yml` (或 `traefik.yaml` 或 `traefik.toml`) 静态配置文件。

- /etc/traefik/
- \$XDG_CONFIG_HOME/
- \$HOME/.config/
- . (the working directory).

Traefik 中的配置可以指两种不同的东西

- 全动态路由配置(简称动态配置)
- 启动配置(称为静态配置)

动态配置包含定义系统如何处理请求的所有内容。该配置可以更改，并且可以无缝地热加载，不会出现任何请求中断或连接丢失。

#### 动态配置

Traefik 从提供程序获取动态配置:无论是协调器、服务注册表还是普通的旧配置文件。

#### 静态配置

静态配置中的元素建立到提供程序的连接，并定义 Traefik 将侦听的入口点(这些元素不经常更改)。
在 Traefik 中定义静态配置选项有三种不同的、互斥的方法(即你只能同时使用其中一种):

- 在配置文件中
- 在命令行参数中
- 作为环境变量

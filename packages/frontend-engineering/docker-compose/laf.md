---
title: laf
---

## Deploy

```shell
git clone https://github.com/labring/laf.git

cd laf/deploy/docker-compose

docker network create laf_shared_network --driver bridge || true
docker pull lafyun/app-service:latest

# 启动所有服务
docker-compose up

# 浏览器打开 http://console.127-0-0-1.nip.io:8000 访问
```

- [lafyun](https://www.lafyun.com/)

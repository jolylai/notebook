---
title: MongoDB
---

## [安装](https://docs.docker.com/compose/install/)

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

## MongoDB

> [mongo](https://hub.docker.com/_/mongo)

```bash
$ docker pull mongo

$ docker run --name docker-mongo -d mongo:tag

$ docker run --name docker-mongo -v /my/own/datadir:/data/db -d mongo
```

**Tip**

- `-p` 指定容器的端口映射，mongodb 默认端口为 27017
- `-v` 为设置容器的挂载目录，这里是将即本机中的`<LocalDirectoryPath>`目录挂载到容器中的/data/db 中，作为 mongodb 的存储目录
- `--name` 为设置该容器的名称
- `-d` 设置容器以守护进程方式运行

```dockerfile
# docker-compose.yml

# Use root/example as user/password credentials
version: '3.1'

services:

  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
```

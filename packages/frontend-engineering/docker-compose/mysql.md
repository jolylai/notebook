---
title: MySQL
---

[MySQL](https://hub.docker.com/_/mysql)

```bash
# 从远程仓库拉取MySQL镜像
$ docker pull mysql

# 创建 MySQL 容器
# $ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
# 设置 root 用户密码为 123456
$ docker run --name docker-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql

# 设置挂载点数据持久化
# $ docker run --name some-mysql -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
$ docker run --name docker-mysql -d -v /var/lib/mysql:/var/lib/mysql -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mysql:5.6.43
```

```dockerfile
# docker-compose

# Use root/example as user/password credentials
version: '3.1'

services:

  db:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

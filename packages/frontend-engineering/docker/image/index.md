---
title: 镜像
order: 3
---

Docker 镜像是一个只读的 Docker 容器模板，含有 Docker 容器启动所需的文件系统结构及其内容

## 创建镜像

镜像是分层的自包含文件，它们充当用于创建 Docker 容器的模板。它们就像是容器的冻结的只读副本。

为了使用程序创建镜像，必须对要从镜像中获得什么有清晰的认识。以官方 nginx 镜像为例。只需执行以下命令即可使用该镜像启动容器：

```shell
$ docker container run --rm -d --name nginx -p 8080:80 nginx
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
07aded7c29c6: Pull complete
bbe0b7acc89c: Pull complete
44ac32b0bba8: Pull complete
91d6e3e593db: Pull complete
8700267f2376: Pull complete
4ce73aa6e9b0: Pull complete
Digest: sha256:06e4235e95299b1d6d595c5ef4c41a9b12641f6683136c18394b858967cd1506
Status: Downloaded newer image for nginx:latest
dc862188a76e51b20ec92df0239786642b2de9b5643f3edc26e1355d4b7d4749
```

现在，如果在浏览器中访问 http://127.0.0.1:8080 ，则会看到一个默认的响应页面。

镜像是多层文件，在此文件中，编写的每一行（称为说明）都会为镜像创建一个层。

```shell
docker build github.com/creack/docker-firefox
```

```Dockerfile
FROM ubuntu:latest

EXPOSE 80

RUN apt-get update && \
    apt-get install nginx -y && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

CMD ["nginx", "-g", "daemon off;"]
```

## 多阶段构建

在生产模式下，npm run build 命令将所有 JavaScript 代码编译为一些静态 HTML、CSS 和 JavaScript 文件。要运行这些文件，不需要 node 或任何其他运行时依赖项。只需要一个像 nginx 这样的服务器。

要在应用程序以生产模式运行时创建镜像，可以执行以下步骤：

1. 使用 node 作为基础镜像并构建应用程序。
2. 在 node 镜像中安装 nginx 并使用它来提供静态文件。

这种方法是完全有效的。但是问题在于，node 镜像很大，并且它所承载的大多数内容对于静态文件服务而言都是不必要的。解决此问题的更好方法如下：

使用 node 图像作为基础并构建应用程序。
将使用 node 镜像创建的文件复制到 nginx 映像。
根据 nginx 创建最终镜像，并丢弃所有与 node 相关的东西。
这样，镜像仅包含所需的文件，变得非常方便。

这种方法是一个多阶段构建。要执行这样的构建，在 hello-dock 项目目录中创建一个新的 Dockerfile，并将以下内容放入其中：

```Dockerfile
FROM node:lts-alpine as builder

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine

EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html
```

如你所见，Dockerfile 看起来很像以前的 Dockerfile，但有一些不同之处。该文件的解释如下：

第 1 行使用 node:lts-alpine 作为基础镜像开始构建的第一阶段。as builder 语法为此阶段分配一个名称，以便以后可以引用。
从第 3 行到第 13 行，以前已经看过很多次了。实际上，RUN npm run build 命令会编译整个应用程序，并将其存放在 /app/dist 目录中，其中 /app 是工作目录，/dist 是 vite 应用程序的默认输出目录。
第 15 行使用 nginx:stable-alpine 作为基础镜像开始构建的第二阶段。
NGINX 服务器默认在端口 80 上运行，因此添加了 EXPOSE 80 行。
最后一行是 COPY 指令。--from=builder 部分表示要从 builder 阶段复制一些文件。之后，这是一条标准的复制指令，其中 /app/dist 是 source，而 /usr/share/nginx/html 是 destination。这里使用的 destination 是 NGINX 的默认站点路径，因此放置在其中的任何静态文件都将自动提供。
如你所见，生成的镜像是基于 nginx 的镜像，仅包含运行应用程序所需的文件。要构建此镜像，请执行以下命令

## 标记 Docker 镜像

可以为镜像分配自定义标识符，而不必依赖于随机生成的 ID。如果是镜像，则称为标记而不是命名。在这种情况下，使用 `--tag` 或 `-t` 选项。

```bash
$ docker image build --tag <image repository>:<image tag>
```

repository 通常指镜像名称，而 tag 指特定的构建或版本。

如果在构建期间忘记为镜像添加标记，或者你想更改标记，可以使用 image tag 命令执行此操作

```shell
$ docker image tag <image id> <image repository>:<image tag>

$ docker image tag <image repository>:<image tag> <new image repository>:<new image tag>
```

## 列表展示镜像

[查看镜像列表](https://docs.docker.com/engine/reference/commandline/images/)

```shell
# docker images [OPTIONS] [REPOSITORY[:TAG]]

# 列出最近创建的镜像
$ docker image ls

$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nginx               1.15.2-alpine       36f3464a2197        22 months ago       18.6MB

# 列出所有的镜像（默认隐藏中间镜像）
$ docker images -a

# 只显示镜像 ID
$ docker images -q
f18518db91f5
2622e6cca7eb
ec365a2721d0

# 根据 镜像名称 和 tag 列出镜像
$ docker images node
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
node                8                   bd2f9f8fa54d        6 months ago        901MB

$ docker images node:8
```

### 显示格式

```bash
# 列出未加标签的镜像
$ docker images --filter "dangling=true"

# 列出镜像id全称
$ docker images --no-trunc

# 显示概要
$ docker images --digests
node                8                   sha256:472621a1c5ae598f1f6f128f8a1ed57dce7b369975523615265a0663b60a96b3   bd2f9f8fa54d        6 months ago        901MB
nginx               1.15.2-alpine       sha256:23e4dacbc60479fa7f23b3b8e18aad41bd8445706d0538b25ba1d575a6e2410b   36f3464a2197        23 months ago       18.6MB
```

### 格式化输出

```bash
$ docker images --format "{{.ID}}: {{.Repository}}"
bd2f9f8fa54d: node
36f3464a2197: nginx

$ docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
bd2f9f8fa54d        node                8
36f3464a2197        nginx               1.15.2-alpine
```

### 搜索镜像

```shell
# 在 registry 中搜索镜像
$ docker search [query]

$ docker search mysql
INDEX       NAME                DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
docker.io   docker.io/mysql     MySQL is a widely used, open-source relati...   9553      [OK]
docker.io   docker.io/mariadb   MariaDB is a community-developed fork of M...   3471      [OK]

# 把本地 image 上传到 registry 中 (此时会把所有 tag 都上传上去)
$ docker push [imageName]
```

搜索 `mysql` 镜像 `stars` 数大于 5000

```shell
$ docker search mysql --filter=STARS=5000
INDEX       NAME                DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
docker.io   docker.io/mysql     MySQL is a widely used, open-source relati...   9553      [OK]
```

## 删除镜像

```shell
docker image rm <image identifier>
docker rmi <image identifier>
```

可以使用 image prune 命令来清除所有未标记的挂起的镜像

```shell
docker image prune --force
```

`--force` 或 `-f` 选项会跳过所有确认问题。也可以使用 `--all` 或 `-a` 选项删除本地仓库中的所有缓存镜像。

```shell
# docker rmi [OPTIONS] IMAGE [IMAGE...]

# 删除指定镜像 id
$ docker rmi -f 镜像id

# 删除多个镜像
$ docker rmi -f 镜像id 镜像id 镜像id 镜像id

# 删除所有镜像
$ docker rmi -f $(docker images -aq)

# 删除所有没有 tag 的镜像
$ docker rmi $(docker images -f "dangling=true" -q)
```

[删除一个或者多个镜像](https://docs.docker.com/engine/reference/commandline/rmi/)

## 镜像仓库

### 拉取

```shell
$ docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

从 registry 中获取镜像 （若无指定 tag 名称，则默认使用 latest 这个 tag）

```shell
$ docker pull mysql
Using default tag: latest  # 不写tag 默认： last 即使用最新的版本
Trying to pull repository docker.io/library/mysql ...
latest: Pulling from docker.io/library/mysql
afb6ec6fdc1c: Pull complete    # 分层下载 docker 镜像核心  联合文件系统
0bdc5971ba40: Pull complete
97ae94a2c729: Pull complete
f777521d340e: Pull complete
1393ff7fc871: Pull complete
a499b89994d9: Pull complete
7ebe8eefbafe: Pull complete
597069368ef1: Pull complete
ce39a5501878: Pull complete
7d545bca14bf: Pull complete
211e5bb2ae7b: Pull complete
5914e537c077: Pull complete
Digest: sha256:a31a277d8d39450220c722c1302a345c84206e7fd4cdb619e7face046e89031d  # 签名
Status: Downloaded newer image for docker.io/mysql:latest   # 真实地址
```

指定版本下载

```shell
[root@iZwz9hqfjhnsbszaxamqqvZ ~]# docker pull mysql:5.7
Trying to pull repository docker.io/library/mysql ...
5.7: Pulling from docker.io/library/mysql
afb6ec6fdc1c: Already exists
0bdc5971ba40: Already exists
97ae94a2c729: Already exists
f777521d340e: Already exists
1393ff7fc871: Already exists
a499b89994d9: Already exists
7ebe8eefbafe: Already exists
4eec965ae405: Pull complete
a531a782d709: Pull complete
270aeddb45e3: Pull complete
b25569b61008: Pull complete
Digest: sha256:d16d9ef7a4ecb29efcd1ba46d5a82bda3c28bd18c0f1e3b86ba54816211e1ac4
Status: Downloaded newer image for docker.io/mysql:5.7
```

### 提交镜像

docker commit 只提交容器镜像发生变更的部分，即修改的后的容器镜像与当前仓库中对应镜像之间的差异部分

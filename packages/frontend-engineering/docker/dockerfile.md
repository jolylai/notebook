---
title: Dockerfile
---

`Dockerfile` 是 `Docker` 用来构建镜像的文本文件包含自定义的格式和指令。

## Dockerfile 使用

**构建上下文**是指传入`docker build` 命令的所有文件，一般将本地主机的一个包含 `Dockerfile` 的目录中的所有内容作为上下文。
上下文通过 `docker build` 命令传入到 Docker daemon 后，便开始安装 `Dockerfile` 中的内容构建镜像。

## Dockerfile 指令

`Dockerfile`中指令不区分大小写，但为了与参数区分，推荐使用大写。第一条指令必须是 FROM ，用于指定构建镜像的基础镜像。

[Dockerfile](https://docs.docker.com/engine/reference/builder/) 文件中支持的环境变量

- ADD
- ENV
- EXPOSE
- FROM
- LABEL
- STOPSIGNAL
- USER
- VOLUME

### ENV

为镜像创建出来的容器声明环境变量。

```Dockerfile
ENV <key> <value>
ENV <key>=<value> ...
```

`ENV <key> <value>`只能设置单一环境变量,如果需要多个环境变量则需要使用多个`ENV`指令

```Dockerfile
ENV myName John Doe
ENV myDog Rex The Dog
ENV myCat fluffy
```

`ENV <key>=<value> ...` 一行可以设置多个变量值

```Dockerfile
ENV myName="John Doe" myDog=Rex\ The\ Dog \
    myCat=fluffy
```

使用格式为 `$variable_name` 或 `${variable_name}`

### FROM

为后面的指令提供基础镜像。

一个`Dockerfile` 中，`FROM`指令可以出现多次，这样会构建多个镜像

### COPY

```Dockerfile
COPY <src> <dest>
```

复制指令从中复制新的文件或目录，并将它们添加到路径处的容器文件系统中。

`<src>`指定的源可以多个，但必须是上下文的根目录的相对路径。不能使用`COPY ../something /something`

```Dockerfile
# 添加以 hom 开头的所有文件到目录 /mydir 中
COPY hom* /mydir/
```

### ADD

```Dockerfile
ADD <src> <dest>
```

获取网络文件的文件名为 filename，该文件会被复制添加到 `<dest>/<filename>`

获取本地压缩归档文件，该文件在复制到容器中会被解压提取，若为归档文件则不会被解压提取

推荐使用`COPY`,因为 `COPY`只支持本地文件，相比`ADD` 而言，更透明。

### RUN

`RUN`指令会在前一条命令创建出的镜像基础上创建一个容器，并在容器中运行命令，在命令结束后提交容器为新镜像，新镜像被`Dockerfile`中的下一条指令使用。

两种格式

Shell 格式，命令通过`/bin/sh -c` 运行

```Dockerfile
RUN <command>
```

exec 格式 ， **推荐格式**，命令直接运行，容器不调用 shell 程序，即容器中没有 shell 程序，参数会当成 JSON 数组被 Docker 解析，故**必须使用双引号而不能使用单引号**。

```Dockerfile
RUN ["executable", "params1","params2"]
```

因为不是在 Shell 中执行，所以环境变量的参数不会被替换，如：`

### CMD

`CMD`提供容器运行时的默认值，可以是一条指令，也可以是一些参数。一个`Dockerfile`中可以有多条`CMD`指令，但只有最后一条`CMD` 指令有效。`CMD` 在构建镜像时不执行任何命令，而是在容器启动时默认将`CMD`指令作为第一条执行的命令。如果

### WORKDIR

为 Dockerfile 接下来的 `RUN`, `CMD`, `ENTRYPOINT`, `COPY` 和 `ADD` 指令设置工作目录，如果`WORKDIR` 如果路径不存在，则将会被创建，即使在之后的 Dockerfile 指令不没有用到

可以在 `Dockerfile` 中多次使用，如果提供了相对路径，它将是相对于前一个 WORKDIR 指令的路径。

```Dockerfile
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

这个 Dockerfile 中的最后一个 pwd 命令的输出是`/a/b/c`。

创建一个 `Dockerfile`

```Dockerfile
FROM node:8
RUN pwd
WORKDIR /app
RUN pwd
WORKDIR node
RUN pwd
```

使用创建的`Dockerfile`创建一个镜像

```shell
$ docker build  -t  dockerfile-test .
Sending build context to Docker daemon  332.8kB
Step 1/6 : FROM node:8
8: Pulling from library/node
146bd6a88618: Pull complete
9935d0c62ace: Pull complete
db0efb86e806: Pull complete
e705a4c4fd31: Pull complete
c877b722db6f: Pull complete
645c20ec8214: Pull complete
db8fbd9db2fe: Pull complete
1c151cd1b3ea: Pull complete
fbd993995f40: Pull complete
Digest: sha256:a681bf74805b80d03eb21a6c0ef168a976108a287a74167ab593fc953aac34df
Status: Downloaded newer image for node:8
 ---> 8eeadf3757f4
Step 2/6 : RUN pwd
 ---> Running in eee47ecc100e
/
Removing intermediate container eee47ecc100e
 ---> 5afa37e046b9
Step 3/6 : WORKDIR /app
 ---> Running in 84bd5199db1f
Removing intermediate container 84bd5199db1f
 ---> c1c383c030ee
Step 4/6 : RUN pwd
 ---> Running in c51f5182461a
/app
Removing intermediate container c51f5182461a
 ---> e2bf032670d8
Step 5/6 : WORKDIR node
 ---> Running in 428d5747eeef
Removing intermediate container 428d5747eeef
 ---> 781622b09d4c
Step 6/6 : RUN pwd
 ---> Running in 8d1b9da73bb2
/app/node
Removing intermediate container 8d1b9da73bb2
 ---> b06d0f66dd87
Successfully built b06d0f66dd87
Successfully tagged dockerfile-test:latest
```

`WORKDIR` 指令可以解析以前使用 `ENV` 设置的环境变量。只能使用 `Dockerfile` 中显式设置的环境变量。

```Dockerfile
ENV DIRPATH /app
WORKDIR $DIRPATH/node
RUN pwd
```

Dockerfile 文件中的 `pwd` 命令最终输出的是 `/app/node`

```shell
$ docker build  -t  dockerfile .
Sending build context to Docker daemon  332.8kB
Step 1/4 : FROM node:8
 ---> 8eeadf3757f4
Step 2/4 : ENV DIRPATH /app
 ---> Running in db87935bc7a6
Removing intermediate container db87935bc7a6
 ---> ed46d12ade44
Step 3/4 : WORKDIR $DIRPATH/node
 ---> Running in a969681a7fe4
Removing intermediate container a969681a7fe4
 ---> 909f1fc845b2
Step 4/4 : RUN pwd
 ---> Running in 06bd5c5fc56d
/app/node
Removing intermediate container 06bd5c5fc56d
 ---> 29887e169ee9
Successfully built 29887e169ee9
Successfully tagged dockerfile:latest
```

```dockerfile
# pulls node.js docker image from docker hub
FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8081
CMD node index.js
```

`docker build` 传入环境变量,如：`docker build --build-arg ENV_TAG=prod .`，如果有多个环境变量的话 `docker build --build-arg ENV_TAG=prod --build-arg ENV_TAG=prod .`

```dockerfile
# The ARG instruction defines a variable
# that users can pass at build-time to the builder with the
# `docker build` command using the --build-arg <varname>=<value> flag.
# docker build --build-arg ENV_TAG=prod .
ARG ENV_TAG
ENV ENV_TAG ${ENV_TAG}
```

[从 `Dockerfile` 文中创建镜像](https://docs.docker.com/engine/reference/commandline/build/)

```bash
# docker build [OPTIONS] PATH | URL | -
# docker build -t [imageName] [pathToFolder]
$ docker build -t hello-world .

# 如果没有传 tag 则默认为 latest
$ docker build -t hello-world:2 .
```

传入环境变量

```bash
$ docker build --build-arg ENV_TAG=prod .
# 多个环境变量
$ docker build --build-arg ENV_TAG=prod --build-arg HTTP=http://10:1234 .
```

常用的 Options

- **--tag, -t**: 镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。
- **--file , -f** :指定要使用的 Dockerfile 路径；
- **--build-arg=[]** :设置镜像创建时的变量；
- **--rm** :设置镜像成功后删除中间容器；

从 `container` 创建 `image`

```bash
$ docker commit [container] [imageName]
```

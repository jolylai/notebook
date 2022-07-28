---
title: 容器
order: 2
---

## 前言

对于前端开发者

## 创建容器

```shell
docker <object> <command> <options>
```

使用以下语法：

- `object`: 表示将要操作的 Docker 对象的类型。这可以是 `container`、`image`、`network` 或者 `volume` 对象。
- `command`: 表示守护程序要执行的任务，即 `run` 命令。
- `options`: 可以是任何可以覆盖命令默认行为的有效参数，例如端口映射的 `--publish` 选项。

### 公开端口

容器是隔离的环境。主机系统对容器内部发生的事情一无所知。因此，从外部无法访问在容器内部运行的应用程序。

要允许从容器外部进行访问，必须将容器内的相应端口发布到本地网络上的端口。`--publish` 或 `-p` 选项的通用语法如下：

```shell
# --publish <host port>:<container port>

$ docker container run -p 8080:80 fhsinchy/hello-dock
Unable to find image 'fhsinchy/hello-dock:latest' locally
latest: Pulling from fhsinchy/hello-dock
0a6724ff3fcd: Pull complete
1d7c87af3754: Pull complete
9668ffa91d19: Pull complete
e81a2f5037c1: Pull complete
991b5ddb4d9e: Pull complete
9f4fab0aaa1b: Pull complete
Digest: sha256:852a90695e942a8aefe5883cb9681a3fbedfdf89f64468e22fa30e04766e5f2e
Status: Downloaded newer image for fhsinchy/hello-dock:latest
```

### 分离模式

```shell
$ docker container run --detach -p 8080:80 fhsinchy/hello-dock

$ docker container run -d -p 8080:80 fhsinchy/hello-dock
32b55add608ab122f170d51aab9394aeed963a9419a4a9c7a3232cf3e79bbca3
```

`container run` 命令启动了容器，该命令实际上是两个单独命令的组合。

1. `container create` 命令从给定的镜像创建一个容器。
2. `container start` 命令将启动一个已经创建的容器。

```shell
# 只创建容器
$ docker create

# 创建并运行 container
$ docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

创建并运行 container 后进入其 bash 控制台 `docker run -t -i [image] /bin/bash`

```shell
$ docker run -it centos  /bin/bash

# 查看容器内的 centos
# 基础版本 很多命名都不是完善的
[root@e41187d21e6c /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

# 退出容器并停止运行 回到主机
# 快捷键 control + p + q 退出容器不停止运行 回到主机
[root@e41187d21e6c /]# exit
exit
```

创建并运行 container 并让其在后台运行，并端口映射

```shell
# docker run -p [port in container]:[port in physical system] -d [image] [command]
$ docker run -p 4000:8081  hello-world
```

参数

- `--name="Name"`: 容器名字，用来区分容器名字
- `-d`: 后台方式运行
- `-it`: 使用交互方式运行，进入容器查看内容
- `-p`: 指定容器的端口
- `-P`: 随机指定端口

## 查看容器

查看所有正在运行的容器的信息

```bash
$ docker container ls

$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
33dd05bad49b        a00be011f00a        "nginx -g 'daemon ..."   7 days ago          Up 7 days           0.0.0.0:80->80/tcp   suspicious_yonath
```

查看所有容器，包括正在运行和已经关闭的

```shell
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS                NAMES
e41187d21e6c        centos              "/bin/bash"              10 minutes ago      Exited (0) 6 minutes ago                        peaceful_austin
```

列出正在运行的容器 id

```shell
$ docker ps -q
33dd05bad49b
```

查看最后创建的容器

```shell
$ docker ps -l
```

```shell
# 输出指定 container 的 stdout 信息（用来看 log ，效果和 tail -f 类似，会实时输出。）
$ docker logs -f [container]

# 获取 container 指定端口映射关系
$ docker port [container] [port]

# 查看 container 进程列表
$ docker top [container]

# 查看 container 详细信息
$ docker inspect [container]
```

## 查看日志

```shell
docker logs -tf -tail 10 容器id
```

- `-t`: 显示时间戳
- `-f`: 跟随日志输出
- `--tail string`: 输出日志的条数（默认输出所有）

## 容器内执行命令

以交互式模式运行容器

```shell
$ docker container run --rm -it alpine
/ # ls
bin    dev    etc    home   lib    media  mnt    opt    proc   root   run    sbin   srv    sys    tmp    usr    var
/ # exit
```

`-it` 选项提供了与容器内的程序进行交互的场景。此选项实际上是将两个单独的选项混在一起。

- `-i` 或 `--interactive` 连接到容器的输入流，以便可以将输入发送到 bash。
- `-t` 或 `--tty` 选项可通过分配伪 `tty` 来格式化展示并提供类似本机终端的体验。

容器启动时执行命令，在 `container run` 命令中，镜像名称后传递的任何内容都将传递到镜像的默认入口里。

```shell
$ docker container run --rm node:lts-alpine node -v
Unable to find image 'node:lts-alpine' locally
lts-alpine: Pulling from library/node
6a428f9f83b0: Already exists
c7ad74aede75: Already exists
995c08d8ac36: Already exists
eac3374fce0f: Already exists
Digest: sha256:a251de4db0e0632446c0ba62adbe1e37ff148a53732e4574d2ed0f5462cc4407
Status: Downloaded newer image for node:lts-alpine
v14.18.1
```

在运行的容器中执行命令

```shell
# 查看正在运行的容器
$ docker ps
CONTAINER ID   IMAGE     COMMAND     CREATED          STATUS          PORTS     NAMES
3addf1fdd82f   alpine    "/bin/sh"   11 minutes ago   Up 10 minutes             bold_heyrovsky

# 在容器内执行 ls 命令
$ docker exec -it 3addf1fdd82f ls
bin    etc    lib    mnt    proc   run    srv    tmp    var
dev    home   media  opt    root   sbin   sys    usr
```

```shell
$ docker exec -it <CONTAINER NAME> /bin/bash
$ docker exec -it <CONTAINER NAME> /bin/sh

# 查看正在运行的容器
$ docker ps
CONTAINER ID   IMAGE     COMMAND     CREATED          STATUS          PORTS     NAMES
3addf1fdd82f   alpine    "/bin/sh"   11 minutes ago   Up 10 minutes             bold_heyrovsky

# 在容器内执行 ls 命令
$ docker exec -it 3addf1fdd82f /bin/sh
/ # ls
bin    dev    etc    home   lib    media  mnt    opt    proc   root   run    sbin   srv    sys    tmp    usr    var
/ # exit
```

## 移除容器

已被停止或终止的容器仍保留在系统中。这些挂起的容器可能会占用空间或与较新的容器发生冲突。可以使用 `container rm` 命令删除停止的容器。

```shell
$ docker rm <container identifier>
$ docker container rm <container identifier>
```

不能移除正在运行的容器，可以通过 `-f` 强制移除

```shell
$ docker rm 293413ff8b67
Error response from daemon: You cannot remove a running container 293413ff8b67f65b4b1b034abc35785f5e3f1376ab1cb20f4cf11934aa526e44. Stop the container before attempting removal or use -f

# 强制移除指定的容器
$ docker rm -f 293413ff8b67
293413ff8b67

# 移除所有的容器
$ docker rm -f $(docker ps -aq)
$ docker ps -a -q|xargs docker rm

$ docker rm $(docker ps --filter ancestor=ubuntu)


```

移除挂起的容器

已被停止或终止的容器仍保留在系统中。这些挂起的容器可能会占用空间或与较新的容器发生冲突。

可以使用 `container rm` 命令删除停止的容器。通用语法如下：

```shell
docker container rm <container identifier>
```

也可以使用 `container prune` 命令来一次性删除所有挂起的容器。

```shell
$ docker container prune  --force

# 移除所有已退出的容器
$ docker rm $(docker container ls -f "status=exited" -q)
```

停止后立即被移除

希望容器在停止后立即被移除。

```shell
docker container run --rm --detach --publish 8888:80 --name hello-dock-volatile fhsinchy/hello-dock
```

## 启动

重新启动容器包括以下两种情况

- 重新启动先前已停止或终止的容器。
- 重新启动正在运行的容器。

启动一个已经停止的 container

```shell
docker start <container identifier>

docker container start <container identifier>
```

重启容器 (若 container 处于关闭状态，则直接启动)

```shell
docker restart 容器id
```

这两个命令之间的主要区别在于，`container restart` 命令尝试停止目标容器，然后再次启动它，而 `start` 命令只是启动一个已经停止的容器。

在容器停止的情况下，两个命令完全相同。但是如果容器正在运行，则必须使用`container restart` 命令。

## 停止

```shell
# 停止当前正在运行的容器
$ docker stop [container]
```

其中 `container identifier` 可以是容器的 ID 或名称。

```shell
$ docker stop docker-container-name
docker-container-name
```

如果使用 `name` 作为标识符，则 `name` 将作为输出返回。`stop` 命令通过发送信号 `SIGTERM` 来正常关闭容器。如果容器在一定时间内没有停止运行，则会发出 `SIGKILL` 信号，该信号会立即关闭容器。

```shell
# 停用所有的运行中的容器
$ docker stop $(docker ps -q)

# 强制停止容器
$ docker kill [container]
```

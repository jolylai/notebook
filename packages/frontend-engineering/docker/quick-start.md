---
title: 快速开始
order: 1
group:
  title: Docker容器化
---

## 架构图

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/docker-architecture.svg)

## Overview

**Docker image**: It is an executable file which contains cutdown operating system and all the libraries and configuration needed to run the application. It has multiple layers stacked on top of each other and represented as single object. A docker image is created using docker file, we will get to that in a bit.

**Docker Container**: It is a running instance of docker image. there can be many containers running from same docker image.

## 官方安装

```bash
# 1. 删除旧版本
$ sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
# 需要的安装包
$ sudo yum install -y yum-utils

# 设置镜像库
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo  #

# 更新 yum 软件包索引
$ yum makecache fast

# 安装最新版本的 docker
# ce 社区版  ee 企业版
$ sudo yum install docker-ce docker-ce-cli containerd.io

# 启动 docker
$ sudo systemctl start docker
```

images, containers, volumes, and networks 些内容都会在 `/var/lib/docker/`目录下

## 快速安装

Ubuntu

```bash
# sudo 普通用户希望用root权限执行
# wget 下载命令
# -qO(字母) 限制输出跟普通输出
# | sh 用SH的方式执行
sudo wget -qO- https://get.docker.com | sh

# 这个命令的意思是把当前用户加入docker用户组。
sudo usermod -aG docker 用户名

# 安装 docker-compose
curl https://github.com/docker/compose
```

CentOS

```bash
# CentOS7 系统 CentOS-Extras 库中已带 Docker，可以直接安装
$ sudo yum install docker

# 启动 Docker 服务
$ sudo service docker start

# 随系统启动自动加载 docker
$ sudo chkconfig docker on
```

## 阿里云镜像加速

登录阿里云，找到`产品服务 -> 弹性计算 -> 容器镜像服务`

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/WX20200528-172406@2x.png)

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/WX20200528-173239@2x.png)

```shell
sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://s5uo2ev6.mirror.aliyuncs.com"]
}
EOF

sudo systemctl daemon-reload

sudo systemctl restart docker
```

## Hello-World

通过启动 `hello-world` 镜像测试 docker 是否已经正确安装

```shell
$ sudo docker run hello-world
Unable to find image 'hello-world:latest' locally  # 本地找不到镜像
latest: Pulling from library/hello-world  # 下载镜像到本地
0e03bdcc26d7: Pull complete
Digest: sha256:6a65f928fb91fcfbc963f7aa6d57c8eeb426ad9a20c7ee045538ef34847f44f1
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/docker-run.svg)

## 卸载

卸载 `Docker Engine`, `CLI`, 和 `Containerd` 包

```shell
$ sudo yum remove docker-ce docker-ce-cli containerd.io
```

删除所有的`images`, `containers`, 和 `volumes`

```shell
$ sudo rm -rf /var/lib/docker
```

## 帮助命令

```bash
# 查看docker 版本信息
docker version

docker info
```

#### Reference

- [Docker 入门教程 - 2021 最新版（下）](https://mp.weixin.qq.com/s/6Q0y3UBn1XeO9LBDAYE0mA)
- [Todo App](https://mp.weixin.qq.com/s/ns3GJPyz6ttdYzKULQqtlA)

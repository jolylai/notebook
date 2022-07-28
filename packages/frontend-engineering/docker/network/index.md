---
title: 网络
group:
  title: Docker 容器化
---

## 前言

要列出系统中的网络，请执行以下命令：

```shell
docker network ls

# NETWORK ID     NAME      DRIVER    SCOPE
# c2e59f2b96bd   bridge    bridge    local
# 124dccee067f   host      host      local
# 506e3822bf1f   none      null      local
```

默认情况下，Docker 具有五类网络驱动。它们如下：

- `bridge` - Docker 中的默认网络驱动程序。当多个容器以标准模式运行并且需要相互通信时，可以使用此方法。
- `host` - 完全消除网络隔离。在 host 网络下运行的任何容器基本上都连接到主机系统的网络。
- `none` - 此驱动程序完全禁用容器的联网。我还没有找到其应用场景。
- `overlay` - 这用于跨计算机连接多个 Docker 守护程序。
- `macvlan` - 允许将 MAC 地址分配给容器，使它们的功能类似于网络中的物理设备。

用户定义的桥接网络比默认桥接网络多一些额外的功能。

`用户定义的网桥可在容器之间提供自动 DNS 解析`

这意味着连接到同一网络的容器可以使用容器名称相互通信。因此，如果你有两个名为 notes-api 和 notes-db 的容器，则 API 容器将能够使用 notes-db 名称连接到数据库容器。

`用户定义的网桥提供更好的隔离性`

默认情况下，所有容器都连接到默认桥接网络，这可能会导致它们之间的冲突。将容器连接到用户定义的桥可以确保更好的隔离。

`容器可以即时与用户定义的网络连接和分离`

在容器的生命周期内，可以即时将其与用户定义的网络连接或断开连接。要从默认网桥网络中删除容器，需要停止容器并使用其他网络选项重新创建它。

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/docker-network.png)

```shell
$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:16:3e:14:54:f7 brd ff:ff:ff:ff:ff:ff
    inet 172.18.100.102/20 brd 172.18.111.255 scope global dynamic eth0
       valid_lft 298946510sec preferred_lft 298946510sec
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:ba:cc:06:b0 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 scope global docker0
       valid_lft forever preferred_lft forever
```

启动 nginx 容器

```shell
$ docker run -d -P --name nginx  nginx:1.15.2-alpine
$ docker run -d -P --name --net bridge nginx  nginx:1.15.2-alpine
```

查看容器内部网络地址

```shell
$ docker exec -it nginx ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
57: eth0@if58: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue state UP
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

docker 分配了一个`eth0@if58` 网络，ip 为`172.17.0.3`，使用 ping 试下网络能不能使用

```shell
$ ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3) 56(84) bytes of data.
64 bytes from 172.17.0.3: icmp_seq=1 ttl=64 time=0.080 ms
64 bytes from 172.17.0.3: icmp_seq=2 ttl=64 time=0.067 ms
```

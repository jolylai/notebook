---
title: Nginx
---

## 前言

### 安装

```bash
$ sudo apt-get update
$ sudo apt-get install nginx
```

文件结构

- 所有的配置文件都在`/etc/nginx` 下，并且每个虚拟主机已经安排在了`/etc/nginx/sites-available` 下
- 程序文件在`/usr/sbin/nginx`
- 日志放在了`/var/log/nginx` 中
- 并已经在`/etc/init.d/`下创建了启动脚本 nginx
- 默认的虚拟主机的目录设置在了`/var/www/nginx-default` (有的版本 默认的虚拟主机的目录设置在了/var/www, 请参考/etc/nginx/sites-available 里的配置)

## 常用命令

Nginx 的命令在控制台中输入 nginx -h 就可以看到完整的命令，这里列举几个常用的命令：

```shell
nginx -s reload  # 向主进程发送信号，重新加载配置文件，热重启
nginx -s reopen	 # 重启 Nginx
nginx -s stop    # 快速关闭
nginx -s quit    # 等待工作进程处理完成后关闭
nginx -T         # 查看当前 Nginx 最终的配置
nginx -t -c <配置路径>    # 检查配置是否有问题，如果已经在配置目录，则不需要-c
```

systemctl 是 Linux 系统应用管理工具 systemd 的主命令，用于管理系统，我们也可以用它来对 Nginx 进行管理，相关命令如下：

```shell
systemctl start nginx    # 启动 Nginx
systemctl stop nginx     # 停止 Nginx
systemctl restart nginx  # 重启 Nginx
systemctl reload nginx   # 重新加载 Nginx，用于修改配置后
systemctl enable nginx   # 设置开机启动 Nginx
systemctl disable nginx  # 关闭开机启动 Nginx
systemctl status nginx   # 查看 Nginx 运行状态
```

查看 nginx 安装的位置

```shell
$ ps aux|grep nginx
100      22583  0.0  0.1   8656  1908 ?        S    9月21   0:00 nginx: worker process
root     23489  0.0  0.1 120896  2240 ?        Ss    2020   0:00 nginx: master process /usr/sbin/nginx
nginx    23490  0.0  0.1 121388  3544 ?        S     2020   0:12 nginx: worker process
root     25851  0.0  0.0  13804   868 ?        Ss    2020   0:00 nginx: master process nginx -g daemon off;
100      25877  0.0  0.2  17252  4300 ?        S     2020   0:00 nginx: worker process
root     28864  0.0  0.0   8020  1468 ?        Ss   9月18   0:00 nginx: master process nginx -c /etc/nginx/nginx.conf
root     31573  0.0  0.0 112728   972 pts/0    R+   10:49   0:00 grep --color=auto nginx
```

使用 docker 快速启动 nginx 服务

```shell
$ docker run -d  -p 80:80 --rm  --name nginx nginx /bin/bash
9354cd0573e0aa1b678308ff71129b9adbc536a0fcdae4a6097e05a272ff47b4
```

nginx 默认配置文件

```shell
$ docker exec -it nginx cat /etc/nginx/nginx.conf

user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

## 指令和上下文

NGINX 中有四个核心上下文：

- events { } – events 上下文用于设置关于 NGINX 如何在一般级别处理请求的全局配置。一个有效的配置文件中只能有一个 events 上下文。
- http { } – 顾名思义，http 上下文用于定义有关服务器将如何处理 HTTP 和 HTTPS 请求的配置。一个有效的配置文件中只能有一个 http 上下文。
- server { } – server 上下文嵌套在 http 上下文中，用于在单个主机内配置特定的虚拟服务器。在嵌套在 http 上下文中的有效配置文件中可以有多个 server 上下文。每个“服务器”上下文都被认为是一个虚拟主机。
- main – main 上下文是配置文件本身。在前面提到的三个上下文之外编写的任何内容都在 main 上下文中。

nginx.conf 结构图可以这样概括：

```
main # 全局配置，对全局生效
├── events # 配置影响 Nginx 服务器或与用户的网络连接
├── http # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
│ ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
│ ├── server # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
│ ├── server
│ │ ├── location # server 块可以包含多个 location 块，location 指令用于匹配 uri
│ │ ├── location
│ │ └── ...
│ └── ...
└── ...
```

## 配置 nginx

`cd` 到 `/etc/nginx` 这里存放 nginx 配置文件

- 默认的目录为 `/var/www/html/`
- 默认配置 `/etc/nginx`

关注 `sites-available` 和 `sites-enabled` 这两个文件夹

- `sites-available` contains individual configuration files for all of your possible static websites.
- `sites-enabled` contains links to the configuration files that NGINX will actually read and run.

在`sites-available` 文件夹中 创建 `jgefroh.com` 文件

```nginx
server {
  listen 8000 default_server;
  listen [::]:8000 default_server;
  root /var/www/jgefroh.com;
  index index.html;
  server_name _;
  location / {
    try_files $uri $uri/ =404;
  }
}
```

将文件添加到`sites-enabled`以此告诉 nginx 来启用我们的配置

```bash
ln -s <SOURCE_FILE> <DESTINATION_FILE>

ln -s /etc/nginx/sites-available/jgefroh.com /etc/nginx/sites-enabled/jgefroh.com
```

重启 nginx 并查看效果

```bash
$ sudo systemctl restart nginx
```

server 块可以包含多个 location 块，location 指令用于匹配 uri，语法：

```nginx
location [ = | ~ | ~* | ^~] uri {
	...
}
```

指令后面：

- `=`: 精确匹配路径，用于不含正则表达式的 uri 前，如果匹配成功，不再进行后续的查找；
- `^~`: 用于不含正则表达式的 uri； 前，表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找；
- `~`: 表示用该符号后面的正则去匹配路径，区分大小写；
- `~*`: 表示用该符号后面的正则去匹配路径，不区分大小写。跟 ~ 优先级都比较低，如有多个 location 的正则能匹配的话，则使用正则表达式最长的那个；

### 重定向

将 `http://localhost/notebook-js/assets/css/0.styles.422b1f7a.css` 重定向到 `http://localhost/assets/css/0.styles.422b1f7a.css`

```nginx
server{
 rewrite ^/notebook-js\/(.*) /$1 permanent;
}
```

## 提供静态内容

上传静态文件到服务器

```shell
$ scp -r * root@198.199.103.100:/var/www/jgefroh.com
```

```nginx
server {
  listen       80;
  server_name  localhost;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
  }
}
```

```nginx
server {
  listen       80;
  server_name  static.sherlocked93.club;
  charset utf-8;    # 防止中文文件名乱码

  location /download {
    alias	          /usr/share/nginx/html/static;  # 静态资源目录

    autoindex               on;    # 开启静态资源列目录
    autoindex_exact_size    off;   # on(默认)显示文件的确切大小，单位是byte；off显示文件大概大小，单位KB、MB、GB
    autoindex_localtime     off;   # off(默认)时显示的文件时间为GMT时间；on显示的文件时间为服务器时间
  }
}
```

## 动态路由

<!-- ### 位置匹配 -->

### 前缀匹配

```nginx
server {
  location /static {
    alias	/usr/share/nginx/html/static;  # 静态资源目录
  }
}
```

### 完全匹配

```nginx
server {
  location = /download {
    alias	/usr/share/nginx/html/static;  # 静态资源目录
  }
}
```

### regex 匹配

```nginx
server {
  location ~ /download {
    alias	/usr/share/nginx/html/static;  # 静态资源目录
  }
}
```

默认情况下，正则表达式匹配 **区分大小写**，这意味着如果将任何字母大写，则该 location 将不起作用
要将其转换为不区分大小写，必须在 ~ 符号后添加一个 \*。

```nginx
server {
  location ~* /download {
    alias	/usr/share/nginx/html/static;  # 静态资源目录
  }
}
```

### 优先前缀匹配

要将前缀匹配转换为优先匹配，需要在位置 URI 之前包含 `^~` 修饰符

```nginx
server {
  location ^~ /download {
    alias	/usr/share/nginx/html/static;  # 静态资源目录
  }
}
```

| 匹配         | 优先级      |
| ------------ | ----------- |
| 完全匹配     | `=`         |
| 优先前缀匹配 | `^~`        |
| 正则匹配     | `~` 或 `~*` |
| 前缀匹配     | None        |

## 尝试多个文件

```nginx
server {
  listen 80;
  server_name localhost;

  location / {
    root   /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
    index  index.html index.htm;
  }
}
```

```nginx
location /next {
  alias   /usr/share/nginx/html;
  try_files $uri $uri/ @router;
  index  index.html index.htm;
}

location @router {
  rewrite ^.*$ /index.html last;
}
```

## 负载均衡

```nginx
# 设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
  #设定负载均衡的服务器列表
  upstream server {
      #weigth参数表示权值，权值越高被分配到的几率越大
      server 192.168.8.1:80  weight=5;
      server 192.168.8.2:80  weight=1;
      server 192.168.8.3:80  weight=6;
  }

  server {
    location / {
    	proxy_pass http://server;
      proxy_connect_timeout 10;
    }
  }
}
```

### 多项目

```nginx
server {
    location / {
        root   /usr/share/nginx/html/;
     try_files $uri $uri/ @router;
        index  index.html index.htm;
    }
  location /next {
        alias   /usr/share/nginx/html/rm-front-pro/;
        try_files $uri $uri/ @next;
        index  index.html index.htm;
    }
    location @router {
        rewrite ^.*$ /index.html last;
    }

    location @next {
        rewrite ^.*$ /rm-front-pro/index.html last;
    }
}
```

## 日志

/var/log/nginx

### 基础设置说明

```nginx
# 运行用户
user www-data;
# 启动进程,通常设置成和cpu的数量相等
worker_processes  1;

#全局错误日志及PID文件
error_log  /var/log/nginx/error.log;
pid        /var/run/nginx.pid;

#工作模式及连接数上限
events {
    # epoll是多路复用IO(I/O Multiplexing)中的一种方式
    # 但是仅用于linux2.6以上内核,可以大大提高nginx的性能
    use   epoll;
    #单个后台worker process进程的最大并发链接数
    worker_connections  1024;
    # multi_accept on;
}

#设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
     #设定mime类型,类型由mime.type文件定义
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    #设定日志格式
    access_log    /var/log/nginx/access.log;

    # sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件
    # 对于普通应用，必须设为 on,如果用来进行下载等应用磁盘IO重负载应用
    # 可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile        on;
    #tcp_nopush     on;

    #连接超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;
    tcp_nodelay        on;

    #开启gzip压缩
    gzip  on;
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";

    #设定请求缓冲
    client_header_buffer_size    1k;
    large_client_header_buffers  4 4k;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;

    #设定负载均衡的服务器列表
    upstream mysvr {
      #weigth参数表示权值，权值越高被分配到的几率越大
      #本机上的Squid开启3128端口
      server 192.168.8.1:3128 weight=5;
      server 192.168.8.2:80  weight=1;
      server 192.168.8.3:80  weight=6;
    }


    server {
      #侦听80端口
      listen       80;
      #定义使用www.xx.com访问
      server_name  www.xx.com;

      #设定本虚拟主机的访问日志
      access_log  logs/www.xx.com.access.log  main;

      #默认请求
      location / {
        root   /root;      #定义服务器的默认网站根目录位置
        index index.php index.html index.htm;   #定义首页索引文件的名称

        fastcgi_pass  www.xx.com;
        fastcgi_param  SCRIPT_FILENAME  $document_root/$fastcgi_script_name;
        include /etc/nginx/fastcgi_params;
      }

      # 定义错误提示页面
      error_page   500 502 503 504 /50x.html;
          location = /50x.html {
          root   /root;
      }

      #静态文件，nginx自己处理
      location ~ ^/(images|javascript|js|css|flash|media|static)/ {
          root /var/www/virtual/htdocs;
          #过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
          expires 30d;
      }
      #PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
      location ~ \.php$ {
          root /root;
          fastcgi_pass 127.0.0.1:9000;
          fastcgi_index index.php;
          fastcgi_param SCRIPT_FILENAME /home/www/www$fastcgi_script_name;
          include fastcgi_params;
      }
      #设定查看Nginx状态的地址
      location /NginxStatus {
          stub_status            on;
          access_log              on;
          auth_basic              "NginxStatus";
          auth_basic_user_file  conf/htpasswd;
      }
      #禁止访问 .htxxx 文件
      location ~ /\.ht {
          deny all;
      }
    }
}
```

#### Reference

- [Nginx](https://juejin.cn/post/6844904144235413512#heading-31)

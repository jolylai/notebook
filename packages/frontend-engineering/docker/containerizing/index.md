---
title: 容器化部署
---

## Koa 服务

### Node.js 应用

创建 `koa-service` 项目文件夹

```bash
mkdir koa-service
cd koa-service

yarn init -y

yarn add koa
```

创建 `index.js` 文件并写入以下代码来创建一个简单的 Node 服务

```js
const Koa = require('koa');

const app = new Koa();

app.use(ctx => {
  ctx.body = 'koa service';
});

app.listen(3000, () => {
  console.log('koa server listen at: http://localhost:3000');
});
```

### DockerFile

在根目录下创建 `Dockerfile` 文件，并写入以下代码

```Dockerfile
# Dockerfile
FROM node:lts-alpine

EXPOSE 3000

WORKDIR /app

COPY ./package.json .

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn

COPY . .

CMD [ "node", "index.js" ]
```

- **FROM node:lts-alpine** - 从 docker hub 获取最新的 [node 镜像](https://hub.docker.com/_/node/)
- **WORKDIR /app** - 设置在镜像中的工作目录, 这将被用在之后的命令，如： `COPY` , `RUN` 和 `CMD`
- **COPY package.json /app** - 复制`package.json` 文件到镜像中的 `/app` 文件夹中.
- **RUN yarn install** — 在镜像内执行 `yarn install`命令，安装应用所需的依赖.
- **COPY . /app** — 复制应用中所有的文件到镜像中`/app` 文件夹中.
- **EXPOSE 3000** — 为由这个镜像创建的容器暴露 `3000` 端口，因为我们的应用监听 `3000` 端口，容器默认忽略对所有端口的监听。

### 创建 Docker 镜像

开启命令行界面，定位到 `koa-service` 文件夹，执行以下命令

```shell
# Build a image docker build -t <image-name> <relative-path-to-your-dockerfile>

docker build -t koa-service .
```

This command creates a hello-world image on our host.

- **-t** is used to give a name to our image which is `koa-service` here.
- **.** is the relative path to docker file, since we are in folder `koa-service` we used dot to represent path to docker file.

You will see an output on your command line something like this:

```
Sending build context to Docker daemon  4.096kB
Step 1/7 : FROM node:8
    ---> 4f01e5319662
Step 2/7 : WORKDIR /app
    ---> Using cache
    ---> 5c173b2c7b76
Step 3/7 : COPY package.json /app
    ---> Using cache
    ---> ceb27a57f18e
Step 4/7 : RUN npm install
    ---> Using cache
    ---> c1baaf16812a
Step 5/7 : COPY . /app
    ---> 4a770927e8e8
Step 6/7 : EXPOSE 8081
    ---> Running in 2b3f11daff5e
Removing intermediate container 2b3f11daff5e
    ---> 81a7ce14340a
Step 7/7 : CMD node index.js
    ---> Running in 3791dd7f5149
Removing intermediate container 3791dd7f5149
    ---> c80301fa07b2
Successfully built c80301fa07b2
Successfully tagged hello-world:latest
```

As you can see it ran the steps in our docker file and output a docker image. When you try it first time it will take a few minutes, but from next time it will start to use the cache and build much faster and output will be like the one shown above. Now, try following command in your terminal to see if your image is there or not :

```bash
# Get a list of images on your host
docker images
```

it should have a list of images in your host. something like this

```
REPOSITORY    TAG      IMAGE ID      CREATED         SIZE
hello-world   latest   c80301fa07b2  22 minutes ago  896MB
```

### 创建 Docker 容器

With our images created we can spin up a container from this image.

```bash
# Default command for this is docker container run <image-name>
docker container run -p 3000：3000  koa-service
```

This command is used to create and run a docker container.

- **-p 3000：3000** — this is publish flag, it maps host port 4000 to container port 8081 which we opened through expose command in dockerfile. Now all the requests to host port 4000 will be listened by container port 8081.

- **koa-service** — this is the name we gave our image earlier when we ran docker-build command.

You will receive some output like this :

```
app listening on port 8081!
```

If you want to enter your container and mount a bash terminal to it you can run

```bash
# Enter the container
docker exec -it <container id> /bin/bash
```

In order to check if container is running or not, open another terminal and type

```bash
docker ps
```

You should see your running container like this

```
    CONTAINER ID    IMAGE        COMMAND                  CREATED
`<container id>`  hello-world  "/bin/sh -c 'node in…"   11 seconds ago

STATUS              PORTS                    NAMES
Up 11 seconds       0.0.0.0:4000->8081/tcp   some-random-name
```

It means our container with id `<container id>` created from hello-world image, is up and running and listening to port 8081.
Now our small Node.js app is completely containerised. You can run http://localhost:3000/ on your browser

## 静态网站

使用`create-react-app` 脚手架快速创建一个 react 项目

```shell
npx create-react-app react-app
```

### 配置 nginx

创建 nginx 配置文件 `nginx.conf`

```nginx
# auto detects a good number of processes to run
worker_processes auto;

#Provides the configuration file context in which the directives that affect connection processing are specified.
events {
    # Sets the maximum number of simultaneous connections that can be opened by a worker process.
    worker_connections 8000;
    # Tells the worker to accept multiple connections at a time
    multi_accept on;
}


http {
    # what times to include
    include       /etc/nginx/mime.types;
    # what is the default one
    default_type  application/octet-stream;

    # Sets the path, format, and configuration for a buffered log write
    log_format compression '$remote_addr - $remote_user [$time_local] '
        '"$request" $status $upstream_addr '
        '"$http_referer" "$http_user_agent"';

    server {
        # listen on port 80
        listen 80;
        # save logs here
        access_log /var/log/nginx/access.log compression;

        # where the root here
        root /var/www;
        # what file to server as index
        index index.html index.htm;

        location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to redirecting to index.html
            try_files $uri $uri/ /index.html;
        }

        # Media: images, icons, video, audio, HTC
        location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
          expires 1M;
          access_log off;
          add_header Cache-Control "public";
        }

        # Javascript and CSS files
        location ~* \.(?:css|js)$ {
            try_files $uri =404;
            expires 1y;
            access_log off;
            add_header Cache-Control "public";
        }

        # Any route containing a file extension (e.g. /devicesfile.js)
        location ~ ^.+\..+$ {
            try_files $uri =404;
        }
    }
}
```

### 创建 Dockerfile

```docker
FROM nginx:1.15.2-alpine
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
```

- 把打包出来的文件复制到容器内的 `/var/www`
- 把 nginx 的配置文件`nginx.conf`复制到容器内的 `/etc/nginx/nginx.conf`

### 创建镜像

```shell
$ docker build --rm -f Dockerfile -t docker-react:latest .
[+] Building 0.4s (8/8) FINISHED
 => [internal] load build definition from Dockerfile                   0.0s
 => => transferring dockerfile: 190B                                   0.0s
 => [internal] load .dockerignore                                      0.0s
 => => transferring context: 2B                                        0.0s
 => [internal] load metadata for docker.io/library/nginx:1.15.2-alpin  0.0s
 => [1/3] FROM docker.io/library/nginx:1.15.2-alpine                   0.0s
 => [internal] load build context                                      0.0s
 => => transferring context: 2.33kB                                    0.0s
 => [2/3] COPY ./index.html /var/www                                   0.1s
 => [3/3] COPY /docker/nginx/nginx.conf /etc/nginx/nginx.conf          0.1s
 => exporting to image                                                 0.0s
 => => exporting layers                                                0.0s
 => => writing image sha256:fab2f97f0c3f4adcf994cd7be5f9f8b566a584582  0.0s
 => => naming to docker.io/library/web
```

### 创建容器

```bash
docker run --rm -d -p 80:80 docker-react:latest
```

---
title: GitLab
---

## Job

**Job** 可以理解为 CI 流程中的单个任务是一个顶级元素（相当于 yml 配置的一个根元素），它可以起任意的名称、并且不限数量，但必须至少包含 script 子句，用于指定当前任务要执行的脚本

```yaml
job1:
  script: execute-script-for-job1
job2:
  stage: build
  script:
    - scripts/build.sh
  only:
    - master
# job n...
```

#### script

用于指定运行器要执行的脚本命令，可以指定多条

```yaml
job:
  script:
    - echo  start job!
    - scripts/deploy.sh
```

#### before_script & after_script

用于定义应在 job 在执行脚本之前/后时要执行的内容

```yaml
job:
  before_script:
    - echo  Execute this command before the `script` section completes.
  script:
    - echo  An example script section.
  after_script:
    - echo  Execute this command after the `script` section completes.
```

#### allow_failure

用于配置当前 job 失败时 pipeline 是否应继续运行：

```yaml
job2:
  stage: test
  script:
    - execute_script_2
  allow_failure: true # or false (default)
```

#### cache

指定[缓存](https://docs.gitlab.com/ee/ci/caching/#availability-of-the-cache)的文件列表，用户在不同的 job 之间共享

```yaml
rspec:
  script:
    - echo  This job uses a cache.
  cache:
    key: binaries-cache
    paths:
      - binaries/*.apk
      - .config
```

cache:key：可以给每个缓存一个唯一的标识键，如果未设置，则默认键为 default；
cache:paths：指定要缓存的文件或目录

#### only / except

only 用于定义何时执行 job，反之 except 用于定义何时**不**执行 job；
它们有四个关键字可以一起配合使用：

- ref：匹配 分支名称 或 分支名匹配的的正则；
- variables：变量表达式；
- changes：对应路径的文件是否修改；

```yaml
job1:
  script: echo
  only: # or except
    - main # ref可省略
    ref:
      - tags
      - /^feat-.*$/
      - merge_requests
    variables:
      - $RELEASE ==  staging
      - $STAGING
    changes:
      - Dockerfile
      - docker/scripts/*
      - dockerfiles/**/*
      - more_scripts/*.{rb,py,sh}
      -  **/*.json
```

#### retry

设置在 job 执行失败时候重试次数：

```yaml
job:
  script: rspec
  retry:
    max: 2
    when: # 搭配when关键字，在下列情况下重试
      - runner_system_failure
      - stuck_or_timeout_failure
```

#### variables

可用于定义执行过程中的一些变量

```yaml
variables:
  DEPLOY_SITE: https://example.com/

deploy_job:
  stage: deploy
  script:
    - deploy-script --url $DEPLOY_SITE --path  /

deploy_review_job:
  stage: deploy
  variables:
    REVIEW_PATH: /review
  script:
    - deploy-review-script --url $DEPLOY_SITE --path $REVIEW_PATH
```

#### when

用于配置 job 运行的条件：

- on_success（默认）：仅在之前 stage 的所有 job 都成功或配置了 allow_failure: true；
- manual：仅在手动触发时运行 job；
- always：无论之前 stage 的 job 状态如何，都运行；
- on_failure：仅当至少一个之前 stage 的 job 失败时才运行；
- delayed：延迟执行 job；
- never: 永不执行 job；

```yaml
cleanup_build_job:
  stage: cleanup_build
  script:
    - cleanup build when failed
  when: on_failure
```

#### tags

选择特定 tag 的 GitLab-runner 来执行

```yaml
job:
  tags:
    - ruby
    - postgres
```

## Stages

Stages 用来定义一次 CI 有哪几个阶段

```yaml
stages:
  - dump
  - build
  - install
  - deploy
  - trigger
```

同时每个 stage 可以与若干个 job 关联，即一个阶段可以并行执行多个 job。在每个 job 中使用 stage 关键字关联到对应 stage

```yaml
stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    - scripts/build.sh

test_job:
  stage: test
  script:
    - scripts/test.sh

deploy_job:
  stage: deploy
  script:
    - scripts/deploy.sh
```

## Cache

```yml
variables:
  WEB_IMAGE: rm/rm-front
  ALI_WEB_IMAGE: xtepapp/rm-front
  DOCKER_BUILDER_IMAGE: rm_front_builder_image
  DOCKER_BUILDER_RUNNER: rm_front_builder_image_runner_$CI_COMMIT_REF_NAME-$CI_JOB_ID
  DOCKER_DIST_IMAGE: $REGISTRY/$WEB_IMAGE:dev
before_script:
  - echo "begin to run script"
  - docker login -u $HARBOR_USER -p $HARBOR_PASSWD $REGISTRY
  - docker login -u $ALI_USER -p $ALI_PASSWD $ALI_REGISTRY

stages:
  - dump
  - build
  - install
  - deploy
  - trigger

web:echo:
  stage: dump
  script:
    - echo $CI_BUILD_TAG
  only:
    - aliyun-dev
    - /^release(\/|-)?.*$/

web:dist:build:aliyun:dev:
  stage: build
  variables:
    SERVER_URL: https://47.110.222.89:18442
    EVN_CONFIG: build:dev
  before_script:
    - docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER
  script:
    - export TAG=aliyun-dev
    - docker build -t $DOCKER_BUILDER_IMAGE --build-arg SERVER_URL=$SERVER_URL --build-arg EVN_CONFIG=build:dev  -f ./Dockerfile.build .
    - docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER
    - docker run --name $DOCKER_BUILDER_RUNNER $DOCKER_BUILDER_IMAGE /bin/bash
    - docker cp $DOCKER_BUILDER_RUNNER:/src/app/backup-dev ./docker/dist
    - docker cp $DOCKER_BUILDER_RUNNER:/src/app/dist ./docker/dist/rm-front-pro
    - export ALI_DOCKER_IMAGE=$ALI_REGISTRY/$ALI_WEB_IMAGE:$CI_BUILD_REF_NAME
    - docker build --pull -t $ALI_DOCKER_IMAGE ./docker
    - docker push $ALI_DOCKER_IMAGE
  only:
    - aliyun-dev
  after_script:
    - docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER

web:cd:deploy:aliyun:dev:
  stage: deploy
  script:
    - docker pull $ALI_REGISTRY/xacr-basis/xtep-python3
    - docker run -v "$(pwd)/deploy":/deploy $ALI_REGISTRY/xacr-basis/xtep-python3 python3 /deploy/dockercdedas.py xrun-frontend
  only:
    - aliyun-dev

web:dist:build:aliyun:prod:
  stage: build
  variables:
    SERVER_URL: https://xrc.321go.com
    EVN_CONFIG: build:prod
  before_script:
    - docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER
  script:
    - export TAG=prod
    - docker build -t $DOCKER_BUILDER_IMAGE --build-arg SERVER_URL=$SERVER_URL --build-arg EVN_CONFIG=build -f ./Dockerfile.build .
    - docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER
    - docker run --name $DOCKER_BUILDER_RUNNER $DOCKER_BUILDER_IMAGE /bin/bash
    - docker cp $DOCKER_BUILDER_RUNNER:/src/app/backup-prod ./docker/dist
    - docker cp $DOCKER_BUILDER_RUNNER:/src/app/dist ./docker/dist/rm-front-pro
    - docker build -t $REGISTRY/$WEB_IMAGE:$TAG --build-arg CONT_IMG_VER=prod --pull ./docker
  only:
    - /^release(\/|-)?.*$/
  after_script:
    - docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER

web:dist:install:aliyun:prod:
  stage: install
  before_script:
    - echo 'push aliyun images'
  script:
    - export TAG=prod
    - export ALI_DOCKER_IMAGE=$ALI_REGISTRY/$ALI_WEB_IMAGE:$CI_BUILD_REF_NAME
    - docker tag $REGISTRY/$WEB_IMAGE:$TAG $ALI_DOCKER_IMAGE
    - docker push $ALI_DOCKER_IMAGE
  only:
    - /^release(\/|-)?.*$/
web:cd:deploy:aliyun:prod:
  stage: deploy
  script:
    - docker pull $ALI_REGISTRY/xacr-basis/xtep-python3
    - docker run -v "$(pwd)/deploy":/deploy $ALI_REGISTRY/xacr-basis/xtep-python3 python3 /deploy/dockercdedas.py xrun-frontend
  only:
    - feature-to-aliyun
```

---
title: GitLab
---

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

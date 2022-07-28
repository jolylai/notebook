FROM node:lts-alpine

EXPOSE 3000

WORKDIR /home/node/app

COPY ./package.json .

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn

COPY . .

CMD [ "node", "index.js" ]

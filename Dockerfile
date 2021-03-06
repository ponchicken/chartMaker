FROM node:alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN apk update && apk add nodejs && npm i -g nodemon babel-cli
RUN npm install

COPY . /usr/src/app
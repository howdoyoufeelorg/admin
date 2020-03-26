FROM node:10.13-alpine

RUN mkdir -p /usr/src

RUN mkdir -p /app

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

EXPOSE 3000

ADD entrypoint.sh /usr/src/

ENTRYPOINT /usr/src/entrypoint.sh
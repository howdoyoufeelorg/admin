FROM node:12.16-alpine

RUN mkdir -p /usr/src
RUN mkdir -p /app

ENV NODE_ENV production
ENV PORT 8080

WORKDIR /app
COPY . /app/
RUN yarn

EXPOSE 8080

ADD entrypoint-prod.sh /usr/src/

ENTRYPOINT /usr/src/entrypoint-prod.sh

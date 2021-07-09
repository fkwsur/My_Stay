FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

ADD ./ /app

RUN npm install

CMD npm run start
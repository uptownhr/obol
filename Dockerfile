FROM node:6.0.0

RUN mkdir app

WORKDIR /app

ADD package.json /app/package.json
RUN npm install

ADD ./ /app

EXPOSE "3000"

CMD node index.js
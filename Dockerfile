FROM node:6.0.0

WORKDIR /app

EXPOSE "3000"

CMD node index.js

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

ADD ./ /app
RUN cp -R /tmp/node_modules /app

VOLUME ["/app/node_modules"]
FROM node:7.10.0

ENV NPM_CONFIG_LOGLEVEL warn

COPY . .
RUN npm install

CMD npm run gulp start
EXPOSE 3001
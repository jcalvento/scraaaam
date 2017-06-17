FROM node:6

COPY . .
CMD rm -rf node_modules && npm install

CMD npm run gulp start
EXPOSE 3001
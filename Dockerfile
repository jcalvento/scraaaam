FROM node:7.10.0

COPY . .
RUN npm install

CMD npm run gulp start
EXPOSE 3001
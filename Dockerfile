FROM node:6

COPY . .
RUN npm install

CMD npm run gulp start
EXPOSE 3001
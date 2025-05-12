FROM node:20

WORKDIR /usr/src/app

RUN npm install

EXPOSE 3001

CMD npm run dev
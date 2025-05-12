FROM node as build

WORKDIR /usr/src/app

COPY . .

RUN npm run build

FROM node as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist .

CMD node index.js
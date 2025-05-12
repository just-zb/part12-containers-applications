FROM node as test

COPY . .

RUN npm install

RUN npm run test

FROM node as build

ENV VITE_BACKEND_URL=http://localhost:3000

WORKDIR /usr/src/app

COPY --from=test . .

RUN npm run build

FROM node as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist .

CMD node index.js
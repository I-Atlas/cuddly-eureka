FROM node:16.15.0-alpine

USER node

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]
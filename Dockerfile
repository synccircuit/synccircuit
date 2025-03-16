FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

RUN npm install -g typescript

COPY apps/synccircuit/src/config/config.ts apps/synccircuit/src/config/config.ts

COPY . .

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["sh", "-c", "npx tsc && npm start"]

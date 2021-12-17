FROM node:16 As development

USER node

WORKDIR /usr/src/app

COPY package*.json ./

EXPOSE ${SERVER_PORT}

RUN yarn --only=development

COPY --chown=node:node . .

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

EXPOSE ${SERVER_PORT}

RUN yarn --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "index"]

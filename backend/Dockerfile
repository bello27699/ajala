
FROM node:18 
RUN mkdir /app \
    && chown 1001 /app \
    && chmod "g+rwX" /app \
    && chown 1001:root /app

WORKDIR /app
COPY . .

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

RUN npm ci

CMD ["npm", "run", "dev"]


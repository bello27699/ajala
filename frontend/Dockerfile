FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn install
CMD ["yarn", "start", "--silent"]
EXPOSE 3000

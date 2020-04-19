FROM node:12.4.0-stretch

WORKDIR /app
COPY package*.json ./

RUN yarn
COPY . /app

EXPOSE 8080

CMD ["yarn", "serve"]

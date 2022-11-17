FROM node:latest

COPY . .

RUN npm install

ENTRYPOINT [ "npm","start"] 
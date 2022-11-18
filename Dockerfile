FROM node:latest

COPY . .

RUN npm install

EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]
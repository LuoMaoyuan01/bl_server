FROM node:alpine

WORKDIR /bl_server

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
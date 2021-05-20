FROM node:14

WORKDIR /urs/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004

CMD ["node", "index.js"]
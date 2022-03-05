FROM node:14 

WORKDIR /frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@12.1.2

COPY . .

RUN npm run build

EXPOSE 4200
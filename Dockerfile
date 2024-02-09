FROM node:18.14.2
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build:docker
CMD npm run preview

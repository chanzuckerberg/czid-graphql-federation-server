FROM node:18.14.1

WORKDIR /usr/src/app

ADD package*.json ./
RUN npm ci --verbose --no-optional && npm cache clean --force
COPY . .
CMD ["npm", "start"]


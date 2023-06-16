FROM node:18.16.0

WORKDIR /usr/src/app

ADD package*.json ./

RUN npm ci --verbose --no-optional && npm cache clean --force

COPY . .

CMD ["./entrypoint.sh"]

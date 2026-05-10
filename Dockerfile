FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

VOLUME /app/data

ENV SQLITE_PATH=/app/data/database.sqlite

EXPOSE 3000

CMD ["node", "index.js"]

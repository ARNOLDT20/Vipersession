FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV=production
EXPOSE 10000

CMD ["npm", "start"]

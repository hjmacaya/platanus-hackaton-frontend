FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY postcss.config.mjs ./
COPY tailwind.config.js ./
COPY next.config.mjs ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
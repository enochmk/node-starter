# stage 1 building the code
FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY ["package*.json", "."]
RUN npm install
COPY . .
RUN npm install -g typescript
RUN npm run build

# stage 2 running the code
FROM node:18-alpine as production
WORKDIR /app
COPY ["package*.json", "."]
RUN npm install --only=production
COPY --from=builder /usr/src/app/build .
EXPOSE 5000
CMD ["node", "src/server.js"]
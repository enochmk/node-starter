FROM node:18-alpine
EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /app
RUN npm install -g typescript
COPY ["package*.json", "./"]
RUN npm install
COPY . .
RUN tsc --pretty
CMD ["npm", "start"]
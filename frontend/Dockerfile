FROM node:20-alpine
WORKDIR /app

COPY frontend/package*.json ./frontend/
COPY frontend ./frontend

WORKDIR /app/frontend
RUN npm ci --omit=dev || npm install

EXPOSE 3000
CMD ["npm", "start"]



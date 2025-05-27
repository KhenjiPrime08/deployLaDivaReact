# Etapa 1: Build del frontend con Node Alpine
FROM node:20-alpine AS build-frontend
WORKDIR /app/front
COPY Front/package*.json ./
RUN npm install
COPY Front/ ./
RUN npm run build

# Etapa 2: Backend + servir frontend estático
FROM node:20-alpine
WORKDIR /app

# Instalar dependencias backend
COPY back/package*.json ./back/
RUN cd back && npm install

# Copiar backend y frontend compilado
COPY back ./back
COPY --from=build-frontend /app/front/dist ./back/public

ENV PORT=4000
EXPOSE 4000

CMD ["node", "back/server.js"]

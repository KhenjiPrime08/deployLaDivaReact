# Etapa 1: Construir el frontend
FROM node:20 as build-frontend
WORKDIR /app/front
COPY front/package*.json ./
RUN npm install
COPY front/ ./
RUN npm run build

# Etapa 2: Backend + servir frontend
FROM node:20
WORKDIR /app

# Copiar backend
COPY back/package*.json ./back/
RUN cd back && npm install

# Copiar backend y build del frontend
COPY back ./back
COPY --from=build-frontend /app/front/dist ./back/public

# Variables de entorno
ENV PORT=4000

# Exponer el puerto del backend
EXPOSE 4000

# Comando de inicio
CMD ["node", "back/server.js"]


# Usa imagen oficial de Node.js
FROM node:20

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json backend e instalar dependencias
COPY back/package*.json ./back/
RUN cd back && npm install

# Copiar package.json y package-lock.json frontend e instalar dependencias
COPY Front/package*.json ./Front/
RUN cd Front && npm install

# Copiar el resto de archivos
COPY . .

# Construir el frontend (genera la carpeta build)
RUN cd Front && npm run build

# Exponer puerto backend
EXPOSE 4000

# Comando para arrancar backend (que servirá frontend estático)
CMD ["node", "back/index.js"]

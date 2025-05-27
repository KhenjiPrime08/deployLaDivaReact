# Usar una imagen base de Node.js
FROM node:20

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json del backend
COPY back/package*.json ./back/

# Instalar las dependencias del backend
RUN cd back && npm install

# Copiar los archivos package.json y package-lock.json del frontend
COPY Front/package*.json ./Front/

# Instalar las dependencias del frontend
RUN cd Front && npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer los puertos necesarios
EXPOSE 4000
EXPOSE 5173

# Comando para iniciar ambos servidores
CMD cd back && npm run dev & cd Front && npm run dev

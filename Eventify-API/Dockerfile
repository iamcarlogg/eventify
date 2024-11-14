# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de tu proyecto
COPY . .

# Expone el puerto en el que correrá tu aplicación (asegúrate de que sea el correcto)
EXPOSE 3000

# Ejecuta el comando para iniciar la aplicación
CMD ["node", "index.js"]

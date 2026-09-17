# ======================================================
# IMAGEN BASE
# ======================================================
# Se utiliza una versión específica de la imagen oficial
# de Node.js basada en Alpine por su tamaño reducido.
FROM node:24.21.0-alpine3.24

# ======================================================
# DIRECTORIO DE TRABAJO
# ======================================================
# Las siguientes instrucciones se ejecutan dentro de esta
# carpeta del contenedor.
WORKDIR /app

# ======================================================
# INSTALACIÓN DE DEPENDENCIAS
# ======================================================
# Se copian primero los archivos de npm y luego se instalan
# las dependencias necesarias para ejecutar la aplicación.
COPY package.json package-lock.json ./
RUN npm install

# ======================================================
# CÓDIGO FUENTE
# ======================================================
# Se copia la carpeta que contiene la API de productos.
COPY src ./src

# ======================================================
# CONFIGURACIÓN E INICIO DE LA API
# ======================================================
# La aplicación utiliza el puerto 3000 y se inicia mediante
# el script start definido en package.json.
EXPOSE 3000
CMD ["npm", "start"]

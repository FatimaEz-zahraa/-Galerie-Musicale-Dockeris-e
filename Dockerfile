# Utilisation de l'image officielle Node.js légère
FROM node:20-alpine

# Définition du dossier de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de configuration NPM
COPY package.json ./

# Installation des dépendances (Express, Axios, Cors)
RUN npm install

# Copie du reste du code source (backend et dossier public)
COPY . .

# On expose le port sur lequel notre serveur Node écoute
EXPOSE 3000

# Commande de démarrage : lance le serveur Node
CMD ["npm", "start"]

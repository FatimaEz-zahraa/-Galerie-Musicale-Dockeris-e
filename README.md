# Galerie Musicale Dockerisée

## Description
Une application web full-stack dockerisée qui affiche une galerie des meilleurs morceaux musicaux en utilisant l'API Deezer. Développée avec Node.js, Express et MongoDB, elle propose une interface utilisateur responsive en HTML/CSS avec un design professionnel.

## Fonctionnalités
- Affichage des meilleurs morceaux musicaux via l'API Deezer
- Interface utilisateur en français
- Architecture dockerisée avec séparation des services (Node.js et MongoDB)
- Réseau Docker partagé pour la communication entre conteneurs

## Installation et Lancement
1. Assurez-vous d'avoir Docker installé sur votre machine.
2. Clonez ce dépôt : `git clone <https://github.com/FatimaEz-zahraa/-Galerie-Musicale-Dockeris-e.git>`
3. Naviguez dans le dossier : `cd docker-music-gallery`
4. Lancez l'application avec le script PowerShell : `./launch.ps1`


## Technologies Utilisées
- Node.js
- Express
- MongoDB
- Docker
- Axios (pour les appels API)
- HTML/CSS/JavaScript

## Structure du Projet
- `server.js` : Serveur backend Express
- `index.html` : Interface frontend
- `Dockerfile` : Configuration Docker pour l'application
- `launch.ps1` : Script de lancement des conteneurs
- `package.json` : Dépendances Node.js


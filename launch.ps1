# Script PowerShell pour lancer le réseau et les conteneurs manuellement
Write-Host "1. Création du réseau Docker..."
docker network create music-net 2>$null # Ignore l'erreur si le réseau existe déjà

Write-Host "2. Démarrage du conteneur MongoDB..."
# On supprime l'ancien conteneur s'il y en a un
docker rm -f mongo 2>$null
docker run -d --name mongo --network music-net -p 27017:27017 mongo

Write-Host "3. Construction de l'image Node.js..."
docker build -t app-musique-node .

Write-Host "4. Démarrage de l'application Node.js..."
# On supprime l'ancien conteneur s'il existe
docker rm -f mon-app-node 2>$null
# On connecte l'app au MÊME réseau (--network music-net)
docker run -d -p 3000:3000 --name mon-app-node --network music-net app-musique-node

Write-Host " Tout est lancé ! sur http://localhost:3000"

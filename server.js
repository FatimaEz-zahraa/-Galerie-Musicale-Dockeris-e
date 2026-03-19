const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connexion à MongoDB (le conteneur 'mongo' sur le même réseau)
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/musicdb';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`Connecté à MongoDB avec succès sur ${mongoURI}`))
    .catch(err => {
        console.error('Erreur de connexion MongoDB:', err);
        process.exit(1); // Exit if DB connection fails
    });

// Définition du modèle (Schema) pour une musique
const trackSchema = new mongoose.Schema({
    rank: Number,
    title: String,
    artist: String,
    cover: String,
    preview: String
});
const Track = mongoose.model('Track', trackSchema);

// Une seule route pour tout gérer
app.get('/', async (req, res) => {
    try {
        // 1. Toujours rafraîchir en allant chercher sur Deezer
        const response = await axios.get('https://api.deezer.com/chart');
        const data = response.data;
        const top10 = data.tracks.data.slice(0, 10);

        // 2. Vider la base de données et sauvegarder les nouvelles musiques
        await Track.deleteMany({}); // On efface les anciennes

        const tracksToSave = top10.map((track, index) => ({
            rank: index + 1,
            title: track.title,
            artist: track.artist.name,
            cover: track.album.cover_medium,
            preview: track.preview
        }));

        // Insertion en base de données
        await Track.insertMany(tracksToSave);
        console.log("Les 10 musiques ont été sauvegardées dans MongoDB !");

        // 3. Récupérer depuis la base de données pour vérifier que ça a marché
        const savedTracks = await Track.find().sort({ rank: 1 });

        // 4. Création dynamique de la liste des musiques en HTML
        let trackListHtml = savedTracks.map(track => `
            <li class="track-item" onclick="playPreview('${track.preview}')">
                <div class="rank">#${track.rank}</div>
                <img src="${track.cover}" alt="${track.title}" class="track-cover">
                <div class="track-info">
                    <div class="track-title">${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
                <div class="play-icon">▶️</div>
            </li>
        `).join('');

        // 5. Lire le fichier d'affichage séparé (index.html)
        const templatePath = path.join(__dirname, 'index.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

        // 6. Injecter les musiques dans le modèle HTML
        const finalHtml = htmlTemplate.replace('{{TRACK_LIST}}', trackListHtml);

        // 7. Renvoyer le HTML complet au navigateur
        res.send(finalHtml);

    } catch (error) {
        console.error("Erreur Serveur:", error.message);
        res.status(500).send("<h1>Erreur lors du chargement ou de la sauvegarde des musiques</h1>");
    }
});

// Démarrage du serveur Node
app.listen(PORT, () => {
    console.log(`Serveur Node.js actif sur http://localhost:${PORT}`);
});

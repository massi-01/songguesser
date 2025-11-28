// scripts/generateSongs.js
const fs = require("fs");
const path = require("path");

const songsDir = path.join(__dirname, "..", "public", "songs");
const output = path.join(__dirname, "..", "src", "data", "songs.json");

// Leggi la cartella songs
const files = fs
  .readdirSync(songsDir)
  .filter((file) => file.endsWith(".mp3"))
  .map((file) => ({
    id: file.replace(".mp3", ""),
    name: file.replace(".mp3", ""),
    url: `/songs/${file}`,
  }));

// Crea cartella data se non esiste
fs.mkdirSync(path.dirname(output), { recursive: true });

// Scrivi il JSON
fs.writeFileSync(output, JSON.stringify(files, null, 2));

console.log("✔ songs.json generato con successo!");

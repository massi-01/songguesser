// scripts/generateSongsFromR2.js
const fs = require("fs");
const path = require("path");

const songFiles = require("./songFileList.js");

// URL pubblico del tuo R2 bucket
const BASE_URL = "https://pub-dc6951b87ea44a7ab218a279ebc23c28.r2.dev/songs/";

const output = path.join(__dirname, "..", "src", "data", "songs.json");

// 1. Carica eventuale songs.json esistente
let existingSongs = [];
if (fs.existsSync(output)) {
  try {
    existingSongs = JSON.parse(fs.readFileSync(output, "utf-8"));
  } catch (err) {
    console.error("Errore nella lettura di songs.json:", err);
  }
}

// 2. Converti la lista attuale in una mappa per lookup veloce
const existingNames = new Set(existingSongs.map((s) => s.name));

// 3. Trova SOLO i file nuovi
const newEntries = songFiles
  .filter((file) => {
    const cleaned = file
      .replace(/^\d+\.\s*/, "")
      .replace(".mp3", "")
      .trim();

    return !existingNames.has(cleaned); // solo i nuovi
  })
  .map((file) => {
    const cleaned = file
      .replace(/^\d+\.\s*/, "")
      .replace(".mp3", "")
      .trim();

    return {
      id: cleaned.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: cleaned,
      url: `${BASE_URL}${encodeURIComponent(file)}`,
    };
  });

// 4. Merge: mantieni vecchi + aggiungi nuovi
const finalSongs = [...existingSongs, ...newEntries];

// 5. Scrivi il file aggiornato
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(finalSongs, null, 2));

console.log("✔ songs.json aggiornato correttamente!");
console.log("Totale brani:", finalSongs.length);
console.log("Nuovi brani aggiunti:", newEntries.length);
console.log("──────────────────────────");

if (newEntries.length > 0) {
  console.log("▶ Aggiunti:");
  newEntries.forEach((s) => console.log(" -", s.name));
} else {
  console.log("Nessun nuovo brano da aggiungere.");
}

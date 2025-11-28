// scripts/generateSongs.js
const fs = require("fs");
const path = require("path");

const songsDir = path.join(__dirname, "..", "public", "songs");
const output = path.join(__dirname, "..", "src", "data", "songs.json");

// Regex per rimuovere "001. "
const CLEAN_REGEX = /^\d+\.\s*/;

function cleanNameFromFile(fileName) {
  return fileName
    .replace(".mp3", "")
    .replace(CLEAN_REGEX, "");
}

function generateId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// --- 1) Carica vecchio songs.json se esiste ---
let existingSongs = [];
if (fs.existsSync(output)) {
  try {
    existingSongs = JSON.parse(fs.readFileSync(output, "utf-8"));
  } catch {
    existingSongs = [];
  }
}

const initialCount = existingSongs.length;

// --- 2) Crea una mappa per lookup veloce ---
const existingMap = new Map();
existingSongs.forEach(song => existingMap.set(song.url, song));

// --- 3) Leggi file .mp3 nella cartella ---
const mp3Files = fs.readdirSync(songsDir).filter(f => f.endsWith(".mp3"));
const totalMp3Files = mp3Files.length;

// --- 4) Costruisci lista aggiornata ---
const mergedSongs = [...existingSongs];

let addedCount = 0;

mp3Files.forEach(file => {
  const url = `/songs/${file}`;

  // se già presente → skip
  if (existingMap.has(url)) return;

  const cleanName = cleanNameFromFile(file);

  mergedSongs.push({
    id: generateId(cleanName),
    name: cleanName,
    url: url,
  });

  addedCount++;
});

// --- 5) Ordina alfabeticamente (opzionale ma utile) ---
mergedSongs.sort((a, b) => a.name.localeCompare(b.name));

// --- 6) Scrivi su disco ---
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(mergedSongs, null, 2));

// --- 7) Log finali ---
console.log("===============================================");
console.log("✔ Generazione songs.json completata!");
console.log("-----------------------------------------------");
console.log(`🎵 Brani già presenti:        ${initialCount}`);
console.log(`📂 File mp3 trovati:         ${totalMp3Files}`);
console.log(`➕ Nuovi brani aggiunti:     ${addedCount}`);
console.log(`📀 Totale brani attuali:     ${mergedSongs.length}`);
console.log("===============================================");

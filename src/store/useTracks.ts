import { create } from "zustand";
import songs from "@/data/songs.json";

// ------------------------------
//  TYPE ESPORTATO (necessario per GameResult)
// ------------------------------
export interface Track {
  id: string;
  name: string;
  url: string;
}

// ------------------------------
//  STORE ZUSTAND
// ------------------------------
interface TrackStore {
  tracks: Track[];
}

export const useTracks = create<TrackStore>(() => ({
  tracks: songs as Track[], // cast necessario per TS
}));

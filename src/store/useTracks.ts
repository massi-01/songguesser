"use client";

import { create } from "zustand";
import songs from "@/data/songs.json";

export const useTracks = create(() => ({
  tracks: songs,
}));

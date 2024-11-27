import { create } from "zustand";

interface MapState {
  selectedMarkerName: string | null;
  setSelectedMarkerName: (name: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedMarkerName: null,
  setSelectedMarkerName: (name) => set({ selectedMarkerName: name }),
}));

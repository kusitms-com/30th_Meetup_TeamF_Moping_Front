import { create } from "zustand";

interface NonMember {
  nonMemberId: number;
  name: string;
}

interface Ping {
  iconLevel: number;
  placeName: string;
  px: number;
  py: number;
  url: string;
  nonMembers: NonMember[];
}

export type PingWithoutNonMembers = Omit<Ping, "nonMembers">;

interface MarkerStoreState {
  customMarkers: Ping[];
  setCustomMarkers: (
    pings: Ping[] | PingWithoutNonMembers[] | ((prev: Ping[]) => Ping[])
  ) => void;
  resetMarkers: () => void;
}

export const useMarkerStore = create<MarkerStoreState>((set) => ({
  customMarkers: [],
  setCustomMarkers: (pings) => {
    if (typeof pings === "function") {
      set((state) => ({ customMarkers: pings(state.customMarkers) }));
    } else {
      set({ customMarkers: pings as Ping[] });
    }
  },
  resetMarkers: () => set({ customMarkers: [] }),
}));

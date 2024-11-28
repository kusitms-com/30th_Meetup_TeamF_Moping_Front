import { create } from "zustand";

interface LastUpdateState {
  lastUpdated: number | null;
  setLastUpdated: (timestamp: number) => void;
}

const useLastUpdateStore = create<LastUpdateState>((set) => ({
  lastUpdated: null,
  setLastUpdated: (timestamp: number) => set({ lastUpdated: timestamp }),
}));

export default useLastUpdateStore;

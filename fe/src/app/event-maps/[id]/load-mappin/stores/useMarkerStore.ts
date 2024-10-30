import { create } from "zustand";

interface Ping {
  iconLevel: number;
  placeName: string;
  px: number;
  py: number;
  url: string;
  nonMembers: { nonMemberId: number; name: string }[];
}

// nonMembers가 없는 Ping 타입
export type PingWithoutNonMembers = Omit<Ping, "nonMembers">;

interface MarkerStoreState {
  customMarkers: Ping[];
  setCustomMarkers: (pings: Ping[] | PingWithoutNonMembers[]) => void; // PingWithoutNonMembers[]도 허용
  resetMarkers: () => void;
}

export const useMarkerStore = create<MarkerStoreState>((set) => ({
  customMarkers: [],
  setCustomMarkers: (pings) => set({ customMarkers: pings as Ping[] }), // 타입 단언을 사용하여 맞춤 마커 설정
  resetMarkers: () => set({ customMarkers: [] }),
}));

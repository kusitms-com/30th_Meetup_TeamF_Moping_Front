import { create } from "zustand";
import { LocationState } from "../types/types"; // types 파일에서 타입을 import

// 위치 상태를 zustand로 관리
export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
}));

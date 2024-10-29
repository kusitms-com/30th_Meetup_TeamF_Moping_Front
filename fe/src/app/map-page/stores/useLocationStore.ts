import { create } from "zustand";
import { LocationState } from "../types/types";

// 위치 상태를 zustand로 관리
export const useLocationStore = create<LocationState>((set) => ({
  center: {
    latitude: 37.5665, // 초기값: 서울
    longitude: 126.978,
  },
  moveToLocation: (latitude, longitude) =>
    set(() => ({
      center: { latitude, longitude },
    })),
}));

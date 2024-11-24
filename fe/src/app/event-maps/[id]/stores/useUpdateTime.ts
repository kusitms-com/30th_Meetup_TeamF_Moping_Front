import { create } from "zustand";

interface UpdateTimeState {
  updateTime: string | null;
  trigger: boolean;
  setUpdateTime: (time: string | null) => void;
}

const useUpdateTimeStore = create<UpdateTimeState>((set) => ({
  updateTime: "방금",
  trigger: false, // 트리거 상태 추가
  setUpdateTime: (time) =>
    set((state) => ({
      updateTime: time,
      trigger: !state.trigger, // 트리거 상태를 토글
    })),
}));

export default useUpdateTimeStore;

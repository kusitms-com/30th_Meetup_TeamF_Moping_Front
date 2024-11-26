import { create } from "zustand";

interface UpdateTimeState {
  updateTime: string | null;
  trigger: boolean;
  setUpdateTime: (time: string | null) => void;
}

const useUpdateTimeStore = create<UpdateTimeState>((set) => ({
  updateTime: "방금",
  trigger: false, 
  setUpdateTime: (time) =>
    set((state) => ({
      updateTime: time,
      trigger: !state.trigger, 
    })),
}));

export default useUpdateTimeStore;

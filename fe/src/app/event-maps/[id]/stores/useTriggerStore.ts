import { create } from "zustand";

interface TriggerState {
  trigger: boolean;
  toggleTrigger: () => void;
}

const useTriggerStore = create<TriggerState>((set) => ({
  trigger: false,
  toggleTrigger: () => set((state) => ({ trigger: !state.trigger })),
}));

export default useTriggerStore;

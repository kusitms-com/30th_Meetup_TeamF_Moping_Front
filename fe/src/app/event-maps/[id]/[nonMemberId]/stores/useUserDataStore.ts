import { create } from "zustand";

interface UserData {
  nonMemberId: number | null;
  name: string;
  bookmarkUrls: string[];
  storeUrls: string[];
}

interface UserDataStore {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export const useUserDataStore = create<UserDataStore>((set) => ({
  userData: {
    nonMemberId: null,
    name: "",
    bookmarkUrls: [],
    storeUrls: [],
  },
  setUserData: (data) => set({ userData: data }),
}));

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

const LOCAL_STORAGE_KEY = "userData";

const getUserDataFromLocalStorage = (): UserData => {
  if (typeof window === "undefined")
    return { nonMemberId: null, name: "", bookmarkUrls: [], storeUrls: [] };

  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData
    ? JSON.parse(storedData)
    : { nonMemberId: null, name: "", bookmarkUrls: [], storeUrls: [] };
};

export const useUserDataStore = create<UserDataStore>((set, get) => ({
  userData: getUserDataFromLocalStorage(),
  setUserData: (data) => {
    const currentData = get().userData;

    if (
      currentData.nonMemberId === data.nonMemberId &&
      currentData.name === data.name &&
      JSON.stringify(currentData.bookmarkUrls) ===
        JSON.stringify(data.bookmarkUrls) &&
      JSON.stringify(currentData.storeUrls) === JSON.stringify(data.storeUrls)
    ) {
      return;
    }

    set({ userData: data });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  },
}));

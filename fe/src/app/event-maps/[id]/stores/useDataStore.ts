import { create } from "zustand";

// 데이터 형식을 정의
interface NonMember {
  nonMemberId: number;
  name: string;
}

interface Data {
  uuid: string;
  name: string;
  password: string;
  bookmarkUrls: string[];
  storeUrls: string[];
  nonMembers: NonMember[]; // nonMembers 추가
}

// 스토어 타입 정의
interface DataStore {
  data: Data | null;
  setData: (data: Data) => void;
}

const useDataStore = create<DataStore>((set) => ({
  data: null,
  setData: (data: Data) => set({ data }),
}));

export default useDataStore;

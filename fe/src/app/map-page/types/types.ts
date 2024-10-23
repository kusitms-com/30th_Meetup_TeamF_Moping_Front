// types.ts

// 위치 정보를 담는 타입 정의
export interface Location {
  latitude: number;
  longitude: number;
}

// 상태 관리용 LocationState 타입 정의
export interface LocationState {
  location: Location | null;
  setLocation: (location: Location) => void;
}

// MapComponent의 props 타입 정의
export interface MapComponentProps {
  mapInstance: React.MutableRefObject<any>;
}

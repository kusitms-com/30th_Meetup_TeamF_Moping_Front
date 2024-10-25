// 위치 정보를 담는 타입 정의
export interface Location {
  latitude: number;
  longitude: number;
}

// 상태 관리용 LocationState 타입 정의
export interface LocationState {
  center: {
    latitude: number;
    longitude: number;
  };
  moveToLocation: (latitude: number, longitude: number) => void;
}

// MapComponent의 props 타입 정의
export interface MapComponentProps {
  mapInstance: React.MutableRefObject<naver.maps.Map>;
}

export interface UserProps {
  id: number;
  label: string;
  selectedButton: number;
  handleButtonClick: (id: number) => void;
}

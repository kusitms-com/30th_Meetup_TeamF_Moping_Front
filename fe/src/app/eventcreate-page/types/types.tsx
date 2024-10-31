// src/types.ts

// EventNameInput 컴포넌트의 Props 타입
export interface EventNameInputProps {
  value: string;
  onChange: (name: string) => void;
  className?: string;
  selectedLocation?: string;
}

// Location 관련 타입
export interface LocationState {
  center: {
    latitude: number;
    longitude: number;
  };
  moveToLocation: (latitude: number, longitude: number) => void;
}

// 장소 정보 타입
export interface Place {
  name: string;
  address: string;
  px?: number;
  py?: number;
}

// LocationInput 컴포넌트의 Props 타입
export interface LocationInputProps {
  className?: string;
  onSelect: (place: Place) => void;
}

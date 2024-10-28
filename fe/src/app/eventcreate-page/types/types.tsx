export interface EventNameInputProps {
  value: string;
  onChange: (name: string) => void;
  className?: string;
  selectedLocation?: string;
}

export interface LocationState {
  center: {
    latitude: number;
    longitude: number;
  };
  moveToLocation: (latitude: number, longitude: number) => void;
}

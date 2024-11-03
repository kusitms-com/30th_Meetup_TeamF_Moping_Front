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

export interface Place {
  name: string;
  address: string;
  px?: number;
  py?: number;
}

export interface LocationInputProps {
  className?: string;
  value: string;
  onSelect: (place: Place) => void;
}

// Navigation 컴포넌트의 Props 타입
export interface NavigationProps {
  showBackButton?: boolean;
  title?: string;
  onBack?: () => void; // Optional onBack function for handling back navigation
}

export interface NavigationProps {
  showBackButton?: boolean;
  title?: string;
  onBack?: () => void;
}

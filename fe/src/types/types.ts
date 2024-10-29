export interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "start" | "next"; // start와 next 타입
  className?: string;
  disabled?: boolean; // disabled 속성 추가
}

export interface NavigationProps {
  title?: string;
  showBackButton?: boolean;
}

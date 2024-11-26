export interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "start" | "next" | "submit";
  className?: string;
  disabled?: boolean;
}

export interface NavigationProps {
  title?: string;
  showBackButton?: boolean;
}

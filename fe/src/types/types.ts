export interface ButtonProps {
  label?: string;
  onClick?: () => void;
  type?: "start" | "next";
  className?: string;
}

export interface NavigationProps {
  title?: string;
  showBackButton?: boolean;
}

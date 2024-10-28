export type IconButtonOption =
  | boolean
  | {
      disabled?: boolean;
      active?: boolean;
      color?: string;
      onClick?: () => void;
    };

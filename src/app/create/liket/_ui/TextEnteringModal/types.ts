export type Props = {
  text: string;
  isOpen: boolean;
  maxLength: number;
  allowNewLine: boolean;
  onClickClose: () => void;
  onClickCheck: (text: string) => void;
};

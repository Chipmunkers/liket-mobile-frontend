export type Props = {
  isOpen: boolean;
  maxLength: number;
  allowNewLine: boolean;
  onClickClose: () => void;
  onClickCheck: (text: string) => void;
};

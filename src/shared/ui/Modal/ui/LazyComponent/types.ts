import { ModalInformation, ModalType } from "@/shared/store/modalStore";

export type Props = {
  fileName: ModalType;
};

export type ModalComponentProps = ModalInformation & {
  onClose: () => void;
};

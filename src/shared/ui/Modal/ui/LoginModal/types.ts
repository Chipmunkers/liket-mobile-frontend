import { ModalInformation } from "@/shared/store/modalStore";

export type Props = ModalInformation & {
  onClose: () => void;
};

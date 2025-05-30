import { getKeys } from "@/shared/helpers/getKeys";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModalType = "LoginModal" | "DeleteModal" | "PermissionModal";

export interface ModalInformation {
  isOpen: boolean;
  meta?: {
    onClickPositive?: () => void;
    onClickNegative?: () => void;
  };
}

interface State {
  modalInformation: {
    [key in ModalType]?: ModalInformation;
  };
  modalList: ModalType[];
}

type Actions = {
  openModal: (modalType: ModalType, meta?: ModalInformation["meta"]) => void;
  closeModal: (modalType: ModalType) => void;
};

const useModalStore = create<State & Actions>()(
  immer((set) => ({
    modalInformation: {},
    modalList: [],
    openModal: (modalType, meta) => {
      set((state) => {
        state.modalInformation[modalType] = {
          meta: meta,
          isOpen: true,
        };

        if (!state.modalInformation[modalType]) {
          state.modalList = [...state.modalList, modalType];
        } else {
          state.modalList = getKeys(state.modalInformation);
        }
      });
    },
    closeModal: (modalType) => {
      set((state) => {
        state.modalInformation[modalType] = {
          isOpen: false,
          meta: undefined,
        };
      });
    },
  }))
);

export default useModalStore;

"use client";

import LazyComponent from "@/shared/ui/Modal/ui/LazyComponent";
import { Props } from "./types";
import useModalStore from "@/shared/store/modalStore";

const ModalProvider = ({ children }: Props) => {
  const modalList = useModalStore(({ modalList }) => modalList);

  return (
    <>
      {!!modalList.length &&
        modalList.map((modalName) => {
          return <LazyComponent key={modalName} fileName={modalName} />;
        })}
      {children}
    </>
  );
};

export default ModalProvider;

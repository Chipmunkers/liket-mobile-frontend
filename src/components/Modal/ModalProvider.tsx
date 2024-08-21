import useModalStore from "@/stores/modalStore";
import { StrictPropsWithChildren } from "@/types/common";
import LazyComponent from "./LazyComponent";

type ModalProviderProps = StrictPropsWithChildren;

/**
 * @deprecated
 */
const ModalProvider = ({ children }: ModalProviderProps) => {
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

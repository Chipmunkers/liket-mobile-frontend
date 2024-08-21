import dynamic from "next/dynamic";
import useModalStore, {
  ModalInformation,
  ModalType,
} from "@/stores/modalStore";
import { EmptyFunction } from "@/types/common";

interface LazyComponent {
  fileName: ModalType;
}

/**
 * @deprecated
 */
export type ModalComponentProps = ModalInformation & {
  onClose: EmptyFunction;
};

const LazyComponent = ({ fileName }: LazyComponent) => {
  const { modalInformation, closeModal } = useModalStore(
    ({ modalInformation, closeModal }) => ({
      modalInformation,
      closeModal,
    })
  );

  if (!modalInformation[fileName]) {
    throw new Error("모달 파일이 존재하지 않습니다.");
  }

  const Component = dynamic<ModalComponentProps>(
    () => import(`./${fileName}.tsx`)
  );

  return (
    <Component
      isOpen={modalInformation[fileName]?.isOpen || false}
      meta={modalInformation[fileName]?.meta}
      onClose={() => closeModal(fileName)}
    />
  );
};

export default LazyComponent;

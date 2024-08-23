import dynamic from "next/dynamic";
import useModalStore from "@/shared/store/modalStore";
import { ModalComponentProps, Props } from "./types";

const LazyComponent = ({ fileName }: Props) => {
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
    () => import(`../${fileName}`)
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

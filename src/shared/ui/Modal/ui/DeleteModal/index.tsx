import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/Modal/ui/Modal";
import { Props } from "./types";

const DeleteModal = ({ isOpen, onClose, meta }: Props) => {
  const handleCloseModal = () => {
    onClose();
    meta?.onClickNegative && meta.onClickNegative();
  };

  const handleClickPositive = () => {
    onClose();
    meta?.onClickPositive && meta?.onClickPositive();
  };

  return (
    <Modal
      title="삭제"
      ariaLabel="삭제 모달"
      isOpen={isOpen}
      onClose={handleCloseModal}
      isCloseOnTop={false}
      footer={
        <>
          <Button
            className="flex-1 h-[40px] mr-[8px]"
            variant="ghost"
            onClick={handleCloseModal}
          >
            취소
          </Button>
          <Button className="flex-1 h-[40px]" onClick={handleClickPositive}>
            확인
          </Button>
        </>
      }
    >
      <div className="text-body3 text-grey-04 text-center outline-none">
        <div>정말 삭제하시겠습니까?</div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

import { EmptyFunction } from "@/types/common";
import Modal from ".";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import { ModalInformation } from "@/stores/modalStore";

type DeleteCommentModalProps = ModalInformation & {
  onClose: EmptyFunction;
};

/**
 * @deprecated
 */
const DeleteCommentModal = ({
  isOpen,
  onClose,
  meta,
}: DeleteCommentModalProps) => {
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
      title="댓글 삭제"
      ariaLabel="댓글 삭제 모달"
      isOpen={isOpen}
      onClose={handleCloseModal}
      footer={
        <ButtonGroup gap={8}>
          <Button
            fullWidth
            variant="ghost"
            height={40}
            onClick={handleCloseModal}
          >
            취소
          </Button>
          <Button fullWidth height={40} onClick={handleClickPositive}>
            확인
          </Button>
        </ButtonGroup>
      }
    >
      <div className="text-body3 text-grey-04 text-center">
        <div>정말 삭제하시겠습니까?</div>
      </div>
    </Modal>
  );
};

export default DeleteCommentModal;

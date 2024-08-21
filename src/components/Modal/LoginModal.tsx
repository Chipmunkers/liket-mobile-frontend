import { EmptyFunction } from "@/types/common";
import Modal from ".";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import { ModalInformation } from "@/stores/modalStore";

type LoginModalProps = ModalInformation & {
  onClose: EmptyFunction;
};

/**
 * @deprecated
 */
const LoginModal = ({ isOpen, onClose, meta }: LoginModalProps) => {
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
      title="라이켓"
      ariaLabel="로그인 모달"
      isOpen={isOpen}
      onClose={handleCloseModal}
      isCloseOnTop={false}
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
      <div className="text-body3 text-grey-04 text-center outline-none">
        <div>로그인을 하신 후 서비스 이용이 가능합니다.</div>
        <div>로그인하시겠습니까?</div>
      </div>
    </Modal>
  );
};

export default LoginModal;

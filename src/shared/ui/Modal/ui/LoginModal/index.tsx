import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/Modal/ui/Modal";
import { Props } from "./types";

const LoginModal = ({ isOpen, onClose, meta }: Props) => {
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
        <div>로그인을 하신 후 서비스 이용이 가능합니다.</div>
        <div>로그인하시겠습니까?</div>
      </div>
    </Modal>
  );
};

export default LoginModal;

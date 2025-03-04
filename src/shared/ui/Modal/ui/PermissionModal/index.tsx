import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/Modal/ui/Modal";
import { Props } from "./types";

const PermissionModal = ({ isOpen, onClose, meta }: Props) => {
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
      title="권한 허용"
      ariaLabel="권한 허용 모달"
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
        <div>
          내 위치를 가져오려면 먼저 위치 추적 권한을 허용하고 앱을
          재시작해주세요.
        </div>
      </div>
    </Modal>
  );
};

export default PermissionModal;

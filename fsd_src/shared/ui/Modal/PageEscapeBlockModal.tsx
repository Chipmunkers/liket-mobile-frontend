import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/Modal/ui/Modal";

export type Props = {
  isOpen: boolean;
  onClickNegative: () => void;
  onClickPositive: () => void;
};

const PageEscapeBlockModal = ({
  isOpen,
  onClickNegative,
  onClickPositive,
}: Props) => {
  const handleCloseModal = () => {
    onClickNegative();
  };

  const handleClickPositive = () => {
    onClickNegative();
    onClickPositive();
  };

  return (
    <Modal
      title="페이지 벗어나기"
      ariaLabel="페이지 벗어나기 모달"
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
            벗어나기
          </Button>
        </>
      }
    >
      <div className="text-body3 text-grey-04 text-center outline-none">
        <div>페이지를 정말로 벗어나시겠습니까?</div>
      </div>
    </Modal>
  );
};

export default PageEscapeBlockModal;

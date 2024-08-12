import { classNames } from "@/utils/helpers";
import FocusKeeper from "../FocusKeeper";
import { StrictPropsWithChildren } from "@/types/common";
import { ReactNode } from "react";

type ModalProp = StrictPropsWithChildren<{
  title: string;
  footer: ReactNode;
  isOpen: boolean;
  ariaLabel: string;
  isCloseOnTop?: boolean;
  onClose: () => void;
}>;

const Modal = ({
  title,
  children,
  footer,
  ariaLabel,
  isOpen,
  isCloseOnTop = false,
  onClose,
}: ModalProp) => {
  return (
    <div
      hidden={isOpen ? false : true}
      aria-hidden={isOpen ? false : true}
      className={classNames(
        `center fixed top-0 bottom-0 left-0 right-0 z-[9999] bg-[rgba(0,0,0,0.6)]`
      )}
      onClick={() => {
        if (isCloseOnTop) {
          onClose();
        }
      }}
    >
      <div
        className="flex flex-col p-[16px] w-[280px] border-solid rounded-[24px] bg-white"
        onClick={(event) => {
          if (!isCloseOnTop) {
            event.stopPropagation();
          }
        }}
      >
        <FocusKeeper
          ariaLabel={ariaLabel}
          onEscape={() => onClose && onClose()}
        >
          <div className="flex justify-center mb-[8px]">
            <h2 className="text-h2">{title}</h2>
          </div>
          <div>{children}</div>
          {!!footer && (
            <div className="flex justify-center mt-[8px]">{footer}</div>
          )}
        </FocusKeeper>
      </div>
    </div>
  );
};

export default Modal;

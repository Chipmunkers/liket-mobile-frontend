import Drawer from "@/shared/ui/Drawer";
import { Props } from "./types";
import { ButtonBase } from "@mui/material";
import customToast from "@/shared/helpers/customToast";
import useModalStore from "@/shared/store/modalStore";
import { useDeleteContent } from "@/app/requested-contents/[idx]/_ui/AdjustDrawer/hooks/useDeleteContent";
import { useRouter } from "next/navigation";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const AdjustDrawer = ({ idx, isOpen, setIsOpen, acceptedAt }: Props) => {
  const openModal = useModalStore(({ openModal }) => openModal);
  const router = useRouter();

  const { mutate: deleteContentByIdx } = useDeleteContent({
    onSuccess: () => {
      stackRouterBack(router);
    },
  });

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <li className="bottom-sheet-list">
        <ButtonBase
          onClick={() => {
            if (acceptedAt) {
              return customToast(
                "활성화된 컨텐츠는 수정할 수 없습니다. 문의를 남겨주세요."
              );
            }

            stackRouterPush(router, {
              path: `/edit/requested-content/${idx}`,
              screen: WEBVIEW_SCREEN.EDIT_REQUESTED_CONTENT,
            });
          }}
          className="bottom-sheet-button flex justify-start px-[24px]"
        >
          수정하기
        </ButtonBase>
      </li>
      <li className="bottom-sheet-list">
        <ButtonBase
          onClick={() => {
            if (acceptedAt) {
              return customToast(
                "활성화된 컨텐츠는 삭제할 수 없습니다. 문의를 남겨주세요."
              );
            }

            openModal("DeleteModal", {
              onClickPositive() {
                deleteContentByIdx(idx);
              },
            });
          }}
          className="bottom-sheet-button flex justify-start px-[24px] text-rosepink-01"
        >
          삭제
        </ButtonBase>
      </li>
    </Drawer>
  );
};

export default AdjustDrawer;

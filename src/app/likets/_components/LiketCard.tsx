import DefaultImg from "@/shared/ui/DefaultImg";
import { ButtonBase } from "@mui/material";
import Link from "next/link";
import MeatballIcon from "@/shared/icon/review/MeatballIcon.svg";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

interface Props {
  id: string;
  cardImgPath: string;
  isNarrow: boolean;
  onClickMeatball: () => void;
}

const LiketCard = ({ id, cardImgPath, isNarrow, onClickMeatball }: Props) => {
  const router = useRouter();

  return (
    <div
    // 상세 페이지는 기획 후 추후에 개발
    // href={`/likets/${id}`}
    // onClick={(e) => {
    //   e.preventDefault();

    //   stackRouterPush(router, {
    //     path: `/likets/${id}`,
    //     screen: WEBVIEW_SCREEN.LIKET_DETAIL,
    //   });
    // }}
    >
      <div className="relative overflow-hidden aspect-[164/261] rounded-[4px] bg-white shadow-03 transform transition duration-200 hover:scale-[102%] active:scale-[102%]">
        <DefaultImg src={cardImgPath} fallbackComponent={<div />} />
        <ButtonBase
          disableRipple
          className="absolute top-0 right-0 icon-button w-[48px] h-[48px] rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClickMeatball();
          }}
        >
          <MeatballIcon fill="black" />
        </ButtonBase>
      </div>
    </div>
  );
};

export default LiketCard;

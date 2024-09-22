import DefaultImg from "@/shared/ui/DefaultImg";
import { ButtonBase } from "@mui/material";
import Link from "next/link";
import MeatballIcon from "@/shared/icon/review/MeatballIcon.svg";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

interface Props {
  id: string;
  imgSrc: string;
  isNarrow: boolean;
  onClickMeatball: () => void;
}

const LiketCard = ({ id, imgSrc, isNarrow, onClickMeatball }: Props) => {
  const router = useRouter();

  return (
    <Link
      href={`/likets/${id}`}
      onClick={(e) => {
        e.preventDefault();

        stackRouterPush(router, {
          path: `/likets/${id}`,
          screen: WEBVIEW_SCREEN.LIKET_DETAIL,
        });
      }}
    >
      <div className="relative overflow-hidden aspect-[164/261] rounded-[4px] shadow-03">
        <DefaultImg src="" testSrc={imgSrc} />
        <ButtonBase
          disableRipple
          className="absolute top-0 right-0 icon-button w-[48px] h-[48px] rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClickMeatball();
          }}
        >
          <MeatballIcon fill="white" />
        </ButtonBase>
      </div>
    </Link>
  );
};

export default LiketCard;

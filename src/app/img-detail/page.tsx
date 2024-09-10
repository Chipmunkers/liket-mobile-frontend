"use client";

import DefaultImg from "@/shared/ui/DefaultImg";
import { ButtonBase } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import CrossIcon from "@/shared/icon/common/cross/DefaultCrossIcon.svg";
import { stackRouterBack } from "@/shared/helpers/stackRouter";
import { colors } from "@/shared/style/color";
import Image from "next/image";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const imgPath = searchParams.get("path") || "";

  return (
    <div className="w-[100%] h-[100vh] absolute bg-grey-black top-0 z-10 flex items-center">
      <div className="w-[100%] relative h-[calc(100%-120px)] flex items-center">
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_SERVER + imgPath}
          alt="이미지"
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <ButtonBase
        disableRipple
        className="icon-button absolute top-[12px] left-[12px] w-[24px] h-[24px] flex justify-center items-center"
        onClick={() => {
          stackRouterBack(router);
        }}
      >
        <CrossIcon fill={colors.grey.white} />
      </ButtonBase>
    </div>
  );
}

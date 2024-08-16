"use client";

import Header from "@/components/Header";
import Divider from "@/components/Divider";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import customToast from "@/utils/customToast";
import { ButtonBase } from "@mui/material";
import KakaoLogo from "./icon/kakao-logo.svg";
import AppleLogo from "./icon/apple-logo.svg";
import NaverLogo from "./icon/naver-logo.svg";
import Logo from "./icon/logo.svg";
import RightOption from "@/components/Header/RightOption";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import { headers } from "next/headers";
import { stackRouterBack } from "../../utils/stackRouter";

export default function Page() {
  const router = useRouter();
  const searchParam = useSearchParams();

  useEffect(() => {
    if (searchParam.get("isTokenExpired")) {
      customToast("장시간 미사용으로 로그아웃 되었습니다.");
    }
  }, [searchParam]);

  return (
    <>
      <Header>
        <LeftOption
          option={{
            close: {
              onClick: () => {
                stackRouterBack(router);
              },
            },
          }}
        />
      </Header>
      <div className="flex grow flex-col items-center justify-center px-[24px]">
        <Logo />

        <div className="flex items-center flex-col w-[100%] mt-[48px] gap-[16px] mb-[29px]">
          {/* 카카오 로그인 */}
          <ButtonBase className="h-[48px] bg-[#FEE500] w-[100%] rounded-[24px] max-w-[342px]">
            <Link
              href={process.env.NEXT_PUBLIC_API_SERVER + "/auth/kakao"}
              className="h-[100%] flex justify-center items-center w-[100%]"
            >
              <div className="absolute flex justify-center items-center w-[48px] h-[48px] left-[8px]">
                <KakaoLogo />
              </div>
              <div className="text-button1">카카오톡으로 로그인</div>
            </Link>
          </ButtonBase>

          {/* 애플 로그인 */}
          <ButtonBase className="h-[48px] bg-grey-black w-[100%] rounded-[24px] max-w-[342px]">
            <Link
              href={process.env.NEXT_PUBLIC_API_SERVER + "/auth/apple"}
              className="h-[100%] flex justify-center items-center w-[100%]"
            >
              <div className="absolute flex justify-center items-center w-[48px] h-[48px] left-[8px]">
                <AppleLogo />
              </div>
              <div className="text-button1 text-white">Apple로 로그인</div>
            </Link>
          </ButtonBase>

          {/* 네이버 로그인 */}
          <ButtonBase className="h-[48px] bg-[#03C75A] w-[100%] rounded-[24px] max-w-[342px]">
            <Link
              href={process.env.NEXT_PUBLIC_API_SERVER + "/auth/naver"}
              className="h-[100%] flex justify-center items-center w-[100%]"
            >
              <div className="absolute flex justify-center items-center w-[48px] h-[48px] left-[8px]">
                <NaverLogo />
              </div>
              <div className="text-button1 text-white">네이버로 로그인</div>
            </Link>
          </ButtonBase>
        </div>

        <div className="flex items-center mb-[38px]">
          <Divider height="1px" width="48px" />
          <span className="text-body5 text-grey-04 ml-[16px] mr-[16px]">
            또는
          </span>
          <Divider height="1px" width="48px" />
        </div>
        <div className="flex items-center">
          <Link
            href="/login/email"
            className="text-grey-03 text-button6 mr-[16px]"
          >
            이메일로 로그인
          </Link>
          <Divider height="8px" width="1px" orientation="vertical" />
          <Link href="/signup" className="text-grey-03 text-button6 ml-[16px]">
            이메일로 회원가입
          </Link>
        </div>
      </div>
    </>
  );
}

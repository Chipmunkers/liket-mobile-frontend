"use client";

import ColoredLogo from "@/icons/logo.svg";
import KaKaoLogin from "@/icons/logins/kakao-login.svg";
import AppleLogin from "@/icons/logins/apple-login.svg";
import NaverLogin from "@/icons/logins/naver-login.svg";
import Header from "@/components/Header";
import Divider from "@/components/Divider";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import customToast from "@/utils/customToast";

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
        <Header.LeftOption
          option={{
            close: true,
          }}
        />
      </Header>
      <div className="flex grow flex-col items-center justify-center">
        <ColoredLogo />
        <Link
          className="mt-[48px] mb-[16px]"
          href={process.env.NEXT_PUBLIC_API_SERVER + "/auth/kakao"}
        >
          <KaKaoLogin />
        </Link>
        <Link
          className="mb-[16px]"
          href={process.env.NEXT_PUBLIC_API_SERVER + "/auth/apple"}
        >
          <AppleLogin />
        </Link>
        <Link
          className="mb-[29px]"
          href={process.env.NEXT_PUBLIC_API_SERVER + "/auth/naver"}
        >
          <NaverLogin />
        </Link>
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

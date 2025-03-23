"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ButtonBase } from "@mui/material";
import KakaoLogo from "./icon/kakao-logo.svg";
import AppleLogo from "./icon/apple-logo.svg";
import NaverLogo from "./icon/naver-logo.svg";
import Logo from "./icon/logo.svg";
import { Header, HeaderLeft } from "@/shared/ui/Header";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import Divider from "@/shared/ui/Divider";
import customToast from "@/shared/helpers/customToast";
import { useIsWebView } from "@/shared/hooks/useIsWebview";
import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";
import useOnMessageFromWebview from "@/app/login/_hooks/useOnMessageFromWebview";
import { hapticFeedback } from "@/shared/helpers/hapticFeedback";
import { messageToRN } from "@/shared/helpers/messageToRN";

export default function Page() {
  const router = useRouter();
  const searchParam = useSearchParams();

  const isWebview = useIsWebView();

  useEffect(() => {
    if (searchParam.get("isTokenExpired")) {
      customToast("장시간 미사용으로 로그아웃 되었습니다.");
    }
  }, [searchParam]);

  // * 소셜 로그인 응답 받은 후
  useOnMessageFromWebview();

  // * 소셜 로그인 클릭 전송
  const socialLoginClickEvent = (provider: "kakao" | "apple" | "naver") => {
    if (isWebview) {
      messageToRN({
        type: WEBVIEW_EVENT_TYPE.CLICK,
        action: "social-login",
        provider: provider,
      });
      return;
    }

    stackRouterPush(router, {
      path: process.env.NEXT_PUBLIC_API_SERVER + `/auth/${provider}`,
      screen: WEBVIEW_SCREEN.KAKAO_LOGIN,
    });
  };

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            close: {
              onClick: () => {
                stackRouterPush(router, {
                  path: "/",
                  screen: WEBVIEW_SCREEN.MAIN,
                  isStack: false,
                });
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
              href={"/error"}
              className="h-[100%] flex justify-center w-[100%]"
              onClick={(e) => {
                e.preventDefault();
                hapticFeedback({ feedback: "select" });
                socialLoginClickEvent("kakao");
              }}
            >
              <div className="absolute flex justify-center items-center w-[48px] h-[48px] left-[8px]">
                <KakaoLogo />
              </div>
              <div className="text-button1 mt-[16px]">카카오톡으로 로그인</div>
            </Link>
          </ButtonBase>

          {/* 애플 로그인 */}
          <ButtonBase className="h-[48px] bg-grey-black w-[100%] rounded-[24px] max-w-[342px]">
            <Link
              href={process.env.NEXT_PUBLIC_API_SERVER + "/auth/apple"}
              className="h-[100%] flex justify-center w-[100%]"
              onClick={(e) => {
                e.preventDefault();
                hapticFeedback({ feedback: "select" });

                stackRouterPush(router, {
                  path: process.env.NEXT_PUBLIC_API_SERVER + "/auth/apple",
                  screen: WEBVIEW_SCREEN.APPLE_LOGIN,
                });
              }}
            >
              <div className="absolute flex justify-center items-center w-[48px] h-[48px] left-[8px]">
                <AppleLogo />
              </div>
              <div className="text-button1 text-white mt-[16px]">
                Apple로 로그인
              </div>
            </Link>
          </ButtonBase>

          {/* 네이버 로그인 */}
          <ButtonBase className="h-[48px] bg-[#03C75A] w-[100%] rounded-[24px] max-w-[342px]">
            <Link
              href={process.env.NEXT_PUBLIC_API_SERVER + "/auth/naver"}
              className="h-[100%] flex justify-center w-[100%]"
              onClick={(e) => {
                e.preventDefault();
                hapticFeedback({ feedback: "select" });

                stackRouterPush(router, {
                  path: process.env.NEXT_PUBLIC_API_SERVER + "/auth/naver",
                  screen: WEBVIEW_SCREEN.NAVER_LOGIN,
                });
              }}
            >
              <div className="absolute flex justify-center items-center w-[48px] h-[48px] left-[8px]">
                <NaverLogo />
              </div>
              <div className="text-button1 text-white mt-[16px]">
                네이버로 로그인
              </div>
            </Link>
          </ButtonBase>
        </div>

        <div className="flex items-center mb-[30px]">
          <Divider height="1px" width="48px" />
          <span className="text-body5 text-grey-04 ml-[16px] mr-[16px]">
            또는
          </span>
          <Divider height="1px" width="48px" />
        </div>
        <div className="flex items-center">
          <Link
            href="/login/email"
            className="text-grey-03 text-button6 mr-[16px] w-[92px] h-[30px] flex justify-center items-center"
            onClick={(e) => {
              e.preventDefault();
              stackRouterPush(router, {
                path: "/login/email",
                screen: WEBVIEW_SCREEN.EMAIL_LOGIN,
              });
            }}
          >
            이메일로 로그인
          </Link>
          <Divider height="8px" width="1px" orientation="vertical" />
          <Link
            href="/signup"
            className="text-grey-03 text-button6 ml-[16px] w-[103px] h-[30px] flex justify-center items-center"
            onClick={(e) => {
              e.preventDefault();

              stackRouterPush(router, {
                path: "/signup",
                screen: WEBVIEW_SCREEN.SIGN_UP,
              });
            }}
          >
            이메일로 회원가입
          </Link>
        </div>
      </div>
    </>
  );
}

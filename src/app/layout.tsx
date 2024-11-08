import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ToastProvider from "./_ui/ToasterProvider";
import ModalProvider from "@/shared/provider/ModalProvider";
import QueryProvider from "@/shared/provider/QueryProvider";
import MuiLocalizationProvider from "@/shared/provider/MuiLocalizationProvider";
import { classNames } from "@/shared/helpers/classNames";
import GoogleAnalytics from "@/widgets/GoogleAnlytics";

dayjs.locale("ko");

export const appleGothic = localFont({
  src: [
    {
      path: "../../public/fonts/100_AppleSDGothicNeo-Thin.woff2",
      weight: "100",
    },
    {
      path: "../../public/fonts/200_AppleSDGothicNeo-UltraLight.woff2",
      weight: "200",
    },
    {
      path: "../../public/fonts/300_AppleSDGothicNeo-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/400_AppleSDGothicNeo-Medium.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/500_AppleSDGothicNeo-Regular.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/600_AppleSDGothicNeo-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/700_AppleSDGothicNeo-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/800_AppleSDGothicNeo-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../../public/fonts/900_AppleSDGothicNeo-Heavy.woff2",
      weight: "900",
    },
  ],
});

export const metadata: Metadata = {
  title: "라이켓",
  description: "즐기고 만들자, 라이켓 LIKET",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  metadataBase: new URL("https://liket.site"),
  keywords: ["라이켓", "LIKET"],
  openGraph: {
    images: [
      {
        url: "https://liket.s3.ap-northeast-2.amazonaws.com/opengraph-image.png",
        alt: "라이켓",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="bg-grey-01">
      <GoogleAnalytics />
      <body className={classNames(appleGothic.className, "bg-white")}>
        <ModalProvider>
          <QueryProvider>
            <MuiLocalizationProvider>
              <ToastProvider />
              {children}
            </MuiLocalizationProvider>
          </QueryProvider>
        </ModalProvider>
      </body>
    </html>
  );
}

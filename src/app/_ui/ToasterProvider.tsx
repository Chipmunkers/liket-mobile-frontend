"use client";

import { useIsWebView } from "@/shared/hooks/useIsWebview";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  const isWebview = useIsWebView();

  return (
    <Toaster
      position="bottom-center"
      containerStyle={{
        zIndex: 99999,
        inset: isWebview ? "16px 16px 80px 16px" : "16px 16px 114px 16px",
      }}
    />
  );
};

export default ToastProvider;

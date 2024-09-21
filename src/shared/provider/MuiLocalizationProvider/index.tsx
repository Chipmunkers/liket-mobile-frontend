"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PropsWithChildren } from "react";
import "dayjs/locale/ko";

type Props = PropsWithChildren;

const MuiLocalizationProvider = ({ children }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      {children}
    </LocalizationProvider>
  );
};

export default MuiLocalizationProvider;

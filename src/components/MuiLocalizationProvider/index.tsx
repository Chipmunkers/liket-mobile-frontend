"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

/**
 * @deprecated
 */
const MuiLocalizationProvider = ({ children }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
};

export default MuiLocalizationProvider;

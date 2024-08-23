import { colors } from "@/shared/style/color";
import styled from "@emotion/styled";
import Drawer from "@mui/material/Drawer/Drawer";

export const Wrapper = styled(Drawer)(
  () =>
    ({
      // Year Calendar
      ".MuiYearCalendar-root": { width: "100%" },
      ".MuiPaper-root.MuiPaper-elevation": {
        borderRadius: "24px 24px 0 0",
      },
      "button.MuiPickersYear-yearButton.Mui-selected": {
        backgroundColor: colors.skyblue["01"],
      },
      // Digital Clock
      ".MuiMultiSectionDigitalClock-root": {
        marginBottom: "12px",
        justifyContent: "center",
        borderBottom: 0,
      },
      // Date Calendar
      ".MuiDateCalendar-root": { width: "100%" },
      ".MuiDayCalendar-header": {
        display: "flex",
        justifyContent: "space-around",
      },
      ".MuiDayCalendar-monthContainer": {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-around",
      },
      ".MuiDayCalendar-weekContainer": {
        display: "flex",
        justifyContent: "space-around",
      },
      "button.MuiButtonBase-root.MuiPickersDay-root.Mui-selected": {
        backgroundColor: colors.skyblue["01"],
      },
      // Time Picker
    } as const)
);

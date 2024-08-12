import { StrictPropsWithChildren } from "@/types/common";
import { colors } from "@/utils/style";
import styled from "@emotion/styled";
import Drawer, { DrawerProps } from "@mui/material/Drawer/Drawer";

type Props = StrictPropsWithChildren<DrawerProps>;

const Index = ({ children, ...props }: Props) => {
  return (
    <Wrapper {...props} anchor="bottom" disableScrollLock>
      <div className="mt-[24px]">{children}</div>
    </Wrapper>
  );
};

export default Index;

const Wrapper = styled(Drawer)(
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

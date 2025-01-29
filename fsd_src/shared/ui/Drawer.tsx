import { Wrapper } from "@/shared/ui/Drawer/style";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { StrictPropsWithChildren } from "../type/react";
import { DrawerProps } from "@mui/material";

type Props = StrictPropsWithChildren<DrawerProps> & {
  /**
   * 바텀 영역 safe area만큼 띄워줄 지 여부
   *
   * @default true
   */
  bottomSafeArea?: boolean;
};

const Drawer = ({ children, bottomSafeArea = true, ...props }: Props) => {
  const { safeArea } = useGetSafeArea();

  return (
    <Wrapper {...props} anchor="bottom" disableScrollLock>
      <div
        className="mt-[24px] max-h-[80vh] overflow-y-scroll scrollbar-hide"
        style={{
          paddingBottom: bottomSafeArea ? safeArea.bottom + "px" : undefined,
        }}
      >
        {children}
      </div>
    </Wrapper>
  );
};

export default Drawer;

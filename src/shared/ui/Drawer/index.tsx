import { Wrapper } from "@/shared/ui/Drawer/style";
import { Props } from "./types";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";

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

import { Wrapper } from "@/shared/ui/Drawer/style";
import { Props } from "./types";

const Drawer = ({ children, ...props }: Props) => {
  return (
    <Wrapper {...props} anchor="bottom" disableScrollLock>
      <div className="mt-[24px] max-h-[80vh]">{children}</div>
    </Wrapper>
  );
};

export default Drawer;

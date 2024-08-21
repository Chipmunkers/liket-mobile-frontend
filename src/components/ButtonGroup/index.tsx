import { StrictPropsWithChildren } from "@/types/common";

type ButtonGroupProps = StrictPropsWithChildren<{
  gap: number;
}>;

/**
 * @deprecated
 */
const ButtonGroup = ({ children, gap }: ButtonGroupProps) => {
  return (
    <div
      className="flex w-[100%]"
      style={{
        gap,
      }}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;

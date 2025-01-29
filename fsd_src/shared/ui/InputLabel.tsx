import { classNames } from "../helper/style";
import { SharedUiProps, StrictPropsWithChildren } from "../type/react";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 최대 길이. 최대 길이에 걸리면 다른 스타일이 표현됨
     */
    maxLength?: number;

    /**
     * 현재 길이. 최대 길이 비교를 위함
     */
    currentLength?: number;
    htmlFor?: string;

    /**
     * 필수 여부. 필수일 경우 이름 에스터리스크가 붙어서 표현됨
     *
     * @default false
     */
    required?: boolean;
  }>
>;

const InputLabel = ({
  currentLength,
  maxLength,
  htmlFor,
  children,
  required = false,
  className = "",
}: Props) => {
  const labelTextClassName = "text-caption text-grey-04";

  if (maxLength && typeof currentLength === "number") {
    return (
      <div
        className={classNames(`flex flex-row `, labelTextClassName, className)}
      >
        <label className="flex-1">{children}</label>
        <div className="text-numbering3 text-grey-04">
          {currentLength} / {maxLength}
        </div>
      </div>
    );
  }

  return (
    <label
      className={classNames(labelTextClassName, className)}
      htmlFor={htmlFor}
    >
      {children}
      {required && <span className="text-top">*</span>}
    </label>
  );
};

export default InputLabel;

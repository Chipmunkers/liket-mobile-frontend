import { StrictPropsWithChildren } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { variantToStyleMap, variantWithDisabledStyleMap } from "@/utils/style";
import {
  ReactNode,
  CSSProperties,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import {
  FieldPath,
  FieldValues,
  FormState,
  UseFormRegister,
} from "react-hook-form";

type InputWrapperProps = StrictPropsWithChildren<{
  margin?: string;
}>;

/**
 * @deprecated
 */
export const InputWrapper = ({ children, margin = "" }: InputWrapperProps) => {
  return (
    <div
      style={{
        margin,
      }}
      className="relative flex flex-col"
    >
      {children}
    </div>
  );
};

interface LabelProps {
  maxLength?: number;
  currentLength?: number;
  htmlFor: string;
  children?: ReactNode;
  style?: CSSProperties;
  required?: boolean;
}

export const Label = ({
  currentLength,
  maxLength,
  htmlFor,
  children,
  style,
  required = false,
}: LabelProps) => {
  const labelTextClassName = "text-caption text-grey-04";

  if (maxLength && typeof currentLength === "number") {
    return (
      <div className={`flex flex-row ${labelTextClassName}`}>
        <label className="flex-1" style={style}>
          {children}
        </label>
        <div className="text-numbering3 text-grey-04">
          {currentLength} / {maxLength}
        </div>
      </div>
    );
  }

  return (
    <label className={labelTextClassName} htmlFor={htmlFor} style={style}>
      {children}
      {required && <span className="text-top">*</span>}
    </label>
  );
};

interface InputProps<T extends FieldValues>
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  field: FieldPath<T>;
  formState: FormState<T>;
  register: UseFormRegister<T>;
}

export const Input = <T extends FieldValues>({
  field,
  formState,
  required,
  onChange,
  register,
  ...props
}: InputProps<T>) => {
  const errors = formState.errors;
  const isErrorExist = errors[field]?.message ? true : false;

  return (
    <>
      <input
        aria-invalid={!!isErrorExist}
        aria-required={!!required}
        required={required}
        className={classNames(
          "w-[100%] box-border pl-[8px] pr-[8px] pt-[16px] text-body3 border-b-[1px] border-b-grey-01 focus:border-b-[2px] focus:pb-[14px] placeholder:text-button4 placeholder:text-grey-02",
          isErrorExist
            ? "border-b-[2px] border-b-rosepink-01 focus:border-b-rosepink-01 pb-[14px]"
            : "focus:border-b-skyblue-01 pb-[15px]"
        )}
        id={field}
        {...register(field, { onChange })}
        {...props}
      />
      {errors[field]?.message?.toString() && (
        <strong
          className="text-button6 text-rosepink-01 mt-[4px] h-[18px]"
          aria-live="assertive"
        >
          {errors[field]?.message?.toString()}
        </strong>
      )}
    </>
  );
};

type ButtonProps = StrictPropsWithChildren<
  {
    disabled: boolean;
    onClick: () => void;
  },
  string
>;

export const InputButton = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "px-[8px] text-button4 rounded-[12px] h-[24px] absolute right-0 top-1/2 transform -translate-y-1/2",
        disabled
          ? variantWithDisabledStyleMap["primary"]
          : variantToStyleMap["ghost"]
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

type TextProps = StrictPropsWithChildren<{ isShown: boolean }, string>;

export const InputText = ({ children, isShown }: TextProps) => {
  return (
    <>
      {isShown && (
        <div className="absolute text-button6 right-0 top-1/2 transform -translate-y-1/2 text-rosepink-01">
          {children}
        </div>
      )}
    </>
  );
};

interface InputLikeButtonProps {
  placeholder: string;
  subButtonText?: string;
  text?: string;
  onClick?: () => void;
}

export const InputLikeButton = ({
  text = "",
  placeholder,
  subButtonText,
  onClick,
}: InputLikeButtonProps) => {
  return (
    <>
      <button
        type="button"
        className={classNames(
          "text-left box-border pl-[8px] pr-[8px] pt-[16px] pb-[15px] text-body3 border-b-[1px] border-b-grey-01",
          text ? "text-button4" : "text-button4 text-grey-02"
        )}
        onClick={onClick}
      >
        {text || placeholder}
      </button>
      {subButtonText && (
        <button
          className={classNames(
            "px-[8px] text-button4 rounded-[12px] h-[24px] absolute bottom-0 right-0 mb-[12px]",
            variantToStyleMap["ghost"]
          )}
          onClick={onClick}
          type="button"
        >
          {subButtonText}
        </button>
      )}
    </>
  );
};

const InputAsReadOnly = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="box-border pl-[8px] pr-[8px] pt-[16px] pb-[15px] text-body3 border-b-[1px] border-b-grey-01 focus:border-b-[2px] placeholder:text-button4 placeholder:text-grey-02">
      {children}
    </div>
  );
};

Input.AsReadOnly = InputAsReadOnly;

const LabelAsReadOnly = ({ children }: StrictPropsWithChildren) => {
  return <div className="text-caption text-grey-04">{children}</div>;
};

Label.AsReadOnly = LabelAsReadOnly;

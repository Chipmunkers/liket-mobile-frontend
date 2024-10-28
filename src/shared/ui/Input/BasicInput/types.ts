import {
  FieldPath,
  FieldValues,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { DetailedHTMLProps, InputHTMLAttributes, MouseEvent } from "react";

export type Props<T extends FieldValues> = {
  field?: FieldPath<T>;
  formState?: FormState<T>;
  register?: UseFormRegister<T>;

  /**
   * Input 버튼. 없을 경우 버튼이 표시되지 않음
   *
   * @example 인증받기
   */
  buttonText?: string;

  /**
   * Input 버튼 클릭 이벤트.
   */
  buttonOnClick?: (e: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Input 버튼 className
   *
   * @default ""
   */
  buttonClassName?: string;

  /**
   * Input 버튼 disabled 상태
   *
   * @default false
   */
  buttonDisabled?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

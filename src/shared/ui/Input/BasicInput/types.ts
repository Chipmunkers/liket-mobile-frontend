import {
  FieldPath,
  FieldValues,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type Props<T extends FieldValues> = {
  field?: FieldPath<T>;
  formState?: FormState<T>;
  register?: UseFormRegister<T>;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

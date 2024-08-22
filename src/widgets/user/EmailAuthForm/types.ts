import { WidgetUiProps } from "@/shared/types/react";

export type Props = WidgetUiProps<{
  updateForm: (insertedFormData: { email: string; emailToken: string }) => void;
}>;

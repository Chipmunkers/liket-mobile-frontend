import { WEBVIEW_SCREEN, WebviewScreen } from "@/shared/consts/webview/screen";
import { SharedUiProps, StrictPropsWithChildren } from "@/shared/types/react";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    screen: (typeof WEBVIEW_SCREEN)[WebviewScreen];
    href: string;
  }>,
  string
>;

import CreateContentTemplate from "@/widgets/content/CreateContentTemplate";
import { CREATE_CONTENT_DEFAULT_VALUES } from "@/widgets/content/CreateContentTemplate/_util/const";
import { useCreateContent } from "./hooks/useCreateContent";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { useRouter } from "next/navigation";
import customToast from "@/shared/helpers/customToast";

export default function CreateContentPage() {
  const router = useRouter();
  const { mutate: createContent, status } = useCreateContent({
    onSuccess: ({ data }) => {
      stackRouterPush(router, {
        path: `/requested-contents/${data.idx}`,
        screen: WEBVIEW_SCREEN.REQUESTED_CONTENT_DETAIL,
        isStack: true,
      });
    },
    onError: () => {
      customToast("라이켓 제작에 실패했어요");
    },
  });

  return (
    <CreateContentTemplate
      {...CREATE_CONTENT_DEFAULT_VALUES}
      upsertContent={(data) => createContent(data)}
      createContentStatus={status}
    />
  );
}

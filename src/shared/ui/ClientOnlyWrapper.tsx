import dynamic from "next/dynamic";
import { FunctionComponent, PropsWithChildren } from "react";

const ClientOnlyWrapper: FunctionComponent<PropsWithChildren> = ({
  children,
}) => children;

export default dynamic(() => Promise.resolve(ClientOnlyWrapper), {
  ssr: false,
});

export {};

declare global {
  interface Window {
    isWebview?: boolean;
    ReactNativeWebView: {
      postMessage(msg: string): void;
    };
    daum: any;
    safeAreaBottom: number;
  }
}

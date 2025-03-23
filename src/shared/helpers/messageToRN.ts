export const messageToRN = (message: object) => {
  try {
    if (typeof window !== "undefined" && "ReactNativeWebView" in window) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
  } catch (e) {
    console.error(e);
  }
};

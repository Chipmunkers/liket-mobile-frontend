export const isExternalLink = (href: string): boolean => {
  if (href.startsWith("http")) {
    return true;
  }

  if (href.startsWith("/")) {
    return false;
  }

  return false;
};

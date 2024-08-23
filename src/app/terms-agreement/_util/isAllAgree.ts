export const isAllAgree = (checkList: boolean[]) => {
  for (let i = 0; i < checkList.length; i++) {
    if (!checkList[i]) return false;
  }
  return true;
};

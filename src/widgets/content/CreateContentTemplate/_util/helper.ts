import { CONDITIONS } from "./const";

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export const findIdxByName = (
  list: ReadonlyArray<{ idx: number; name: string }>,
  name: string
): number | undefined => {
  return list.find((item) => item.name === name)?.idx;
};

export const findIdxListByNames = (
  list: ReadonlyArray<{ idx: number; name: string }>,
  names: string[]
): number[] => {
  return names
    .map((name) => list.find((item) => item.name === name)?.idx)
    .filter((idx): idx is number => idx !== undefined);
};

interface ContentConditions {
  isReservation: boolean;
  isParking: boolean;
  isPet: boolean;
  isFee: boolean;
}

export const getContentConditions = ({
  isReservation,
  isParking,
  isPet,
  isFee,
}: ContentConditions): string[] => {
  const conditionMap = {
    예약: isReservation,
    주차: isParking,
    반려동물: isPet,
    입장료: isFee,
  } as const;

  return CONDITIONS.reduce<string[]>((result, condition) => {
    if (conditionMap[condition as keyof typeof conditionMap]) {
      result.push(condition);
    }
    return result;
  }, []);
};

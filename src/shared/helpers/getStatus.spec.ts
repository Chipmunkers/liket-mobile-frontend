import { getStatus } from "./getStatus";

const mockToday = "2024-01-10";

jest.mock("dayjs", () => {
  const originalDayjs = jest.requireActual("dayjs");

  return (...args: any[]) => {
    if (args.length === 0) {
      return originalDayjs(mockToday);
    }

    return originalDayjs(...args);
  };
});

/**
 * getStatus가 가질 수 있는 상태는 다음과 같음
 *
 * willActive: 오픈 예정
 * willClosed: 종료 예정
 * active: 오픈
 * closed: 종료
 */

describe("getStatus", () => {
  describe("willActive", () => {
    it("오늘이 시작일보다 전인 경우 willActive", () => {
      const startDate = "2024-01-11";
      const endDate = "2024-01-12";
      expect(getStatus(startDate, endDate)).toBe("willActive");
    });

    it("시작일과 종료일이 같고, 오늘이 시작일보다 전인 경우 willActive", () => {
      const startDate = "2024-01-11";
      const endDate = "2024-01-11";
      expect(getStatus(startDate, endDate)).toBe("willActive");
    });
  });

  describe("willClosed", () => {
    it("오늘이 시작일이고, (종료일 - 3일)보다 이후인 경우 willClosed", () => {
      const startDate = "2024-01-10";
      const endDate = "2024-01-11";
      expect(getStatus(startDate, endDate)).toBe("willClosed");
    });

    it("오늘이 시작일보다 이후이고, (종료일 - 3일)보다 이후인 경우 willClosed", () => {
      const startDate = "2024-01-09";
      const endDate = "2024-01-13";
      expect(getStatus(startDate, endDate)).toBe("willClosed");
    });

    it("오늘이 시작일이고, 시작일과 종료일이 같은 경우 willClosed", () => {
      const startDate = "2024-01-10";
      const endDate = "2024-01-10";
      expect(getStatus(startDate, endDate)).toBe("willClosed");
    });

    it("오늘이 종료일인 경우 willClosed", () => {
      const startDate = "2024-01-07";
      const endDate = "2024-01-10";
      expect(getStatus(startDate, endDate)).toBe("willClosed");
    });
  });

  describe("closed", () => {
    it("오늘이 종료일 이후인 경우 closed", () => {
      const startDate = "2024-01-09";
      const endDate = "2024-01-09";
      expect(getStatus(startDate, endDate)).toBe("closed");
    });
  });

  describe("active", () => {
    it("오늘이 시작일이고 (종료일 - 3일)보다 전인 경우 active", () => {
      const startDate = "2024-01-10";
      const endDate = "2024-01-14";
      expect(getStatus(startDate, endDate)).toBe("active");
    });

    it("오늘이 시작일보다 이후이고 (종료일 - 3일)보다 전인 경우 active", () => {
      const startDate = "2024-01-09";
      const endDate = "2024-01-14";
      expect(getStatus(startDate, endDate)).toBe("active");
    });
  });
});

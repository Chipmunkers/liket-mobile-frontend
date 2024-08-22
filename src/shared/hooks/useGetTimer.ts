import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

/**
 * 타이머를 가져오는 커스텀 훅
 *
 * @param limitSecond 제한 시간
 * @param timeoutEvent 타이머가 끝났을 때
 */
export const useGetTimer = (limitSecond: number, timeoutEvent?: () => void) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + limitSecond);

  const {
    hours,
    minutes,
    seconds,
    isRunning,
    start,
    restart: useTimerRestart,
  } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
  });

  useEffect(() => {
    if (!hours && !minutes && !seconds) timeoutEvent && timeoutEvent();
  }, [hours, minutes, seconds]);

  const restart = () => {
    const time = new Date();

    time.setSeconds(time.getSeconds() + limitSecond);

    useTimerRestart(time);
  };

  return { minutes, seconds, isRunning, start, restart, time };
};

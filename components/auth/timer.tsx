import { timerState } from '@/recoil/timer/atoms';
import { cls } from '@/utils/cls';
import { memo, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface TimerProps {
  isActive?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ isActive }) => {
  const MINUTES_IN_MS = 3 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useRecoilState(timerState);
  const [isExpired, setIsExpired] = useState(false);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = Math.max(0, prevTime - INTERVAL);
        if (newTime <= 0) {
          setIsExpired(true);
        }
        return newTime;
      });
    }, INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [setTimeLeft]);

  useEffect(() => {
    // When isActive prop changes, update the isExpired state accordingly
    setIsExpired(timeLeft <= 0 || !isActive);
  }, [timeLeft, isActive]);

  return (
    <div
      className={cls(
        'flex text-15 w-72 h-50 px-7 py-5 rounded-17 items-center justify-center bg-gray',
        isExpired ? 'text-gray_90' : isActive ? 'text-purple_sub' : 'text-gray', // Use isActive prop directly for text color change
      )}
    >
      {minutes}:{seconds}
    </div>
  );
};

Timer.displayName = 'Timer';

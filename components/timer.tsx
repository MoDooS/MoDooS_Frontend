import { cls } from '@/utils/cls';
import { memo, useEffect, useState } from 'react';

export const Timer = memo(() => {
  const MINUTES_IN_MS = 3 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);
  const [timeout, setTimeout] = useState(false);
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
      console.log('타이머가 종료되었습니다.');
      setTimeout(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <div
      className={cls(
        'flex  text-15 bg-gray w-72 h-50 px-7 py-5 rounded-17 items-center justify-center',
        timeout ? 'text-gray_90' : 'text-purple_sub',
      )}
    >
      {minutes}:{second}
    </div>
  );
});

Timer.displayName = 'Timer';

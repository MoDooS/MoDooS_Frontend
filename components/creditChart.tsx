import creditColors from '@/constants/creditColors';
import { CreditRating } from '@/lib/creditRating';
import React, { HTMLAttributes } from 'react';

// 신용 등급 원형 차트
// className으로 width,height 전달해주어야 함

interface Props extends HTMLAttributes<HTMLDivElement> {
  creditRating: CreditRating;
  creditScore: number;
}

export default function CreditChart({ creditRating, creditScore, ...props }: Props) {
  return (
    <div className={props.className ?? ''}>
      <div
        style={{
          background: `conic-gradient(from 270deg, #AC00FD 0% ${(creditScore / 1000) * 50}%, #fff ${
            (creditScore / 1000) * 50
          }% 50%, transparent 0`,
        }}
        className='w-full h-full rounded-full flex justify-center items-center overflow-hidden'
      >
        <div className='bg-bg1 w-[calc(100%-14px)] h-[calc(100%-14px)] rounded-full flex flex-col items-center pt-25'>
          <div className='text-32 text-primary font-bold leading-30'>{creditRating}</div>
          <div className='text-12 text-secondary font-normal'>{creditScore}점/1000점</div>
        </div>
      </div>
    </div>
  );
}

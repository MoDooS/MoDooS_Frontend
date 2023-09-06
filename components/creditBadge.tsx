import creditColors, { creditColorsRGB } from '@/constants/creditColors';
import { CreditRating } from '@/lib/creditRating';
import { cls } from '@/utils/cls';
import React, { HTMLAttributes } from 'react';

export default function CreditBadge({ credit, ...props }: { credit: CreditRating } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{ borderColor: creditColors[credit], backgroundColor: `rgba(${creditColorsRGB[credit].join(',')},0.1)` }}
      className={cls(`justify-center flex items-center gap-27 w-80 h-80 rounded-full border`, props.className ?? '')}
    >
      <span style={{ color: creditColors[credit] }} className={`text-36 font-bold opacity-100`}>
        {credit}
      </span>
    </div>
  );
}

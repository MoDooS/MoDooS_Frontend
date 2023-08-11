import { cls } from '@/utils/cls';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Hr({ ...props }: Props) {
  return <div className={cls('bg-[#CBD4E1] w-full h-1', props.className ?? '')} />;
}

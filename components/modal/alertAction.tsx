import { cls } from '@/utils/cls';
import React from 'react';

export type AlertActionStyle = 'primary' | 'destructive' | 'normal';

export interface AlertActionOptions {
  title: string;
  style: AlertActionStyle;
  handler: (() => void) | null;
}

interface AlertActionProps extends AlertActionOptions {
  closeAlert: () => void;
}

export default function AlertAction({ title, style, handler, closeAlert }: AlertActionProps) {
  const handleClickAction = () => {
    closeAlert();
    if (handler) {
      handler();
    }
  };
  return (
    <button
      className={cls(
        'py-8 px-12 rounded-12 text-14',
        style === 'primary'
          ? 'bg-primary text-white'
          : style === 'destructive'
          ? 'bg-danger text-white'
          : 'bg-none text-black',
      )}
      onClick={handleClickAction}
    >
      {title}
    </button>
  );
}

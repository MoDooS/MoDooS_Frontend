import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function StopPropagation({ children, ...props }: Props) {
  return (
    <div onClick={(e) => e.stopPropagation()} className={props.className ?? ''}>
      {children}
    </div>
  );
}

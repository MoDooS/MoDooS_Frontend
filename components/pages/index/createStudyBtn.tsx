import { cls } from '@/utils/cls';
import React, { HTMLAttributes } from 'react';
import styles from './createStudyBtn.module.css';
import PlusIcon from '../../../public/icons/plus.svg';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export default function CreateStudyBtn({ onClick, ...props }: Props) {
  return (
    <button
      onClick={onClick}
      className={cls(
        'w-200 flex items-center bg-[#F9F2FD] rounded-full border-1 border-primary border-r-0',
        props.className ?? '',
      )}
    >
      <div className='w-full flex justify-center items-center text-primary font-medium text-16'>스터디 생성하기</div>
      <div className='flex justify-center items-center shrink-0 p-14 bg-white text-primary text-50 border-1 border-primary rounded-full'>
        <PlusIcon width='24' height='24' />
      </div>
    </button>
  );
}

import { StudyStatusType } from '@/types/studyInfo';
import { cls } from '@/utils/cls';
import React from 'react';

type Props = {
  status: StudyStatusType;
};

export default function StudyStatus({ status }: Props) {
  return (
    <div
      className={cls(
        'flex justify-center items-center py-3 px-10 rounded-full text-14 font-bold',
        status === '모집 중'
          ? 'bg-[#E1FCDE] text-[#016A1C]'
          : status === '모집 마감'
          ? 'bg-[#FFF2D2] text-[#BA5900]'
          : 'bg-[#FFD4D8] text-[#B1000F]',
      )}
    >
      {status}
    </div>
  );
}

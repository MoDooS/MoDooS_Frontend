import React from 'react';
import Link from 'next/link';
import { StudyInfo } from '@/pages';
import { cls } from '@/utils/cls';
import HeartIcon from '../../../public/icons/heart.svg';

type Props = {
  studyInfo: StudyInfo;
};

export default function StudyCard({ studyInfo }: Props) {
  return (
    <Link
      href={`/recruit/${studyInfo.id}`}
      className='w-270 h-306 flex flex-col justify-between pt-40 pb-22 px-24 border-1 border-[#D1D1D1] rounded-20'
    >
      <div>
        {/* 프로그래밍 | 모집중 | 하트 아이콘 */}
        <div className='mb-20 flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <div className='px-10 py-3 text-[#656565] font-bold text-10 bg-[#efefef] rounded-full'>
              {studyInfo.category}
            </div>
            <div
              className={cls(
                'px-10 py-3 font-bold text-10 rounded-full',
                studyInfo.status === '모집 중' ? 'bg-[#E1FCDE] text-[#016A1C]' : '',
              )}
            >
              {studyInfo.status}
            </div>
          </div>
          {/* <HeartIcon width='25' height='25' /> */}
        </div>

        {/* 스터디 제목 */}
        <div className='font-medium text-black text-16'>{studyInfo.title}</div>
      </div>

      <div>
        {/* 밑줄 */}
        <div className='bg-[#F2F2F2] w-full h-2 mb-10' />

        {/* 스터디장 정보 */}
        <div className='flex items-center gap-7'>
          <div className='w-30 h-30 bg-[#EFEFEF] rounded-full'></div>
          <span className=' font-medium text-black text-12'>{studyInfo.leader.nickname}</span>
        </div>
      </div>
    </Link>
  );
}

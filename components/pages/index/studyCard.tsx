import React from 'react';
import Link from 'next/link';
import { cls } from '@/utils/cls';
import HeartIcon from '../../../public/icons/heart.svg';
import { StudyInfo, studyStatusMapping } from '@/types/studyInfo';

type Props = {
  studyInfo: StudyInfo;
};

export default function StudyCard({ studyInfo }: Props) {
  const studyStatus = studyStatusMapping[studyInfo.status];
  return (
    <Link
      href={`/recruit/${studyInfo.id}`}
      className='w-270 h-306 flex flex-col justify-between pt-40 pb-22 px-24 bg-white border-1 border-[#D1D1D1] rounded-20'
    >
      <div>
        {/* 카테고리 | 모집중 | 하트 아이콘 */}
        <div className='mb-20 flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <div className='px-10 py-3 text-[#656565] font-bold text-14 bg-[#efefef] rounded-full'>
              {studyInfo.category}
            </div>
            <div
              className={cls(
                'px-10 py-3 font-bold text-14 rounded-full',
                studyStatus === '모집 중' ? 'bg-[#E1FCDE] text-[#016A1C]' : '',
              )}
            >
              {studyStatus}
            </div>
          </div>
          {/* <HeartIcon width='25' height='25' /> */}
        </div>

        {/* 마감일 */}
        <div className='mb-10 text-12 text-gray_70 font-medium'>마감일 | {studyInfo.recruit_deadline}</div>
        {/* 스터디 제목 */}
        <div className='font-medium text-black text-16'>{studyInfo.title}</div>
      </div>

      <div>
        {/* 밑줄 */}
        <div className='bg-[#F2F2F2] w-full h-2 mb-10' />

        {/* 스터디장 정보 */}
        <div className='flex items-center gap-7'>
          <div className='w-30 h-30 bg-[#EFEFEF] rounded-full'></div>
          <span className=' font-medium text-black text-12'>{studyInfo.leader_nickname}</span>
        </div>
      </div>
    </Link>
  );
}

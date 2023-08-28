import React, { useState } from 'react';
import Link from 'next/link';
import { cls } from '@/utils/cls';
import HeartIcon from '../public/icons/heart.svg';
import { StudyInfo, studyStatusMapping } from '@/types/studyInfo';
import { useMutation, useQueryClient } from 'react-query';
import heartRecruit from '@/apis/heartRecruit';
import { StudyContent } from '@/apis/getRecruitList';
import { RECRUITS_QUERY_KEY } from '@/hooks/queries/recruit/useRecruitsQuery';
import { useRouter } from 'next/router';
import { useUserQuery } from '@/hooks/queries/user/useUserQuery';
import { INTEREST_STUDIES_QUERY_KEY } from '@/hooks/queries/study/useInterestStudiesQuery';
import StudyStatus from './studyStatus';

type Props = {
  studyInfo: StudyContent;
};

export default function StudyCard({ studyInfo }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isHeartRecruit, setIsHeartRecruit] = useState(studyInfo.heart);
  const { user } = useUserQuery();
  const heartRecruitMutation = useMutation(heartRecruit, {
    onMutate: () => setIsHeartRecruit((prev) => !prev),
    onSuccess: () => {
      queryClient.invalidateQueries(RECRUITS_QUERY_KEY);
      queryClient.invalidateQueries(INTEREST_STUDIES_QUERY_KEY);
    },
  });

  return (
    <article
      onClick={() => router.push(`/recruit/${studyInfo.id}`)}
      className='w-270 h-306 flex flex-col justify-between pt-40 pb-22 px-24 bg-white border-1 border-[#D1D1D1] rounded-20 cursor-pointer'
    >
      <div>
        {/* 카테고리 | 모집중 | 하트 아이콘 */}
        <div className='mb-20 flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <div className='px-10 py-3 text-[#656565] font-bold text-14 bg-[#efefef] rounded-full'>
              {studyInfo.category}
            </div>
            <StudyStatus status={studyInfo.status} />
          </div>
          {user && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                heartRecruitMutation.mutate(studyInfo.id);
              }}
            >
              {isHeartRecruit ? <div className='text-28 w-28 h-27'>💘</div> : <HeartIcon />}
            </button>
          )}
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
    </article>
  );
}

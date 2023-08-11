import { postNewRecruitComment } from '@/apis/newRecruitComment';
import { postNewRecruit } from '@/apis/newRecruit';
import AutoResizableTextarea from '@/components/autoResizableTextarea';
import Hr from '@/components/hr';
import Layout from '@/components/layouts/layout';
import Comments from '@/components/pages/recruit/[id]/comments';
import StudyStatus from '@/components/studyStatus';
import { RECRUIT_COMMENTS_QUERY_KEY } from '@/query/recruit/useRecruitCommentsQuery';
import { useRecruitDetailQuery } from '@/query/recruit/useRecruitDetailQuery';
import { studyStatusMapping } from '@/query/recruit/useRecruitsQuery';
import useAlert from '@/recoil/alert/useAlert';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import LinkIcon from '../../public/icons/link.svg';

const Avatar = () => <div className=' w-60 h-60 bg-gray_60 rounded-full shrink-0'></div>;

export default function RecruitDetail() {
  const router = useRouter();
  const recruitId = router.query.id as string;
  const queryClient = useQueryClient();
  const { study, isLoading: isStudyLoading, isError: isStudyError } = useRecruitDetailQuery(recruitId);
  const { showAlert } = useAlert();

  return (
    <Layout>
      {study && (
        <main className='flex flex-col items-center pt-100 px-200'>
          <div className='w-full'>
            <h1 className=' mb-30 font-bold text-36'>알고리즘 스터디</h1>
            <span className='block mb-20 text-gray_70 font-normal text-14'>박지수 {' | '} 2023.07.12</span>
            <Hr className='mb-30' />
            {/* 상단 모집 정보 */}
            <div className='flex items-center justify-between max-w-600 w-full mb-80'>
              <div className='flex items-center gap-40'>
                <div className='flex flex-col gap-40 text-gray_70 text-14'>
                  <span>모집 인원</span>
                  <span>캠퍼스</span>
                  <span>카테고리</span>
                  <span>연락 방법</span>
                  <span>링크</span>
                </div>
                <div className='flex flex-col gap-40 text-black text-14'>
                  <span>{study.participants_count}명</span>
                  <span>{study.campus}</span>
                  <span>{study.category}</span>
                  <span>{study.contact ?? '미입력'}</span>
                  {study.link ? (
                    <a
                      href={study.link}
                      target='_blank'
                      className='flex items-center gap-4 bg-gray py-5 px-10 rounded-full text-[#656565] font-bold cursor-pointer hover:bg-gray_50'
                    >
                      <span>{study.link}</span>
                      <LinkIcon />
                    </a>
                  ) : (
                    <span>미입력</span>
                  )}
                </div>
              </div>
              <div className='flex items-center gap-40'>
                <div className='flex flex-col gap-40 text-gray_70 text-14'>
                  <span>진행 방식</span>
                  <span>시작 예정</span>
                  <span>마감 예정</span>
                  <span>모집 마감일</span>
                  <span>모집 상태</span>
                </div>
                <div className='flex flex-col gap-40 text-black text-14'>
                  <span>{study.channel}</span>
                  <span>{study.expected_start_at}</span>
                  <span>{study.expected_end_at}</span>
                  <span>{study.recruit_deadline}</span>
                  <StudyStatus status={studyStatusMapping[study.status]} />
                </div>
              </div>
            </div>
            {/* 스터디 소개 */}
            <h3 className='mb-20 font-semibold text-24'>스터디 소개</h3>
            <Hr className='mb-20' />
            <div className=' mb-100 font-medium text-16 text-black leading-50'>{study.description}</div>

            {/* 스터디 규칙 */}
            <h3 className='mb-20 font-semibold text-24'>스터디 규칙</h3>
            <Hr className='mb-20' />
            <div className=' mb-100 flex flex-col gap-10'>
              {study.checkList.map((checkList, i) => (
                <div
                  key={i}
                  className='w-full text-14 font-medium text-gray_70 bg-white px-14 py-10 border-1 border-[#D9D9D9] rounded-5'
                >{`${i + 1}. ${checkList.content}`}</div>
              ))}
            </div>
            {/* 스터디 참여 인원 */}
            {/* <h3 className='mb-20 font-semibold text-24'>스터디 참여인원 </h3>
            <Hr className='mb-20' />
            <div className='mb-100 flex gap-50'></div> */}
            <div className='flex justify-end mb-30'>
              <button className=' text-14 font-medium px-14 py-10 text-white bg-primary rounded-14'>참여하기</button>
            </div>
            <Hr className='mb-30' />

            {/* 댓글 */}

            <Comments recruitId={recruitId} />
          </div>
        </main>
      )}
    </Layout>
  );
}

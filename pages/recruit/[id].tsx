import Hr from '@/components/hr';
import Layout from '@/components/layouts/layout';
import Comments from '@/components/pages/recruit/[id]/comments';
import { useRecruitDetailQuery } from '@/query/recruit/useRecruitDetailQuery';
import { useRouter } from 'next/router';
import React from 'react';
import LinkIcon from '../../public/icons/link.svg';
import StudyStatus from '@/components/studyStatus';
import { studyStatusMapping } from '@/types/studyInfo';

const Avatar = () => <div className=' w-60 h-60 bg-gray_60 rounded-full shrink-0'></div>;

type UserType = 'owner' | 'participated' | 'unparticipated'; // 스터디 생성자 | 참여중인 | 아무것도 아닌

export default function RecruitDetail() {
  const router = useRouter();
  const recruitId = router.query.id as string;
  const { recruit, isLoading: isRecruitLoading, isError: isRecruitError } = useRecruitDetailQuery(recruitId);

  // TODO: 추후에 백엔드에서 unparticipated 정보 받으면 반영해야됨
  const userType: UserType = !recruit ? 'unparticipated' : recruit.written ? 'owner' : 'participated';

  return (
    <Layout>
      {recruit && (
        <main className='flex flex-col items-center pt-100 px-200'>
          <div className='w-full bg-white p-50 rounded-30'>
            <h1 className=' mb-30 font-bold text-36'>알고리즘 스터디</h1>
            <span className='block mb-20 text-gray_70 font-normal text-14'>박지수 {' | '} 2023.07.12</span>
            <Hr className='mb-30' />
            {/* 상단 모집 정보 */}
            <div className='flex items-center justify-between max-w-600 w-full mb-80'>
              <div className='flex items-center gap-40 h-260'>
                <div className='flex flex-col h-full text-gray_70 text-14'>
                  <span className='mb-38'>모집 인원</span>
                  <span className='mb-38'>캠퍼스</span>
                  <span className='mb-38'>카테고리</span>
                  <span className='mb-38'>연락 방법</span>
                  <span>링크</span>
                </div>
                <div className='flex flex-col h-full text-black text-14'>
                  <span className='mb-38'>{recruit.participants_count}명</span>
                  <span className='mb-38'>{recruit.campus}</span>
                  <span className='mb-38'>{recruit.category}</span>
                  <span className='mb-38'>{recruit.contact ?? '미입력'}</span>
                  {recruit.link ? (
                    <a
                      href={recruit.link}
                      target='_blank'
                      className='flex items-center gap-4 bg-gray py-5 px-10 rounded-full text-[#656565] font-bold cursor-pointer hover:bg-gray_50'
                    >
                      <span>{recruit.link}</span>
                      <LinkIcon />
                    </a>
                  ) : (
                    <span>미입력</span>
                  )}
                </div>
              </div>
              <div className='flex items-center gap-40 h-260'>
                <div className='flex flex-col justify-between h-full text-gray_70 text-14'>
                  <span className='mb-38'>진행 방식</span>
                  <span className='mb-38'>시작 예정</span>
                  <span className='mb-38'>마감 예정</span>
                  <span className='mb-38'>모집 마감일</span>
                  <span>모집 상태</span>
                </div>
                <div className='flex flex-col h-full text-black text-14'>
                  <span className='mb-38'>{recruit.channel}</span>
                  <span className='mb-38'>{recruit.expected_start_at}</span>
                  <span className='mb-38'>{recruit.expected_end_at}</span>
                  <span className='mb-38'>{recruit.recruit_deadline}</span>
                  <StudyStatus status={studyStatusMapping[recruit.status]} />
                </div>
              </div>
            </div>
            {/* 스터디 소개 */}
            <h3 className='mb-20 font-semibold text-24'>스터디 소개</h3>
            <Hr className='mb-20' />
            <div className=' mb-100 font-medium text-16 text-black leading-50'>{recruit.description}</div>

            {/* 스터디 규칙 */}
            <h3 className='mb-20 font-semibold text-24'>스터디 규칙</h3>
            <Hr className='mb-20' />
            <div className=' mb-100 flex flex-col gap-10'>
              {recruit.checkList.map((checkList, i) => (
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
              <button className=' text-14 font-medium px-14 py-10 text-white bg-primary rounded-14'>
                {userType === 'owner' ? '수정하기' : '참여하기'}
              </button>
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

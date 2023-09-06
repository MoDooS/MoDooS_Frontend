import Hr from '@/components/hr';
import Layout from '@/components/layouts/layout';
import Comments from '@/components/pages/recruit/[id]/comments';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import LinkIcon from '../../public/icons/link.svg';
import StudyStatus from '@/components/studyStatus';
import { studyStatusMapping } from '@/types/studyInfo';
import RecruitForm from '@/components/recruitForm';
import Banner from '@/components/layouts/banner';
import { useRecruitDetailQuery } from '@/hooks/queries/recruit/useRecruitDetailQuery';
import { useMutation } from 'react-query';
import applyStudy from '@/apis/applyStudy';
import useAlert from '@/recoil/alert/useAlert';
import { title } from 'process';
import { AxiosError } from 'axios';
import { useUserQuery } from '@/hooks/queries/user/useUserQuery';

const Avatar = () => <div className=' w-60 h-60 bg-gray_60 rounded-full shrink-0'></div>;

type UserType = 'owner' | 'normal'; // 스터디 생성자 | 일반 유저

export default function RecruitDetail() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const recruitId = router.query.id as string;
  const { recruit, isLoading: isRecruitLoading, isError: isRecruitError } = useRecruitDetailQuery(recruitId);
  const { user } = useUserQuery();
  const applyStudyMutation = useMutation(applyStudy);

  const userType: UserType = recruit?.written ? 'owner' : 'normal';

  // 참여하기 버튼 클릭
  function handleClickApplyStudy() {
    if (!recruit) return;
    if (!user) {
      showAlert({
        alertViewTitle: '로그인 후 이용할 수 있습니다.',
        alertActions: [{ title: '확인', style: 'primary', handler: () => router.push('/login') }],
      });
      return;
    }
    applyStudyMutation.mutate(recruit.id, {
      onSuccess: () =>
        showAlert({
          alertViewTitle: '스터디 참가 신청',
          alertViewDesc: '참가 신청 메세지를 전달했습니다.',
          alertActions: [{ title: '확인', style: 'primary', handler: null }],
        }),
    });
  }

  return (
    <Layout>
      <Banner title='' description='' />
      {recruit && (
        <main className='flex flex-col items-center pt-100 px-200'>
          <div className='w-full bg-white p-50 rounded-30'>
            <h1 className=' mb-30 font-bold text-36'>{recruit.title}</h1>
            <span className='block mb-20 text-gray_70 font-normal text-14'>
              {recruit.leader_nickname} {' | '} 2023.07.12
            </span>
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
                  <span className='mb-38'>{recruit.contact?.length ? recruit.contact : '미입력'}</span>
                  {recruit.link?.length ? (
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
                  <StudyStatus status={recruit.status} />
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
              {!recruit.checkList.length && (
                <div className='pt-50 flex items-center justify-center text-18 text-gray_70'>
                  해당 스터디에는 별도의 상세 규칙이 없습니다.
                </div>
              )}
            </div>
            {/* 스터디 참여 인원 */}
            <h3 className='mb-20 font-semibold text-24'>스터디 참여인원 </h3>
            <Hr className='mb-20' />
            <div className='mb-100 flex gap-10'>
              {recruit.participantList.map((participant) => (
                <button
                  key={participant.id}
                  onClick={() => router.push(`/user/${participant.id}`)}
                  className='flex justify-center items-center border-1 border-gray_60 rounded-12 py-8 px-12 text-16 font-medium'
                >
                  {participant.nickname}
                </button>
              ))}
            </div>

            {/* 버튼들 */}
            <div className='flex justify-end mb-30'>
              {userType === 'owner' && recruit.status === '모집 중' && (
                <div className='flex items-center gap-10'>
                  <button
                    onClick={() => router.push(`/recruit/edit/${recruit.id}`)}
                    className=' text-14 font-medium px-14 py-10 text-white bg-primary rounded-14'
                  >
                    모집글 수정하기
                  </button>
                  <button
                    onClick={() => router.push(`/study/setting/${recruit.id}`)}
                    className=' text-14 font-medium px-14 py-10 text-white bg-primary rounded-14'
                  >
                    스터디 시작하기
                  </button>
                </div>
              )}
              {userType === 'normal' && recruit.status === '모집 중' && (
                <button
                  onClick={handleClickApplyStudy}
                  className=' text-14 font-medium px-14 py-10 text-white bg-primary rounded-14'
                >
                  참여하기
                </button>
              )}
            </div>
            <Hr className='mb-30' />

            {/* 댓글 */}

            {user && <Comments recruitId={recruitId} />}
            {!user && (
              <div className='p-50 flex items-center justify-center text-18 text-gray_70'>
                로그인 후 댓글을 작성할 수 있습니다.
              </div>
            )}
          </div>
        </main>
      )}
    </Layout>
  );
}

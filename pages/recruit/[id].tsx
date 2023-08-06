import Hr from '@/components/hr';
import Layout from '@/components/layouts/layout';
import { useRecruitDetailQuery } from '@/query/recruit/useRecruitDetailQuery';
import { studyStatusMapping } from '@/query/recruit/useRecruitsQuery';
import { useRouter } from 'next/router';
import React from 'react';

const Avatar = () => <div className=' w-67 h-67 bg-gray_60 rounded-full shrink-0'></div>;

export default function StudyDetail() {
  const router = useRouter();
  const { study, isLoading: isStudyLoading, isError: isStudyError } = useRecruitDetailQuery(router.query.id as string);
  console.log(study);
  return (
    <Layout>
      {study && (
        <main className='flex flex-col items-center pt-100 px-200 bg-white'>
          <div className='w-full'>
            <h1 className=' mb-30 font-bold text-36'>알고리즘 스터디</h1>
            <span className='block mb-20 text-gray_70 font-normal text-14'>박지수 {' | '} 2023.07.12</span>
            <Hr className='mb-30' />
            {/* 상단 모집 정보 */}
            <div className='flex items-center gap-300 mb-80'>
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
                  <span>{study.link ?? '미입력'}</span>
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
                  <span>{studyStatusMapping[study.status]}</span>
                </div>
              </div>
            </div>
            {/* 스터디 소개 */}
            <h3 className='mb-20 font-semibold text-24'>스터디 소개</h3>
            <Hr className='mb-20' />
            <div className=' mb-100 font-medium text-16 text-black leading-50'>
              스터디 열심히 참여하실 분 모집합니다. 알고리즘 문제풀이 위주로 하고, 언어는 python으로 진행할 예정입니다.
              현재 비기너 수준의 2명이 있습니다. 스터디 열심히 참여하실 분 모집합니다. 알고리즘 문제풀이 위주로 하고,
              언어는 python으로 진행할 예정입니다. 현재 비기너 수준의 2명이 있습니다. 스터디 열심히 참여하실 분
              모집합니다. 알고리즘 문제풀이 위주로 하고, 언어는 python으로 진행할 예정입니다. 현재 비기너 수준의 2명이
              있습니다.
            </div>

            {/* 스터디 규칙 */}
            <h3 className='mb-20 font-semibold text-24'>스터디 규칙</h3>
            <Hr className='mb-20' />
            <div className=' mb-100 font-medium text-16 text-black'>
              스터디 열심히 참여하실 분 모집합니다. 알고리즘 문제풀이 위주로 하고, 언어는 python으로 진행할 예정입니다.
              현재 비기너 수준의 2명이 있습니다. 스터디 열심히 참여하실 분 모집합니다. 알고리즘 문제풀이 위주로 하고,
              언어는 python으로 진행할 예정입니다. 현재 비기너 수준의 2명이 있습니다. 스터디 열심히 참여하실 분
              모집합니다. 알고리즘 문제풀이 위주로 하고, 언어는 python으로 진행할 예정입니다. 현재 비기너 수준의 2명이
              있습니다.
            </div>
            <Hr className='mb-30' />

            {/* 댓글 쓰기 */}
            <h5 className=' font-semibold text-20 mb-30'>댓글 1개</h5>
            <div className='flex gap-10 mb-20'>
              <Avatar />
              <textarea className='w-full p-14 border-1 border-black rounded-14 text-14 outline-primary'></textarea>
            </div>
            <div className='flex justify-end'>
              <button className='py-8 px-23 bg-primary text-white text-16 font-semibold rounded-16'>댓글 등록</button>
            </div>
            {/* 댓글 */}
            <div className='flex justify-between'>
              <div className='flex gap-10 items-center'>
                <Avatar />
                <div className='flex flex-col gap-5'>
                  <span className='text-18 text-black font-semibold'>박지수</span>
                  <span className='text-8 text-gray_70 font-semibold'>2023-07-05 11:22:46</span>
                </div>
              </div>
              <div className=' flex items-end'></div>
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
}

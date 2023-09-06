import React from 'react';
import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import RecruitCard from '@/components/recruitCard';
import useInterestStudiesQuery from '@/hooks/queries/study/useInterestStudiesQuery';

export default function InterestStudy() {
  const { studies, isLoading, isError } = useInterestStudiesQuery();
  console.log(studies);
  return (
    <Layout>
      <MypageLayout className='overflow-y-scroll flex flex-col'>
        <h4 className='text-18 text-black font-medium mb-50'>관심 스터디 목록</h4>
        {studies && !studies.length && (
          <div className='flex justify-center items-center flex-grow w-full h-full font-normal text-20 text-gray_70'>
            찜한 스터디가 없어요.
          </div>
        )}
        {!!studies?.length && (
          <div className='flex flex-wrap gap-24'>
            {studies.map((study) => (
              <RecruitCard key={study.id} studyInfo={{ ...study, heart: study.hearted }} to={`/recruit/${study.id}`} />
            ))}
          </div>
        )}
      </MypageLayout>
    </Layout>
  );
}

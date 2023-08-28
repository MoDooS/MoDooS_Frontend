import React from 'react';
import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import StudyCard from '@/components/studyCard';
import useRecruitingStudyQuery from '@/hooks/queries/useRecruitingStudyQuery';

export default function RecruitingStudy() {
  const { recruitingStudy, isLoading, isError } = useRecruitingStudyQuery();
  return (
    <Layout>
      <MypageLayout className='flex flex-col'>
        <h4 className='text-18 text-black font-medium mb-50'>모집중인 스터디 목록</h4>
        {recruitingStudy && !recruitingStudy.length && (
          <div className='flex justify-center items-center flex-grow w-full h-full font-normal text-20 text-gray_70'>
            모집중인 스터디가 없어요.
          </div>
        )}
        {!!recruitingStudy?.length && (
          <div className='flex flex-wrap gap-24'>
            {recruitingStudy.map((study) => (
              <StudyCard key={study.id} studyInfo={study} />
            ))}
          </div>
        )}
      </MypageLayout>
    </Layout>
  );
}

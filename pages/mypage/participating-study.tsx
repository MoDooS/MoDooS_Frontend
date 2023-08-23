import React, { useState } from 'react';
import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import StudyCard from '@/components/studyCard';
import useInterestStudiesQuery from '@/hooks/queries/study/useInterestStudiesQuery';
import useMyStudiesQeury from '@/hooks/queries/study/useMyStudiesQuery';
import useParticipatingStudiesQuery from '@/hooks/queries/study/useParticipatingStudiesQuery';
import { StudyStatusType } from '@/types/studyInfo';
import DropDownSelect, { DropDownOption } from '@/components/select/dropDownSelect';

export default function ParticipatingStudy() {
  const [studyStatus, setStudyStatus] = useState<StudyStatusType | '전체'>('전체');
  const { studies, isLoading, isError } = useParticipatingStudiesQuery(studyStatus);
  console.log(studies);
  const studyStatusOptions: DropDownOption[] = [
    { value: '전체', content: '전체' },
    { value: '모집 중', content: '모집 중' },
    { value: '모집 마감', content: '모집 마감' },
    { value: '진행 중', content: '진행 중' },
    { value: '종료', content: '종료' },
  ];
  return (
    <Layout>
      <MypageLayout>
        <h4 className='text-18 text-black font-medium mb-50'>참여중인 스터디 목록</h4>
        {studies && !studies.length && (
          <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full font-normal text-20 text-gray_70'>
            해당 조건의 스터디가 없어요.
          </div>
        )}
        <div className='flex justify-end mb-30'>
          <DropDownSelect
            className='w-150 text-16'
            value={studyStatus}
            options={studyStatusOptions}
            selectHandler={(value: StudyStatusType) => setStudyStatus(value)}
          />
        </div>
        <div className='flex flex-wrap gap-24'>
          {studies?.map((study) => (
            <StudyCard key={study.id} studyInfo={{ ...study, hearted: study.heart }} />
          ))}
        </div>
      </MypageLayout>
    </Layout>
  );
}

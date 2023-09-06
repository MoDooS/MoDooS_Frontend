import React, { useState } from 'react';
import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import RecruitCard from '@/components/recruitCard';
import useParticipatingStudiesQuery from '@/hooks/queries/study/useParticipatingStudiesQuery';
import { StudyStatusType } from '@/types/studyInfo';
import DropDownSelect, { DropDownOption } from '@/components/select/dropDownSelect';

const studyStatusOptions: DropDownOption[] = [
  { value: '전체', content: '전체' },
  { value: '모집 중', content: '모집 중' },
  { value: '모집 마감', content: '모집 마감' },
  { value: '진행 중', content: '진행 중' },
  { value: '종료', content: '종료' },
];

export default function MyStudy() {
  const [studyStatus, setStudyStatus] = useState<StudyStatusType | '전체'>('전체');
  const { studies, isLoading, isError } = useParticipatingStudiesQuery(studyStatus);

  return (
    <Layout>
      <MypageLayout className='flex flex-col'>
        <h4 className='text-18 text-black font-medium mb-50'>참여중인 스터디 목록</h4>

        <div className='flex justify-end mb-30'>
          <DropDownSelect
            className='w-150 text-16'
            value={studyStatus}
            options={studyStatusOptions}
            selectHandler={(value: StudyStatusType) => setStudyStatus(value)}
          />
        </div>
        {studies && !studies.length && (
          <div className='flex justify-center items-center flex-grow w-full font-normal text-20 text-gray_70'>
            해당 조건의 스터디가 없어요.
          </div>
        )}
        {!!studies?.length && (
          <div className='flex flex-wrap gap-24'>
            {studies.map((study) => (
              <RecruitCard
                key={study.id}
                studyInfo={study}
                to={`/${['모집 중', '모집 마감'].includes(study.status) ? 'recruit' : 'study'}/${study.id}`}
              />
            ))}
          </div>
        )}
      </MypageLayout>
    </Layout>
  );
}

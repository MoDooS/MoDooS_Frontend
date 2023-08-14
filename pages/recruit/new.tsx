import Layout from '@/components/layouts/layout';
import RecruitForm from '@/components/recruitForm';
import { RecruitFormType } from '@/types/recruitForm';
import React from 'react';

const initialRecruitForm: RecruitFormType = {
  campus: '인문', // 캠퍼스
  recruits_count: 3, // 모집 인원
  channel: '온라인', // 스터디 진행 방식
  category: '언어', // 카테고리
  recruit_deadline: null, // 모집 마감일
  expected_start_at: null, // 스터디 예정 시작일
  expected_end_at: null, // 스터디 예정 마감일
  contact: '', // 연락 방법
  link: '', // 연락 방법 링크
  late: 3, // 지각 몇 번이면 1결석
  absent: 2, // 결석 몇 번이면 1아웃
  out: 3, // 아웃 몇 번이면 퇴출
  checkList: [''],
  title: '', // 스터디 소개글 (제목)
  description: '', // 스터디 소개글 (내용)
};

const New = () => {
  return (
    <Layout>
      <main className='flex flex-col items-center pt-60 px-200'>
        <RecruitForm defaultForm={initialRecruitForm} mode='new' />
      </main>
    </Layout>
  );
};

export default New;

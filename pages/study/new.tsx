import Layout from '@/components/layouts/layout';
import Page1 from '@/components/study/new/page1';
import Page2 from '@/components/study/new/page2';
import Page3 from '@/components/study/new/page3';
import { cls } from '@/utils/cls';
import React, { useState } from 'react';

const pageTitles = ['스터디 기본 정보', '스터디 규칙 생성', '스터디 소개글'];

export type StudyOutRule = {
  lateToAbsent: number; // 지각 몇 번 시 1결석
  absentToOut: number; // 결석 몇 번 시 1out
  outToRemove: number; // out 몇 번 시 퇴출
};

const New = () => {
  const [page, setPage] = useState(1);
  const [studyOutRule, setStudyOutRule] = useState<StudyOutRule>({ lateToAbsent: 3, absentToOut: 1, outToRemove: 3 });

  return (
    <Layout>
      <main className=' flex flex-col items-center pt-60 px-200'>
        <div className=' w-full px-30 '>
          <h1 className=' text-[#1A212B] font-semibold text-30 mb-60'>스터디 생성하기</h1>
          {/* <h5 className=' text-10 text-[#1A212B] mb-50'>스터디를 직접 생성해봐요</h5> */}

          {/* 페이지 정보 */}
          <div className='flex items-center gap-30 mb-20'>
            {pageTitles.map((title, i) => (
              <div key={i} className='flex items-center gap-6'>
                <div
                  className={cls(
                    'flex justify-center items-center w-25 h-25 rounded-full text-12 font-medium',
                    i + 1 === page ? 'bg-purple text-white' : ' bg-[#EAEEF3] text-black',
                  )}
                >
                  {i + 1}
                </div>
                <span className={cls('text-12 font-medium', i + 1 === page ? 'text-purple' : 'text-black')}>
                  {title}
                </span>
              </div>
            ))}
          </div>
          <hr className=' py-20' />
          {page === 1 && <Page1 moveNextPage={() => setPage(2)} />}
          {page === 2 && (
            <Page2
              {...{ studyOutRule, setStudyOutRule }}
              movePrevPage={() => setPage(1)}
              moveNextPage={() => setPage(3)}
            />
          )}
          {page === 3 && <Page3 movePrevPage={() => setPage(2)} />}
        </div>
      </main>
    </Layout>
  );
};

export default New;

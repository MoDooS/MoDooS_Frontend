import Attendance from '@/components/attendance';
import Evaluation from '@/components/evaluation';
import Attandance from '@/components/feedback/attendance';
import CheckList from '@/components/feedback/checklist';
import Feedback from '@/components/feedback/feedback';
import Title from '@/components/feedback/title';
import Layout from '@/components/layouts/layout';
import { useStudyDetailQuery } from '@/query/study/useStudyDetailQuery';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

const Main = () => {
  const router = useRouter();
  const studyId = router.query.id as string;
  const queryClient = useQueryClient();
  const { studyDetail, isLoading: isStudyDetailLoading, isError: isStudyDetailError } = useStudyDetailQuery(studyId);

  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode | null>(null);

  const handleButtonClick = (componentName: string) => {
    if (componentName === 'attendance') {
      setSelectedComponent(<Attendance studyId={studyDetail?.id || 0} />);
    } else if (componentName === 'evaluation') {
      setSelectedComponent(<Evaluation />);
    }
  };

  return (
    <Layout>
      <main className='flex flex-col items-center pt-60 px-200'>
        <div className='bg-white w-full max-w-1058 h-full rounded-32 px-30 py-40'>
          {!selectedComponent ? (
            <>
              <Title text='알고리즘 스터디' startAt='2023-02-22' endAt='2023-06-01' />
              <div className='flex justify-between mt-30'>
                <h1 className=' text-black font-semibold text-25 mb-20'>출석현황</h1>
                <div className='flex gap-10'>
                  <button
                    className='rounded-14 bg-purple_sub text-white w-80 h-43 text-14'
                    onClick={() => handleButtonClick('attendance')}
                  >
                    출석하기
                  </button>

                  <button
                    className='rounded-14 bg-purple_sub text-white w-80 h-43 text-14'
                    onClick={() => handleButtonClick('evaluation')}
                  >
                    평가하기
                  </button>
                </div>
              </div>
              <div className='bg-gray_30 w-full h-1'></div>

              <Attandance />
              <Title text='상세규칙 통과여부' />
              <CheckList />
              <Title text='2주차에 내가 받은 피드백' />
              <Feedback />
            </>
          ) : (
            <>{selectedComponent}</>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Main;

import { useStudyDetailQuery } from '@/hooks/queries/study/useStudyDetailQuery';
import Attendance from '@/components/attendance';
import Evaluation from '@/components/evaluation';
import Attandance from '@/components/feedback/attendance';
import CheckList from '@/components/feedback/checklist';
import Title from '@/components/feedback/title';
import Layout from '@/components/layouts/layout';
import { useUserQuery } from '@/hooks/queries/user/useUserQuery';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

const StudyHome = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading, isError: isUserError } = useUserQuery();
  const studyId = router.query.id as string;

  const queryClient = useQueryClient();
  const { studyDetail, isLoading: isStudyDetailLoading, isError: isStudyDetailError } = useStudyDetailQuery(studyId);
  console.log(studyDetail);

  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode | null>(null);

  const handleAttendanceComplete = () => {
    setSelectedComponent(null);
  };

  const handleButtonClick = (componentName: string) => {
    if (componentName === 'attendance') {
      setSelectedComponent(
        <Attendance
          studyId={studyDetail?.id || 0}
          participantList={studyDetail?.participantList}
          onComplete={handleAttendanceComplete}
          handleComponentClose={handleComponentClose}
        />,
      );
    } else if (componentName === 'evaluation') {
      setSelectedComponent(
        <Evaluation
          id={studyDetail?.id}
          turn={Number(studyDetail?.feedback.times) + 1}
          check={studyDetail?.checkList}
          handleComponentClose={handleComponentClose}
        />,
      );
    }
  };

  const handleComponentClose = () => {
    setSelectedComponent(null);
  };

  // TODO: 해당 스터디원이 아니면 접근 불가능하게 하는 로직

  return (
    <Layout>
      <main className='flex flex-col items-center pt-60 px-200'>
        <div className='bg-white w-full max-w-1058 h-full rounded-32 px-30 py-40'>
          {!selectedComponent ? (
            <>
              <Title text={studyDetail?.title} startAt={studyDetail?.start_at} endAt={studyDetail?.end_at} />
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

              <Attandance participantList={studyDetail?.participantList} total_turn={studyDetail?.total_turn} />
              <Title text='상세규칙 통과여부' />
              <CheckList checklist={studyDetail?.feedback.checkList} />
              <Title text='2주차에 내가 받은 피드백' />
              <h6 className='text-16 text-black font-normal mb-20 mt-30'>이런점은 좋았어요!</h6>
              <ul className='flex flex-col gap-10 mb-50'>
                {studyDetail?.positiveList.map((feedback) => (
                  <li key={feedback.positive} className='relative bg-bg1 w-full py-10 px-20 rounded-10 overflow-hidden'>
                    <div
                      style={{ width: `${feedback.ratio * 80}%`, opacity: feedback.ratio }}
                      className='absolute left-0 top-0 h-full bg-green-300 z-0'
                    ></div>
                    <div className='flex justify-between items-center'>
                      <span className='font-semibold text-black text-16 z-10 relative'>{feedback.positive}</span>
                      <span className=' text-green-400 text-14'>{Math.round(feedback.ratio * feedback.count)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <h6 className='text-16 text-black font-normal mb-20'>이런점은 아쉬웠어요!</h6>
              <ul className='flex flex-col gap-10'>
                {studyDetail?.negativeList.map((feedback) => (
                  <li key={feedback.negative} className='relative bg-bg1 w-full py-10 px-20 rounded-10 overflow-hidden'>
                    <div
                      style={{ width: `${feedback.ratio * 80}%`, opacity: feedback.ratio }}
                      className='absolute left-0 top-0 h-full bg-rose-300 z-0'
                    ></div>
                    <div className='flex justify-between items-center'>
                      <span className='font-semibold text-black text-16 z-10 relative'>{feedback.negative}</span>
                      <span className=' text-rose-400 text-14'>{Math.round(feedback.ratio * feedback.count)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>{selectedComponent}</>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default StudyHome;

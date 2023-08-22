import AnswerBtn from '@/components/evaluation/answerBtn';
import Layout from '@/components/layouts/layout';
import { cls } from '@/utils/cls';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMemberListQuery } from '@/hooks/queries/feedback/useMemberListQuery';
import { useQueryClient } from 'react-query';

type Props = {
  moveNextPage: () => void;
};

type EvaluationData = {
  memberId: number;
  evaluations: {}[];
};

const pageTitles = ['박지수', '양채연', '안승연', '박상민'];
export const pos = ['🙂', '👀', '🍊', '✨', '🗣️', '🩷'];
export const neg = ['🤨', '👣', '🤖', '💊', '💦', '🙈'];

const Evaluation = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const studyId = router.query.id as string;
  const turn = router.query.turn as string;
  const queryClient = useQueryClient();
  const { memberList, isLoading: isMemberListLoading, isError: isMemberListError } = useMemberListQuery(studyId, turn);

  return (
    <Layout>
      <main className='flex flex-col items-center pt-60 px-200'>
        <div className='bg-white w-full max-w-1058 h-full rounded-32 px-30 py-40'>
          <div className='font-bold text-30 py-10 mb-'>피드백</div>
          <div className='flex items-center gap-30 mb-20 mt-25'>
            {pageTitles.map((title, i) => (
              <div key={i} className='flex items-center gap-6'>
                <div
                  className={cls(
                    'flex justify-center items-center w-25 h-25 rounded-full text-12 font-medium',
                    i + 1 === page ? 'bg-purple_sub text-white' : ' bg-[#EAEEF3] text-black',
                  )}
                >
                  {i + 1}
                </div>
                <span className={cls('text-15 font-medium', i + 1 === page ? 'text-purple_sub' : 'text-black')}>
                  {title}
                </span>
              </div>
            ))}
          </div>
          <div className='bg-gray_30 w-full h-1 my-25'></div>
          <AnswerBtn />

          <div className='bg-gray_30 w-full h-1 mt-32'></div>
          <div className='flex justify-end mt-24'>
            <button className='bg-purple_sub text-white text-13 py-13 px-19 rounded-13'>다음</button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Evaluation;

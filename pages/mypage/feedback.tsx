import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import useAllFeedback from '@/hooks/queries/feedback/useAllFeedbackQuery';
import { useUserQuery } from '@/hooks/queries/user/useUserQuery';

export default function Feedback() {
  const { user } = useUserQuery();
  const { allFeedback } = useAllFeedback(user?.memberId);
  return (
    <Layout>
      <MypageLayout>
        <h4 className='text-18 text-black font-medium mb-50'>나에 대한 피드백</h4>
        <h6 className='text-16 text-black font-normal mb-20'>이런점은 좋았어요!</h6>
        <ul className='flex flex-col gap-10 mb-50'>
          {allFeedback?.positiveList.map((feedback) => (
            <li key={feedback.positive} className='relative bg-bg1 w-full py-10 px-20 rounded-10 overflow-hidden'>
              <div
                style={{ width: `${feedback.ratio * 80}%`, opacity: feedback.ratio }}
                className='absolute left-0 top-0 h-full bg-green-300 z-0'
              ></div>
              <div className='flex justify-between items-center'>
                <span className='font-semibold text-black text-16 z-10 relative'>{feedback.positive}</span>
                <span className=' text-green-400 text-14'>
                  {Math.round(feedback.ratio * allFeedback.positiveTotal)}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <h6 className='text-16 text-black font-normal mb-20'>이런점은 아쉬웠어요!</h6>
        <ul className='flex flex-col gap-10'>
          {allFeedback?.negativeList.map((feedback) => (
            <li key={feedback.negative} className='relative bg-bg1 w-full py-10 px-20 rounded-10 overflow-hidden'>
              <div
                style={{ width: `${feedback.ratio * 80}%`, opacity: feedback.ratio }}
                className='absolute left-0 top-0 h-full bg-rose-300 z-0'
              ></div>
              <div className='flex justify-between items-center'>
                <span className='font-semibold text-black text-16 z-10 relative'>{feedback.negative}</span>
                <span className=' text-rose-400 text-14'>{Math.round(feedback.ratio * allFeedback.negativeTotal)}</span>
              </div>
            </li>
          ))}
        </ul>
      </MypageLayout>
    </Layout>
  );
}

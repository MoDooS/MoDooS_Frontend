import CreditChart from '@/components/creditChart';
import Layout from '@/components/layouts/layout';
import useAllFeedback from '@/hooks/queries/feedback/useAllFeedbackQuery';
import { useSpecificMemberQuery } from '@/hooks/queries/user/useSpecificMemberQuery';
import findMostCommonElement from '@/utils/findMostCommonElement';
import { useRouter } from 'next/router';
import React from 'react';

export default function UserProfile() {
  const router = useRouter();
  const { member } = useSpecificMemberQuery(router.query.id as string);
  const { allFeedback } = useAllFeedback(member?.memberId);
  return (
    <Layout>
      <div className='flex flex-col gap-20 w-full px-200 pt-30'>
        {member && allFeedback && (
          <>
            <section className='w-full bg-white p-15 shrink-0 rounded-12 border-1 border-gray_60 overflow-hidden'>
              <h4 className=' text-18 text-black font-medium mb-14'>{member.nickname}님의 정보입니다.</h4>
              <div className='flex gap-16 w-full'>
                <article className='relative p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center'>
                  <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>신용 등급</h5>
                  {/* <div className='flex justify-center w-full text-32'>A+</div> */}
                  {member && (
                    <>
                      <CreditChart
                        creditRating={member.ranking}
                        creditScore={member.score}
                        className='w-150 h-150 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-25%]'
                      />
                      <span>신용</span>
                    </>
                  )}
                </article>
                <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                  <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>관심있게 보는 스터디 태그</h5>
                  <div className='flex justify-center w-full text-26 font-bold text-primary'>
                    {member && member.categoryList.length ? findMostCommonElement(member.categoryList) : '없음'}
                  </div>
                </article>
                <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                  <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>관심있게 본 스터디 개수</h5>
                  <div className='flex justify-center w-full text-26 font-bold text-primary'>
                    {member?.heartCount}개
                  </div>
                </article>
              </div>
            </section>
            <section className={'relative px-20 py-15 bg-white h-full rounded-12 border-1 border-gray_60'}>
              <h4 className='text-18 text-black font-medium mb-50'>{member.nickname}님에 대한 피드백</h4>
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
                      <span className=' text-rose-400 text-14'>
                        {Math.round(feedback.ratio * allFeedback.negativeTotal)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}

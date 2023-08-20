import React from 'react';
import CreditChart from '../creditChart';

type Props = {
  children: React.ReactNode;
};

export default function MypageLayout({ children }: Props) {
  return (
    <main className=' pt-20 flex justify-center'>
      <div className='max-w-[1200px] w-full flex gap-20 min-h-screen'>
        <section className='flex flex-col items-center shrink-0 w-200 h-full bg-white py-60 px-20 rounded-12 border-1 border-gray_60 overflow-hidden'>
          <div className='w-80 h-80 bg-gray_60 mb-13 rounded-full'></div>
          <span className='block text-14 font-normal text-black mb-80'>삼식이</span>
          <div className='flex justify-start w-full text-14 font-normal text-black mb-10'>랭킹</div>
          <button className='w-full bg-primary text-white py-8 text-12 rounded-5'>전체 랭킹</button>
        </section>
        <div className='flex flex-col gap-20 w-full'>
          <section className='w-full bg-white p-15 shrink-0 rounded-12 border-1 border-gray_60 overflow-hidden'>
            <h4 className=' text-18 text-black font-medium mb-14'>삼식이 의 랭킹 정보입니다.</h4>
            <div className='flex gap-16 w-full'>
              <article className='relative p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center'>
                <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>현재 랭킹</h5>
                {/* <div className='flex justify-center w-full text-32'>A+</div> */}
                <CreditChart
                  creditRating='A+'
                  creditScore={700}
                  className='w-150 h-150 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-25%]'
                />
                <span>신용</span>
              </article>
              <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>
                  내가 관심있게 보는 스터디 태그
                </h5>
                <div className='flex justify-center w-full text-26 font-bold text-primary'>프로그래밍</div>
              </article>
              <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>
                  내가 관심있게 본 스터디 개수
                </h5>
                <div className='flex justify-center w-full text-26 font-bold text-primary'>5개</div>
              </article>
            </div>
          </section>
          {children}
        </div>
      </div>
    </main>
  );
}

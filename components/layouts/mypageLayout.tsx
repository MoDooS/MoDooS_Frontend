import React, { HTMLAttributes } from 'react';
import CreditChart from '../creditChart';
import { cls } from '@/utils/cls';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

const MenuBtn = ({
  active,
  children,
  to,
  ...props
}: { active: boolean; to: string } & HTMLAttributes<HTMLAnchorElement>) => (
  <Link
    href={to}
    className={cls(
      'w-full py-8 text-12 rounded-5 flex justify-center items-center',
      active ? 'bg-primary text-white' : 'bg-bg1 text-[#454545]',
      props.className ?? '',
    )}
  >
    {children}
  </Link>
);

export default function MypageLayout({ children }: Props) {
  const router = useRouter();
  return (
    <main className=' pt-20 flex justify-center'>
      <div className='max-w-[1200px] w-full flex gap-20 min-h-screen'>
        {/* 좌측 메뉴바 */}
        <section className='flex flex-col items-center shrink-0 w-200 h-full bg-white py-60 px-20 rounded-12 border-1 border-gray_60 overflow-hidden'>
          <div className='w-80 h-80 bg-gray_60 mb-13 rounded-full'></div>
          <span className='block text-14 font-normal text-black mb-80'>삼식이</span>
          <h4 className='flex justify-start w-full text-14 font-normal text-black mb-10'>스터디 정보</h4>
          <MenuBtn active={router.pathname === '/mypage/feedback'} to='/mypage/feedback' className='mb-10'>
            나에 대한 피드백
          </MenuBtn>
          <MenuBtn active={router.pathname === '/mypage/my-study'} to='/mypage/my-study' className='mb-10'>
            내 스터디
          </MenuBtn>
          <MenuBtn active={router.pathname === '/mypage/interest-study'} to='/mypage/interest-study' className='mb-10'>
            관심 스터디
          </MenuBtn>
          <MenuBtn active={router.pathname === '/mypage/study-request'} to='/mypage/study-request' className='mb-50'>
            스터디 요청
          </MenuBtn>
          <h4 className='flex justify-start w-full text-14 font-normal text-black mb-10'>랭킹</h4>
          <MenuBtn active={router.pathname === '/mypage/ranking'} to='/mypage/ranking' className='mb-50'>
            전체 랭킹
          </MenuBtn>
          <h4 className='flex justify-start w-full text-14 font-normal text-black mb-10'>설정</h4>
          <MenuBtn active={router.pathname === '/mypage/notice'} to='/mypage/notice' className='mb-10'>
            알림
          </MenuBtn>
          <MenuBtn active={router.pathname === '/mypage/setting'} to='/mypage/setting'>
            계정
          </MenuBtn>
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

import CreditChart from '@/components/creditChart';
import Banner from '@/components/layouts/banner';
import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import useRankingQuery from '@/hooks/queries/useRankingQuery';
import { cls } from '@/utils/cls';
import React from 'react';

export default function Ranking() {
  const { ranking } = useRankingQuery();
  console.log('ranking', ranking);
  return (
    <Layout>
      <MypageLayout className=' overflow-y-scroll'>
        <h4 className=' text-18 text-black font-medium mb-14'>전체 랭킹</h4>
        <article className=' rounded-12 border-1 border-gray_60 overflow-hidden'>
          {/* 상단 타이틀 */}
          <div className='pl-24 py-12 flex text-14'>
            <div className='w-50 shrink-0'>등수</div>
            <div className='w-full flex'>
              <div className='px-16 w-[50%]'>스터디원</div>
              <div className='px-16 w-[50%]'>신용등급</div>
            </div>
          </div>
          {ranking?.map((info, i) => (
            <div key={i} className={cls('pl-24 py-16 flex text-14', i % 2 == 0 ? 'bg-[#F6F8FB]' : 'bg-white')}>
              <div className='w-50 shrink-0 font-medium'>{i + 1}</div>
              <div className='w-full flex'>
                <div className='px-16 w-[50%]'>{info.nickName}</div>
                <div className='px-16 w-[50%] font-medium'>{info.ranking}</div>
              </div>
            </div>
          ))}
        </article>
      </MypageLayout>
    </Layout>
  );
}

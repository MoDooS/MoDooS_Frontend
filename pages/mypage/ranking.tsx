import CreditChart from '@/components/creditChart';
import Banner from '@/components/layouts/banner';
import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import { cls } from '@/utils/cls';
import React from 'react';

type Props = {};

const rankingInfo: { name: string; rating: string }[] = [
  { name: '박지수', rating: 'S+' },
  { name: '박지수', rating: 'S+' },
  { name: '박지수', rating: 'S+' },
  { name: '박지수', rating: 'S+' },
  { name: '박지수', rating: 'S+' },
  { name: '박지수', rating: 'S+' },
  { name: '박지수', rating: 'S+' },
  { name: '박지수', rating: 'S+' },
];

export default function Ranking({}: Props) {
  return (
    <Layout>
      <MypageLayout>
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
          {rankingInfo.map((info, i) => (
            <div key={i} className={cls('pl-24 py-16 flex text-14', i % 2 == 0 ? 'bg-[#F6F8FB]' : 'bg-white')}>
              <div className='w-50 shrink-0 font-medium'>{i + 1}</div>
              <div className='w-full flex'>
                <div className='px-16 w-[50%]'>{info.name}</div>
                <div className='px-16 w-[50%] font-medium'>{info.rating}</div>
              </div>
            </div>
          ))}
        </article>
      </MypageLayout>
    </Layout>
  );
}

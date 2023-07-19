import Banner from '@/components/layouts/banner';
import Layout from '@/components/layouts/layout';
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
      <main className=' pt-20 flex justify-center'>
        <div className='max-w-[1200px] w-full flex gap-20'>
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
                <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                  <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>현재 랭킹</h5>
                  <div className='flex justify-center w-full text-32'>A+</div>
                </article>
                <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                  <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>명지대에서의 랭킹</h5>
                  <div className='flex justify-center w-full text-26 font-bold text-primary'>8등</div>
                </article>
                <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                  <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>순위</h5>
                  <div className='flex justify-center w-full text-26 font-bold text-primary'>상위 10%</div>
                </article>
              </div>
            </section>
            <section className='p-15 bg-white h-full rounded-12 border-1 border-gray_60 overflow-hidden'>
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
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}

import Image from 'next/image';
import React from 'react';

export default function Banner({ title, description }: { title: string; description: string }) {
  return (
    <section className='w-full h-330 bg-[#FBE1B1] px-146 flex items-center gap-256'>
      <div className='w-260 h-260 bg-[#FDD284] rounded-full flex justify-center items-center'>
        <Image src={'/imgs/mos_banner.png'} alt='로고 아이콘' width={276} height={139} />
      </div>
      <div className='flex flex-col gap-10'>
        <h1 className='text-black font-bold text-36'>{title}</h1>
        <h4 className='text-black font-normal text-24'>{description}</h4>
      </div>
    </section>
  );
}

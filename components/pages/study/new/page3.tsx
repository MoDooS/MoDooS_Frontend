import React from 'react';

type Props = {
  movePrevPage: () => void;
};

export default function Page3({ movePrevPage }: Props) {
  return (
    <div>
      <h2 className=' text-20 text-black font-medium mb-30'>스터디 소개글을 작성해주세요</h2>
      <h3 className=' text-16 text-black font-medium mb-10'>제목</h3>
      <input
        type='text'
        className=' w-full min-h-40 mb-20 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black'
      />
      <h3 className=' text-16 text-black font-medium mb-10'>내용</h3>
      <textarea
        spellCheck={false}
        className='w-full min-h-200 mb-100 py-12 px-16 text-16 text-black font-normal bg-white border-gray_60 border-1 border-solid rounded-10 '
      ></textarea>
      <hr className='mb-50' />

      {/* 다음 버튼 */}
      <div className='flex items-center justify-end gap-16'>
        <button onClick={movePrevPage} className='py-12 px-18 text-black text-16 font-normal'>
          이전
        </button>
        <button className='py-12 px-18 bg-purple text-white rounded-16 text-16 font-normal'>완료</button>
      </div>
    </div>
  );
}

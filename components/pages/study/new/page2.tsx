import React, { useEffect, useState } from 'react';
import ChevronBottomIcon from '../../../public/icons/chevron_bottom.svg';
import { StudyOutRule } from '@/pages/study/new';

type Props = {
  studyOutRule: StudyOutRule;
  setStudyOutRule: React.Dispatch<React.SetStateAction<StudyOutRule>>;
  movePrevPage: () => void;
  moveNextPage: () => void;
};

type StudyOutRuleOption = {
  title: string;
  defaultValue: number;
  optionCount: number;
  onChange: (value: number) => void;
};

export default function Page2({ studyOutRule, setStudyOutRule, movePrevPage, moveNextPage }: Props) {
  const studyOutRuleOptions: StudyOutRuleOption[] = [
    {
      title: '지각 횟수',
      defaultValue: studyOutRule.lateToAbsent,
      optionCount: 5,
      onChange: (value: number) => setStudyOutRule((prev) => ({ ...prev, lateToAbsent: value })),
    },
    {
      title: '결석 횟수',
      defaultValue: studyOutRule.absentToOut,
      optionCount: 5,
      onChange: (value: number) => setStudyOutRule((prev) => ({ ...prev, absentToOut: value })),
    },
    {
      title: 'Out 횟수',
      defaultValue: studyOutRule.outToRemove,
      optionCount: 5,
      onChange: (value: number) => setStudyOutRule((prev) => ({ ...prev, outToRemove: value })),
    },
  ];

  const studyOutRuleTexts: React.ReactNode[] = [
    <div key={1}>
      <span className=' text-black'>지각 </span>
      <span className=' text-purple'>{studyOutRule.lateToAbsent}번</span>
      <span className=' text-black'>이면 1결석</span>
    </div>,
    <div key={2}>
      <span className=' text-black'>결석 </span>
      <span className=' text-purple'>{studyOutRule.absentToOut}번</span>
      <span className=' text-black'>이면 1out</span>
    </div>,
    <div key={3}>
      <span className=' text-purple'>{studyOutRule.outToRemove} out</span>
      <span className=' text-black'>시 스터디에서 자동 퇴출</span>
    </div>,
  ];
  return (
    <div>
      <h3 className=' text-16 text-black font-medium mb-20'>규칙</h3>

      {/* 지각,결석,아웃 스터디 규칙 생성 상자 */}
      <div className='flex items-center gap-10 mb-30'>
        {studyOutRuleOptions.map((option, i) => (
          <div key={i}>
            <h6 className=' text-gray_70 text-14 font-medium mb-5'>{option.title}</h6>
            <div className='relative'>
              <select
                defaultValue={option.defaultValue}
                onChange={(e) => option.onChange(Number(e.target.value))}
                className=' w-150 rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'
              >
                {Array.from({ length: option.optionCount }, (_, i) => i + 1).map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
              <ChevronBottomIcon width='20' height='20' className='absolute top-10 right-12 cursor-pointer' />
            </div>
          </div>
        ))}
      </div>

      {/* 변경한 규칙 보여주기 */}
      <div className=' flex flex-col gap-10 mb-30 text-14 font-normal'>{...studyOutRuleTexts}</div>

      {/* 자율 규칙 생성 상자 */}
      <h3 className=' text-16 text-black font-medium mb-20'>자율 규칙이 있다면 작성해주세요!</h3>
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
        <button onClick={moveNextPage} className='py-12 px-18 bg-purple text-white rounded-16 text-16 font-normal'>
          다음
        </button>
      </div>
    </div>
  );
}

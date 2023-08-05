import React from 'react';
import ChevronBottomIcon from '../../../../public/icons/chevron_bottom.svg';
import Hr from '@/components/hr';
import { NewRecruitFormType } from '@/types/newRecruitFormType';
import { Updater } from 'use-immer';

type Props = {
  newRecruitForm: NewRecruitFormType;
  setNewRecruitForm: Updater<NewRecruitFormType>;
  movePrevPage: () => void;
  moveNextPage: () => void;
};

type StudyOutRuleOption = {
  title: string;
  defaultValue: number;
  optionCount: number;
  onChange: (value: number) => void;
};

const CHECK_LIST_LIMIT = 10;

export default function Page2({ newRecruitForm, setNewRecruitForm, movePrevPage, moveNextPage }: Props) {
  const studyOutRuleOptions: StudyOutRuleOption[] = [
    {
      title: '지각 횟수',
      defaultValue: newRecruitForm.late,
      optionCount: 5,
      onChange: (value: number) =>
        setNewRecruitForm((form) => {
          form.late = value;
        }),
    },
    {
      title: '결석 횟수',
      defaultValue: newRecruitForm.absent,
      optionCount: 5,
      onChange: (value: number) =>
        setNewRecruitForm((form) => {
          form.absent = value;
        }),
    },
    {
      title: 'Out 횟수',
      defaultValue: newRecruitForm.out,
      optionCount: 5,
      onChange: (value: number) =>
        setNewRecruitForm((form) => {
          form.out = value;
        }),
    },
  ];

  const studyOutRuleTexts: React.ReactNode[] = [
    <div key={1}>
      <span className=' text-black'>지각 </span>
      <span className=' text-primary'>{newRecruitForm.late}번</span>
      <span className=' text-black'>이면 1결석</span>
    </div>,
    <div key={2}>
      <span className=' text-black'>결석 </span>
      <span className=' text-primary'>{newRecruitForm.absent}번</span>
      <span className=' text-black'>이면 1out</span>
    </div>,
    <div key={3}>
      <span className=' text-primary'>{newRecruitForm.out} out</span>
      <span className=' text-black'>시 스터디에서 자동 퇴출</span>
    </div>,
  ];
  return (
    <div>
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
      <div className=' flex flex-col gap-10 mb-30 text-16 font-normal'>{...studyOutRuleTexts}</div>

      {/* 체크리스트 생성 상자 */}
      <h3 className=' text-20 text-black font-medium mb-10'>체크리스트</h3>
      <div className='flex items-center gap-5 mb-5'>
        <h6 className='text-gray_70 font-medium text-14 '>
          피드백 폼에 들어갈 내용입니다. 체크리스트 중 하나라도 어기면 1out입니다.
        </h6>
        <span className='text-primary font-medium text-14'>{`(${newRecruitForm.checkList.length}/${CHECK_LIST_LIMIT})`}</span>
      </div>
      <div className='flex flex-col gap-10 mb-30'>
        {newRecruitForm.checkList.map((item, i) => (
          <article key={i} className=' flex items-center gap-10'>
            <input
              type='text'
              value={item}
              spellCheck={false}
              onChange={(e) =>
                setNewRecruitForm((form) => {
                  form.checkList[i] = e.target.value;
                })
              }
              className='w-350 min-h-40 h-full px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black outline-primary'
            />
            {newRecruitForm.checkList.length !== 1 && (
              <button
                onClick={() =>
                  setNewRecruitForm((form) => {
                    form.checkList = form.checkList.filter((_, idx) => idx !== i);
                  })
                }
                className='w-35 h-35 flex justify-center items-center shrink-0 bg-white text-primary border-1 border-primary rounded-10 text-14 font-bold hover:bg-primary hover:text-white'
              >
                -
              </button>
            )}
            {newRecruitForm.checkList.length < CHECK_LIST_LIMIT && newRecruitForm.checkList.length === i + 1 && (
              <button
                onClick={() =>
                  setNewRecruitForm((form) => {
                    form.checkList = [...form.checkList, ''];
                  })
                }
                className='w-35 h-35 flex justify-center items-center shrink-0 bg-white text-primary border-1 border-primary rounded-10 text-14 font-bold hover:bg-primary hover:text-white'
              >
                +
              </button>
            )}
          </article>
        ))}
      </div>

      {/* 자율 규칙 생성 상자 */}
      <h3 className=' text-20 text-black font-medium mb-10'>자율 규칙이 있다면 작성해주세요!</h3>
      <h6 className='text-gray_70 font-medium text-14 mb-5'>자율 규칙은 아웃과 관련이 없습니다.</h6>
      <textarea
        spellCheck={false}
        value={newRecruitForm.rule_content}
        onChange={(e) =>
          setNewRecruitForm((form) => {
            form.rule_content = e.target.value;
          })
        }
        className='w-full min-h-200 mb-100 py-12 px-16 text-16 text-black font-normal bg-white border-gray_60 border-1 border-solid rounded-10 outline-primary outline-1'
      ></textarea>
      <Hr className='mb-50' />

      {/* 다음 버튼 */}
      <div className='flex items-center justify-end gap-16'>
        <button onClick={movePrevPage} className='py-12 px-18 text-black text-16 font-normal'>
          이전
        </button>
        <button onClick={moveNextPage} className='py-12 px-18 bg-primary text-white rounded-16 text-16 font-normal'>
          다음
        </button>
      </div>
    </div>
  );
}

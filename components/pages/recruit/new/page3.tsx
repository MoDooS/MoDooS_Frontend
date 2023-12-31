import React from 'react';
import Hr from '@/components/hr';
import { Updater } from 'use-immer';
import { RecruitFormMode, RecruitFormType } from '@/types/recruitForm';
import AutoResizableTextarea from '@/components/autoResizableTextarea';

type Props = {
  mode: RecruitFormMode;
  recruitForm: RecruitFormType;
  setRecruitForm: Updater<RecruitFormType>;
  movePrevPage: () => void;
  handleSubmitForm: () => void;
};

export default function Page3({ mode, recruitForm, setRecruitForm, movePrevPage, handleSubmitForm }: Props) {
  return (
    <div>
      <h2 className=' text-20 text-black font-medium mb-30'>스터디 소개글을 작성해주세요</h2>
      <h3 className=' text-16 text-black font-medium mb-10'>제목</h3>
      <input
        type='text'
        value={recruitForm.title}
        placeholder='스터디 제목을 작성해주세요'
        onChange={(e) =>
          setRecruitForm((form) => {
            form.title = e.target.value;
          })
        }
        className=' w-full min-h-40 mb-20 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black outline-primary'
      />
      <h3 className=' text-16 text-black font-medium mb-10'>내용</h3>
      <AutoResizableTextarea
        spellCheck={false}
        value={recruitForm.description}
        textareaOnChange={(e) =>
          setRecruitForm((form) => {
            form.description = e.target.value;
          })
        }
        className='w-full min-h-200 mb-100 py-12 px-16 text-16 text-black font-normal bg-white border-gray_60 border-1 border-solid rounded-10 outline-primary'
      />
      <Hr className='mb-50' />

      {/* 다음 버튼 */}
      <div className='flex items-center justify-end gap-16'>
        <button onClick={movePrevPage} className='py-12 px-18 text-black text-16 font-normal'>
          이전
        </button>
        <button onClick={handleSubmitForm} className='py-12 px-18 bg-primary text-white rounded-16 text-16 font-normal'>
          {mode === 'new' ? '생성하기' : '수정하기'}
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import ChevronBottomIcon from '../../../public/icons/chevron_bottom.svg';
import CalendarIcon from '../../../public/icons/calendar.svg';
import useDatePicker from '@/hooks/useDatePicker';
import dayjs from 'dayjs';
import DatePicker from '@/components/datePicker/datePicker';

type Props = {
  moveNextPage: () => void;
};

const studyMethods = ['온라인', '오프라인', '온라인/오프라인 병행'];
const studyCategories = ['어학', '프로그래밍'];

export default function Page1({ moveNextPage }: Props) {
  const now = dayjs();
  const { register: recruitDatePickerRegister, selectedDateRange: recruitDateRange } = useDatePicker({
    calendarRange: {
      start: { year: now.get('year'), month: now.get('month') },
      end: { year: now.get('year') + 1, month: 12 },
    },
    initialSelectMode: 'endDate',
  });
  const { register: studyRangeDatePickerRegister, selectedDateRange: studyRangeDateRange } = useDatePicker({
    calendarRange: {
      start: { year: now.get('year'), month: now.get('month') },
      end: { year: now.get('year') + 1, month: 12 },
    },
  });
  const [showRecruitDatePicker, setShowRecruitDatePicker] = useState(false);
  const [showStudyRangeDatePicker, setShowStudyRangeDatePicker] = useState(false);
  return (
    <div>
      <h3 className=' text-16 text-black font-medium mb-20'>스터디 인원 및 진행 방식</h3>

      {/* 캠퍼스, 인원 선택 상자 */}
      <div className='flex items-center gap-10 mb-20'>
        <div>
          <h6 className=' text-gray_70 text-14 font-medium mb-5'>캠퍼스를 선택하세요</h6>
          <div className='relative'>
            <select className=' w-170 rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'>
              <option value={'인문'}>인문</option>
              <option value={'자연'}>자연</option>
            </select>
            <ChevronBottomIcon width='20' height='20' className='absolute top-10 right-12 cursor-pointer' />
          </div>
        </div>
        <div>
          <h6 className=' text-gray_70 text-14 font-medium mb-5'>모집 인원</h6>
          <div className='relative'>
            <select className=' w-170 rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <ChevronBottomIcon width='20' height='20' className='absolute top-10 right-12 cursor-pointer' />
          </div>
        </div>
      </div>

      {/* 진행 방식 선택 버튼 */}
      <h6 className='text-gray_70 text-14 font-medium mb-5'>진행 방식</h6>
      <fieldset className='flex items-center gap-20 mb-30'>
        {studyMethods.map((method) => (
          <label key={method} className='flex items-center gap-5 cursor-pointer'>
            <input
              name='studyMethod'
              value={method}
              type='radio'
              className=' w-20 h-20 rounded-full border-1 border-solid border-[#9AA8BC] bg-white checked:border-purple checked:border-6 cursor-pointer'
            />
            <span className=' text-14 text-black font-normal'>{method}</span>
          </label>
        ))}
      </fieldset>
      <h3 className=' text-16 text-black font-medium mb-20'>스터디 정보</h3>

      {/* 카테고리 선택 상자 */}
      <h6 className='text-gray_70 text-14 font-medium mb-5'>카테고리</h6>
      <div className='relative w-350 mb-20'>
        <select className='w-full rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'>
          {studyCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <ChevronBottomIcon width='20' height='20' className='absolute top-10 right-12 cursor-pointer' />
      </div>

      {/* 모집 마감일 선택 달력 */}
      <h6 className='text-gray_70 text-14 font-medium mb-5'>모집 마감일</h6>
      <button
        onClick={() => setShowRecruitDatePicker((prev) => !prev)}
        className=' w-350 min-h-40 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black'
      >
        <span>2023-12-08</span>
        <CalendarIcon width='24' color='#9AA8BC' />
      </button>
      <div className=' relative mb-20'>
        {showRecruitDatePicker && <DatePicker {...recruitDatePickerRegister} className=' absolute z-10 top-10' />}
      </div>

      {/* 스터디 기간 선택 달력 */}
      <div className='flex items-center gap-10 mb-20'>
        <div>
          <h6 className=' text-gray_70 text-14 font-medium mb-5'>스터디 예정 시작일</h6>
          <button
            onClick={() => setShowStudyRangeDatePicker((prev) => !prev)}
            className=' w-175 min-h-40 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black'
          >
            <span>2023-12-08</span>
            <CalendarIcon width='24' color='#9AA8BC' />
          </button>
        </div>
        <div>
          <h6 className=' text-gray_70 text-14 font-medium mb-5'>스터디 예정 마감일</h6>
          <button
            onClick={() => setShowStudyRangeDatePicker((prev) => !prev)}
            className=' w-175 min-h-40 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black'
          >
            <span>2023-12-08</span>
            <CalendarIcon width='24' color='#9AA8BC' />
          </button>
        </div>
      </div>
      <div className=' relative mb-30'>
        {showStudyRangeDatePicker && <DatePicker {...studyRangeDatePickerRegister} className=' absolute z-10 top-10' />}
      </div>

      {/* 연락 방법 및 링크 */}
      <h3 className=' text-16 text-black font-medium mb-20'>연락방법 및 링크</h3>
      <h6 className='text-gray_70 text-14 font-medium mb-5'>연락 방법</h6>
      <input
        type='text'
        className=' w-350 min-h-40 mb-20 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black'
      />
      <h6 className='text-gray_70 text-14 font-medium mb-5'>링크</h6>
      <input
        type='text'
        className=' w-350 min-h-40 mb-20 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black'
      />
      <hr className='mb-50' />

      {/* 다음 버튼 */}
      <div className='flex items-center justify-end'>
        <button onClick={moveNextPage} className='py-12 px-18 bg-purple text-white rounded-16 text-16 font-normal'>
          다음
        </button>
      </div>
    </div>
  );
}

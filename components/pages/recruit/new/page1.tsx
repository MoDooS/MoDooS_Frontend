import React, { useEffect, useState } from 'react';
import ChevronBottomIcon from '../../../../public/icons/chevron_bottom.svg';
import CalendarIcon from '../../../../public/icons/calendar.svg';
import dayjs from 'dayjs';
import DateRangePicker, { SelectMode } from '@/components/datePicker/dateRangePicker';
import { addLeadingZero } from '@/utils/addLeadingZero';
import { cls } from '@/utils/cls';
import { univercityDepartments } from '@/constants/univercityDepartments';
import { RecruitFormType } from '@/types/recruitForm';
import { Updater } from 'use-immer';
import DatePicker from '@/components/datePicker/datePicker';
import Hr from '@/components/hr';
import { CalendarRange } from '@/types/datePicker';
import { StudyCategory, StudyChannel } from '@/types/studyInfo';

type Props = {
  recruitForm: RecruitFormType;
  setRecruitForm: Updater<RecruitFormType>;
  moveNextPage: () => void;
};

const dateFormatInitText = 'YYYY-MM-DD';

const studyMethods: StudyChannel[] = ['온라인', '오프라인', '병행'];
const studyCategories: StudyCategory[] = ['언어', '취업', '고시/공무원', '취미/교양', '프로그래밍', '기타'];

export default function Page1({ recruitForm, setRecruitForm, moveNextPage }: Props) {
  const now = dayjs();

  const calendarRange: CalendarRange = {
    start: now.format(),
    end: now.add(1, 'year').set('month', 11).set('date', 31).format(), // 달력 범위 - 다음해 12월
  };

  const [showRecruitDeadlineDatePicker, setShowRecruitDeadlineDatePicker] = useState(false);
  const [showStudyStartEndDatePicker, setShowStudyStartEndDatePicker] = useState(false);
  const [studyStartEndSelectMode, setStudyStartEndSelectMode] = useState<SelectMode>('startDate');

  const handleClickRecruitDatePicker = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowStudyStartEndDatePicker(false);
    setShowRecruitDeadlineDatePicker(true);
  };

  const handleClickStudyStartEndDatePicker = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pickerType: SelectMode,
  ) => {
    e.stopPropagation();
    setShowRecruitDeadlineDatePicker(false);
    if (pickerType === studyStartEndSelectMode) {
      setShowStudyStartEndDatePicker((prev) => !prev);
    } else {
      setStudyStartEndSelectMode((prev) => (prev === 'startDate' ? 'endDate' : 'startDate'));
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setShowRecruitDeadlineDatePicker(false);
      setShowStudyStartEndDatePicker(false);
    });
  }, []);

  return (
    <div>
      <h3 className=' text-16 text-black font-medium mb-20'>스터디 인원 및 진행 방식</h3>

      {/* 캠퍼스, 학과 선택 상자 */}
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
          <h6 className=' text-gray_70 text-14 font-medium mb-5'>학과를 선택하세요</h6>
          <div className='relative'>
            <select className=' w-170 rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'>
              {[...univercityDepartments.seoul, ...univercityDepartments.yongin].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <ChevronBottomIcon width='20' height='20' className='absolute top-10 right-12 cursor-pointer' />
          </div>
        </div>
      </div>

      {/* 모집 인원 선택 버튼 */}
      <h6 className='text-gray_70 text-14 font-medium mb-5'>모집인원을 선택하세요</h6>
      <div className='relative w-350 mb-20'>
        <select className=' w-full rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'>
          {Array.from({ length: 18 }, (_, i) => i + 3).map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <ChevronBottomIcon width='20' height='20' className='absolute top-10 right-12 cursor-pointer' />
      </div>

      {/* 진행 방식 선택 버튼 */}
      <h6 className='text-gray_70 text-14 font-medium mb-5'>진행 방식</h6>
      <fieldset className='flex items-center gap-20 mb-30'>
        {studyMethods.map((method) => (
          <label key={method} className='flex items-center gap-5 cursor-pointer'>
            <input
              name='studyMethod'
              value={method}
              checked={recruitForm.channel === method}
              onChange={(e) =>
                setRecruitForm((form) => {
                  form.channel = e.target.value as StudyChannel;
                })
              }
              type='radio'
              className=' w-20 h-20 rounded-full border-1 border-solid border-[#9AA8BC] bg-white checked:border-primary checked:border-6 cursor-pointer'
            />
            <span className=' text-14 text-black font-normal'>
              {method === '병행' ? '온라인/오프라인 병행' : method}
            </span>
          </label>
        ))}
      </fieldset>
      <h3 className=' text-16 text-black font-medium mb-20'>스터디 정보</h3>

      {/* 카테고리 선택 상자 */}
      <h6 className='text-gray_70 text-14 font-medium mb-5'>카테고리</h6>
      <div className='relative w-350 mb-20'>
        <select
          value={recruitForm.category}
          onChange={(e) =>
            setRecruitForm((form) => {
              form.category = e.target.value as StudyCategory;
            })
          }
          className='w-full rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'
        >
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
        onClick={handleClickRecruitDatePicker}
        className={cls(
          'w-350 min-h-40 px-10 flex items-center justify-between bg-white rounded-12 border-2 border-solid border-gray_60 text-14 text-black',
          showRecruitDeadlineDatePicker ? 'border-primary' : '',
        )}
      >
        <span>{recruitForm.recruit_deadline ?? dateFormatInitText}</span>
        <CalendarIcon width='24' color='#9AA8BC' />
      </button>
      <div className=' relative mb-20'>
        {showRecruitDeadlineDatePicker && (
          <DatePicker
            dateValue={recruitForm.recruit_deadline}
            onDateChange={(dateFormat) =>
              setRecruitForm((form) => {
                console.log(dateFormat);
                form.recruit_deadline = dateFormat;
              })
            }
            calendarRange={calendarRange}
            className=' absolute z-10 top-10'
          />
        )}
      </div>

      {/* 스터디 기간 선택 달력 */}
      <div className='flex items-center gap-10 mb-20'>
        <div>
          <h6 className=' text-gray_70 text-14 font-medium mb-5'>스터디 예정 시작일</h6>
          <button
            onClick={(e) => handleClickStudyStartEndDatePicker(e, 'startDate')}
            className={cls(
              'w-175 min-h-40 px-10 flex items-center justify-between bg-white rounded-12 border-2 border-solid border-gray_60 text-14 text-black',
              showStudyStartEndDatePicker && studyStartEndSelectMode === 'startDate' ? 'border-primary' : '',
            )}
          >
            <span>{recruitForm.expected_start_at ?? dateFormatInitText}</span>
            <CalendarIcon width='24' color='#9AA8BC' />
          </button>
        </div>
        <div>
          <h6 className=' text-gray_70 text-14 font-medium mb-5'>스터디 예정 마감일</h6>
          <button
            onClick={(e) => handleClickStudyStartEndDatePicker(e, 'endDate')}
            className={cls(
              'w-175 min-h-40 px-10 flex items-center justify-between bg-white rounded-12 border-2 border-solid border-gray_60 text-14 text-black',
              showStudyStartEndDatePicker && studyStartEndSelectMode === 'endDate' ? 'border-primary' : '',
            )}
          >
            <span>{recruitForm.expected_end_at ?? dateFormatInitText}</span>
            <CalendarIcon width='24' color='#9AA8BC' />
          </button>
        </div>
      </div>
      <div className=' relative mb-30'>
        {showStudyStartEndDatePicker && (
          <DateRangePicker
            calendarRange={calendarRange}
            selectMode={studyStartEndSelectMode}
            dateRangeValue={{ start: recruitForm.expected_start_at, end: recruitForm.expected_end_at }}
            onDateRangeChange={(dateRange) =>
              setRecruitForm((form) => {
                form.expected_start_at = dateRange.start;
                form.expected_end_at = dateRange.end;
              })
            }
            className=' absolute z-10 top-10'
          />
        )}
      </div>

      {/* 연락 방법 및 링크 */}
      <h3 className=' text-16 text-black font-medium mb-20'>연락방법 및 링크</h3>
      <h6 className='text-gray_70 text-14 font-medium mb-5'>연락 방법</h6>
      <input
        type='text'
        value={recruitForm.contact ?? ''}
        onChange={(e) =>
          setRecruitForm((form) => {
            form.contact = e.target.value;
          })
        }
        className=' w-350 min-h-40 mb-20 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black outline-primary'
      />
      <h6 className='text-gray_70 text-14 font-medium mb-5'>링크</h6>
      <input
        type='text'
        value={recruitForm.link ?? ''}
        onChange={(e) =>
          setRecruitForm((form) => {
            form.link = e.target.value;
          })
        }
        className=' w-350 min-h-40 mb-100 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black outline-primary'
      />
      <Hr className='mb-50' />

      {/* 다음 버튼 */}
      <div className='flex items-center justify-end'>
        <button onClick={moveNextPage} className='py-12 px-18 bg-primary text-white rounded-16 text-16 font-normal'>
          다음
        </button>
      </div>
    </div>
  );
}

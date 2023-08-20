import React, { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import dayjs from 'dayjs';
import { SelectMode } from '@/components/datePicker/dateRangePicker';
import Layout from '@/components/layouts/layout';
import { CalendarRange } from '@/types/datePicker';
import { StudySettingsType } from '@/types/studySettingsType';
import { cls } from '@/utils/cls';
import DateRangePicker from '../../../components/datePicker/dateRangePicker';
import CalendarIcon from '../../../public/icons/calendar.svg';
import { CHECK_LIST_LIMIT } from '@/constants/studySettings';
import Hr from '@/components/hr';
import ChevronBottomIcon from '../../../public/icons/chevron_bottom.svg';
import convertToKoreanTime from '@/utils/convertToKoreanTime';
import { days } from '@/constants/dayjs';

type Props = {};

const initialStudySettings: StudySettingsType = {
  title: '알고리즘 스터디', // 스터디 제목
  start: '2023-08-10', // 시작일
  end: '2023-10-10', // 종료일
  cycle_of_week: 1, // 몇 주에 한 번
  hour: 14, // 스터디 시간 (0 ~ 23)
  minute: 0, // 스터디 분 (0 | 30)
  checkList: ['최소 10문제 풀어오기', '각자 푼 문제 발표하기'], // 체크리스트
  rule_content: '서로에게 존댓말 사용하기\n스터디 내 연애 금지', // 자율 규칙
};

const dateFormatInitText = 'YYYY-MM-DD';

// 스터디 시작 날짜와 마감 날짜, 몇주에 한 번인지 주어졌을 때
// 종료일과 총 몇회차인지 반환하는 함수
const getStudyEndInfo = (startDate: string, endDate: string, cycleOfWeek: number) => {
  const dateDiff = dayjs(endDate).diff(startDate, 'day');
  const studyCount = Math.floor(dateDiff / 7 / cycleOfWeek) + 1;
  const studyEnd = dayjs(startDate)
    .add((studyCount - 1) * 7 * cycleOfWeek, 'day')
    .format('YYYY-MM-DD');
  return { studyCount, studyEnd };
};

export default function StudySetting({}: Props) {
  const now = dayjs();

  const calendarRange: CalendarRange = {
    start: now.format(),
    end: now.add(1, 'year').set('month', 11).set('date', 31).format(), // 달력 범위 - 다음해 12월
  };

  const [studySettings, setStudySettings] = useImmer(initialStudySettings);
  const [datePicker, setDatePicker] = useImmer<{ show: boolean; selectMode: SelectMode }>({
    show: false,
    selectMode: 'startDate',
  });

  const handleClickDatePicker = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, pickerType: SelectMode) => {
    e.stopPropagation();
    if (pickerType === datePicker.selectMode) {
      setDatePicker((prev) => {
        prev.show = !prev.show;
      });
    } else {
      setDatePicker((prev) => {
        prev.selectMode = prev.selectMode === 'startDate' ? 'endDate' : 'startDate';
      });
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setDatePicker((picker) => {
        picker.show = false;
      });
    });
  });

  const onClickStartStudyBtn = () => {};
  const studyEndInfo =
    studySettings.start && studySettings.end
      ? getStudyEndInfo(studySettings.start, studySettings.end, studySettings.cycle_of_week)
      : null;
  return (
    <Layout hasFooter onlyAccess='user'>
      <main className='flex flex-col items-center pt-60 px-200'>
        <div className='w-full px-30 py-30 bg-white rounded-30'>
          <h1 className='text-[#1A212B] font-semibold text-30 mb-5'>스터디 시작 전 최종 상세 설정</h1>
          <h6 className=' text-gray_70 text-14 font-medium mb-30'>스터디가 시작되면 변경할 수 없습니다.</h6>

          {/* 스터디 제목 입력 */}
          <h3 className=' text-black text-20 font-medium mb-5'>스터디 제목</h3>
          <input
            type='text'
            value={studySettings.title}
            placeholder='스터디 제목을 작성해주세요'
            onChange={(e) =>
              setStudySettings((settings) => {
                settings.title = e.target.value;
              })
            }
            className=' w-full min-h-40 mb-30 px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black outline-primary'
          />
          {/* 스터디 기간 선택 달력 */}
          <h3 className=' text-black text-20 font-medium mb-10'>스터디 기간 / 주기</h3>
          <div className='flex items-center gap-10 mb-20'>
            <div>
              <h6 className=' text-gray_70 text-14 font-medium mb-5'>스터디 시작일</h6>
              <button
                onClick={(e) => handleClickDatePicker(e, 'startDate')}
                className={cls(
                  'w-175 min-h-40 px-10 flex items-center justify-between bg-white rounded-12 border-2 border-solid border-gray_60 text-14 text-black',
                  datePicker.show && datePicker.selectMode === 'startDate' ? 'border-primary' : '',
                )}
              >
                <span>{studySettings.start ?? dateFormatInitText}</span>
                <CalendarIcon width='24' color='#9AA8BC' />
              </button>
            </div>
            <div>
              <h6 className=' text-gray_70 text-14 font-medium mb-5'>스터디 마감일</h6>
              <button
                onClick={(e) => handleClickDatePicker(e, 'endDate')}
                className={cls(
                  'w-175 min-h-40 px-10 flex items-center justify-between bg-white rounded-12 border-2 border-solid border-gray_60 text-14 text-black',
                  datePicker.show && datePicker.selectMode === 'endDate' ? 'border-primary' : '',
                )}
              >
                <span>{studySettings.end ?? dateFormatInitText}</span>
                <CalendarIcon width='24' color='#9AA8BC' />
              </button>
            </div>
          </div>
          <div className=' relative mb-30'>
            {datePicker.show && (
              <DateRangePicker
                calendarRange={calendarRange}
                selectMode={datePicker.selectMode}
                dateRangeValue={{ start: studySettings.start, end: studySettings.end }}
                onDateRangeChange={(dateRange) =>
                  setStudySettings((settings) => {
                    settings.start = dateRange.start;
                    settings.end = dateRange.end;
                  })
                }
                className=' absolute z-10 top-10'
              />
            )}
          </div>

          {/* 스터디 주기 / 시간 선택 */}
          <div className='flex items-center gap-10 mb-30'>
            <div>
              <h6 className=' text-gray_70 text-14 font-medium mb-5'>스터디 주기</h6>
              <div className='relative'>
                <select
                  value={studySettings.cycle_of_week}
                  onChange={(e) =>
                    setStudySettings((settings) => {
                      settings.cycle_of_week = Number(e.target.value);
                    })
                  }
                  className=' w-150 rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'
                >
                  {Array.from({ length: 4 }, (_, i) => i + 1).map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
                <ChevronBottomIcon width='20' height='20' className='absolute top-10 right-12 cursor-pointer' />
              </div>
            </div>
            <div>
              <h6 className=' text-gray_70 text-14 font-medium mb-5'>시간</h6>
              <div className='relative'>
                <select
                  value={studySettings.hour}
                  onChange={(e) =>
                    setStudySettings((settings) => {
                      settings.hour = Number(e.target.value);
                    })
                  }
                  className=' w-150 rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'
                >
                  {Array.from({ length: 24 }, (_, i) => i).map((time) => (
                    <option key={time} value={time}>
                      {convertToKoreanTime(time)}
                    </option>
                  ))}
                </select>
                <ChevronBottomIcon width='20' height='20' className='absolute top-10 right-12 cursor-pointer' />
              </div>
            </div>
            <div>
              <h6 className=' text-gray_70 text-14 font-medium mb-5'>분</h6>
              <div className='relative'>
                <select
                  value={studySettings.minute}
                  onChange={(e) =>
                    setStudySettings((settings) => {
                      settings.minute = Number(e.target.value);
                    })
                  }
                  className=' w-150 rounded-13 py-10 px-12 border-1 border-solid border-[#9AA8BC] outline-none text-14 font-normal text-black cursor-pointer appearance-none'
                >
                  <option value={0}>00분</option>
                  <option value={30}>30분</option>
                </select>
                <ChevronBottomIcon width='20' height='20' className='absolute top-10 right-12 cursor-pointer' />
              </div>
            </div>
          </div>

          <div className='text-16 mb-10 flex items-center gap-3 font-medium'>
            <span className=' text-primary'>{studySettings.cycle_of_week}</span>
            <span className=' text-black'>주에 한 번</span>
            <span className=' text-primary'>
              {convertToKoreanTime(studySettings.hour)} {studySettings.minute}분
            </span>
            <span>에 스터디가 진행됩니다.</span>
          </div>
          {studySettings.start && studySettings.end && (
            <div className='text-16 mb-30 flex items-center gap-3 font-medium'>
              <span className=' text-primary'>{studySettings.start}</span>
              <span className=' text-black'>{days[dayjs(studySettings.start).day()]}요일부터 </span>
              <span className=' text-primary'>{studyEndInfo?.studyEnd}</span>

              <span className=' text-black'>{days[dayjs(studySettings.start).day()]}요일까지 </span>
              <span className=' text-black'>총 </span>
              <span className=' text-primary'>{studyEndInfo?.studyCount}</span>
              <span className=' text-black'>회차로 진행됩니다.</span>
            </div>
          )}
          {/* 체크리스트 생성 상자 */}
          <h3 className=' text-20 text-black font-medium mb-10'>체크리스트</h3>
          <div className='flex items-center gap-5 mb-5'>
            <h6 className='text-gray_70 font-medium text-14 '>
              피드백 폼에 들어갈 내용입니다. 체크리스트 중 하나라도 어기면 1out입니다.
            </h6>
            <span className='text-primary font-medium text-14'>{`(${studySettings.checkList.length}/${CHECK_LIST_LIMIT})`}</span>
          </div>
          <div className='flex flex-col gap-10 mb-100'>
            {studySettings.checkList.map((item, i) => (
              <article key={i} className=' flex items-center gap-10'>
                <input
                  type='text'
                  value={item}
                  spellCheck={false}
                  onChange={(e) =>
                    setStudySettings((settings) => {
                      settings.checkList[i] = e.target.value;
                    })
                  }
                  className='w-350 min-h-40 h-full px-10 flex items-center justify-between bg-white rounded-12 border-1 border-solid border-gray_60 text-14 text-black outline-primary'
                />

                {studySettings.checkList.length < CHECK_LIST_LIMIT && studySettings.checkList.length === i + 1 && (
                  <button
                    onClick={() =>
                      setStudySettings((settings) => {
                        settings.checkList = [...settings.checkList, ''];
                      })
                    }
                    className='w-35 h-35 flex justify-center items-center shrink-0 bg-white text-primary border-1 border-primary rounded-10 text-14 font-bold hover:bg-primary hover:text-white'
                  >
                    +
                  </button>
                )}
                {studySettings.checkList.length !== 1 && (
                  <button
                    onClick={() =>
                      setStudySettings((settings) => {
                        settings.checkList = settings.checkList.filter((_, idx) => idx !== i);
                      })
                    }
                    className='w-35 h-35 flex justify-center items-center shrink-0 bg-white text-primary border-1 border-primary rounded-10 text-14 font-bold hover:bg-primary hover:text-white'
                  >
                    -
                  </button>
                )}
              </article>
            ))}
          </div>

          <Hr className='mb-50' />
          {/* 생성하기 버튼 */}
          <div className='flex items-center justify-end'>
            <button
              onClick={onClickStartStudyBtn}
              className='py-12 px-18 bg-primary text-white rounded-16 text-16 font-normal'
            >
              스터디 시작하기
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}

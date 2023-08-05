import React, { HTMLAttributes, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import DatePickerHeader from './datePickerHeader';
import DateRangePickerBody from './dateRangePickerBody';
import StopPropagation from '../stopPropagation';
import { CalendarRange } from '@/types/datePicker';

dayjs.extend(isBetween);

// 선택된 날짜 시작-종료 (null값이면 아직 선택 안함)
export type DateRangeType = {
  start: string | null;
  end: string | null;
};

// 선택 모드 (시작 날짜 or 종료 날짜)
export type SelectMode = 'startDate' | 'endDate';

interface Props extends HTMLAttributes<HTMLDivElement> {
  // 달력 범위 (없을 시 기본값 적용)
  calendarRange?: {
    start: string;
    end: string;
  };
  dateFormat?: string;
  selectMode?: SelectMode; // 시작일 선택 | 마감일 선택
  dateRangeValue: DateRangeType; // 선택된 날짜
  onDateRangeChange: (dateRange: DateRangeType) => void;
}

const days = ['일', '월', '화', '수', '목', '금', '토'];
const DEFAULT_CALENDAR_RANGE = 30; // 기본 캘린더 범위 - 앞뒤 30년 (calendarRange의 기본값)
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

const DatePicker: React.FC<Props> = ({
  calendarRange,
  dateFormat,
  selectMode,
  dateRangeValue,
  onDateRangeChange,
  ...props
}) => {
  const now = dayjs(); // 현재 시간

  // 달력 범위 기본값 설정
  const calendarRangeInit: CalendarRange = calendarRange ?? {
    start: now.subtract(DEFAULT_CALENDAR_RANGE, 'year').format(),
    end: now.add(DEFAULT_CALENDAR_RANGE, 'year').format(),
  };

  const dateRangeValueInit: dayjs.Dayjs =
    selectMode === 'startDate' && dateRangeValue.start
      ? dayjs(dateRangeValue.start)
      : selectMode === 'endDate' && dateRangeValue.end
      ? dayjs(dateRangeValue.end)
      : dateRangeValue.start
      ? dayjs(dateRangeValue.start)
      : dateRangeValue.end
      ? dayjs(dateRangeValue.end)
      : now;

  // 현재 보여줄 달력 페이지에 해당하는 날짜
  const [showingDate, setShowingDate] = useState<dayjs.Dayjs>(dateRangeValueInit);

  return (
    <StopPropagation className={`shadow-neumorphism w-300 p-20 bg-white rounded-20 ${props.className ?? ''}`}>
      <DatePickerHeader calendarRange={calendarRangeInit} showingDate={showingDate} setShowingDate={setShowingDate} />
      <div className='flex items-center'>
        {days.map((day) => (
          <div key={day} className='flex justify-center items-center grow py-10 text-[#728197] text-14 font-medium'>
            {day}
          </div>
        ))}
      </div>
      <DateRangePickerBody
        showingDate={showingDate}
        calendarRange={calendarRangeInit}
        selectMode={selectMode ?? 'startDate'}
        dateRangeValue={dateRangeValue}
        onDateRangeChange={onDateRangeChange}
        dateFormat={dateFormat ?? DEFAULT_DATE_FORMAT}
      />
    </StopPropagation>
  );
};

export default DatePicker;

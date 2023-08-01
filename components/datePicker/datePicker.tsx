import React, { HTMLAttributes, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import DatePickerHeader from './datePickerHeader';
import DatePickerBody from './datePickerBody';
import StopPropagation from '../stopPropagation';

dayjs.extend(isBetween);

// 년,월
export interface DateType {
  year: number;
  month: number;
}

// 년,월,일
export interface FullDateType extends DateType {
  date: number;
}

// 달력 범위
export interface CalendarRange {
  start: DateType;
  end: DateType;
}

// 선택된 날짜 시작-종료 (null값이면 아직 선택 안함)
export interface SelectedDateRange {
  start: FullDateType | null;
  end: FullDateType | null;
}

// 선택 모드 (시작 날짜 or 종료 날짜)
export type SelectMode = 'startDate' | 'endDate';

interface Props extends HTMLAttributes<HTMLDivElement> {
  calendarRange?: {
    start: string;
    end: string;
  }; // 달력 범위 (없을 시 기본값 적용)
  initialCalendarDate?: DateType; // 달력을 열었을 때 처음 보여줄 날짜
  selectedDateRange: SelectedDateRange; // 선택된 날짜
  selectMode: SelectMode; // 시작일 선택 | 마감일 선택
  setSelectedDateRange: React.Dispatch<React.SetStateAction<SelectedDateRange>>;
}

const days = ['일', '월', '화', '수', '목', '금', '토'];
const DEFAULT_CALENDAR_RANGE = 30; // 기본 캘린더 범위 - 앞뒤 30년 (calendarRange의 기본값)

const DatePicker: React.FC<Props> = ({
  calendarRange,
  initialCalendarDate,
  selectedDateRange,
  selectMode,
  setSelectedDateRange,
  ...props
}) => {
  const now = dayjs(); // 현재 시간

  // 달력 범위 기본값 설정
  const calendarRangeInit: CalendarRange = calendarRange
    ? {
        start: { year: dayjs(calendarRange.start).get('year'), month: dayjs(calendarRange.start).get('month') },
        end: { year: dayjs(calendarRange.end).get('year'), month: dayjs(calendarRange.start).get('month') },
      }
    : {
        start: {
          year: now.subtract(DEFAULT_CALENDAR_RANGE, 'year').get('year'),
          month: now.subtract(DEFAULT_CALENDAR_RANGE, 'month').get('month'),
        },
        end: {
          year: now.add(DEFAULT_CALENDAR_RANGE, 'year').get('year'),
          month: now.add(DEFAULT_CALENDAR_RANGE, 'month').get('month'),
        },
      };

  // 처음 보여줄 달력 시간(년,월)
  // initialCalendarDate가 주어지지 않았다면 현재 날짜로 설정
  const initialShowingDate: DateType = initialCalendarDate ?? {
    year: now.get('year'),
    month: now.get('month') + 1,
  };

  // 현재 보여줄 달력 페이지에 해당하는 날짜
  const [showingDate, setShowingDate] = useState<DateType>(initialShowingDate);

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
      <DatePickerBody {...{ showingDate, selectedDateRange, selectMode, setSelectedDateRange }} />
    </StopPropagation>
  );
};

export default DatePicker;

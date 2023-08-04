import React, { HTMLAttributes, useState } from 'react';
import StopPropagation from '../stopPropagation';
import DatePickerHeader from './datePickerHeader';
import { CalendarRange } from '@/types/datePicker';
import dayjs from 'dayjs';
import DatePickerBody from './datePickerBody';

interface Props extends HTMLAttributes<HTMLDivElement> {
  calendarRange?: {
    start: string;
    end: string;
  };
  dateFormat?: string;
  dateValue: string | null;
  onDateChange: (dateFormat: string | null) => void;
}
const days = ['일', '월', '화', '수', '목', '금', '토'];
const DEFAULT_CALENDAR_RANGE = 30; // 기본 캘린더 범위 - 앞뒤 30년 (calendarRange의 기본값)
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export default function DatePicker({ calendarRange, dateFormat, dateValue, onDateChange, ...props }: Props) {
  const now = dayjs();

  // 현재 보여줄 달력 페이지에 해당하는 날짜
  const [showingDate, setShowingDate] = useState(dateValue ? dayjs(dateValue) : now);

  // 달력 범위 기본값 설정
  const calendarRangeInit: CalendarRange = calendarRange ?? {
    start: now.subtract(DEFAULT_CALENDAR_RANGE, 'year').format(),
    end: now.add(DEFAULT_CALENDAR_RANGE, 'year').format(),
  };
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
      <DatePickerBody
        showingDate={showingDate}
        calendarRange={calendarRangeInit}
        dateFormat={dateFormat ?? DEFAULT_DATE_FORMAT}
        dateValue={dateValue}
        onDateChange={onDateChange}
      />
    </StopPropagation>
  );
}

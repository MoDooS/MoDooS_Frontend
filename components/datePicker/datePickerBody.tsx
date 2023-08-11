import { cls } from '@/utils/cls';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { getCalendarArray, inCalendarRange } from './datePickerUtils';
import { CalendarRange } from '@/types/datePicker';

type Props = {
  showingDate: dayjs.Dayjs; // 현재 보여줄 달력 페이지에 해당하는 날짜
  calendarRange: CalendarRange;
  dateFormat: string; // 날짜 형식
  dateValue: string | null;
  onDateChange: (dateFormat: string | null) => void;
};

export default function DatePickerBody({ showingDate, calendarRange, dateFormat, dateValue, onDateChange }: Props) {
  const now = dayjs();
  const dateValueObj = dateValue ? dayjs(dateValue) : null;

  const handleSelectDate = (selectedDate: dayjs.Dayjs) => {
    if (selectedDate.isBetween(calendarRange.start, calendarRange.end, 'day', '[]')) {
      onDateChange(dateValueObj?.isSame(selectedDate, 'day') ? null : selectedDate.format(dateFormat));
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
      {getCalendarArray(showingDate).map((date, i) => {
        const isBeforeMonth = date - i > 7; // 이전달에 포함된 날짜인지
        const month = isBeforeMonth ? showingDate.get('month') - 1 : showingDate.get('month'); // 날짜가 소속된 달
        const dateObj = showingDate.set('month', month).set('date', date);
        const isToday = now.isSame(dateObj, 'day'); // 오늘인지
        const isSelected = dateValueObj?.isSame(dateObj, 'day');

        const isNotAllowed = !inCalendarRange(dateObj, calendarRange);

        return (
          <button
            key={i}
            onClick={() => handleSelectDate(dateObj)}
            className={cls(
              'py-10 flex justify-center items-center text-13 rounded-15',
              isToday ? 'font-bold' : '',
              isSelected ? 'bg-primary rounded-15 text-white' : '',
              !isSelected && !isNotAllowed ? 'hover:bg-[rgba(179,190,255,0.4)]' : '',
              isNotAllowed ? 'cursor-not-allowed' : 'cursor-pointer',
              isBeforeMonth ? 'text-[rgba(26,33,43,0.3)]' : 'text-[#1A212B]',
            )}
          >
            {date}
          </button>
        );
      })}
    </div>
  );
}

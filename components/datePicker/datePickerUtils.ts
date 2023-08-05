// 이전월의 날짜까지 포함한 총 달력의 숫자들을 구하는 함수

import { CalendarRange } from '@/types/datePicker';
import dayjs from 'dayjs';

// ex. 29 30 31 1 2 3 ... ~ 31
export const getCalendarArray = (date: dayjs.Dayjs): number[] => {
  const daysInShowingMonth = date.daysInMonth(); // 한 달에 총 며칠인지 (30 | 31)
  const daysInBeforeMonth = date.subtract(1, 'month').daysInMonth(); // 전 달에 총 며칠인지 (30 | 31)
  const startDayInMonth = date.set('date', 1).day(); // oooo년 o월 1일이 N요일인지 (0 ~ 6)(일 ~ 토)

  const beforeMonthArray = Array.from({ length: daysInBeforeMonth }, (_, i) => i + 1); // 이전 달 Array
  const showingMonthArray = Array.from({ length: daysInShowingMonth }, (_, i) => i + 1); // 현재 달 Array

  // 1일이 일요일부터 시작하면 현재 달 Array만 반환
  // else 이전달 마지막 부분과 현재 달을 합쳐서 반환
  return startDayInMonth === 0 ? showingMonthArray : beforeMonthArray.slice(-startDayInMonth).concat(showingMonthArray);
};

export const inCalendarRange = (date: dayjs.Dayjs, calendarRange: CalendarRange): boolean => {
  return date.isBetween(calendarRange.start, calendarRange.end, 'day', '[]');
};

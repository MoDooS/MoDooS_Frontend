import { cls } from '@/utils/cls';
import React from 'react';
import { DateRangeType, SelectMode } from './dateRangePicker';
import dayjs from 'dayjs';
import { getCalendarArray, inCalendarRange } from './datePickerUtils';
import { CalendarRange } from '@/types/datePicker';

interface Props {
  showingDate: dayjs.Dayjs; // 현재 보여줄 달력 페이지에 해당하는 날짜
  calendarRange: CalendarRange; // 달력 범위
  selectMode: SelectMode; // 선택 모드 (시작 날짜 or 종료 날짜)
  dateFormat: string;
  dateRangeValue: DateRangeType; // 선택된 날짜
  onDateRangeChange: (dateRange: DateRangeType) => void;
}

const DatePickerBody: React.FC<Props> = ({
  showingDate,
  calendarRange,
  selectMode,
  dateFormat,
  dateRangeValue,
  onDateRangeChange,
}) => {
  const now = dayjs(); // 현재 날짜

  // 달력의 날짜를 선택했을 때
  const handleSelectDate = (selectedDate: dayjs.Dayjs) => {
    // 달력 범위를 벗어난다면
    if (!inCalendarRange(selectedDate, calendarRange)) {
      return;
    }

    if (selectMode === 'startDate' && selectedDate.isSame(dateRangeValue.start, 'day')) {
      onDateRangeChange({ ...dateRangeValue, start: null });
      return;
    }
    if (selectMode === 'endDate' && selectedDate.isSame(dateRangeValue.end, 'day')) {
      onDateRangeChange({ ...dateRangeValue, end: null });
      return;
    }
    if (selectMode === 'startDate' && !dateRangeValue.end) {
      // 시작일 선택 모드 && 종료일이 선택되지 않았다면
      // 검사 없이 날짜 선택
      onDateRangeChange({ ...dateRangeValue, start: selectedDate.format(dateFormat) });
      return;
    }

    // 종료일 선택 모드 && 시작일이 선택되지 않았다면
    // 검사 없이 날짜 선택
    if (selectMode === 'endDate' && !dateRangeValue.start) {
      onDateRangeChange({ ...dateRangeValue, end: selectedDate.format(dateFormat) });
      return;
    }

    // 선택된 날짜(시작일)가 종료일보다 앞에 있는지 검사
    if (selectMode === 'startDate' && selectedDate.isBefore(dateRangeValue.end!, 'day')) {
      onDateRangeChange({ ...dateRangeValue, start: selectedDate.format(dateFormat) });
      return;
    }

    // 시작일이 선택된 날짜(종료일)보다 앞에 있는지 검사
    // true일 경우만 날짜 선택
    if (selectMode === 'endDate' && dayjs(dateRangeValue.start!).isBefore(selectedDate, 'day')) {
      onDateRangeChange({ ...dateRangeValue, end: selectedDate.format(dateFormat) });
    }
  };

  // 달력의 날짜가 selectedDateRange(선택된 날짜)와 비교해서
  // 시작일과 같은지, 종료일과 같은지, 중간인지 판별하는 함수
  // 셋중 어디에도 해당하지 않을 시 else 반환

  // 시작일과 같은지 -> selectedDateRange.start와 모두 동일
  // 종료일과 같은지 -> selectedDateRange.end와 모두 동일
  // 중간인지 -> dayjs.isBetween 함수 활용

  type DatePosition = 'start' | 'middle' | 'end' | 'else';

  const getDatePosition = (dateObj: dayjs.Dayjs): DatePosition => {
    const dateRangeValueStartObj = dayjs(dateRangeValue.start);
    const dateRangeValueEndObj = dayjs(dateRangeValue.end);

    if (dateRangeValueStartObj.isSame(dateObj, 'day')) {
      return 'start';
    }
    if (dateRangeValueEndObj.isSame(dateObj, 'day')) {
      return 'end';
    }

    if (!dateRangeValue.start || !dateRangeValue.end) {
      return 'else';
    }

    if (dateObj.isBetween(dateRangeValueStartObj, dateRangeValueEndObj)) {
      return 'middle';
    }
    return 'else';
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
      {getCalendarArray(showingDate).map((date, i) => {
        const isBeforeMonth = date - i > 7; // 이전달에 포함된 날짜인지
        const month = isBeforeMonth ? showingDate.get('month') - 1 : showingDate.get('month'); // 날짜가 소속된 달
        const dateObj = showingDate.set('month', month).set('date', date);
        const datePosition = getDatePosition(dateObj); // 선택된 날짜에 포함되는지
        const isToday = now.isSame(dateObj, 'day'); // 오늘인지

        // datePosition에 따라 text 효과가 달라짐
        const textClassName =
          datePosition === 'start' || datePosition === 'end'
            ? 'text-white'
            : isBeforeMonth
            ? 'text-[rgba(26,33,43,0.3)]'
            : 'text-[#1A212B]';

        const isNotAllowed =
          !inCalendarRange(dateObj, calendarRange) ||
          (selectMode === 'startDate' &&
            (dateObj.isSame(dateRangeValue.end, 'day') || dateObj.isAfter(dateRangeValue.end, 'day'))) ||
          (selectMode === 'endDate' &&
            (dateObj.isSame(dateRangeValue.start, 'day') || dateObj.isBefore(dateRangeValue.start, 'day')));

        // datePosition에 따라 hover 효과가 달라짐
        const hoverClassName = isNotAllowed
          ? ''
          : datePosition === 'else'
          ? 'hover:bg-[rgba(179,190,255,0.4)]'
          : datePosition === 'middle'
          ? 'hover:bg-[rgba(179,190,255,0.6)]'
          : '';
        return (
          <button
            key={i}
            onClick={() => handleSelectDate(dateObj)}
            className={cls(
              'py-10 flex justify-center items-center text-13',
              hoverClassName,
              textClassName,
              isToday ? 'font-bold' : '',
              isNotAllowed ? 'cursor-not-allowed' : 'cursor-pointer',
              datePosition === 'start'
                ? 'bg-primary rounded-tl-20 rounded-bl-20'
                : datePosition === 'end'
                ? 'bg-primary rounded-tr-20 rounded-br-20'
                : datePosition === 'middle'
                ? 'bg-[rgba(179,190,255,0.4)]'
                : '',
            )}
          >
            {date}
          </button>
        );
      })}
    </div>
  );
};

export default DatePickerBody;

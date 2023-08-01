import { cls } from '@/utils/cls';
import React from 'react';
import { DateType, FullDateType, SelectMode, SelectedDateRange } from './datePicker';
import dayjs from 'dayjs';

interface Props {
  showingDate: DateType; // 현재 보여줄 달력 페이지에 해당하는 날짜
  selectedDateRange: SelectedDateRange; // 선택된 날짜
  selectMode: SelectMode; // 선택 모드 (시작 날짜 or 종료 날짜)
  setSelectedDateRange: React.Dispatch<React.SetStateAction<SelectedDateRange>>;
}

const DatePickerBody: React.FC<Props> = ({ showingDate, selectedDateRange, selectMode, setSelectedDateRange }) => {
  const now = dayjs(); // 현재 날짜

  // 이전월의 날짜까지 포함한 총 달력의 숫자들을 구하는 함수
  // ex. 29 30 31 1 2 3 ... ~ 31
  const getCalendarArray = (date: DateType): number[] => {
    const dateFormat = dayjs(`${date.year}-${date.month}`);
    const daysInCurrMonth = dateFormat.daysInMonth(); // 한 달에 총 며칠인지 (30 | 31)
    const daysInBeforeMonth = dateFormat.subtract(1, 'month').daysInMonth(); // 전 달에 총 며칠인지 (30 | 31)
    const startDayInMonth = dateFormat.day(); // oooo년 o월 1일이 N요일인지 (0 ~ 6)(일 ~ 토)

    const beforeMonthArray = Array.from({ length: daysInBeforeMonth }, (_, i) => i + 1); // 이전 달 Array
    const currMonthArray = Array.from({ length: daysInCurrMonth }, (_, i) => i + 1); // 현재 달 Array

    // 1일이 일요일부터 시작하면 현재 달 Array만 반환
    // else 이전달 마지막 부분과 현재 달을 합쳐서 반환
    return startDayInMonth === 0 ? currMonthArray : beforeMonthArray.slice(-startDayInMonth).concat(currMonthArray);
  };

  // 달력의 날짜를 선택했을 때
  const handleSelectDate = (selectedMonth: number, selectedDate: number) => {
    const { year } = showingDate;

    // 시작일 선택 모드 && 종료일이 선택되지 않았다면
    // 검사 없이 날짜 선택
    if (selectMode === 'startDate' && !selectedDateRange.end) {
      setSelectedDateRange((prev) => ({ ...prev, start: { year, month: selectedMonth, date: selectedDate } }));
      return;
    }

    // 종료일 선택 모드 && 시작일이 선택되지 않았다면
    // 검사 없이 날짜 선택
    if (selectMode === 'endDate' && !selectedDateRange.start) {
      setSelectedDateRange((prev) => ({ ...prev, end: { year, month: selectedMonth, date: selectedDate } }));
      return;
    }

    if (selectMode === 'startDate') {
      const startDateFormat = dayjs(`${year}-${selectedMonth}-${selectedDate}`);
      const { year: startYear, month: startMonth, date: startDate } = selectedDateRange.end!;
      const endDateFormat = dayjs(`${startYear}-${startMonth}-${startDate}`);
      if (startDateFormat.isBefore(endDateFormat)) {
        setSelectedDateRange((prev) => ({ ...prev, start: { year, month: selectedMonth, date: selectedDate } }));
      }
    } else {
      // 시작일이 종료일보다 앞에 있는지 검사
      // true일 경우만 날짜 선택
      const endDateFormat = dayjs(`${year}-${selectedMonth}-${selectedDate}`);
      const { year: startYear, month: startMonth, date: startDate } = selectedDateRange.start!;
      const startDateFormat = dayjs(`${startYear}-${startMonth}-${startDate}`);
      if (startDateFormat.isBefore(endDateFormat)) {
        setSelectedDateRange((prev) => ({ ...prev, end: { year, month: selectedMonth, date: selectedDate } }));
      }
    }
  };

  // 달력의 날짜가 selectedDateRange(선택된 날짜)와 비교해서
  // 시작일과 같은지, 종료일과 같은지, 중간인지 판별하는 함수
  // 셋중 어디에도 해당하지 않을 시 else 반환

  // 시작일과 같은지 -> selectedDateRange.start와 모두 동일
  // 종료일과 같은지 -> selectedDateRange.end와 모두 동일
  // 중간인지 -> dayjs.isBetween 함수 활용

  type DatePosition = 'start' | 'middle' | 'end' | 'else';

  const getDatePosition = (calendarDate: FullDateType): DatePosition => {
    if (
      selectedDateRange.start?.year === calendarDate.year &&
      selectedDateRange.start.month === calendarDate.month &&
      selectedDateRange.start.date === calendarDate.date
    ) {
      return 'start';
    }
    if (
      selectedDateRange.end?.year === calendarDate.year &&
      selectedDateRange.end.month === calendarDate.month &&
      selectedDateRange.end.date === calendarDate.date
    ) {
      return 'end';
    }
    if (!selectedDateRange.start || !selectedDateRange.end) {
      return 'else';
    }

    const { year: startYear, month: startMonth, date: startDate } = selectedDateRange.start;
    const { year: endYear, month: endMonth, date: endDate } = selectedDateRange.end;
    const startDateFormat = dayjs(`${startYear}-${startMonth}-${startDate}`);
    const endDateFormat = dayjs(`${endYear}-${endMonth}-${endDate}`);
    const calendarDateFormat = dayjs(`${calendarDate.year}-${calendarDate.month}-${calendarDate.date}`);

    if (calendarDateFormat.isBetween(startDateFormat, endDateFormat)) {
      return 'middle';
    } else {
      return 'else';
    }
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
      {getCalendarArray(showingDate).map((date, i) => {
        const { year } = showingDate;
        const isBeforeMonth = date - i > 7; // 이전달에 포함된 날짜인지
        const month = isBeforeMonth ? showingDate.month - 1 : showingDate.month; // 날짜가 소속된 달
        const datePosition = getDatePosition({ year, month, date }); // 선택된 날짜에 포함되는지
        const isToday = now.isSame(`${year}-${month}-${date}`, 'day'); // 오늘인지

        // datePosition에 따라 text 효과가 달라짐
        const textClassName =
          datePosition === 'start' || datePosition === 'end'
            ? 'text-white'
            : isBeforeMonth
            ? 'text-[rgba(26,33,43,0.3)]'
            : 'text-[#1A212B]';

        // datePosition에 따라 hover 효과가 달라짐
        const hoverClassName =
          datePosition === 'else'
            ? 'hover:bg-[rgba(179,190,255,0.4)]'
            : datePosition === 'middle'
            ? 'hover:bg-[rgba(179,190,255,0.6)]'
            : '';
        return (
          <button
            key={i}
            onClick={() => handleSelectDate(month, date)}
            className={cls(
              'py-10 flex justify-center items-center text-13 cursor-pointer',
              hoverClassName,
              textClassName,
              isToday ? 'font-bold' : '',
              datePosition === 'start'
                ? 'bg-purple rounded-tl-20 rounded-bl-20'
                : datePosition === 'end'
                ? 'bg-purple rounded-tr-20 rounded-br-20'
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

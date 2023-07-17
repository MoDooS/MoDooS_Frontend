import React from 'react';
import { CalendarRange, DateType } from './datePicker';
import ChevronLeft from '../../public/icons/chevron_left.svg';
import ChevronRight from '../../public/icons/chevron_right.svg';

// DatePicker 상단의 날짜 이동하는 Section

interface Props {
  calendarRange: CalendarRange; // 달력 범위
  showingDate: DateType; // 현재 보여줄 달력 페이지에 해당하는 날짜
  setShowingDate: React.Dispatch<React.SetStateAction<DateType>>;
}

const DatePickerHeader: React.FC<Props> = ({ calendarRange, showingDate, setShowingDate }) => {
  const {
    start: { year: startYear, month: startMonth },
    end: { year: endYear, month: endMonth },
  } = calendarRange;

  // Select Options
  const monthOptions = Array.from({ length: 12 }, (_, i) => i);
  const yearOptions = Array.from({ length: endYear - startYear }, (_, i) => i);

  // 달이 select 되었을 때
  function onChangeMonth(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedMonth = e.target.value;
    setShowingDate((prev) => ({ ...prev, month: +selectedMonth }));
  }

  // 년이 select 되었을 때
  function onChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedYear = e.target.value;
    setShowingDate((prev) => ({ ...prev, year: +selectedYear }));
  }

  // 이전 달로
  function toPrevMonth(date: DateType): DateType {
    const { year, month } = date;
    if (year === startYear && month === startMonth) return date;
    if (month === 1) {
      return { year: year - 1, month: 12 };
    } else {
      return { year, month: month - 1 };
    }
  }

  // 다음 달로
  function toNextMonth(date: DateType): DateType {
    const { year, month } = date;
    if (year === endYear && month === endMonth) return date;
    if (month === 12) {
      return { year: year + 1, month: 1 };
    } else {
      return { year, month: month + 1 };
    }
  }
  return (
    <div className='flex justify-between items-center gap-50'>
      <button onClick={() => setShowingDate((prev) => toPrevMonth(prev))}>
        <ChevronLeft width='16px' />
      </button>
      <div className='flex items-center gap-10 text-20 font-medium'>
        <select value={showingDate.month} onChange={onChangeMonth} className='py-12 px-15 cursor-pointer outline-none'>
          {monthOptions.map((month) => (
            <option key={month} value={month + 1}>
              {month + 1}월
            </option>
          ))}
        </select>
        <select value={showingDate.year} onChange={onChangeYear} className='py-12 px-15 cursor-pointer outline-none'>
          {yearOptions.map((year) => (
            <option key={year} value={year + startYear}>
              {year + startYear}
            </option>
          ))}
        </select>
      </div>
      <button onClick={() => setShowingDate((prev) => toNextMonth(prev))}>
        <ChevronRight width='16' />
      </button>
    </div>
  );
};

export default DatePickerHeader;

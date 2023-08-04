import React from 'react';
import dayjs from 'dayjs';
import ChevronLeft from '../../public/icons/chevron_left.svg';
import ChevronRight from '../../public/icons/chevron_right.svg';
import { CalendarRange } from '@/types/datePicker';

// DatePicker 상단의 날짜 이동하는 Section

interface Props {
  calendarRange: CalendarRange; // 달력 범위
  showingDate: dayjs.Dayjs; // 현재 보여줄 달력 페이지에 해당하는 날짜
  setShowingDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const DatePickerHeader: React.FC<Props> = ({ calendarRange, showingDate, setShowingDate }) => {
  const calendarRangeStart = dayjs(calendarRange.start).startOf('month');
  const calendarRangeEnd = dayjs(calendarRange.end).endOf('month');

  const isCalendarStart = showingDate.subtract(1, 'month').isBefore(calendarRangeStart);
  const isCalendarEnd = showingDate.add(1, 'month').isAfter(calendarRangeEnd);

  // Select Options
  const monthOptionStart =
    showingDate.get('year') === calendarRangeStart.get('year') ? calendarRangeStart.get('month') : 0; // 시작 월
  const monthOptionEnd = showingDate.get('year') === calendarRangeEnd.get('year') ? calendarRangeEnd.get('month') : 11; // 마지막 월

  const monthOptions = Array.from({ length: monthOptionEnd - monthOptionStart + 1 }, (_, i) => monthOptionStart + i);
  const yearOptions = Array.from(
    { length: calendarRangeEnd.diff(calendarRangeStart, 'year') + 1 },
    (_, i) => i + calendarRangeStart.get('year'),
  );

  // 달이 select 되었을 때
  function onChangeMonth(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedMonth = e.target.value;
    setShowingDate((prev) => prev.set('month', +selectedMonth));
  }

  // 년이 select 되었을 때
  function onChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedYear = e.target.value;
    setShowingDate((prev) => prev.set('year', +selectedYear));
  }

  // 이전 달로
  function toPrevMonth(date: dayjs.Dayjs): dayjs.Dayjs {
    if (isCalendarStart) return date;
    return date.subtract(1, 'month');
  }

  // 다음 달로
  function toNextMonth(date: dayjs.Dayjs): dayjs.Dayjs {
    if (isCalendarEnd) return date;
    return date.add(1, 'month');
  }
  return (
    <div className='flex justify-between items-center gap-35'>
      <button
        onClick={() => setShowingDate((prev) => toPrevMonth(prev))}
        disabled={isCalendarStart}
        className={isCalendarStart ? 'cursor-not-allowed' : ''}
      >
        <ChevronLeft width='16' height='16' color={isCalendarStart ? '#9AA8BC' : 'black'} />
      </button>
      <div className='flex items-center gap-0 text-14 font-medium'>
        <select
          value={showingDate.get('month')}
          onChange={onChangeMonth}
          style={{}}
          className='py-12 px-10 cursor-pointer outline-none'
        >
          {monthOptions.map((month) => (
            <option key={month} value={month}>
              {month + 1}월
            </option>
          ))}
        </select>
        <select
          value={showingDate.get('year')}
          onChange={onChangeYear}
          className='py-12 px-15 cursor-pointer outline-none'
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => setShowingDate((prev) => toNextMonth(prev))}
        disabled={isCalendarEnd}
        className={isCalendarEnd ? 'cursor-not-allowed' : ''}
      >
        <ChevronRight width='16' height='16' color={isCalendarEnd ? '#9AA8BC' : 'black'} />
      </button>
    </div>
  );
};

export default DatePickerHeader;

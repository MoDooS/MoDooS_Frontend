import { CalendarRange, SelectMode, SelectedDateRange } from '@/components/datePicker/datePicker';
import React, { useState } from 'react';

interface Props {
  calendarRange?: CalendarRange; // 달력 범위
}

const useDatePicker = ({ calendarRange }: Props) => {
  // 선택된 날짜 범위
  const [selectedDateRange, setSelectedDateRange] = useState<SelectedDateRange>({ start: null, end: null });

  // 시작일/종료일 선택 모드
  const [selectMode, setSelectMode] = useState<SelectMode>('startDate');

  return {
    register: { selectedDateRange, setSelectedDateRange, selectMode, calendarRange, setSelectMode },
    selectMode,
    setSelectMode,
  };
};

export default useDatePicker;

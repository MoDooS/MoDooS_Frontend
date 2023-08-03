import { CalendarRange, SelectMode, SelectedDateRange } from '@/components/datePicker/datePicker';
import React, { useState } from 'react';

interface Props {
  calendarRange?: { start: string; end: string }; // 달력 범위
  initialSelectMode?: SelectMode;
  initialStartRange?: string; // 이미 선택된 시작 날짜
  initialEndRange?: string; // 이미 선택된 종료 날짜
}

const useDatePicker = ({ calendarRange, initialSelectMode, initialStartRange, initialEndRange }: Props) => {
  // 선택된 날짜 범위
  const [selectedDateRange, setSelectedDateRange] = useState<SelectedDateRange>({ start: null, end: null });

  // 시작일/종료일 선택 모드
  const [selectMode, setSelectMode] = useState<SelectMode>(initialSelectMode ?? 'startDate');

  return {
    register: { selectedDateRange, setSelectedDateRange, selectMode, calendarRange, setSelectMode },
    selectMode,
    setSelectMode,
    selectedDateRange,
  };
};

export default useDatePicker;

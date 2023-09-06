export type StudySettingsType = {
  id: number;
  title: string; // 스터디 제목
  expected_start_at: string | null; // 시작일
  expected_end_at: string | null; // 종료일
  period: number; // 몇 주에 한 번
  startHour: number; // 스터디 시작 시간 (0 ~ 23)
  startMinute: number; // 스터디 시작 분 (0 | 30)
  endHour: number; // 스터디 종료 시간 (0 ~ 23)
  endMinute: number; // 스터디 종료 분 (0 | 30)
  checkList: { id: number | null; content: string }[]; // 체크리스트
  absent: number;
  late: number;
  out: number;
};

export type StudySettingsType = {
  id: number;
  title: string; // 스터디 제목
  expected_start_at: string | null; // 시작일
  expected_end_at: string | null; // 종료일
  cycle_of_week: number; // 몇 주에 한 번
  hour: number; // 스터디 시간 (0 ~ 23)
  minute: number; // 스터디 분 (0 | 30)
  checkList: string[]; // 체크리스트
  absent: number;
  late: number;
  out: number;
};

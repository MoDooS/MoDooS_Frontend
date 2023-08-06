export type StudySettingsType = {
  title: string; // 스터디 제목
  start: string | null; // 시작일
  end: string | null; // 종료일
  cycle_of_week: number; // 몇 주에 한 번
  hour: number; // 스터디 시간 (0 ~ 23)
  minute: number; // 스터디 분 (0 | 30)
  checkList: string[]; // 체크리스트
  rule_content: string; // 자율 규칙
};

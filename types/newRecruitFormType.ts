import { StudyCategory, StudyChannel } from './studyInfo';

export type NewRecruitFormType = {
  campus: '인문' | '자연' | '공통'; // 캠퍼스
  recruits_count: number; // 모집 인원
  channel: StudyChannel; // 스터디 진행 방식
  category: StudyCategory; // 카테고리
  recruit_deadline: string | null; // 모집 마감일
  expected_start_at: string | null; // 스터디 예정 시작일
  expected_end_at: string | null; // 스터디 예정 마감일
  contact: string; // 연락 방법
  link: string; // 연락 방법 링크
  late: number; // 지각 몇 번이면 1결석
  absent: number; // 결석 몇 번이면 1아웃
  out: number; // 아웃 몇 번이면 퇴출
  checkList: string[]; // 체크리스트
  rule_content: string; // 자율 규칙
  title: string; // 스터디 소개글 (제목)
  description: string; // 스터디 소개글 (내용)
};

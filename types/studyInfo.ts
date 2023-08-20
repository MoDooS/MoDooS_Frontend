export type StudyInfo = {
  id: number;
  leader_id: number;
  leader_nickname: string;
  leader_ranking: string;
  title: string;
  status: number;
  category: StudyCategory;
  recruits_count: number;
  participants_count: number;
  recruit_deadline: string;
};

export type StudyCategory = 'ALL' | '프로그래밍' | '언어' | '취업' | '고시/공무원' | '취미/교양' | '기타';
export const studyCategories: StudyCategory[] = [
  'ALL',
  '프로그래밍',
  '언어',
  '취업',
  '고시/공무원',
  '취미/교양',
  '기타',
];

export type StudyChannel = '온라인' | '오프라인' | '병행';
export type StudyCampus = '인문' | '자연' | '공통';
export type StudyStatus = '모집 중' | '모집 마감' | '진행 중' | '종료';

export const studyStatusMapping: StudyStatus[] = ['모집 중', '모집 마감', '진행 중', '종료'];

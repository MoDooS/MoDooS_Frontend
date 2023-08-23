import { CreditRating } from '@/lib/creditRating';
import modoosAxios from './modoosAxios';
import { authToken } from '@/class/authToken';
import { StudyCategory, StudyStatusType } from '@/types/studyInfo';

type ParticipatingStudiesResponse = {
  content: {
    id: number;
    leader_id: number;
    leader_nickname: string;
    leader_ranking: CreditRating;
    title: string;
    status: StudyStatusType;
    category: StudyCategory;
    recruits_count: number;
    participants_count: number;
    recruit_deadline: string;
    heart: boolean;
  }[];
};
const studyStatusMapping = {
  전체: '',
  '모집 중': 'RECRUITING',
  '모집 마감': 'RECRUIT_END',
  '진행 중': 'ONGOING',
  종료: 'STUDY_END',
};

export default async function getParticipatingStudies(status: StudyStatusType | '전체') {
  const params = { status: studyStatusMapping[status] };
  return await modoosAxios.get<ParticipatingStudiesResponse>(`/api/recruit/my`, {
    params,
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}

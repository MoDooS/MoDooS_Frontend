import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';
import { StudyCampus, StudyCategory, StudyChannel } from '@/types/studyInfo';

type InterestStudiesResponse = {
  content: {
    id: number;
    leader_id: number;
    leader_nickname: string;
    leader_ranking: 'B';
    title: string;
    description: string;
    status: number;
    category: StudyCategory;
    campus: StudyCampus;
    recruits_count: number;
    participants_count: number;
    channel: StudyChannel;
    recruit_deadline: string;
    expected_start_at: string;
    expected_end_at: string;
    link: string | null;
    contact: string | null;
    hearted: boolean;
  }[];
};

export default function getInterestStudies() {
  return modoosAxios.get<InterestStudiesResponse>('/api/heart/all', {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
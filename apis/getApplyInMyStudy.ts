import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

type ApplyInMyStudyResponse = {
  content: {
    standbyId: number;
    memberId: number;
    nickName: string;
    studyId: number;
    title: string;
  }[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export default function getApplyInMyStudy() {
  return modoosAxios.get<ApplyInMyStudyResponse>('/api/participant/apply/all', {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}

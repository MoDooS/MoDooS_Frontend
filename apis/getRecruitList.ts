import { StudyCategory, StudyInfo } from '@/types/studyInfo';
import { StudySortingMethod } from '@/types/studyParams';
import modoosAxios from './modoosAxios';
import { authToken } from '@/class/authToken';

export type StudyContent = StudyInfo & { heart: boolean };

type RecruitListResponse = {
  content: StudyContent[];
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

export type RecruitsParams = {
  categories: StudyCategory[];
  sortBy: StudySortingMethod;
  searchBy?: string;
  lastId: number;
  size: number;
};

export async function getRecruitList({ categories, sortBy, searchBy, lastId, size }: RecruitsParams) {
  const params = {
    category: categories.length && categories[0] === 'ALL' ? '' : categories.join(','),
    sortBy: sortBy === 'recent' ? '' : sortBy,
    lastId: lastId !== 0 ? lastId : '',
    size,
  };
  const response = await modoosAxios.get<RecruitListResponse>('/api/recruit/posts', {
    params,
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
  const nextLastId = response.data.content[response.data.content.length - 1].id;
  return { ...response.data, lastId: nextLastId };
}

import { StudyCategory, StudyInfo } from '@/types/studyInfo';
import { StudySortingMethod } from '@/types/studyParams';
import modoosAxios from './modoosAxios';

type RecruitListResponse = {
  content: StudyInfo[];
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
  sort: StudySortingMethod;
  searchBy?: string;
  lastIndex: number;
  size: number;
};

export async function getRecruitList({ categories, sort, searchBy, lastIndex, size }: RecruitsParams) {
  const params = {
    category: categories.length && categories[0] === 'ALL' ? '' : categories.join(','),
    sort: sort === 'recent' ? '' : sort,
    lastIndex,
    size,
  };
  const response = await modoosAxios.get<RecruitListResponse>('/api/recruit/posts', { params });
  const lastId = response.data.content[response.data.content.length - 1].id;
  return { ...response.data, lastId };
}

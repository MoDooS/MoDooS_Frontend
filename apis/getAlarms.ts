import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';
import { Alarm, AlarmType } from '@/types/alarm';

type GetAlarmsResponse = {
  content: Alarm[];
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

export default function getAlarms() {
  return modoosAxios.get<GetAlarmsResponse>('/api/alarm/all', {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}

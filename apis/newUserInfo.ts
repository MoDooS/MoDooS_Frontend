import { MyInfoRequest } from '@/types/myInfoRequest';
import modoosAxios from './modoosAxios';
import { authToken } from '@/class/authToken';

type ResponseType = {
  status: 'SUCCESS' | 'FAILED';
};

export async function newUserInfo(reqBody: MyInfoRequest) {
  return await modoosAxios.put<ResponseType>('api/member/myInfo', reqBody, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}

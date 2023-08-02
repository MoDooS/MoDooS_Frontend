import modoosAxios from '@/apis/modoosAxios';

export interface JoinFormType {
  nickname: string;
  email: string;
  password: string;
  campus: string;
  department: string;
}

export const fetchJoin = async (formData: JoinFormType) => {
  try {
    const response = await modoosAxios.post('/api/member/join', formData);
    return response;
  } catch (error) {
    console.log('회원가입 요청에 실패했습니다.');
  }
};

export const fetchNicknameCheck = async (nickname: string) => {
  try {
    const response = await modoosAxios.post('/api/member/nickname-check', { nickname });
    return response.data.status === 'SUCCESS';
  } catch (error) {
    console.log(error);
  }
};

export const fetchEmailCheck = async (email: string) => {
  try {
    const response = await modoosAxios.post('/api/auth/email-check', null, {
      params: { email },
    });

    if (response.data.status !== 'SUCCESS') {
      return { emailDuplicate: true, code: '' };
    } else {
      const codeResponse = await fetchCodeCheck(email);
      return { emailDuplicate: false, code: codeResponse };
    }
  } catch (error) {
    console.log(error);
    return { emailDuplicate: false, code: '' };
  }
};

export const fetchCodeCheck = async (email: string) => {
  try {
    const response = await modoosAxios.post('/api/auth/email-confirm', null, {
      params: { email },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Code check failed');
      return '';
    }
  } catch (error) {
    console.log(error);
  }
};

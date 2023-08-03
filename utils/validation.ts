// 유효성 검사 함수

export const validateEmail = (value: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@mju\.ac\.kr$/;

  if (!emailRegex.test(value)) {
    return '이메일 형식에 맞지 않습니다.';
  } else {
    return '';
  }
};

export const validatePassword = (value: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

  if (!passwordRegex.test(value)) {
    return '비밀번호 형식에 맞지 않습니다.';
  } else {
    return '';
  }
};

export const validateNickname = (value: string) => {
  const nicknameRegex = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;

  if (!nicknameRegex.test(value)) {
    return '특수문자,공백 없이 2~6글자로 입력해주세요.';
  } else {
    return '';
  }
};

export const validateCode = (value: string, code: string) => {
  // console.log('코드', code);
  if (value === code) {
    return true;
  } else {
    return false;
  }
};

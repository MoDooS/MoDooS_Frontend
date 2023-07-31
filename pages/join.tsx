import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BasicLayout from '@/components/layouts/basicLayout';
import ShortField from '../components/shortField';
import MainBtn from '@/components/mainBtn';
import LongField from '@/components/longField';
import { validateEmail, validatePassword, validateNickname } from '@/utils/validation';

interface JoinFormType {
  nickname: string;
  email: string;
  password: string;
}

const initialForm: JoinFormType = {
  nickname: '',
  email: '',
  password: '',
};

interface JoinErrType {
  nicknameErr: string;
  emailErr: string;
  codeErr: string;
  passwordErr: string;
  repasswordErr: string;
}

const InitialJoinErr: JoinErrType = {
  nicknameErr: '',
  emailErr: '',
  codeErr: '',
  passwordErr: '',
  repasswordErr: '',
};

const JoinForm: React.FC = () => {
  const [activation, setActivation] = useState(false);

  const [form, setForm] = useState<JoinFormType>(initialForm);
  const [err, setErr] = useState<JoinErrType>(InitialJoinErr);

  const [code, setCode] = useState(0);
  const [authMsg, setAuthMsg] = useState('');

  const [nicknameValidity, setNicknameValidity] = useState(false);
  const [emailValidity, setEmailValidity] = useState(false);

  useEffect(() => {
    if (
      form.email &&
      form.password &&
      !err.nicknameErr &&
      !err.emailErr &&
      !err.passwordErr &&
      !err.repasswordErr &&
      !err.codeErr
    ) {
      setActivation(true);
    } else {
      setActivation(false);
    }
  }, [form, err, nicknameValidity]);

  const handleNicknameChange = (value: string) => {
    const nicknameErr = validateNickname(value);
    setForm((prev) => ({ ...prev, nickname: value }));
    setErr((prev) => ({ ...prev, nicknameErr: nicknameErr }));
    setNicknameValidity(!nicknameErr); // 여기로 이동
  };

  const handleDuplicateCheck = () => {
    // 서버에서 체크후 중복되었을 경우 nicknameValidity=false
    if (!nicknameValidity) {
      setErr((prev) => ({ ...prev, nicknameErr: '중복된 닉네임입니다.' }));
    }
  };

  const handleEmailChange = (value: string) => {
    const emailErr = validateEmail(value);
    setForm((prev) => ({ ...prev, email: value }));
    setErr((prev) => ({ ...prev, emailErr: emailErr }));
    setEmailValidity(!emailErr);
  };

  const handlePasswordChange = (value: string) => {
    setForm((prev) => ({ ...prev, password: value }));
    setErr((prev) => ({ ...prev, passwordErr: validatePassword(value) }));
  };

  const handleRePasswordChange = (value: string) => {
    setErr((prev) => ({ ...prev, repasswordErr: validatePassword(value) }));
    if (value !== form.password) {
      setErr((prev) => ({ ...prev, repasswordErr: '비밀번호가 일치하지 않습니다.' }));
    }
  };

  const handleCodeChange = (value: string) => {
    setCode(parseInt(value));
    // 서버에 코드를 보내기
    // 맞으면
    // setAuthMsg('인증되었습니다!');
    // 틀리면 err메세지
    setErr((prev) => ({ ...prev, codeErr: '코드가 맞지않습니다.' }));

    // 회원가입 버튼 누른 뒤 코드 안맞을시에 대한 err코드 작성
  };

  return (
    <BasicLayout>
      <div className='flex-col mb-60'>
        <Image src={'/imgs/logo_1.png'} alt='logo' width={160} height={0} className='mx-auto mt-45' />
        <div className='flex justify-center'>
          <form className='flex-col mt-30'>
            {' '}
            <ShortField
              field={{
                label: '닉네임',
                placeholder: '모스부호',
                onChange: handleNicknameChange,
                errMsg: err.nicknameErr,
              }}
              btnText='중복확인'
              activation={nicknameValidity}
              onClick={() => {
                handleDuplicateCheck;
              }}
            />
            <ShortField
              field={{
                placeholder: 'matthew10164@mju.ac.kr',
                onChange: handleEmailChange,
                errMsg: err.emailErr,
              }}
              btnText='인증'
              activation={emailValidity}
              onClick={() => {}}
            />{' '}
            <ShortField
              field={{
                label: '코드입력',
                placeholder: '숫자 4자리 입력',
                onChange: handleCodeChange,
                errMsg: err.codeErr,
                authMsg: authMsg,
              }}
            />
            <LongField
              field={{
                label: '비밀번호',
                placeholder: '****',
                type: 'password',
                onChange: handlePasswordChange,
                errMsg: err.passwordErr,
              }}
              hasMark={true}
            />
            <LongField
              field={{
                label: '비밀번호 재확인',
                placeholder: '****',
                type: 'password',
                onChange: handleRePasswordChange,
                errMsg: err.repasswordErr,
              }}
            />
            <br />
            <MainBtn text='회원가입하기' activation={activation} />
            <div className='flex-col justify-center mt-37 space-y-3'>
              <div className='text-15 text-gray_70 font-normal text-center'>
                회원이 아니신가요?{' '}
                <a href={'/join'} className='text-purple_sub underline decoration-solid	'>
                  회원가입
                </a>
              </div>
              <div className='text-15 text-gray_70 font-normal text-center'>
                비밀번호를 모르겠나요?{' '}
                <a href={'/resetPassword'} className='text-purple_sub underline decoration-solid	'>
                  비밀번호찾기
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BasicLayout>
  );
};

export default JoinForm;

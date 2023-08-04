import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BasicLayout from '@/components/layouts/basicLayout';
import ShortField from '../components/auth/shortField';
import MainBtn from '@/components/auth/mainBtn';
import LongField from '@/components/auth/longField';
import { validateEmail, validatePassword, validateNickname, validateCode } from '@/utils/validation';
import { JoinFormType, fetchEmailCheck, fetchNicknameCheck } from '@/apis/auth/join';
import Category from '@/components/auth/category';
import { useRecoilState } from 'recoil';
import { timerState } from '@/recoil/timer/atoms';

const initialForm: JoinFormType = {
  nickname: '',
  email: '',
  password: '',
  campus: '',
  department: '',
};

interface JoinErrType {
  nicknameErr: string;
  emailErr: string;
  codeErr: string;
  passwordErr: string;
  repasswordErr: string;
}

const initialJoinErr: JoinErrType = {
  nicknameErr: '',
  emailErr: '',
  codeErr: '',
  passwordErr: '',
  repasswordErr: '',
};

export interface AuthType {
  nicknameAuth: string;
  emailAuth?: string;
  codeAuth: string;
}
export const initialAuthMsg = {
  nicknameAuth: '',
  emailAuth: '',
  codeAuth: '',
};

const JoinForm: React.FC = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useRecoilState(timerState);

  const [activation, setActivation] = useState(false);

  const [form, setForm] = useState<JoinFormType>(initialForm);
  const [err, setErr] = useState<JoinErrType>(initialJoinErr);
  const [auth, setAuth] = useState<AuthType>(initialAuthMsg);

  const [code, setCode] = useState('');

  const [nicknameValidity, setNicknameValidity] = useState(false);
  const [emailValidity, setEmailValidity] = useState(false);

  useEffect(() => {
    if (
      form.email &&
      form.password &&
      form.nickname &&
      code &&
      form.campus &&
      form.department &&
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
  }, [form, err, code]);

  // 타이머 숫자가 0:0이 되면 코드를 입력해도 시간이 초과되었다는 에러메시지를 설정
  useEffect(() => {
    if (isTimerActive && timeLeft <= 0) {
      setIsTimerExpired(true);
      setIsTimerActive(false);
      if (!code) {
        setErr((prev) => ({ ...prev, codeErr: '시간이 초과되었습니다.' }));
      } else {
        setErr((prev) => ({ ...prev, codeErr: '코드가 맞지 않습니다. 메일을 재전송해주세요.' }));
      }
    }
  }, [isTimerActive, timeLeft, code, setIsTimerExpired, setIsTimerActive, setErr]);

  const handleDuplicateNickname = async () => {
    const res = await fetchNicknameCheck(form.nickname);
    if (res) {
      setErr((prev) => ({ ...prev, nicknameErr: '' }));
      setAuth((prev) => ({ ...prev, nicknameAuth: '사용가능한 닉네임입니다.' }));
    } else {
      setAuth((prev) => ({ ...prev, nicknameAuth: '' }));
      setErr((prev) => ({ ...prev, nicknameErr: '중복된 닉네임입니다.' }));
    }
  };

  const handleDuplicateEmail = async () => {
    const { emailDuplicate, code } = await fetchEmailCheck(form.email);
    console.log(code);
    if (emailDuplicate) {
      setErr((prev) => ({ ...prev, emailErr: '이미 가입된 이메일입니다.' }));
    } else {
      setAuth((prev) => ({ ...prev, emailAuth: '메일이 전송되었습니다.' }));
      setCode(code);
      setTimeLeft(3 * 60 * 1000);
      setIsTimerActive(true);
      setEmailValidity(true);
    }
  };

  const handleNicknameChange = (value: string) => {
    const nicknameErr = validateNickname(value);
    setForm((prev) => ({ ...prev, nickname: value }));
    setErr((prev) => ({ ...prev, nicknameErr: nicknameErr }));
    setNicknameValidity(!nicknameErr); // 여기로 이동
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
    // console.log('코드', code);
    if (validateCode(value, code)) {
      setErr((prev) => ({ ...prev, codeErr: '' }));
      setAuth((prev) => ({ ...prev, codeAuth: '인증되었습니다.' }));
    } else {
      setAuth((prev) => ({ ...prev, codeAuth: '' }));
      setErr((prev) => ({ ...prev, codeErr: '코드가 맞지않습니다.' }));
    }
  };

  const handleCategoryChange = (campus: string, major: string) => {
    console.log('Selected campus:', campus);
    console.log('Selected major:', major);

    setForm((prev) => ({ ...prev, campus: campus, department: major }));
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
                authMsg: auth.nicknameAuth,
              }}
              btnText='중복확인'
              activation={nicknameValidity}
              onClick={handleDuplicateNickname}
            />
            <ShortField
              field={{
                placeholder: 'matthew10164@mju.ac.kr',
                onChange: handleEmailChange,
                errMsg: err.emailErr,
                authMsg: auth.emailAuth,
              }}
              btnText='인증'
              activation={emailValidity}
              onClick={handleDuplicateEmail}
            />{' '}
            <ShortField
              field={{
                label: '코드입력',
                placeholder: '메일로 전송된 코드 입력',
                onChange: handleCodeChange,
                errMsg: err.codeErr,
                authMsg: auth.codeAuth,
              }}
              activation={emailValidity}
            />
            <Category onChange={handleCategoryChange} />
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
            <MainBtn text='회원가입하기' activation={activation} toPath='/login' btnType='join' form={form} />
          </form>
        </div>
      </div>
    </BasicLayout>
  );
};

export default JoinForm;

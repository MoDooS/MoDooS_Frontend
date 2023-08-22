import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BasicLayout from '@/components/layouts/basicLayout';
import ShortField from '../components/auth/shortField';
import MainBtn from '@/components/auth/mainBtn';
import LongField from '@/components/auth/longField';
import { validateEmail, validatePassword, validateNickname, validateCode } from '@/utils/validation';
import { fetchEmailCheck, fetchNicknameCheck } from '@/apis/auth/join';
import Category from '@/components/auth/category';
import { useRecoilState } from 'recoil';
import { timerState } from '@/recoil/timer/atoms';
import { AuthType, JoinErrType, JoinFormType, JoinName } from '@/types/joinType';
import { useImmer } from 'use-immer';
import Layout from '@/components/layouts/layout';

const initialForm: JoinFormType = {
  nickname: '',
  email: '',
  password: '',
  campus: '',
  department: '',
};

const initialJoinErr: JoinErrType = {
  nicknameErr: '',
  emailErr: '',
  codeErr: '',
  passwordErr: '',
  repasswordErr: '',
};

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

  const [joinForm, updateJoinForm] = useImmer(initialForm);
  const [err, setErr] = useState(initialJoinErr);
  const [auth, setAuth] = useState<AuthType>(initialAuthMsg);

  const [code, setCode] = useState('');

  const [nicknameValidity, setNicknameValidity] = useState(false);
  const [emailValidity, setEmailValidity] = useState(false);

  useEffect(() => {
    if (
      joinForm.email &&
      joinForm.password &&
      joinForm.nickname &&
      code &&
      joinForm.campus &&
      joinForm.department &&
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
  }, [joinForm, err, code]);

  // 타이머 숫자가 0:0이 되면 코드를 입력해도 시간이 초과되었다는 에러메시지를 설정
  useEffect(() => {
    if (isTimerActive && timeLeft <= 0) {
      setIsTimerExpired(true);
      setIsTimerActive(false);
    }
  }, [isTimerActive, timeLeft, code, setIsTimerExpired, setIsTimerActive, setErr]);

  const handleDuplicateNickname = async () => {
    const res = await fetchNicknameCheck(joinForm.nickname);
    if (res) {
      setErr((prev) => ({ ...prev, nicknameErr: '' }));
      setAuth((prev) => ({ ...prev, nicknameAuth: '사용가능한 닉네임입니다.' }));
    } else {
      setAuth((prev) => ({ ...prev, nicknameAuth: '' }));
      setErr((prev) => ({ ...prev, nicknameErr: '중복된 닉네임입니다.' }));
    }
  };

  const handleDuplicateEmail = async () => {
    const { emailDuplicate, code } = await fetchEmailCheck(joinForm.email);
    if (emailDuplicate) {
      setErr((prev) => ({ ...prev, emailErr: '이미 가입된 이메일입니다.' }));
    } else {
      setAuth((prev) => ({ ...prev, emailAuth: '메일이 전송되었습니다.' }));
      setCode(code);
      setTimeLeft(3 * 60 * 1000);
      setEmailValidity(true);
      setIsTimerActive(true);
    }
  };

  const handleFormChange = (field: JoinName, value: string, validationFn: (value: string) => string) => {
    updateJoinForm((draft) => {
      draft[field] = value;
    });
    setErr((prev) => ({ ...prev, [`${field}Err`]: validationFn(value) }));
  };

  const handleNicknameChange = (value: string) => {
    handleFormChange('nickname', value, validateNickname);
    setNicknameValidity(!validateNickname(value));
  };

  const handleEmailChange = (value: string) => {
    handleFormChange('email', value, validateEmail);
    setEmailValidity(!validateEmail(value));
  };

  const handlePasswordChange = (value: string) => {
    handleFormChange('password', value, validatePassword);
  };

  const handleRePasswordChange = (value: string) => {
    setErr((prev) => ({ ...prev, repasswordErr: validatePassword(value) }));
    if (value !== joinForm.password) {
      setErr((prev) => ({ ...prev, repasswordErr: '비밀번호가 일치하지 않습니다.' }));
    }
  };

  const handleCodeChange = (value: string) => {
    if (validateCode(value, code)) {
      setErr((prev) => ({ ...prev, codeErr: '' }));
      if (value === code) {
        setAuth((prev) => ({ ...prev, codeAuth: '인증되었습니다.' }));
      } else {
        setAuth((prev) => ({ ...prev, codeAuth: '' }));
      }
      setIsTimerActive(false); // 인증 메시지 나타날 때 타이머 비활성화
      setIsTimerExpired(false); // 타이머가 만료되었음을 초기화
    } else {
      setAuth((prev) => ({ ...prev, codeAuth: '' }));
      setErr((prev) => ({ ...prev, codeErr: '코드가 맞지않습니다.' }));
    }
  };

  const handleCategoryChange = (campus: string, major: string) => {
    updateJoinForm((draft) => {
      draft.campus = campus;
      draft.department = major;
    });
  };

  return (
    <Layout onlyAccess='notUser'>
      <main className='flex flex-col items-center pt-100 pb-100'>
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
                placeholder: 'example@mju.ac.kr',
                onChange: handleEmailChange,
                errMsg: err.emailErr,
                authMsg: auth.emailAuth,
              }}
              btnText={emailValidity && isTimerActive ? '재전송' : '인증'}
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
            <div className='flex text-13 text-gray_70 justify-between max-w-360 w-full mt-15'>캠퍼스</div>
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
            <MainBtn text='회원가입하기' activation={activation} toPath='/login' btnType='join' form={joinForm} />
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default JoinForm;

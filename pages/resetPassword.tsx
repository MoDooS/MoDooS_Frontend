import BasicLayout from '@/components/layouts/basicLayout';

import LongField from '@/components/auth/longField';
import MainBtn from '@/components/auth/mainBtn';
import ShortField from '@/components/auth/shortField';
import Image from 'next/image';
import { validateEmail, validatePassword, validateCode } from '@/utils/validation';
import { useEffect, useState } from 'react';
import { LoginFormType } from '@/apis/auth/login';
import { useRecoilState } from 'recoil';
import { timerState } from '@/recoil/timer/atoms';
import { AuthType, initialAuthMsg } from './join';
import { fetchCodeCheck, fetchEmailCheck } from '@/apis/auth/join';

const initialRepasswordForm: LoginFormType = {
  email: '',
  password: '',
};
interface ErrType {
  emailErr: string;
  codeErr: string;
  passwordErr: string;
  repasswordErr: string;
}
const InitialErr: ErrType = {
  emailErr: '',
  codeErr: '',
  passwordErr: '',
  repasswordErr: '',
};
const RepasswordForm: React.FC = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useRecoilState(timerState);

  const [activation, setActivation] = useState(false);

  const [form, setForm] = useState<LoginFormType>(initialRepasswordForm);
  const [err, setErr] = useState<ErrType>(InitialErr);
  const [auth, setAuth] = useState<AuthType>(initialAuthMsg);

  const [code, setCode] = useState('');

  const [emailValidity, setEmailValidity] = useState(false);

  useEffect(() => {
    if (
      form.email &&
      form.password &&
      code &&
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

  const handleSendEmail = async () => {
    const getCode = await fetchCodeCheck(form.email);
    if (getCode) {
      setAuth((prev) => ({ ...prev, emailAuth: '메일이 전송되었습니다.' }));
      setCode(getCode);
      setTimeLeft(3 * 60 * 1000);
      setIsTimerActive(true);
      setEmailValidity(true);
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
    if (validateCode(value, code)) {
      setErr((prev) => ({ ...prev, codeErr: '' }));
      setAuth((prev) => ({ ...prev, codeAuth: '인증되었습니다.' }));
    } else {
      setAuth((prev) => ({ ...prev, codeAuth: '' }));
      setErr((prev) => ({ ...prev, codeErr: '코드가 맞지않습니다.' }));
    }
  };

  return (
    <BasicLayout>
      <div className='flex-col mb-60'>
        <Image src={'/imgs/logo_1.png'} alt='logo' width={160} height={0} className='mx-auto mt-45' />
        <div className='flex justify-center'>
          <form className='flex-col mt-30'>
            {' '}
            <LongField
              field={{
                label: '이메일',
                placeholder: 'matthew10164@mju.ac.kr',
                onChange: handleEmailChange,
                errMsg: err.emailErr,
                authMsg: auth.emailAuth,
              }}
            />
            <MainBtn
              text='매일 보내기'
              activation={emailValidity}
              toPath='#'
              btnType='email'
              form={form}
              onClick={handleSendEmail}
            />
            <ShortField
              field={{
                label: '코드입력',
                placeholder: '모스부호',
                onChange: handleCodeChange,
                errMsg: err.codeErr,
                authMsg: auth.codeAuth,
              }}
              activation={emailValidity}
            />
            <LongField
              field={{
                label: '새 비밀번호',
                type: 'password',
                placeholder: '****',
                onChange: handlePasswordChange,
                errMsg: err.passwordErr,
              }}
              hasMark={true}
            />
            <LongField
              field={{
                label: '비밀번호 재확인',
                type: 'password',
                placeholder: '****',
                onChange: handleRePasswordChange,
                errMsg: err.repasswordErr,
              }}
            />
            <MainBtn
              text='비밀번호 변경하기'
              activation={activation}
              toPath='/login'
              btnType='resetPassword'
              form={form}
            />
            <br />
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
export default RepasswordForm;

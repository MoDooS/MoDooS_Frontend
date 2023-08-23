import React, { HTMLAttributes, useEffect, useState } from 'react';
import LongField from '../components/auth/longField';
import MainBtn from '@/components/auth/mainBtn';
import Image from 'next/image';
import BasicLayout from '@/components/layouts/basicLayout';
import { validateEmail, validatePassword } from '@/utils/validation';
import { LoginFormType, fetchLogin } from '@/apis/auth/login';
import { useRouter } from 'next/router';
import Layout from '@/components/layouts/layout';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  btnType: 'login' | 'register' | 'email';
}

const initialForm: LoginFormType = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState<LoginFormType>(initialForm);
  const [activation, setActivation] = useState(false);

  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  useEffect(() => {
    if (form.email && form.password && !emailErr && !passwordErr) {
      setActivation(true);
    } else {
      setActivation(false);
    }
  }, [form, emailErr, passwordErr]);

  const handleEmailChange = (value: string) => {
    setForm((prev) => ({ ...prev, email: value }));
    setEmailErr(validateEmail(value));
  };

  const handlePasswordChange = (value: string) => {
    setForm((prev) => ({ ...prev, password: value }));
    setPasswordErr(validatePassword(value));
  };

  const handleLoginFailure = (error: string) => {
    setPasswordErr(error);
  };

  return (
    <Layout onlyAccess='notUser'>
      <main className='flex flex-col items-center pt-100'>
        <Image src={'/imgs/logo_1.png'} alt='logo' width={160} height={0} className='mx-auto mt-45' />
        <div className='flex justify-center'>
          <form className='flex-col mt-30'>
            <LongField
              field={{
                label: '이메일',
                placeholder: 'example@mju.ac.kr',
                onChange: handleEmailChange,
                errMsg: emailErr,
              }}
            />
            <LongField
              field={{
                label: '비밀번호',
                type: 'password',
                placeholder: '****',
                onChange: handlePasswordChange,
                errMsg: passwordErr,
              }}
              hasMark={true}
            />{' '}
            <br />
            <MainBtn
              text='로그인'
              activation={activation}
              btnType='login'
              form={form}
              toPath='/'
              onLoginFailure={handleLoginFailure}
            />
            <div className='flex-col justify-center mt-37 space-y-3'>
              <div className='text-15 text-gray_70 font-normal text-center'>
                회원이 아니신가요?{' '}
                <a href={'/join'} className='text-purple_sub underline decoration-solid	'>
                  회원가입
                </a>
              </div>
              <div className='text-15 text-gray_70 font-normal text-center'>
                비밀번호를 모르겠나요?{' '}
                <a href={'/reset-password'} className='text-purple_sub underline decoration-solid	'>
                  비밀번호찾기
                </a>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default LoginForm;

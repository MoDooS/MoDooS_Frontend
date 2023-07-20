import React, { useEffect, useState } from 'react';
import LongField from '../components/longField';
import MainBtn from '@/components/mainBtn';
import Image from 'next/image';
import BasicLayout from '@/components/layouts/basicLayout';

const LoginForm: React.FC = () => {
  const [activation, setActivation] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('이메일이 일치하지 않습니다.');
  const [passwordErr, setPasswordErr] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <BasicLayout>
      <div className='flex-col'>
        <Image src={'/imgs/logo_1.png'} alt='logo' width={160} height={0} className='mx-auto mt-45' />
        <div className='flex justify-center'>
          <form className='flex-col mt-30'>
            <LongField
              field={{
                label: '이메일',
                placeholder: 'matthew10164@gmail.com',
                onChange: handleEmailChange,
                errMsg: emailErr,
              }}
            />
            <LongField
              field={{
                label: '비밀번호',
                placeholder: '****',
                onChange: handlePasswordChange,
              }}
              hasMark={true}
            />{' '}
            <br />
            <MainBtn text='로그인' />
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

export default LoginForm;
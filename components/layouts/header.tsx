import { useUserQuery } from '@/query/user/useUserQuery';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BellIcon from '../../public/icons/bell.svg';
import AvatarIcon from '../../public/icons/avatar.svg';

const Header = () => {
  const { user, isLoading: isUserLoading, isError: isUserError } = useUserQuery();
  // console.log(user, isUserLoading, isUserError);
  return (
    <nav className='fixed w-full h-60 flex justify-center bg-white z-header'>
      <div className='flex justify-between items-center w-full px-60 max-w-[1344px]'>
        <Link href={'/'}>
          <Image src={'/imgs/logo_header.png'} alt='logo' width={160} height={0} />
        </Link>
        <div className='flex justify-center items-center gap-20'>
          <Link href={'/ranking'} className=' text-15 font-normal'>
            랭킹보기
          </Link>
          {isUserError && (
            <>
              <Link
                href={'/login'}
                className='bg-bg1 border-1 border-solid border-gray-60 py-6 px-13 rounded-5 text-15 font-normal'
              >
                로그인
              </Link>
              <Link
                href={'/join'}
                className=' bg-primary border-1 border-solid border-gray-60 py-6 px-13 rounded-5 text-15 font-normal text-bg1'
              >
                회원가입
              </Link>
            </>
          )}
          {user && (
            <>
              <BellIcon width='25' height='25' />
              <AvatarIcon width='25' height='25' />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import BellIcon from '../../public/icons/bell.svg';
import AvatarIcon from '../../public/icons/avatar.svg';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { postLogout } from '@/apis/logout';
import DropDownMenu, { DropDownMenuOption } from '../select/dropDownMenu';
import { authToken } from '@/class/authToken';
import { USER_QUERY_KEY, useUserQuery } from '@/hooks/queries/user/useUserQuery';

const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading: isUserLoading, isError: isUserError } = useUserQuery();
  const logoutMutation = useMutation(postLogout);
  const [showProfileIconMenu, setShowProfileIconMenu] = useState(false);

  const profileIconMenus: DropDownMenuOption[] = [
    {
      content: '마이페이지',
      selectHandler: () => router.push('/mypage/setting'),
    },
    { content: '로그아웃', selectHandler: handleLogout },
  ];

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries(USER_QUERY_KEY);
        authToken.deleteToken();
        window.location.href = '/';
      },
    });
  }
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
              <button>
                <BellIcon width='30' height='30' />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileIconMenu((prev) => !prev);
                }}
              >
                <AvatarIcon width='30' height='30' />
              </button>
              {showProfileIconMenu && (
                <DropDownMenu
                  className='absolute top-50 w-150 text-16'
                  options={profileIconMenus}
                  closeDropDown={() => setShowProfileIconMenu(false)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

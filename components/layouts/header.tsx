import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import BellIcon from '../../public/icons/bell.svg';
import AvatarIcon from '../../public/icons/avatar.svg';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { postLogout } from '@/apis/logout';
import DropDownMenu, { DropDownMenuOption } from '../select/dropDownMenu';
import { authToken } from '@/class/authToken';
import { USER_QUERY_KEY, useUserQuery } from '@/hooks/queries/user/useUserQuery';
import useAlarmsQuery from '@/hooks/queries/useAlarmsQuery';
import { Alarm } from '@/types/alarm';

const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading: isUserLoading, isError: isUserError } = useUserQuery();
  const { alarms } = useAlarmsQuery();
  const logoutMutation = useMutation(postLogout);
  const [showAlarmMenu, setShowAlarmMenu] = useState(false);
  const [showProfileIconMenu, setShowProfileIconMenu] = useState(false);
  const alarmMenus: DropDownMenuOption[] = alarms
    ? alarms.map((alarm) => ({
        content: alarm.content,
        selectHandler: () => handleClickAlarm(alarm),
      }))
    : [];

  const profileIconMenus: DropDownMenuOption[] = [
    {
      content: '마이페이지',
      selectHandler: () => router.push('/mypage/setting'),
    },
    { content: '로그아웃', selectHandler: handleLogout },
  ];

  function handleClickAlarm(alarm: Alarm) {
    if (alarm.alarmType === '스터디 승인 요청 알림') {
      router.push('/mypage/study-apply');
    }
    if (alarm.alarmType === '내 스터디 댓글 알림') {
      router.push(`/recruit/${alarm.studyId}`);
    }
  }

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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAlarmMenu((prev) => !prev);
                }}
                className='relative'
              >
                <BellIcon width='30' height='30' />
                {alarms?.length ? (
                  <div className='w-7 h-7 rounded-full bg-input_red absolute top-2 right-5'></div>
                ) : null}
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
              {showAlarmMenu && alarms?.length ? (
                <div className='absolute top-50 right-150 text-16 bg-white shadow-neumorphism rounded-12'>
                  <div className='flex items-center justify-between px-12 py-20'>
                    <h4 className=' font-semibold text-18'>알림</h4>
                    <button className=' bg-primary text-white px-12 py-8 rounded-12'>모두 읽음으로 표시</button>
                  </div>
                  <DropDownMenu options={alarmMenus} closeDropDown={() => setShowAlarmMenu(false)} />
                </div>
              ) : null}
              {showAlarmMenu && !alarms?.length && (
                <div className='absolute top-50 right-150 py-12 px-16 text-14 text-gray_70 font-normal bg-white rounded-8'>
                  알림함이 비었습니다.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

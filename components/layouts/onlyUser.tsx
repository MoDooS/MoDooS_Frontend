import { useUserQuery } from '@/hooks/queries/user/useUserQuery';
import useAlert from '@/recoil/alert/useAlert';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function OnlyUser({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useUserQuery();
  const { showAlert } = useAlert();
  const router = useRouter();
  useEffect(() => {
    if (isError) {
      showAlert({
        alertViewTitle: '로그인 필요',
        alertViewDesc: '로그인 후 이용할 수 있습니다.',
        alertActions: [
          { title: '로그인하기', style: 'primary', handler: () => router.replace('/login') },
          { title: '닫기', style: 'normal', handler: () => router.replace('/') },
        ],
      });
    }
  }, [isError, showAlert, router]);
  return user ? children : null;
}

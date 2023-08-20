import { useUserQuery } from '@/query/user/useUserQuery';
import useAlert from '@/recoil/alert/useAlert';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function OnlyNotUser({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useUserQuery();
  const { showAlert } = useAlert();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, showAlert, router]);
  return children;
}

import { useUserQuery } from '@/hooks/queries/user/useUserQuery';
import useAlert from '@/recoil/alert/useAlert';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function OnlyNotUser({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useUserQuery();
  const { showAlert } = useAlert();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !isError) {
      router.replace('/');
    }
  }, [isLoading, isError, showAlert, router]);
  return children;
}

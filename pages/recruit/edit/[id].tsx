import Layout from '@/components/layouts/layout';
import React, { useEffect } from 'react';
import RecruitForm from '@/components/recruitForm';
import { useRouter } from 'next/router';
import useAlert from '@/recoil/alert/useAlert';
import { useRecruitDetailQuery } from '@/hooks/queries/recruit/useRecruitDetailQuery';

const Edit = () => {
  const router = useRouter();
  const recruitId = router.query.id as string;
  const { showAlert } = useAlert();
  const { recruit, isLoading: isRecruitLoading, isError: isRecruitError } = useRecruitDetailQuery(recruitId);

  const isWriter = recruit && recruit.written;
  useEffect(() => {
    if (!isWriter) {
      showAlert({
        alertViewTitle: '주의',
        alertViewDesc: '접근 권한이 없습니다.',
        alertActions: [{ title: '확인', style: 'primary', handler: () => router.replace('/') }],
      });
    }
  }, [isWriter, showAlert, router]);
  return (
    <Layout>
      {isWriter && (
        <main className='flex flex-col items-center pt-60 px-200'>
          {recruit && (
            <RecruitForm
              recruitId={recruit.id}
              defaultForm={{
                ...recruit,
                contact: recruit.contact ?? '',
                link: recruit.link ?? '',
                checkList: recruit.checkList.map((item) => item.content),
              }}
              mode='edit'
            />
          )}
        </main>
      )}
    </Layout>
  );
};

export default Edit;

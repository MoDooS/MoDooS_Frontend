import acceptStudy from '@/apis/acceptStudy';
import rejectStudy from '@/apis/rejectStudy';
import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import useApplyInMyStudy from '@/hooks/queries/study/useApplyInMyStudy';
import useAlert from '@/recoil/alert/useAlert';
import Link from 'next/link';
import React from 'react';
import { useMutation } from 'react-query';

export default function StudyApply() {
  const { applies } = useApplyInMyStudy();
  const { showAlert } = useAlert();
  const acceptStudyMutation = useMutation(acceptStudy);
  const rejectStudyMutation = useMutation(rejectStudy);
  function handleAcceptStudy(studyId: number) {
    acceptStudyMutation.mutate(studyId, {
      onSuccess: () =>
        showAlert({
          alertViewTitle: '스터디 참가 수락',
          alertViewDesc: '수락되었습니다.',
          alertActions: [{ title: '확인', style: 'primary', handler: null }],
        }),
      onError: (err) =>
        showAlert({
          alertViewTitle: 'Error',
          alertViewDesc: err as string,
          alertActions: [{ title: '확인', style: 'primary', handler: null }],
        }),
    });
  }
  function handleRejectStudy(studyId: number) {
    rejectStudyMutation.mutate(studyId, {
      onSuccess: () =>
        showAlert({
          alertViewTitle: '스터디 참가 거절',
          alertViewDesc: '거절되었습니다.',
          alertActions: [{ title: '확인', style: 'primary', handler: null }],
        }),
      onError: (err) =>
        showAlert({
          alertViewTitle: 'Error',
          alertViewDesc: err as string,
          alertActions: [{ title: '확인', style: 'primary', handler: null }],
        }),
    });
  }
  return (
    <Layout>
      <MypageLayout className=' overflow-y-scroll'>
        <h4 className='text-18 text-black font-medium mb-50'>스터디 요청 현황</h4>
        <ul className='flex flex-col gap-20'>
          {applies?.map((apply, i) => (
            <li
              key={i}
              className='flex items-center justify-between bg-bg1 w-full py-10 px-20 rounded-10 overflow-hidden'
            >
              <div>
                <div className='mb-10'>
                  <span className='text-16 font-semibold text-gray_70'>{`[${apply.title}]`}</span>
                  <span className='text-16 font-semibold text-black'>에 대한 요청</span>
                </div>
                <div className='flex items-center'>
                  <span className='text-14 font-semibold text-black mr-5'>신청자</span>
                  <span className='text-14 font-semibold text-black mr-5'>{apply.nickName}</span>
                  <Link href={`/member/${apply.memberId}`} className='text-12 font-semibold text-gray_70'>
                    프로필 보기
                  </Link>
                </div>
              </div>
              <div className='flex items-center gap-10'>
                <button
                  onClick={() => handleAcceptStudy(apply.studyId)}
                  className='py-8 px-12 bg-primary text-white rounded-12 text-14'
                >
                  수락
                </button>
                <button
                  onClick={() => handleRejectStudy(apply.studyId)}
                  className='py-8 px-12 bg-bg1 text-black rounded-12 text-14'
                >
                  거절
                </button>
              </div>
            </li>
          ))}
        </ul>
      </MypageLayout>
    </Layout>
  );
}

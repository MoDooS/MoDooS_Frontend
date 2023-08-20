import React, { useEffect, useState } from 'react';
import { RecruitFormType } from '@/types/recruitForm';
import { cls } from '@/utils/cls';
import { useImmer } from 'use-immer';
import { useMutation } from 'react-query';
import useAlert from '@/recoil/alert/useAlert';
import { useRouter } from 'next/router';
import { postNewRecruit } from '@/apis/newRecruit';
import dayjs from 'dayjs';
import Hr from './hr';
import Page1 from './pages/recruit/new/page1';
import Page2 from './pages/recruit/new/page2';
import Page3 from './pages/recruit/new/page3';
import { RecruitRequest } from '@/types/recruitRequest';
import { editNewRecruit } from '@/apis/editRecruit';

type Props = {
  recruitId?: number;
  mode: 'new' | 'edit';
  defaultForm: RecruitFormType;
};

const pageTitles = ['스터디 기본 정보', '스터디 규칙 생성', '스터디 소개글'];

export default function RecruitForm({ recruitId, mode, defaultForm }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [recruitForm, setRecruitForm] = useImmer(defaultForm);
  const newRecruitMutation = useMutation(postNewRecruit);
  const editRecruitMutation = useMutation(editNewRecruit);
  const { showAlert } = useAlert();

  const handleSubmitForm = async () => {
    const { recruit_deadline, expected_start_at, expected_end_at, title, checkList, contact, link, description } =
      recruitForm;
    if (!recruit_deadline) {
      alert('모집 마감일은 필수로 지정해야 합니다.');
      setPage(1);
      return;
    }
    if (!expected_start_at || !expected_end_at) {
      alert('스터디 기간은 필수로 지정해야 합니다.');
      setPage(1);
      return;
    }
    if (
      dayjs(expected_start_at).isBefore(recruit_deadline, 'day') ||
      dayjs(expected_start_at).isSame(recruit_deadline, 'day')
    ) {
      alert('스터디 예정 시작일은 모집 마감일과 같거나 빠를 수 없습니다.');
      setPage(1);
      return;
    }
    if (title.trim().length === 0) {
      alert('스터디 제목은 필수로 작성해야 합니다.');
      setPage(3);
      return;
    }
    const reqBody: RecruitRequest = {
      ...recruitForm,
      recruit_deadline,
      expected_start_at,
      expected_end_at,
      checkList: checkList.filter((item) => item.length > 0),
      contact: contact.trim(),
      link: link.trim(),
      title: title.trim(),
      description: description.trim(),
    };
    if (mode === 'new') {
      newRecruitMutation.mutate(reqBody, {
        onSuccess: (response) => {
          onSuccess(response.data.id);
        },
      });
    } else {
      if (!recruitId) {
        throw new Error('모집글 수정하기 컴포넌트에는 recruitId를 넣어줘야 함');
      }
      editRecruitMutation.mutate(
        { recruitId, reqBody },
        {
          onSuccess: (response) => {
            onSuccess(response.data.id);
          },
        },
      );
    }
  };

  // 요청 성공 시 alert 표시 후 모집글 상세 페이지로 보내기
  function onSuccess(recruitId: number) {
    showAlert({
      alertViewTitle: '모집글 생성',
      alertViewDesc: '모집글이 생성되었습니다.',
      alertActions: [
        {
          title: '모집글로 이동하기',
          style: 'primary',
          handler: () => router.push(`/recruit/${recruitId}`),
        },
      ],
    });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  return (
    <div className='w-full px-30 py-30 bg-white rounded-30'>
      <h1 className='text-[#1A212B] font-semibold text-30 mb-60'>스터디 모집글 생성하기</h1>
      {/* <h5 className=' text-10 text-[#1A212B] mb-50'>스터디를 직접 생성해봐요</h5> */}

      {/* 페이지 정보 */}
      <div className='flex items-center gap-30 mb-20'>
        {pageTitles.map((title, i) => (
          <button key={i} onClick={() => setPage(i + 1)} className='flex items-center gap-6'>
            <div
              className={cls(
                'flex justify-center items-center w-25 h-25 rounded-full text-12 font-medium',
                i + 1 === page ? 'bg-primary text-white' : ' bg-[#EAEEF3] text-black',
              )}
            >
              {i + 1}
            </div>
            <span className={cls('text-12 font-medium', i + 1 === page ? 'text-primary' : 'text-black')}>{title}</span>
          </button>
        ))}
      </div>
      <Hr className='my-20' />
      {page === 1 && <Page1 moveNextPage={() => setPage(2)} {...{ recruitForm, setRecruitForm }} />}
      {page === 2 && (
        <Page2 {...{ recruitForm, setRecruitForm }} movePrevPage={() => setPage(1)} moveNextPage={() => setPage(3)} />
      )}
      {page === 3 && <Page3 {...{ recruitForm, setRecruitForm, handleSubmitForm }} movePrevPage={() => setPage(2)} />}
    </div>
  );
}

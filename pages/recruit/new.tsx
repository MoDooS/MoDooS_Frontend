import Layout from '@/components/layouts/layout';
import Page1 from '@/components/pages/recruit/new/page1';
import Page2 from '@/components/pages/recruit/new/page2';
import Page3 from '@/components/pages/recruit/new/page3';
import Hr from '@/components/hr';
import { NewRecruitFormType } from '@/types/newRecruitFormType';
import { cls } from '@/utils/cls';
import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import { useMutation } from 'react-query';
import { NewRecruitRequestType, postNewRecruit } from '@/apis/newRecruit';
import useAlert from '@/recoil/alert/useAlert';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const pageTitles = ['스터디 기본 정보', '스터디 규칙 생성', '스터디 소개글'];

const initialNewRecruitForm: NewRecruitFormType = {
  campus: '인문', // 캠퍼스
  recruits_count: 3, // 모집 인원
  channel: '온라인', // 스터디 진행 방식
  category: '언어', // 카테고리
  recruit_deadline: null, // 모집 마감일
  expected_start_at: null, // 스터디 예정 시작일
  expected_end_at: null, // 스터디 예정 마감일
  contact: '', // 연락 방법
  link: '', // 연락 방법 링크
  late: 3, // 지각 몇 번이면 1결석
  absent: 2, // 결석 몇 번이면 1아웃
  out: 3, // 아웃 몇 번이면 퇴출
  checkList: [''],
  rule_content: '', // 자율 규칙
  title: '', // 스터디 소개글 (제목)
  description: '', // 스터디 소개글 (내용)
};

const New = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [newRecruitForm, setNewRecruitForm] = useImmer(initialNewRecruitForm);
  const { mutate, isLoading, isError } = useMutation(postNewRecruit);
  const { showAlert } = useAlert();

  // useEffect(() => {
  //   // titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [page]);

  const handleSubmitForm = async () => {
    const {
      recruit_deadline,
      expected_start_at,
      expected_end_at,
      title,
      checkList,
      contact,
      link,
      rule_content,
      description,
    } = newRecruitForm;
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
    if (dayjs(expected_start_at).isBefore(recruit_deadline, 'day')) {
      alert('스터디 예정 시작일은 모집 마감일보다 빠를 수 없습니다.');
      setPage(1);
      return;
    }
    if (title.trim().length === 0) {
      alert('스터디 제목은 필수로 작성해야 합니다.');
      setPage(3);
      return;
    }

    //  const fetchNewRecruit = (reqbody: NewRecruitRequestType) => {
    //    mutate(reqbody, {
    //      onSuccess: () => {
    //        showAlert({ alertViewTitle: '모집글이 생성되었습니다.', alertActions:[{title:'모집글로 이동하기',style:'primary',handler:()=>router.push('/')}] });
    //      },
    //    });
    //  };
    const requestBody: NewRecruitRequestType = {
      ...newRecruitForm,
      recruit_deadline,
      expected_start_at,
      expected_end_at,
      checkList: checkList.filter((item) => item.length > 0),
      contact: contact.trim(),
      link: link.trim(),
      rule_content: rule_content.trim(),
      title: title.trim(),
      description: description.trim(),
    };
    const response = await mutate(requestBody);
    console.log(response);
  };

  return (
    <Layout>
      <main className='flex flex-col items-center pt-60 px-200'>
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
                <span className={cls('text-12 font-medium', i + 1 === page ? 'text-primary' : 'text-black')}>
                  {title}
                </span>
              </button>
            ))}
          </div>
          <Hr className='my-20' />
          {page === 1 && <Page1 moveNextPage={() => setPage(2)} {...{ newRecruitForm, setNewRecruitForm }} />}
          {page === 2 && (
            <Page2
              {...{ newRecruitForm, setNewRecruitForm }}
              movePrevPage={() => setPage(1)}
              moveNextPage={() => setPage(3)}
            />
          )}
          {page === 3 && (
            <Page3 {...{ newRecruitForm, setNewRecruitForm, handleSubmitForm }} movePrevPage={() => setPage(2)} />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default New;

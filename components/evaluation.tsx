import AnswerBtn from '@/components/evaluation/answerBtn';
import Layout from '@/components/layouts/layout';
import { cls } from '@/utils/cls';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from 'react-query';
import { TChecklist, useMemberListQuery } from '@/hooks/queries/feedback/useMemberListQuery';
import { FeedbackRequest, TFeedbackList, postFeedback } from '@/apis/newFeedback';
import { useImmer } from 'use-immer';
import { TChecklistDone, TParticipant } from '@/apis/getStudyDetail';
import { feedback } from '@/enum/feedback';

type Props = {
  moveNextPage?: () => void;
  id?: number;
  turn?: number;
  check?: TChecklist[];
  handleComponentClose: () => void;
};
type questionName = 'participate' | 'negative' | 'positive' | 'checklist';
const questions: { [key in questionName]: string } = {
  participate: '1. 해당 스터디원이 스터디에 적극적으로 참여했습니까?',
  checklist: '2. 해당 스터디원이 수행한 상세규칙을 선택해주세요.',
  positive: '3. 해당 스터디원에 맞는 키워드를 선택해주세요.',
  negative: '',
};

type AnswerBtnProps = {
  feedbackList: TFeedbackList[];
  updateFeedback: (updater: (draft: TFeedbackList[]) => void) => void;
  checklist?: TChecklist[];
};

const participateOptions = [
  { text: '매우 아니다', value: 1 },
  { text: '아니다', value: 2 },
  { text: '보통이다', value: 3 },
  { text: '그렇다', value: 4 },
  { text: '매우그렇다', value: 5 },
];

const Evaluation = ({ id, turn, check, handleComponentClose }: Props) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { memberList, isLoading: isMemberListLoading, isError: isMemberListError } = useMemberListQuery(id!!, turn!!);

  const [feedbackList, updateFeedbackList] = useImmer<TFeedbackList[]>([
    {
      id: 0,
      participate: 0,
      positive: null,
      negative: null,
      checkList: [],
    },
  ]);

  const [evaluation, updateEvaluation] = useImmer<FeedbackRequest>({
    id: id!!,
    turn: turn!!,
    feedbackList: feedbackList,
  });
  const negative = feedback['이런 점이 아쉬워요'];
  const positive = feedback['이런 점이 좋았어요'];
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null);

  const [activeParticipateIndex, setActiveParticipateIndex] = useState<number | null>(null);
  const [activePositiveIndex, setActivePositiveIndex] = useState<number | null>(null);
  const [activeNegativeIndex, setActiveNegativeIndex] = useState<number | null>(null);
  const [checklistIndices, setChecklistIndices] = useState<number[]>([]);

  const [form, setForm] = useImmer<TFeedbackList>({
    id: 0,
    participate: 0,
    positive: null,
    negative: null,
    checkList: [],
  });

  const feedbackMutation = useMutation(postFeedback);

  const handleNextPage = (memberId: number, type: 'id') => {
    if (memberList && page < memberList.participantResponseList.length) {
      setForm((draft) => {
        draft.id = memberList?.participantResponseList[page - 1].id!!; // 폼의 id 설정
        draft.participate = form.participate;
        draft.positive = form.positive;
        draft.negative = form.negative;
        draft.checkList = checklistIndices.map((idx) => ({ id: idx }));
      });

      updateFeedbackList((draft) => {
        draft[page - 1] = form;
      });

      console.log('확인', evaluation);
      setPage(page + 1);

      // setForm((draft) => {
      //   draft.id = 0;
      //   draft.participate = 0;
      //   draft.positive = null;
      //   draft.negative = null;
      //   draft.checkList = [];
      // });
      setActiveParticipateIndex(null);
      setActivePositiveIndex(null);
      setActiveNegativeIndex(null);
      setChecklistIndices([]);
    } else {
      handleSubmitFeedback();
      // handleComponentClose();
    }
  };
  const handleSubmitFeedback = () => {
    updateEvaluation((draft) => {
      draft.feedbackList = feedbackList;
    });
    console.log(evaluation, '최종확인');
    feedbackMutation.mutate(evaluation, {
      onSuccess: () => {
        showCompletionMessage();
        handleComponentClose();
      },
    });
  };
  const showCompletionMessage = () => {
    alert('모든 참여자를 평가했습니다.');
  };

  const handleChecklistClick = (index: number, checklistItemId: number) => {
    setChecklistIndices((prevIndices) => {
      const updatedIndices = [...prevIndices];
      const exists = updatedIndices.includes(index);

      if (exists) {
        const filteredIndices = updatedIndices.filter((idx) => idx !== index);
        setForm((draft) => {
          draft.checkList = filteredIndices.map((idx) => ({ id: idx }));
        });
        return filteredIndices;
      } else {
        updatedIndices.push(index);
        setForm((draft) => {
          draft.checkList = updatedIndices.map((idx) => ({ id: checklistItemId }));
        });
        return updatedIndices;
      }
    });
  };

  // Handle other buttons
  const handleButtonClick = (item: string, type: 'positive' | 'negative') => {
    setForm((draft) => {
      draft[type] = item;
    });
    setActiveButtonIndex(null);
  };
  const handleParticipateClick = (item: number, type: 'participate') => {
    setForm((draft) => {
      draft[type] = item;
    });
    setForm((draft) => {
      draft['id'] = memberList?.participantResponseList[page - 1].id!!;
    });
    setActiveButtonIndex(null);
  };

  return (
    <>
      <div className='font-bold text-30 py-10 mb-'>피드백</div>
      <div className='flex items-center gap-30 mb-20 mt-25'>
        {memberList?.participantResponseList.map((person, i) => (
          <div key={i} className='flex items-center gap-6'>
            <div
              className={cls(
                'flex justify-center items-center w-25 h-25 rounded-full text-12 font-medium',
                i + 1 === page ? 'bg-purple_sub text-white' : ' bg-[#EAEEF3] text-black',
              )}
            >
              {i + 1}
            </div>
            <span className={cls('text-15 font-medium', i + 1 === page ? 'text-purple_sub' : 'text-black')}>
              {person.nickname}
            </span>
          </div>
        ))}
      </div>
      <div className='bg-gray_30 w-full h-1 my-25'></div>
      <>
        <div className='mb-10'>
          <label className='text-16'>{questions['participate']}</label>
          <div className='flex gap-20'>
            {participateOptions.map((option, index) => (
              <button
                key={option.text}
                className={`px-6 w-full max-w-195 py-10 my-24 rounded-20 border ${
                  activeParticipateIndex === index
                    ? 'border-purple_sub text-white bg-purple_sub'
                    : 'border-purple_sub text-purple_sub'
                }  text-14 hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
                onClick={() => {
                  setActiveParticipateIndex(index);
                  handleParticipateClick(option.value, 'participate');
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
        <div className='mb-10'>
          <label className='text-16'>{questions['checklist']}</label>
          <div className='flex gap-20'>
            {check?.map((item, index) => (
              <button
                key={index}
                className={`px-8 w-full max-w-210 py-10 my-24 rounded-20 border ${
                  checklistIndices.includes(index)
                    ? 'border-purple_sub text-white bg-purple_sub'
                    : 'border-purple_sub text-purple_sub'
                } text-14 hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
                onClick={() => handleChecklistClick(index, item.id)}
              >
                {item.content}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className='text-16'>{questions['positive']}</label>
          <div className='flex gap-20'>
            {positive.map((item, index) => (
              <button
                key={item}
                className={`px-8 w-full max-w-210 py-10 my-24 rounded-20 border ${
                  activePositiveIndex === index
                    ? 'border-purple_sub text-white bg-purple_sub'
                    : 'border-purple_sub text-purple_sub'
                }   text-14 hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
                onClick={() => {
                  setActivePositiveIndex(index);
                  handleButtonClick(item, 'positive');
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className='mb-10'>
          <div className='flex gap-20'>
            {negative.map((item, index) => (
              <button
                key={item}
                className={`px-8 w-full max-w-210 py-10 my-24 rounded-20 border ${
                  activeNegativeIndex === index
                    ? 'border-purple_sub text-white bg-purple_sub'
                    : 'border-purple_sub text-purple_sub'
                }   text-14 hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
                onClick={() => {
                  setActiveNegativeIndex(index);
                  handleButtonClick(item, 'negative');
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </>

      <div className='bg-gray_30 w-full h-1 mt-32'></div>
      <div className='flex justify-end mt-24'>
        <button
          className='bg-purple_sub text-white text-13 py-13 px-19 rounded-13'
          onClick={() => {
            const memberId = memberList?.participantResponseList[page - 1]?.id;
            if (memberId !== undefined) {
              handleNextPage(memberId, 'id');
            }
          }}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default Evaluation;

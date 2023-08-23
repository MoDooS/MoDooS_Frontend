import { TChecklistDone } from '@/apis/getStudyDetail';
import { TFeedbackList } from '@/apis/newFeedback';
import { feedback } from '@/enum/feedback';
import { TChecklist } from '@/hooks/queries/feedback/useMemberListQuery';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useImmer } from 'use-immer';

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

const AnswerBtn: React.FC<AnswerBtnProps> = ({ feedbackList, updateFeedback, checklist }) => {
  const participateOptions = [
    { text: '매우 아니다', value: 1 },
    { text: '아니다', value: 2 },
    { text: '보통이다', value: 3 },
    { text: '그렇다', value: 4 },
    { text: '매우그렇다', value: 5 },
  ];

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
    setActiveButtonIndex(null);
  };

  return (
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
          {checklist?.map((item, index) => (
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
  );
};
export default AnswerBtn;

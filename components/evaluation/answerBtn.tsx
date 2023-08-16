import { feedback } from '@/enum/feedback';
import { useImmer } from 'use-immer';

interface AnswerFormType {
  attendance: number;
  studyRule: number;
  activeness: number;
  checklist: number[];
  positive?: number;
  negative?: number;
}

export const initialAnswer: AnswerFormType = {
  attendance: 0,
  studyRule: 0,
  activeness: 0,
  checklist: [],
};

export const pos = ['🙂', '👀', '🍊', '✨', '🗣️', '🩷'];
export const neg = ['🤨', '👣', '🤖', '💊', '💦', '🙈'];

type questionName = 'attendance' | 'studyRule' | 'activeness' | 'positive' | 'negative';
const questions: { [key in questionName]: string } = {
  attendance: '1. 해당 스터디원이 출석했습니까?',
  activeness: '2. 해당 스터디원이 스터디에 적극적으로 참여했습니까?',
  studyRule: '3. 해당 스터디원이 수행한 상세규칙을 선택해주세요.',
  positive: '4. 해당 스터디원에 맞는 키워드를 선택해주세요.',
  negative: '',
};

const AnswerBtn = () => {
  const attendance = ['출석', '지각', '결석'];
  const activeness = ['매우 아니다', '아니다', '보통이다', '그렇다', '매우그렇다'];
  const checklist = ['영단어 200개 외워오기', '워크북해오기'];
  const positive = feedback['이런 점이 좋았어요'];
  const negative = feedback['이런 점이 아쉬워요'];

  const [form, updateForm] = useImmer<AnswerFormType>(initialAnswer);

  const handleChange = (name: questionName, option: number) => {
    updateForm((draft) => {
      draft[name] = option;
    });
  };

  const handleChecklistClick = (option: number) => {
    updateForm((draft) => {
      const checklistIndex = draft.checklist.indexOf(option);

      if (checklistIndex === -1) {
        draft.checklist.push(option);
      } else {
        draft.checklist.splice(checklistIndex, 1);
      }
    });
  };

  type FeedbackType = 'positive' | 'negative';

  const generateButtons = (items: string[], name: questionName, feedbackType?: FeedbackType) => {
    return (
      <div>
        <label className='text-16'>{questions[name]}</label>

        <div className='flex gap-20'>
          {items.map((item, index) => (
            <button
              key={item}
              className={`px-12 w-full max-w-195 py-10 my-24 rounded-20 border ${
                form[name] === index + 1
                  ? 'border-purple_sub text-white bg-purple_sub'
                  : 'border-purple_sub text-purple_sub'
              } ${
                name === 'studyRule' && form.checklist.includes(index + 1)
                  ? 'border-purple_sub text-white bg-purple_sub' // 체크리스트일 경우 추가 스타일 적용
                  : ''
              } border-purple_sub text-purple_sub text-14 hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
              onClick={() => {
                if (name === 'studyRule') {
                  handleChecklistClick(index + 1);
                } else {
                  handleChange(name, index + 1);
                }
              }}
            >
              {feedbackType ? (
                <span className='text-15 items-center'>{feedbackType === 'positive' ? pos[index] : neg[index]}</span>
              ) : null}
              &nbsp;{item}
            </button>
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      {generateButtons(attendance, 'attendance')}
      {generateButtons(activeness, 'activeness')}
      {generateButtons(checklist, 'studyRule')}
      <div className='flex flex-col'>
        {generateButtons(feedback['이런 점이 좋았어요'], 'positive', 'positive')}
        {generateButtons(feedback['이런 점이 아쉬워요'], 'negative', 'negative')}
      </div>
    </>
  );
};

export default AnswerBtn;

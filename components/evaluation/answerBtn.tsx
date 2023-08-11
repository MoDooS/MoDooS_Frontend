import { useState } from 'react';
import Category from './category';
import { feedback } from '@/enum/feedback';

interface AnswerFormType {
  attendance: Number;
  studyRule: Number;
  activeness: Number;
  checklist: Number[];
  positive?: Number;
  negative?: Number;
}

export const initialAnswer: AnswerFormType = {
  attendance: 0,
  studyRule: 0,
  activeness: 0,
  checklist: [],
};

export const pos = ['🙂', '👀', '🍊', '✨', '🗣️', '🩷'];
export const neg = ['🤨', '👣', '🤖', '💊', '💦', '🙈'];

const AnswerBtn = () => {
  const questions = [
    '1. 해당 스터디원이 출석했습니까?',
    '2. 해당 스터디원이 스터디에 적극적으로 참여했습니까?',
    '3. 해당 스터디원이 수행한 상세규칙을 선택해주세요.',
    '4. 해당 스터디원에 맞는 키워드를 선택해주세요.',
  ];
  const attendance = ['출석', '지각', '결석'];
  const activeness = ['매우 아니다', '아니다', '보통이다', '그렇다', '매우그렇다'];
  const checklist = ['영단어 200개 외워오기', '워크북해오기'];
  const positive = feedback['이런 점이 좋았어요!'];
  const negative = feedback['이런 점이 아쉬워요'];

  const [form, setForm] = useState<AnswerFormType>(initialAnswer);

  const handleAttendanceClick = (option: Number) => {
    setForm((prev) => ({ ...prev, attendance: option }));
  };

  const handleActivenessClick = (option: Number) => {
    setForm((prev) => ({ ...prev, activeness: option }));
  };

  const handleChecklistClick = (option: Number) => {
    setForm((prev) => ({
      ...prev,
      checklist: prev.checklist.includes(option)
        ? prev.checklist.filter((item) => item !== option)
        : [...prev.checklist, option],
    }));
  };

  const handlePositiveCheck = (option: Number) => {
    setForm((prev) => ({ ...prev, positive: option }));
  };

  const handleNegativeCheck = (option: Number) => {
    setForm((prev) => ({ ...prev, negative: option }));
  };

  const handleChange = () => {};

  return (
    <>
      <div>
        <label className='text-16'>{questions[0]}</label>

        <div className='flex gap-20'>
          {attendance.map((item, index) => (
            <button
              key={item}
              className={`px-12 w-full max-w-195 py-10  my-24 rounded-20 border ${
                form.attendance === index + 1
                  ? 'border-purple_sub text-white bg-purple_sub'
                  : 'border-purple_sub text-purple_sub'
              }  border-purple_sub text-purple_sub text-14 hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
              onClick={() => {
                handleAttendanceClick(index + 1);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-25'>
        <label className='text-16'>{questions[1]}</label>
        <div className='flex gap-20'>
          {activeness.map((item, index) => (
            <button
              key={item}
              className={`px-12 w-full max-w-195 py-10  my-24  rounded-20 border ${
                form.activeness === index + 1
                  ? 'border-purple_sub text-white bg-purple_sub'
                  : 'border-purple_sub text-purple_sub'
              } border-purple_sub text-purple_sub text-14 hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
              onClick={() => {
                handleActivenessClick(index + 1);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-25'>
        <label className='text-16'>{questions[2]}</label>
        <div className='flex flex-col'>
          {checklist.map((item, index) => (
            <button
              key={item}
              className={`px-60 w-full max-w-310 py-10 mt-24 rounded-20 border ${
                form.checklist.includes(index + 1)
                  ? 'border-purple_sub text-white bg-purple_sub'
                  : 'border-purple_sub text-purple_sub'
              } border-purple_sub text-purple_sub text-14 hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
              onClick={() => {
                handleChecklistClick(index + 1);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-25 flex'>
        <label className='text-16'>{questions[4]}</label>
        <div className='flex gap-20'>
          <div>
            <label className='text-16 mb-20'>이런 점이 좋았어요!</label>
            <div className='flex flex-col gap-10 mt-20 '>
              {feedback['이런 점이 좋았어요!'].map((item, index) => (
                <div
                  key={item}
                  className={`px-40 py-10 w-full max-w-250 my-10 rounded-20 border ${
                    form.positive === index + 1
                      ? 'border-purple_sub text-white bg-purple_sub'
                      : 'border-purple_sub text-purple_sub'
                  } border-purple_sub text-purple_sub text-14 text-center hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
                  onClick={() => {
                    handlePositiveCheck(index + 1);
                  }}
                >
                  <span className='text-17'>{pos[index]}</span>&nbsp;
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className='text-16'>이런 점이 아쉬워요!</label>
            <div className='flex flex-col gap-10 mt-20'>
              {feedback['이런 점이 아쉬워요'].map((item, index) => (
                <div
                  key={item}
                  className={`px-40 py-10 w-full max-w-250 my-10 rounded-20 border ${
                    form.negative === index + 1
                      ? 'border-purple_sub text-white bg-purple_sub'
                      : 'border-purple_sub text-purple_sub'
                  } border-purple_sub text-purple_sub text-14 text-center hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
                  onClick={() => {
                    handleNegativeCheck(index + 1);
                  }}
                >
                  <span className='text-17'>{neg[index]}</span> &nbsp;
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerBtn;

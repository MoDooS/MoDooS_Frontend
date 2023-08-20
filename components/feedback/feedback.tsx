import { feedback } from '@/enum/feedback';
import { neg, pos } from '@/pages/study/evaluation';

enum Category {
  good = '이런 점이 좋았어요',
  bad = '이런 점이 아쉬워요',
}

const Feedback = () => {
  return (
    <div className='flex flex-col mt-15'>
      <div>
        <div className='text-16 font-semibold my-16'>이런 점이 좋았어요</div>
        {feedback[Category.good].map((item, index) => (
          <div
            key={item}
            className='bg-gray_40 border border-gray_30 w-full px-13 py-11 text-14 mb-15 rounded-5 flex items-center'
          >
            <span className='text-17'>{pos[index]}</span>&nbsp;
            {item}
          </div>
        ))}
      </div>
      <div>
        <div className='text-16 font-semibold mt-52 mb-16'>이런 점이 아쉬워요</div>
        {feedback[Category.bad].map((item, index) => (
          <div
            key={item}
            className='bg-gray_40 border border-gray_30 w-full px-13 py-11 text-14 mb-15 rounded-5 flex items-center'
          >
            <span className='text-17'>{neg[index]}</span>&nbsp;
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;

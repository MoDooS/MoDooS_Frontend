import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

const MainBtn: React.FC<Props> = ({ text, ...props }) => {
  return (
    <button type='submit' className='max-w-360 w-full text-17 text-gray_70 py-13  mt-20 bg-gray rounded-17'>
      {text}
    </button>
  );
};

export default MainBtn;

import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

const MainBtn: React.FC<Props> = ({ text, ...props }) => {
  return (
    <button type='submit' className='text-17 text-gray_70 w-424 py-16 px-182 mt-29 bg-gray rounded-17'>
      {text}
    </button>
  );
};

export default MainBtn;

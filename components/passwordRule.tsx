import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

const PasswordRule: React.FC<Props> = ({ text, ...props }) => {
  return (
    <div className=' bg-dark_blue absolute -top-1/3 left-240 ml-130 text-white w-218 h-52 text-12 flex items-center py-12 px-16 rounded-6 '>
      {text}
    </div>
  );
};

export default PasswordRule;

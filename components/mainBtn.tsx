import { HTMLAttributes, useState } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string;
  activation?: boolean;
}

const MainBtn: React.FC<Props> = ({ text, activation, ...props }) => {
  const [txt, setTxt] = useState(text);
  return (
    <button
      type='submit'
      className={`${
        activation ? 'bg-purple_sub text-white' : 'bg-gray text-gray_70 '
      } max-w-360 w-full text-17 py-13 mt-20 rounded-17`}
    >
      {txt}
    </button>
  );
};

export default MainBtn;

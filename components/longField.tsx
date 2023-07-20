import { HTMLAttributes, useState } from 'react';
import Warning from '../public/icons/warning.svg';
import QuestionMark from '../public/icons/question_mark.svg';
import PasswordRule from './passwordRule';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  field: FieldType;
  hasMark?: boolean;
}

export interface FieldType {
  label: string;
  placeholder: string;
  errMsg?: string;
  onChange: (value: string) => void;
}

const LongField: React.FC<Props> = ({ field, hasMark = false, ...props }) => {
  const { label, placeholder, errMsg, onChange } = field;
  const [showPasswordRule, setShowPasswordRule] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handlePasswordButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPasswordRule(!showPasswordRule);
  };

  return (
    <div className='relative'>
      <div {...props} className='flex text-13 text-gray_70 justify-between max-w-360 w-full mt-15'>
        {label}
        <button onClick={handlePasswordButtonClick}>{hasMark && <QuestionMark width='17px' />}</button>
      </div>
      {showPasswordRule && (
        <PasswordRule text='8~16글자, 영어 대소문자(하나이상), 특수문자(하나이상), 숫자(하나이상)' />
      )}

      <input
        type='text'
        onChange={handleChange}
        className='border border-gray_70 w-360 py-11 px-15 mt-4 rounded-17 placeholder-gray_70 placeholder: text-15'
        placeholder={placeholder}
      ></input>

      {errMsg && (
        <div className='ml-14 mt-4 flex text-13 text-red mb-20'>
          <Warning width='17px' />
          &nbsp;{errMsg}
        </div>
      )}
    </div>
  );
};

export default LongField;

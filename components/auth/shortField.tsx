import { HTMLAttributes, memo, useCallback, useState } from 'react';
import Warning from '../../public/icons/warning.svg';
import { Timer } from './timer';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  field: FieldType;
  btnText?: string;
  activation?: boolean;
  onClick?: () => void;
}

export interface FieldType {
  label?: string;
  placeholder: string;
  type?: string;
  errMsg?: string;
  authMsg?: string;
  onChange: (value: string) => void;
}

const ShortField: React.FC<Props> = ({ field, btnText, activation, onClick, ...props }) => {
  const { label, placeholder, errMsg, authMsg, type, onChange } = field;
  const _btnText = btnText;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault(); // 버튼 클릭 시 기본 동작(새로고침)을 막습니다.
      if (onClick) onClick();
    },
    [onClick],
  );

  return (
    <div className='relative'>
      <div {...props} className='flex text-13 text-gray_70 justify-between mt-15'>
        {label}
      </div>

      <div className='flex'>
        <input
          type={type}
          onChange={handleChange}
          className={`border ${errMsg ? 'border-input_red' : 'border-gray_70'} ${
            authMsg ? 'border-purple_sub' : 'border-gray_70'
          }  py-9 px-15 mt-4 mr-10 max-w-280 w-full rounded-17 placeholder-gray_70 placeholder: text-14`}
          placeholder={placeholder}
        ></input>
        {_btnText ? (
          <button
            disabled={!activation}
            onClick={handleButtonClick}
            className={`${
              activation ? 'bg-purple_sub text-white' : 'bg-gray text-gray_90'
            } flex text-16 w-72 h-50 px-7 py-5 rounded-17 items-center justify-center
            `}
          >
            {_btnText}
          </button>
        ) : (
          <Timer isActive={activation} />
        )}
      </div>

      {errMsg && (
        <div className='ml-14 mt-4 flex text-13 text-red mb-20'>
          <Warning width='17px' />
          &nbsp;{errMsg}
        </div>
      )}
      {authMsg && <div className='ml-14 mt-4 flex text-13 text-purple_sub mb-20'>&nbsp;{authMsg}</div>}
    </div>
  );
};

export default memo(ShortField);

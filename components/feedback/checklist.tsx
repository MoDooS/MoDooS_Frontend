import { TChecklistDone } from '@/apis/getStudyDetail';

declare module 'react' {
  interface CSSProperties {
    WebkitAppearance?: string;
    MozAppearance?: string;
  }
}

interface Prop {
  checklist?: TChecklistDone[];
}

const CheckList: React.FC<Prop> = ({ checklist }) => {
  const customCheckboxStyle: React.CSSProperties = {
    WebkitAppearance: 'auto',
    MozAppearance: 'auto',
    appearance: 'auto',
  };

  const checkboxStyle = {};
  return (
    <div className='flex flex-col mt-26 mb-108 gap-15'>
      {checklist?.map((item, index) => (
        <div
          key={index}
          className='items-center bg-gray_40 w-full px-13 py-11 border border-gray_30 flex justify-between'
        >
          <label className='text-14'>{item.content}</label>{' '}
          {item.check ? (
            <input style={customCheckboxStyle} className='inline w-17 h-17 bg-white' type='checkbox' checked />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckList;

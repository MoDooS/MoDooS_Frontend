declare module 'react' {
  interface CSSProperties {
    WebkitAppearance?: string;
    MozAppearance?: string;
  }
}

const CheckList = () => {
  const customCheckboxStyle: React.CSSProperties = {
    WebkitAppearance: 'auto',
    MozAppearance: 'auto',
    appearance: 'auto',
  };

  const checkboxStyle = {};
  return (
    <div className='flex flex-col mt-26 mb-108 gap-15'>
      <div className='items-center bg-gray_40 w-full px-13 py-11 border border-gray_30 flex justify-between'>
        <label className='text-14'>과제를 성실히 해오기 </label>{' '}
        <input style={customCheckboxStyle} className='inline w-17 h-17 bg-white' type='checkbox' checked />{' '}
      </div>
      <div className='items-center bg-gray_40 w-full px-13 py-11 border border-gray_30'>
        <input type='checkbox' checked /> <label className='text-14'>과제를 성실히 해오기 </label>
      </div>
    </div>
  );
};

export default CheckList;

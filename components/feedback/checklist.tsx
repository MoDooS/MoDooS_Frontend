const CheckList = () => {
  return (
    <div className='flex flex-col mt-26 mb-108 gap-15'>
      <div className='items-center bg-gray_40 w-full px-13 py-11 rounded-5 border border-gray_30'>
        <input type='checkbox' id='coding' name='interest' value='coding' checked />
        <label className='text-14'>과제를 성실히 해오기 </label>
      </div>
      <div className='items-center bg-gray_40 w-full px-13 py-11 border border-gray_30'>
        <input type='checkbox' checked /> <label className='text-14'>과제를 성실히 해오기 </label>
      </div>
      <div className='items-center bg-gray_40 w-full px-13 py-11 border border-gray_30'>
        <input type='checkbox' checked /> <label className='text-14'>과제를 성실히 해오기 </label>
      </div>
      <div className='items-center bg-gray_40 w-full px-13 py-11 border border-gray_30'>
        <input type='checkbox' checked /> <label className='text-14'>과제를 성실히 해오기 </label>
      </div>
    </div>
  );
};

export default CheckList;

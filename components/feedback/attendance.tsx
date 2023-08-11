const Attandance: React.FC = () => {
  const boxWidth = Math.floor(620 / 8);
  const boxStyle: React.CSSProperties = {
    width: `${boxWidth}px`,
    height: '26px',
    pointerEvents: 'none', // 클릭 가능한 동작 비활성화
    maxWidth: `${boxWidth}px`, // 박스의 최대 너비 설정
  };

  // console.log(boxWidth);
  return (
    <div className='mt-42 mb-91'>
      <div className='flex items-center mb-28'>
        <div className='flex-none w-40 h-40 rounded-full bg-gray_90'></div>
        <div className='flex-none text-black text-16 font-semibold mx-13'>박지수</div>
        <div className='h-26 flex flex-1'>
          <div className='flex-1 box bg-purple_sub border-r border-white rounded-l-lg' style={boxStyle}></div>
          <div className='flex-1 box bg-purple_sub border-r border-white' style={boxStyle}></div>
          <div className='flex-1 box bg-purple_sub border-r border-white' style={boxStyle}></div>
          <div className='flex-1 box bg-purple_sub border-r border-white' style={boxStyle}></div>
          <div className='flex-1 box bg-purple_sub border-r border-white' style={boxStyle}></div>
          <div className='flex-1 box bg-purple_sub border-r border-white' style={boxStyle}></div>
          <div className='flex-1 box bg-gray_50 border-r border-white' style={boxStyle}></div>
          <div className='flex-1 box bg-gray_50 border-r border-white rounded-r-lg' style={boxStyle}></div>
        </div>
      </div>
    </div>
  );
};

export default Attandance;

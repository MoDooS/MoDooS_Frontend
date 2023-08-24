interface Prop {
  text?: string;
  startAt?: string;
  endAt?: string;
}

const Title: React.FC<Prop> = ({ text, startAt, endAt }) => {
  return (
    <>
      <h1 className=' text-black font-semibold text-25'>{text}</h1>
      {startAt && (
        <div className='mt-15 text-13 text-gray_70'>
          시작일: {startAt}&nbsp;&nbsp;&nbsp;종료일:{endAt}
        </div>
      )}
      <div className='bg-gray_30 w-full h-1 mt-20'></div>
    </>
  );
};

export default Title;

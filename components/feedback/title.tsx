interface Prop {
  text: string;
}

const Title: React.FC<Prop> = ({ text }) => {
  return (
    <>
      <h1 className=' text-black font-semibold text-25 mb-20'>{text}</h1>
      <div className='bg-gray_30 w-full h-1'></div>
    </>
  );
};

export default Title;

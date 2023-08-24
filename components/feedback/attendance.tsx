import { TParticipant } from '@/apis/getStudyDetail';
import { postAttendance } from '@/apis/postAttendance';
import { useUserQuery } from '@/hooks/queries/user/useUserQuery';
import { useMutation, useQueryClient } from 'react-query';

interface Prop {
  participantList?: TParticipant[];
  total_turn?: number;
}

const Attandance: React.FC<Prop> = ({ participantList, total_turn }) => {
  const { user, isLoading: isUserLoading, isError: isUserError } = useUserQuery();
  const queryClient = useQueryClient();
  const attendance = useMutation(postAttendance);

  const boxWidth = Math.floor(620 / 8);
  const boxStyle: React.CSSProperties = {
    width: '100%',
    height: '26px',
    pointerEvents: 'none', // 클릭 가능한 동작 비활성화
    maxWidth: `${boxWidth}px`, // 박스의 최대 너비 설정
  };

  const getBackgroundColor = (attendance: string) => {
    switch (attendance) {
      case '출석':
        return 'bg-purple_sub';
      case '지각':
        return 'bg-red-500';
      case '결석':
        return 'bg-gray_70';
      default:
        return 'bg-gray_60';
    }
  };

  return (
    <div className='mt-42 mb-91'>
      {participantList?.map((item, index) => (
        <div key={index} className='flex items-center mb-28'>
          <div className='flex-none w-40 h-40 rounded-full bg-gray_90'></div>
          <div className='flex-none text-black text-16 font-semibold mx-13 w-100'>{item.nickname}</div>
          <div className='h-26 flex flex-1'>
            {Array.from({ length: total_turn ?? 0 }, (_, index) => (
              <div
                key={index}
                className={
                  getBackgroundColor(item.attendanceList[index]) +
                  (index === 0
                    ? ' border border-gray_60 rounded-l-lg'
                    : index === (total_turn ?? 0) - 1
                    ? ' border border-gray_60 rounded-r-lg'
                    : ' flex-1 box border-r border-y-0.5 border-white')
                }
                style={boxStyle}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Attandance;

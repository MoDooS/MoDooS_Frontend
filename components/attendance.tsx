import Layout from '@/components/layouts/layout';
import { useState } from 'react';
import { cls } from '@/utils/cls';
import { useMutation, useQueryClient } from 'react-query';
import { RequestType, TAttendance, postAttendance } from '@/apis/postAttendance';
import { TParticipant } from '@/apis/getStudyDetail';
import { useRouter } from 'next/router';
import StudyHome from '@/pages/study/[id]';

const attendance = ['출석', '지각', '결석'];

type Props = {
  studyId: number;
  participantList?: TParticipant[];
  onComplete: () => void;
  handleComponentClose: () => void;
};

const Attendance = ({ studyId, participantList, onComplete, handleComponentClose }: Props) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const attendacneMutation = useMutation(postAttendance);
  const initialAttendanceList: TAttendance[] =
    participantList?.map((participant) => ({
      id: participant.id,
      attendance: '출석', // You can initialize with a default value if needed
    })) || [];

  const [form, setForm] = useState<RequestType>({
    attendanceList: initialAttendanceList,
  });

  const handleClick = (attendanceValue: string) => {
    setCurrent(attendanceValue);
  };

  const handleClickAttendance = (participantId: number, attendanceValue: string) => {
    const participantIndex = participantList?.findIndex((participant) => participant.id === participantId);

    if (participantIndex !== undefined && participantIndex !== -1) {
      const updatedAttendanceList = [...form.attendanceList];
      updatedAttendanceList[participantIndex] = { id: participantId, attendance: attendanceValue };

      setForm({
        attendanceList: updatedAttendanceList,
      });
    }
  };

  const handleSubmitAttendacne = () => {
    if (form.attendanceList.length > 0) {
      attendacneMutation.mutate(
        { id: studyId, reqBody: form },
        {
          onSuccess: () => {
            showCompletionMessage();
            onComplete();
          },
        },
      );
    }
  };

  const handleNextPage = () => {
    if (participantList && page < participantList.length) {
      setPage(page + 1);
    } else {
      console.log(form, '확인해보자');
      handleSubmitAttendacne();
    }
  };

  const showCompletionMessage = () => {
    alert('모든 참여자를 출석체크했습니다.');
    handleComponentClose();
  };
  return (
    <>
      <div className='font-bold text-30 py-10 mb-'>출석체크</div>
      <div className='flex items-center gap-30 mb-20 mt-25'>
        {participantList?.map((title, i) => (
          <div key={i} className='flex items-center gap-6'>
            <div
              className={cls(
                'flex justify-center items-center w-25 h-25 rounded-full text-12 font-medium',
                i + 1 === page ? 'bg-purple_sub text-white' : ' bg-[#EAEEF3] text-black',
              )}
            >
              {i + 1}
            </div>
            <span className={cls('text-15 font-medium', i + 1 === page ? 'text-purple_sub' : 'text-black')}>
              {title.nickname}
            </span>
          </div>
        ))}
      </div>
      <div className='bg-gray_30 w-full h-1 my-25'></div>
      <div className='text-16'>해당 스터디원이 출석했습니까?</div>
      <div className='flex gap-20'>
        {attendance.map((item, index) => (
          <button
            key={item}
            onClick={() => {
              const currentParticipant = participantList && participantList[page - 1];
              if (currentParticipant) {
                handleClickAttendance(currentParticipant.id, item);
              }
            }}
            className={`px-12 w-full max-w-195 py-10  my-24 rounded-20 border ${
              current === item ? 'border-purple_sub text-white bg-purple_sub' : 'border-purple_sub text-purple_sub'
            }  border-purple_sub text-purple_sub text-14 hover:text-white hover:bg-purple_sub focus:text-white focus:bg-purple_sub`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className='bg-gray_30 w-full h-1 mt-32'></div>
      <div className='flex justify-end mt-24'>
        <button onClick={handleNextPage} className='bg-purple_sub text-white text-13 py-13 px-19 rounded-13'>
          다음
        </button>
      </div>
    </>
  );
};

export default Attendance;

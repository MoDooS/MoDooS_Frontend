import Layout from '@/components/layouts/layout';
import { useState } from 'react';
import { cls } from '@/utils/cls';
import { useMutation, useQueryClient } from 'react-query';
import { RequestType, postAttendance } from '@/apis/useAttendance';

const pageTitles = ['박지수', '양채연', '안승연', '박상민'];
const attendance = ['출석', '지각', '결석'];

type Props = {
  studyId: number;
};

const Attendance = ({ studyId }: Props) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState('');
  const attendacneMutation = useMutation(postAttendance);
  const [form, setForm] = useState<RequestType>({
    attendanceList: [],
  });

  const handleClick = (attendanceValue: string) => {
    setCurrent(attendanceValue);
  };

  const handleClickAttendance = (id: number, attendanceValue: string) => {
    const updatedAttendanceList = [...form.attendanceList];
    updatedAttendanceList[id] = { id: id, attendance: attendanceValue };

    setForm({
      attendanceList: updatedAttendanceList,
    });
  };

  const handleSubmitAttendacne = () => {
    if (form.attendanceList.length > 0) {
      attendacneMutation.mutate(
        { id: studyId, reqBody: form }, // Pass the studyId and the entire form
        {
          onSuccess: () => {
            queryClient.invalidateQueries('');
          },
        },
      );
    }
  };
  return (
    <>
      <div className='font-bold text-30 py-10 mb-'>출석체크</div>
      <div className='flex items-center gap-30 mb-20 mt-25'>
        {pageTitles.map((title, i) => (
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
              {title}
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
              handleClick(item);
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
        <button className='bg-purple_sub text-white text-13 py-13 px-19 rounded-13'>다음</button>
      </div>
    </>
  );
};

export default Attendance;

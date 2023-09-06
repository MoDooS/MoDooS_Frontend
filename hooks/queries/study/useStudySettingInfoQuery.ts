import getStudySettingInfo, { StudySettingInfoResponse } from '@/apis/getStudySettingInfo';
import { withVerify } from '@/apis/withVerify';

import { useQuery } from 'react-query';

export const STUDY_SETTING_INFO_QUERY_KEY = 'StudySettingInfoQuery';

export function useStudySettingInfoQuery({
  studyId,
  onSuccess,
}: {
  studyId: number | string | undefined;
  onSuccess: (res: StudySettingInfoResponse) => void;
}) {
  const {
    data: studyInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: STUDY_SETTING_INFO_QUERY_KEY,
    queryFn: () => withVerify(() => getStudySettingInfo(studyId)),
    onSuccess,
    select: (res) => ({
      ...res.data,
      // checkList: res.data.checkList.map((item) => item.content),
      // cycle_of_week: 1,
      // hour: 14,
      // minute: 0,
    }),
    enabled: !!studyId,
  });

  return { studyInfo, isLoading, isError };
}

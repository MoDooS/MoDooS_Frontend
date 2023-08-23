export type AlarmType =
  | '스터디 승인 요청 알림'
  | '스터디 승인 수락 알림'
  | '스터디 승인 거절 알림'
  | '찜한 스터디 마감 하루 전 알림'
  | '내 스터디 댓글 알림'
  | '대댓글 알림'
  | '피드백 시작 알림'
  | '피드백 종료 2시간 전 알림';

export type Alarm = {
  alarmId: number;
  receiverName: string;
  receiverId: number;
  studyName: string;
  studyId: number;
  content: string;
  commentId: number | null;
  alarmType: AlarmType;
  read: boolean;
};

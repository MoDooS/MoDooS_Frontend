import { StudyCampus } from './studyInfo';

export type MyInfoRequest = {
  nickname: string;
  campus: StudyCampus;
  department: string;
  [key: string]: string | StudyCampus;
};

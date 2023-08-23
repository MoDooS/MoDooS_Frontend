export type JoinName = 'nickname' | 'email' | 'password' | 'campus' | 'department';
export type ErrName = 'nicknameErr' | 'emailErr' | 'codeErr' | 'passwordErr' | 'repasswordErr';

export interface JoinFormType {
  nickname: string;
  email: string;
  password: string;
  campus: string;
  department: string;
}

export interface JoinErrType {
  nicknameErr: string;
  emailErr: string;
  codeErr: string;
  passwordErr: string;
  repasswordErr: string;
}

export interface AuthType {
  nicknameAuth: string;
  emailAuth?: string;
  codeAuth: string;
}

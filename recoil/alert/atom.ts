import { AlertActionOptions } from '@/components/modal/alertAction';
import { atom } from 'recoil';

export type AlertOptions = {
  alertViewTitle: string;
  alertViewDesc?: string;
  alertActions: AlertActionOptions[];
};

type AlertStateType = {
  show: boolean;
  alertOptions: AlertOptions;
};

export const initialAlertState: AlertStateType = {
  show: false,
  alertOptions: {
    alertViewTitle: '',
    alertViewDesc: undefined,
    alertActions: [],
  },
};

export const alertState = atom({
  key: 'alertState',
  default: initialAlertState,
});

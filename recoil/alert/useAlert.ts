import { useRecoilState } from 'recoil';
import { AlertOptions, alertState, initialAlertState } from './atom';
import { useCallback } from 'react';

export default function useAlert() {
  const [alert, setAlert] = useRecoilState(alertState);

  // useEffect에서 사용 시 리렌더링을 방지하기 위해서 useCallback 사용
  const showAlert = useCallback(
    (alertOptions: AlertOptions) => {
      setAlert({
        show: true,
        alertOptions,
      });
    },
    [setAlert],
  );
  const closeAlert = () => {
    setAlert(initialAlertState);
  };
  return { alert, showAlert, closeAlert };
}

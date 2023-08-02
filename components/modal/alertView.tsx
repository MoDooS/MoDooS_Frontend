import React from 'react';
import ModalView from './modalView';
import useAlert from '@/recoil/alert/useAlert';
import AlertAction from './alertAction';
import BackDrop from './backdrop';
import CancleIcon from '../../public/icons/cancle.svg';

export default function AlertView() {
  const {
    alert: {
      show,
      alertOptions: { alertViewTitle, alertViewDesc, alertActions },
    },
    closeAlert,
  } = useAlert();

  return (
    <>
      {show && (
        <BackDrop onBackdropClick={closeAlert}>
          <ModalView className='relative w-full max-w-450 shadow-neumorphism p-16 mx-20 box-border bg-white rounded-8'>
            <button onClick={closeAlert} className='absolute top-16 right-16'>
              <CancleIcon width='16' height='16' />
            </button>
            <div className={'font-semibold text-18'}>{alertViewTitle}</div>
            {alertViewDesc && <div className='mt-15 text-14'>{alertViewDesc}</div>}
            <div className='mt-28 flex justify-end items-end gap-10'>
              {alertActions.map((action, i) => (
                <AlertAction key={i} {...action} closeAlert={closeAlert} />
              ))}
            </div>
          </ModalView>
        </BackDrop>
      )}
    </>
  );
}

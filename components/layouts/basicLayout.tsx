import React from 'react';
import Header from './header';
import Footer from './footer';

interface Props {
  children: React.ReactNode;
}

const BasicLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='pt-60'>{children}</div>
    </div>
  );
};

export default BasicLayout;

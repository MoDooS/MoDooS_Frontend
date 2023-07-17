import React from 'react';
import Header from './header';
import Footer from './footer';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='pt-60'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

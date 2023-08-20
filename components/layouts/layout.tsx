import React from 'react';
import Header from './header';
import Footer from './footer';
import OnlyUser from './onlyUser';
import OnlyNotUser from './onlyNotUser';

type Props = {
  onlyAccess?: 'user' | 'notUser' | 'all';
  hasFooter?: boolean;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ onlyAccess = 'all', hasFooter, children }) => {
  return (
    <>
      <Header />
      <div className='pt-60 bg-bg1 min-h-screen'>
        {onlyAccess === 'user' && <OnlyUser>{children}</OnlyUser>}
        {onlyAccess === 'notUser' && <OnlyNotUser>{children}</OnlyNotUser>}
        {onlyAccess === 'all' && children}
      </div>
      {hasFooter && <Footer />}
    </>
  );
};

export default Layout;
